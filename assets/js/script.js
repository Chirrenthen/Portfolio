// ──────────────── Predefined Voice Setup ────────────────
const PREDEFINED_VOICE_NAME = 'Google US English Male';
// Ensure Chrome/Edge/Firefox load voices so getVoices() is populated
window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

// ──────────────── Preloader ────────────────
function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
  setInterval(loader, 500);
}
window.onload = fadeOut;

// ──────────────── Text-to-Speech using Web Speech API ────────────────
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  // Set the predefined voice
  const voices = synth.getVoices();
  const voice = voices.find(v => v.name === PREDEFINED_VOICE_NAME);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.pitch  = 1;   // 0 to 2
  utterance.rate   = 1.5; // 0.1 to 10
  utterance.volume = 1;   // 0 to 1

  synth.speak(utterance);
}

// ──────────────── jQuery Document Ready ────────────────
$(document).ready(function () {
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      $('#scroll-top').addClass('active');
    } else {
      $('#scroll-top').removeClass('active');
    }

    // scroll spy
    $('section').each(function () {
      const height = $(this).height();
      const offset = $(this).offset().top - 200;
      const top    = $(window).scrollTop();
      const id     = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $(`.navbar`).find(`[href="#${id}"]`).addClass('active');
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 500, 'linear');
  });

  // Initialize EmailJS
  emailjs.init("De-n7wkg7e766DCJW");
  $("#contact-form").submit(function (event) {
    event.preventDefault();
    emailjs.sendForm('Service_CH13064774', 'Template_CH13064774', '#contact-form')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        $("#contact-form")[0].reset();
        alert("Form Submitted Successfully");
      }, function (error) {
        console.log('FAILED...', error);
        alert("Form Submission Failed! Try Again");
      });
  });
});

// ──────────────── Visibility Change Title & Speak ────────────────
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Chirrenthen";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else if (document.visibilityState === "hidden") {
    if (window.location.hash === "#projects") {
      document.title = "Projects | Chirrenthen";
      speak("Projects section");
      $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
      document.title = "Thanks for visiting! - Portfolio | Chirrenthen";
      speak("Thanks for visiting my portfolio");
      $("#favicon").attr("href", "assets/images/favhand.png");
    }
  }
});

// ──────────────── Typed.js Effect ────────────────
var typed = new Typed(".typing-text", {
  strings: ["Web developer","Maker in the field of electronics","Web designer"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});

// ──────────────── Fetch & Render Data ────────────────
async function fetchData(type = "skills") {
  const url = type === "skills" ? "skills.json" : "./projects/projects.json";
  const res = await fetch(url);
  return res.json();
}

function showSkills(skills) {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = skills.map(skill => `
    <div class="bar">
      <div class="info">
        <img src="${skill.icon}" alt="skill" />
        <span>${skill.name}</span>
      </div>
    </div>
  `).join("");
}

function showProjects(projects) {
  const container = document.querySelector("#projects .box-container");
  container.innerHTML = projects
    .filter(p => p.category !== "android")
    .slice(0,10)
    .map(p => `
      <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${p.image}.png" alt="project" />
        <div class="content">
          <div class="tag"><h3>${p.name}</h3></div>
          <div class="desc">
            <p>${p.desc}</p>
            <div class="btns">
              <a href="${p.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${p.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join("");

  // tilt + scroll reveal
  VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
  const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });
  srtop.reveal('.projecs .box', { interval: 200 });
}

fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// ──────────────── Disable DevTools Shortcuts ────────────────
document.onkeydown = function (e) {
  if (e.keyCode == 123 ||
      (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) ||
      (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
    return false;
  }
};

// ──────────────── ScrollReveal for Sections ────────────────
const srtop = ScrollReveal({ origin: 'top', distance: '90px', duration: 1000, reset: true });
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p',  { delay: 200 });
srtop.reveal('.home .content .btn',{ delay: 200 });
srtop.reveal('.home .image',        { delay: 400 });
srtop.reveal('.home .linkedin',     { interval: 600 });
srtop.reveal('.home .github',       { interval: 800 });
srtop.reveal('.home .twitter',      { interval:1000 });
srtop.reveal('.home .telegram',     { interval: 600 });
srtop.reveal('.home .instagram',    { interval: 600 });
srtop.reveal('.home .dev',          { interval: 600 });
srtop.reveal('.about .content h3',       { delay: 200 });
srtop.reveal('.about .content .tag',     { delay: 200 });
srtop.reveal('.about .content p',        { delay: 200 });
srtop.reveal('.about .content .box-container',{ delay: 200 });
srtop.reveal('.about .content .resumebtn',   { delay: 200 });
srtop.reveal('.skills .container',         { interval: 200 });
srtop.reveal('.skills .container .bar',    { delay: 400 });
srtop.reveal('.projects .box',                 { interval: 200 });
srtop.reveal('.contact .container',        { delay: 400 });
srtop.reveal('.contact .container .form-group',{ delay:400 });

// ──────────────── 3D Hover Text Animation ────────────────
const pre = document.querySelector('pre');
if (pre) {
  let targetX=0, targetY=0, currentX=0, currentY=0;
  const midX = innerWidth/2, midY = innerHeight/2;
  window.addEventListener('mousemove', e => {
    targetX = ((e.clientX-midX)/midX)*25;
    targetY = ((e.clientY-midY)/midY)*25;
  });
  (function animate(){
    currentX += (targetX - currentX)*0.1;
    currentY += (targetY - currentY)*0.1;
    pre.style.setProperty('--rotateX', currentX + 'deg');
    pre.style.setProperty('--rotateY', -currentY + 'deg');
    requestAnimationFrame(animate);
  })();
}

// ──────────────── Smart Greeting Board (only once) ────────────────
const board = document.getElementById('greetingBoard');
if (board) {
  const placeholder = 'Enter your name:';
  let hasGreeted = false;

  board.textContent = placeholder;

  board.addEventListener('focus', () => {
    if (!hasGreeted && board.textContent.trim() === placeholder) {
      board.textContent = '';
    }
  });

  function greetUser() {
    if (hasGreeted) return; // only once
    const name = board.textContent.trim();
    if (name && name !== placeholder) {
      board.textContent = `Hello ${name}!,\nWelcome to my portfolio!`;
      board.removeAttribute('contenteditable');
      speak(`Hello ${name}! Welcome to my portfolio!`);
      hasGreeted = true;
    } else {
      board.textContent = placeholder;
    }
  }

  board.addEventListener('keydown', e => {
    if (!hasGreeted && e.key === 'Enter') {
      e.preventDefault();
      greetUser();
    }
  });

  // removed blur‑based greeting to avoid repeats on tab‑switch/blur
}
