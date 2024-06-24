window.addEventListener("scroll", function () {
  var header = this.document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
})


function message(text) {
  document.innerHTML = text;
}



const tabs = document.querySelectorAll('.tab-links');
const about_content = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(tab => { tab.classList.remove('active') });
    tab.classList.add('active');

    var line = document.querySelector('.line')
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    about_content.forEach(content => { content.classList.remove('active') });
    about_content[index].classList.add('active')
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
    alert("Wiadomość pomyślnie wysłana.");
    document.getElementById("contactForm").reset();
}

function isEmpty() {
  var subject = document.getElementById('subject').value;
  var email = document.getElementById('subject').value;
  var message = document.getElementById('subject').value;

  if (subject == "" || email == "" || message == "") {
    alert("Name must be filled out");
    return false;
  } else {
    sendMail();
  }
}