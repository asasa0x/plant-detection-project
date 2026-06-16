/* =======================
   SCREEN PANELS SYSTEM
======================= */

const panels = [
  'screen-upload',
  'screen-uploading',
  'screen-scanning',
  'screen-result'
];

function showPanel(id) {
  panels.forEach(p => {
    const el = document.getElementById(p);

    if (!el) return;

    if (p === id) {
      el.classList.add('active');

      requestAnimationFrame(() => {
        el.classList.add('show');
      });

    } else {
      el.classList.remove('show');

      setTimeout(() => {
        el.classList.remove('active');
      }, 500);
    }
  });
}


/* =======================
   DEMO FLOW ANIMATION
======================= */

function runDemo() {
  showPanel('screen-uploading');

  setTimeout(() => {

    showPanel('screen-scanning');

    const scanText = document.getElementById('scan-text');

    const lines = [
      'Analyzing leaf patterns…',
      'Checking disease database…',
      'Running AI model inference…'
    ];

    let i = 0;

    if (scanText) {
      scanText.textContent = lines[0];
    }

    const interval = setInterval(() => {
      i++;

      if (i < lines.length) {
        if (scanText) {
          scanText.textContent = lines[i];
        }
      } else {
        clearInterval(interval);
      }

    }, 1200);

    setTimeout(() => {
      showPanel('screen-result');
    }, 3500);

  }, 1400);
}


/* =======================
   BUTTON EVENTS
======================= */

const uploadBtn = document.getElementById('btn-upload');
if (uploadBtn) {
  uploadBtn.addEventListener('click', runDemo);
}

const restartBtn = document.getElementById('btn-restart');
if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    showPanel('screen-upload');
  });
}


/* =======================
   AUTO LOGOUT SYSTEM
   (5 SECOND COUNTDOWN)
======================= */

const logoutBtn = document.querySelector('.logout-btn');

if (logoutBtn) {

  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let timeLeft = 5;

    this.style.pointerEvents = 'none';

    const originalHTML = this.innerHTML;

    this.innerHTML = `<i class="fas fa-clock"></i> Logout (${timeLeft})`;

    const timer = setInterval(() => {

      timeLeft--;

      this.innerHTML = `<i class="fas fa-clock"></i> Logout (${timeLeft})`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = '/logout';
      }

    }, 1000);

  });

}