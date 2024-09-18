let type, icon, title, text;


window.addEventListener("scroll", function () {
  var header = this.document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
})


function createToast(type, icon, title, text) {
  let newToast = document.createElement('div');
  let notifications = document.querySelector('.notifications');

  newToast.innerHTML = `
  <div class="toast ${type}">
    <i class="${icon}"></i>
    <div class="toast-content">
        <div class="title">${title}</div>
        <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
  </div>`;
  notifications.appendChild(newToast);

  newToast.timeOut = setTimeout(
    ()=>newToast.remove(), 5000
  )

}


// import 'style.css';

// document.addEventListener('DOMContentLoaded', () => {
//     const interBubble = document.querySelector(".interactive");
//     let curX = 0;
//     let curY = 0;
//     let tgX = 0;
//     let tgY = 0;

//     function move() {
//         curX += (tgX - curX) / 20;
//         curY += (tgY - curY) / 20;
//         interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
//         requestAnimationFrame(() => {
//             move();
//         });
//     }

//     window.addEventListener('mousemove', (event) => {
//         tgX = event.clientX;
//         tgY = event.clientY;
//     });

//     move();
// });







const tabs = document.querySelectorAll('.tab-links');
const about_content = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(tab => { tab.classList.remove('active') });
    tab.classList.add('active');

    var line = document.querySelector('.line');
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    about_content.forEach(content => { content.classList.remove('active') });
    about_content[index].classList.add('active');
  })
});







function sendMail() {
  var params = {
    subject: document.getElementById('subject').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

    emailjs
    .send("service_70pgysm","template_h7hguso",params);
    document.getElementById("contactForm").reset();
}

function isEmpty() {
  var subject = document.getElementById('subject').value;
  var email = document.getElementById('subject').value;
  var message = document.getElementById('subject').value;


  if (subject == "" || email == "" || message == "") {
    type = "fail"; icon = "fa-solid fa-circle-exclamation"; title = "Błąd!"; text = "Proszę wypełnić wszystkie pola.";
    createToast(type, icon, title, text);
    return false;
  } else if (email!=="*@*") {
    type = "fail"; icon = "fa-solid fa-circle-exclamation"; title = "Błąd!"; text = "Proszę wpisać prawdziwy e-mail.";
    createToast(type, icon, title, text);
  } else {
    sendMail();
    type = "success"; icon = "fa-solid fa-circle-check"; title = "Sukces!"; text = "Wiadomość pomyślnie wysłana.";
    createToast(type, icon, title, text);
  }
}