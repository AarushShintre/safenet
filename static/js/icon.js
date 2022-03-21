var el = document.querySelector(".profilePicNavDiv"); 
var dropdown = document.querySelector(".dropdown"); 

fetch('/profilePic')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        if( text.includes("avatar")){
            el.innerHTML = `
            <a href = "" class="dropbtn"><img src=${text} id = "profilePhotoNav" style= "height:50px;width:50px;margin:25px; float: right;"></a>
        `
        }
});
fetch('/loggedIn')
    .then(function (response) {
        return response.json(); 
    })
    .then(function (json) {
        if(json == "true"){
            dropdown.style.display = "block";
        }else{
            console.log("else")
            console.log(json)
            dropdown.style.display = "none";
        }
    })


    
    