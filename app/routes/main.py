from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import current_user, login_required

from app.extensions import db
from app.models import Question, User

main = Blueprint('main', __name__)

@main.route("/", methods = ["GET", "POST"])
def index_home():
    return redirect('/loadPage')


@main.route("/loadPage", methods = ["GET", "POST"])
def loadPage():
    return render_template("loadPage.html")


@main.route("/learn", methods = ["GET", "POST"])
@login_required
def learn():
    return render_template("login.html")

@main.route("/quiz", methods = ["GET", "POST"])
@login_required
def quiz():
    return render_template("login.html")
        
@main.route("/profile", methods = ["GET", "POST"])
@login_required
def profile():
    return render_template("profile.html", name = current_user.name, xp = current_user.points)  
    

@main.route("/about", methods = ["GET", "POST"])
def about():
    return render_template("about.html")