const imgDiv = document.querySelector('#profilePicDiv')
const img = document.querySelector('#photo');
const uploadBtn = document.querySelector('#uploadBtn');

fetch('/profilePic')
    .then(function (response) {
        return response.text();
    }).then(function (text) {
        profilePicDiv.innerHTML = `
            <img src=${text} id="photo" >
        `
    });













