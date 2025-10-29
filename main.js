
    // Burger menu toggling for small screens
    const burger = document.getElementById('burger');
    const nav = document.querySelector('nav ul');
    if (burger) {
      burger.addEventListener('click', ()=>{
        if (getComputedStyle(nav).display === 'none') {
          nav.style.display = 'flex';
          nav.style.flexDirection = 'column';
          nav.style.gap = '14px';
          nav.style.position = 'absolute';
          nav.style.top = '64px';
          nav.style.right = '20px';
          nav.style.background = 'rgba(10,15,26,.97)';
          nav.style.border = '1px solid rgba(148,163,184,.25)';
          nav.style.borderRadius = '12px';
          nav.style.padding = '14px';
        } else {
          nav.style.display = 'none';
        }
      });
      // Hide menu on link click
      document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{ if (window.innerWidth < 860) nav.style.display='none'; }));
    }
    // Dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();
    // === AVANT / APRÈS (Comparateur d'image) ===
function initBeforeAfterSlider() {
  const container = document.querySelector('.ba-image');
  if (!container) return; // sécurité si la section n'est pas sur la page

  const beforeImg = container.querySelector('.before');
  const slider = container.querySelector('.ba-slider');
  let isDragging = false;

  const updateSplit = (x) => {
    const rect = container.getBoundingClientRect();
    let position = Math.min(Math.max(0, x - rect.left), rect.width);
    const percent = (position / rect.width) * 100;
    beforeImg.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    slider.style.left = `${percent}%`;
  };

  const startDrag = () => { isDragging = true; };
  const endDrag = () => { isDragging = false; };

  slider.addEventListener('mousedown', startDrag);
  slider.addEventListener('touchstart', startDrag);

  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSplit(e.clientX);
  });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSplit(e.touches[0].clientX);
  });
}

// Lancer la fonction après le chargement du DOM

  // === ANIMATION DE LA BROSSE ===
  // Effet karcher
  // IntersectionObserver qui gère in-view / out-up / out-down
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#info-diagonal');
  if (!section) return;

  // store last known top to detect direction if nécessaire
  let lastY = window.scrollY;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // On intersecting: add in-view and clear out classes
      if (entry.isIntersecting) {
        section.classList.remove('out-down', 'out-up');
        section.classList.add('in-view');
      } else {
        // Not intersecting -> determine if we scrolled down past it or up before it
        // Use boundingClientRect.top: if it's negative => the section is above viewport (we scrolled down)
        const top = entry.boundingClientRect.top;
        if (top < 0) {
          // section moved above viewport: we scrolled down past it => out-down
          section.classList.remove('in-view', 'out-up');
          section.classList.add('out-down');
        } else {
          // section below viewport: we scrolled up past it => out-up
          section.classList.remove('in-view', 'out-down');
          section.classList.add('out-up');
        }
      }
    }
  );
  }, {
    root: null,
    threshold: 0.18 // tune: when ~18% visible considered intersecting
  });
  

  io.observe(section);

  // small optimization: remove classes on resize so animations recompute nicely
  window.addEventListener('resize', () => {
    section.classList.remove('in-view', 'out-down', 'out-up');
  });
});
// EFFET BULLE
document.addEventListener("DOMContentLoaded", () => {
  const startSection = document.querySelector("#start-bubbles");
  const endSection = document.querySelector("#end-bubbles");
  const container = document.querySelector("#bubbles-area .bubbles-background");

  let active = false;
  let interval = null;

  function createBubble() {
    const b = document.createElement("span");
    b.classList.add("bubble");

    const size = Math.random() * 60 + 20; // 20 à 80px
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 3.5 + 3; // 4 à 9s
    b.style.animationDuration = `${duration}s`;

    container.appendChild(b);
    setTimeout(() => b.remove(), duration * 1000);
  }

  function startBubbles() {
    if (active) return;
    active = true;
    interval = setInterval(createBubble, 400);
  }

  function stopBubbles() {
    active = false;
    clearInterval(interval);
    interval = null;
  }

  // Détecte quand on entre dans la zone des bulles
  const observerStart = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) startBubbles();
    });
  });
  observerStart.observe(startSection);

  // Détecte quand on atteint la fin
  const observerEnd = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) stopBubbles();
    });
  });
  observerEnd.observe(endSection);
});
