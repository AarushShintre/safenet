import psycopg2
from flask import *
import json

app=Flask(__name__)
app.config["SECRET_KEY"] = "cyb$12334@safe"


userName = "blankUname"
#instead of the methods I have used to validate login, one can also make use of Flask Blueprint
#connect to database
con = psycopg2.connect(
    host = "localhost",
    database = "SafeNet",
    user = "postgres",
    password = "postgres"
)

cur = con.cursor()
cur.execute("SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED")
#index and homepage routing
@app.route("/", methods = ["GET", "POST"])
def index_home():
    return redirect('/loadPage')


#templates
@app.route("/services", methods = ["GET", "POST"])
def home():
    return render_template("services.html")

@app.route("/loadPage", methods = ["GET", "POST"])
def loadPage():
    return render_template("loadPage.html")


@app.route("/learn", methods = ["GET", "POST"])
def learn():
    try:
        if session['userName'] == userName:
            return render_template("learn.html")
        else:
            return render_template("login.html")
    except: 
        return render_template("login.html")

@app.route("/quiz", methods = ["GET", "POST"])
def quiz():
    try:
        if session['userName'] == userName:
            return render_template("quiz.html")
        else:
            return render_template("login.html")
    except: 
        return render_template("login.html")
        
@app.route("/profile", methods = ["GET", "POST"])
def profile():
    try:
        if session['userName'] == userName:
            cur.execute("select* FROM info WHERE uname = '%s';"%(session['userName']))
            data = cur.fetchone()
            points = int(data[3])
            return render_template("profile.html", name = data[0], xp = points)  
        else:
            
            return render_template("login.html") 
    except:
        return render_template("login.html") 
    

@app.route("/about", methods = ["GET", "POST"])
def about():
    return render_template("about.html")

@app.route("/loggedIn", methods = ["GET", "POST"])
def loggedIn():
    try:
        if userName == session["userName"]:
            message = "true"
            return jsonify(message)  
        else:
            message = "false"
            return jsonify(message)  
    except:
        message = "false"
        return jsonify(message)  

#profile pic selection
@app.route("/avatar", methods = ["GET", "POST"])
def avatar():
    return render_template("avatar.html")

@app.route("/profilePic", methods = ["GET", "POST"])
def profilePic():
    global uname
    try:
        if session['userName'] == userName:
            if request.method == 'POST':
                choice = str(request.get_json())
                cur.execute("UPDATE info SET profile ='%s' WHERE uname = '%s';"% (choice, session["userName"]))
                con.commit()
                return render_template("avatar.html")
            else:
                cur.execute("Select* from info WHERE uname = '%s';"%(session["userName"]))
                imagelist = cur.fetchone()
                message = "../static/images/"+imagelist[4]
                
                return jsonify(message)  
        else:
            return render_template("login.html")
    except:
        return render_template("login.html")


#quizes and quiz score routing
@app.route("/quiz1", methods = ["GET", "POST"])
def quiz1():
    return render_template("quiz1.html")

@app.route("/quiz2", methods = ["GET", "POST"])
def quiz2():
    return render_template("quiz2.html")

@app.route("/quiz3", methods = ["GET", "POST"])
def quiz3():
    return render_template("quiz3.html")

@app.route("/quiz4", methods = ["GET", "POST"])
def quiz4():
    return render_template("quiz4.html")


@app.route("/quizScore", methods = ["GET", "POST"])
def quizScore():
    cur.execute("select* FROM info WHERE uname='%s';"%(session["userName"]))
    data = cur.fetchone()
    scoreOriginal = int(data[3])
    scoreValue = 10*int(request.get_json())
    updatedValue  = scoreValue + scoreOriginal
    cur.execute("UPDATE info SET scores = '%s'  WHERE uname = '%s';"% (updatedValue, session["userName"]))
    con.commit()
    return render_template("quiz1.html")
        
#login route
@app.route("/login", methods = ["GET", "POST"])
def login():
    global userName
    uname = str(request.form.get("uname"))
    psw = str(request.form.get("psw"))
    userName = uname
    cur.execute("select* FROM info WHERE uname = '%s' ;" %(userName))
    info = cur.fetchone()

    if info is not None:
        if info[1] == psw:
                session["userName"] = userName
                return redirect("/profile")
        else:
            userName = "blankName"
            flash("Incorrect Login Credentials")
            return render_template("login.html")
            
    else:
        return render_template("login.html")
         

#register 
@app.route("/register", methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        global userName
        uname = request.form.get("username")
        psw = request.form.get("psw")
        email = request.form.get("email")
        cur.execute("select* FROM info WHERE uname='%s';"%(uname))
        data1 = cur.fetchone()
        cur.execute("select* FROM info WHERE email='%s';"%(email))
        data2 = cur.fetchone()
        if userName is not None and psw is not None and email is not None:
            if data1 is None and data2 is None:
                if len(psw) >=8:
                        userName = uname
                        pic = "blank_profile.png"
                        cur.execute("insert into info(uname, psw, email, scores, profile) values(%s, %s ,%s, %s, %s);",(str(uname), str(psw), str(email) , 0, str(pic)))
                        con.commit()
                        session["userName"] = userName
                        return render_template("profile.html", name = userName, xp= 0)                  
                else: 
                    flash("Password needs to be atleast 8 characters long")
                    return render_template("register.html")
                
            else: 
                flash("Username or email already exists")   
                return render_template("register.html")
        else: 
            return render_template("register.html")
    else:
        return render_template("register.html")  


#logout
@app.route("/logout",methods = ["GET", "POST"])
def logout():
    userName = "blank_userName"
    session.pop("userName", None)
    return render_template("login.html")  

if __name__ == "__main__":
    app.run(debug=True)
