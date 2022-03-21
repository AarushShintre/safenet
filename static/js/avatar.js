var el = document.querySelector(".selectedPicDiv");
var msg = document.querySelector(".msg");
var navpic = document.querySelector(".profilePicNavDiv");

getProfile()
function getProfile() {
    fetch('/profilePic')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        el.innerHTML = `
            <img src=${text} id = "selectedPic" >   
            <a href="#" id="uploadSection" >Selected <br> Picture</a>
        `
        navpic.innerHTML = `
            <a href ="" class="dropbtn"><img src=${text} id = "profilePhotoNav" style= "height:50px;width:50px;margin:22px; float: right;"></a>
        `
    });

}
    
    function choice1() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar1.png");
        imgLink = "avatar1.png";
    }

    function choice2() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar2.png");
        imgLink = "avatar2.png";
    }
    function choice3() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar3.png");
        imgLink = "avatar3.png";
    }
    function choice4() {  
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar4.png");
        imgLink = "avatar4.png";
    }
    function choice5() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar5.png");
        imgLink = "avatar5.png";
    }
    function choice6() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar6.png");
        imgLink = "avatar6.png";
    }   
    function choice7() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar7.png");
        imgLink = "avatar7.png";
    }
    function choice7() {
        const img = document.querySelector('#selectedPic');
        img.setAttribute('src',"../static/images/avatar8.png");
        imgLink = "avatar8.png";
    } 
    function save() {
        fetch("/profilePic", {
        method:"POST",
        body: JSON.stringify(imgLink),
        headers: {"Content-type": "application/json; charset=UTF-8"},
    })
    msg.innerHTML = `
        <h3 id ="success">Profile Picture changed!</h3>
    `
    getProfile()
    setTimeout(function(){
            msg.innerHTML="";
        },2000);

    }   

    