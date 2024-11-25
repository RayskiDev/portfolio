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


const tabs = document.querySelectorAll('.tab-links');
const about_content = document.querySelectorAll('.content');
let animationPlayed = false;

tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(tab => { tab.classList.remove('active') });
    tab.classList.add('active');

    var line = document.querySelector('.line');
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    about_content.forEach(content => { content.classList.remove('active') });
    about_content[index].classList.add('active');

    if (index === 1 && !animationPlayed) {
      animationPlayed = true;
      animateSkills();
    }
  })
});

function animateSkills() {
  let circle = document.querySelectorAll('.circle');
  circle.forEach(function(progress){
    let degree = 0;
    var targetDegree = parseInt(progress.getAttribute('data-degree'));
    let number = progress.querySelector('.number');

    var interval = setInterval(function(){
      degree+=1;
      if (degree>targetDegree) {
        clearInterval(interval)
        return;
      }
      progress.style.background = `conic-gradient(#f0f ${degree}%, #222 0%)`;
      number.innerHTML = degree + `<span style="font-size: 18px;">%</span>`;
    },50)
  })
}


var activeTab;

document.addEventListener("DOMContentLoaded", function(event) {

  activeTab = document.querySelector('.tab-links.active');
  if (activeTab) {
    const line = document.querySelector('.line');
    line.style.width = activeTab.offsetWidth + "px";
    line.style.left = activeTab.offsetLeft + "px";
  }

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;

      document.querySelectorAll(".accordion-item").forEach(item => {
        if (item !== parent) {
          item.classList.remove("active");
          item.querySelector(".accordion-content").style.maxHeight = "0";
          item.querySelector(".accordion-content").style.padding = "0 20px";
        }
      });

      const content = parent.querySelector(".accordion-content");
      if (parent.classList.contains("active")) {
        parent.classList.remove("active");
        content.style.maxHeight = "0";
        content.style.padding = "0 20px";
      } else {
        parent.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px 20px";
      }
    });
  });
})



const projectOptions = document.querySelectorAll('input[type="radio"');
const projectContent = document.querySelectorAll('.project-content');

projectOptions.forEach((option) => {
  option.addEventListener('change', () => {
    const target = option.value;
    projectContent.forEach((content) => {
      content.classList.toggle('active');
    });
  });
});



const form = document.getElementById("contactForm");
function sendMail() {
  const params = {
    subject: document.getElementById('subject').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

    emailjs
    .send("service_mspx5tt","template_h7hguso",params)
    .then(() => {
      type = "success"; icon = "fa-solid fa-circle-check"; title = "Sukces!"; text = "Wiadomość pomyślnie wysłana.";
      createToast(type, icon, title, text);
      form.reset();
    })
    .catch((error) => {
      type = "fail"; icon = "fa-solid fa-circle-exclamation"; title = "Błąd!"; text = error.text;
      createToast(type, icon, title, text);
      console.error("EmailJS error:", error);
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  var subject = document.getElementById('subject').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();


  if (subject === "" || email === "" || message === "") {
    type = "fail"; icon = "fa-solid fa-circle-exclamation"; title = "Błąd!"; text = "Proszę wypełnić wszystkie pola.";
    createToast(type, icon, title, text);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    type = "fail"; icon = "fa-solid fa-circle-exclamation"; title = "Błąd!"; text = "Proszę wpisać prawidłowy e-mail.";
    createToast(type, icon, title, text);
    return;
  }
  
  sendMail();
});