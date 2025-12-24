const form = document.getElementById('myForm');
const pageContent = document.getElementById('pagecontent');
const preview = document.getElementById('preview');
const fileInput = document.getElementById('avatar');
const ticketAvatar = document.getElementById('ticket-avatar');
const card = document.getElementById('card');
const fName = document.getElementById('fname-display');
const gName = document.getElementById('gname-display');


let uploadedImageURL = '';
fileInput.addEventListener('change', function(e){
    const file = e.target.files[0];
    if (file) {
        uploadedImageURL = URL.createObjectURL(file);
    }
    else {
        uploadedImageURL = '';
    }
});

form.addEventListener('submit', formSubmit);
let html;

function formSubmit(event) {
    event.preventDefault();

    const fname = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const uname = document.getElementById('uname').value;

    const reName = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    const reEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const reUname = /^@([a-zA-Z0-9])([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

    let error = 0;

    if(!reName.test(fname)) {
        document.getElementById('fname').style.color = 'red';
        error++;
    }

    if(!reEmail.test(email)) {
        document.getElementById('email').style.color = 'red';
        error++;
    }
    if(!reUname.test(uname)) {
        document.getElementById('uname').style.color = 'red';
        error++;
    }
    if(error === 0) {
        createCard(fname, email, uname);
        pageContent.style.display = 'none';
    }
}

function createCard(fname, email, uname) {
    const card = document.getElementById('card');
    const cardFrame = document.getElementById('card-frame');
    const cardMessage = document.getElementById('ticket-message');
    cardFrame.style.display = 'block';
    card.style.display = 'block';

    cardMessage.innerHTML = `<h2>Congrats, <span class="gradient-name">${fname}!</span> <br> Your ticket is ready.</h2>`;
    cardMessage.innerHTML += `<h4>We've emailed your ticket to <br>${email} and will send <br>updates in the run up to the event.</h4>`;

    const logo = document.createElement("img");
    logo.src = "assets/images/logo-full.svg";
    logo.className = "ticket-logo";

    if (uploadedImageURL) {
        ticketAvatar.src = uploadedImageURL;
        ticketAvatar.style.display = 'block';
    } else {
        ticketAvatar.src = 'assets/images/default-avatar.png';
        ticketAvatar.style.display = 'block';
    }
    card.appendChild(logo);
    
    ticketAvatar.src = uploadedImageURL //|| 'assets/images/default-avatar.png';

    fName.innerHTML = `<h3>${fname}</h3>`;
    gName.innerText = uname
    
}