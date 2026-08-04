/* ============================================================
   AVNEEL & RACHIT — WEDDING INVITATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  /* ---------- Custom cursor ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  (function animateRing(){
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    if (cursorRing) cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .masonry-item, input, textarea')) {
      cursorRing.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .masonry-item, input, textarea')) {
      cursorRing.classList.remove('hovering');
    }
  });

  /* ---------- Loader: floating gold particles ---------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];

  function sizeCanvas(){
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);

  function makeParticles(n){
    particles = Array.from({length: n}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.4 + 0.1,
      drift: Math.random() * 0.3 - 0.15,
      alpha: Math.random() * 0.5 + 0.2
    }));
  }
  if (canvas) makeParticles(60);

  let particleAnim;
  function drawParticles(){
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,166,107,${p.alpha})`;
      ctx.fill();
    });
    particleAnim = requestAnimationFrame(drawParticles);
  }
  if (canvas) drawParticles();

  /* ---------- Loader → Envelope screen ---------- */
  const loader = document.getElementById('loader');
  const envelopeScreen = document.getElementById('envelope-screen');
  setTimeout(() => {
    loader.classList.add('hide');
    envelopeScreen.classList.add('show');
    setTimeout(() => cancelAnimationFrame(particleAnim), 1200);
  }, 4200);

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  function initLenis(){
    if (window.Lenis) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      function raf(time){
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      if (window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      }
    }
  }

  /* ---------- Envelope interaction ---------- */
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('wax-seal');
  const site = document.getElementById('site');
  const muteBtn = document.getElementById('mute-btn');
  const bgMusic = document.getElementById('bg-music');
  let opened = false;

  function openInvitation(){
    if (opened) return;
    opened = true;
    envelope.classList.add('cracking');
    attemptPlayMusic();
    muteBtn.classList.add('visible');
    setTimeout(() => {
      envelope.classList.add('opened');
    }, 380);
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      site.classList.add('reveal');
      document.body.style.cursor = '';
      initLenis();
      initScrollAnimations();
    }, 1500);
  }
  waxSeal.addEventListener('click', openInvitation);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvitation(); }
  });

  /* ---------- Music ---------- */
  function attemptPlayMusic(){
    bgMusic.volume = 0.35;
    const p = bgMusic.play();
    if (p) p.catch(() => { muteBtn.classList.add('muted'); });
  }
  muteBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(()=>{});
      muteBtn.classList.remove('muted');
    } else {
      bgMusic.pause();
      muteBtn.classList.add('muted');
    }
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }));

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 80);
  });

  /* ---------- GSAP scroll animations ---------- */
  function initScrollAnimations(){
    if (!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal-up').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // hero entrance
    gsap.timeline({ delay: 0.2 })
      .fromTo('.hero-content .eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .8 })
      .fromTo('.name-a', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .9, ease: 'power3.out' }, '-=.4')
      .fromTo('.amp', { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .7 }, '-=.6')
      .fromTo('.name-r', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .9, ease: 'power3.out' }, '-=.7')
      .fromTo('.hero-meta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .8 }, '-=.3');

    // timeline items
    gsap.utils.toArray('.timeline-item').forEach((item) => {
      const media = item.querySelector('.timeline-media');
      const text = item.querySelector('.timeline-text');
      const fromX = item.dataset.side === 'left' ? -40 : 40;
      gsap.fromTo(media, { opacity: 0, x: fromX, scale: .95 }, {
        opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 80%' }
      });
      gsap.fromTo(text, { opacity: 0, x: -fromX }, {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: .15,
        scrollTrigger: { trigger: item, start: 'top 80%' }
      });
    });

    // timeline progress line
    const fill = document.getElementById('timeline-fill');
    if (fill) {
      gsap.to(fill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#timeline',
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: true
        }
      });
    }

    // masonry
    gsap.utils.toArray('.masonry-item').forEach((f, i) => {
      gsap.fromTo(f, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: .8, ease: 'power2.out', delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: f, start: 'top 92%' }
      });
    });

    // day cards stagger
    gsap.fromTo('.day-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: .8, stagger: .15, ease: 'power2.out',
      scrollTrigger: { trigger: '.weekend-days', start: 'top 85%' }
    });
    gsap.utils.toArray('.day-schedule li').forEach((li, i) => {
      gsap.fromTo(li, { opacity: 0, x: -14 }, {
        opacity: 1, x: 0, duration: .6, ease: 'power2.out', delay: (i % 4) * 0.06,
        scrollTrigger: { trigger: li, start: 'top 92%' }
      });
    });

    // section head reveal
    gsap.utils.toArray('.section-head h2').forEach(h => {
      gsap.fromTo(h, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: h, start: 'top 88%' }
      });
    });
  }

  /* ---------- Scroll cue click ---------- */
  document.getElementById('scroll-cue').addEventListener('click', () => {
    const target = document.getElementById('story');
    if (lenis) lenis.scrollTo(target); else target.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Lightbox (masonry gallery) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('.masonry-item').forEach(el => {
    el.addEventListener('click', () => {
      const img = el.querySelector('img');
      openLightbox(el.dataset.full || img.src, img.alt);
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Countdown ---------- */
  const weddingDate = new Date('2026-12-03T11:00:00');
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  function pad(n){ return String(n).padStart(2, '0'); }
  function updateCountdown(){
    const now = new Date();
    let diff = weddingDate - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    cdDays.textContent = pad(days);
    cdHours.textContent = pad(hours);
    cdMins.textContent = pad(mins);
    cdSecs.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Add to calendar ---------- */
  document.getElementById('add-calendar-btn').addEventListener('click', () => {
    const start = '20261203T110000';
    const end = '20261205T010000';
    const details = encodeURIComponent("Avneel & Rachit's Wedding Celebrations");
    const location = encodeURIComponent('Glory by Shrida');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${details}&dates=${start}/${end}&location=${location}&details=${encodeURIComponent('Join us as we begin forever.')}`;
    window.open(url, '_blank');
  });

  /* ---------- Button ripple ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- RSVP form ---------- */
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = rsvpForm.querySelector('.rsvp-submit');
    submitBtn.style.opacity = '0.6';
    submitBtn.disabled = true;
    try {
      const formData = new FormData(rsvpForm);
      const action = rsvpForm.getAttribute('action');
      if (action && !action.includes('your-form-id')) {
        await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
      }
    } catch (err) {
      /* proceed to success state regardless — guest experience first */
    }
    rsvpForm.style.display = 'none';
    rsvpSuccess.classList.add('show');
    rsvpSuccess.setAttribute('aria-hidden', 'false');
    fireConfetti();
  });

  /* ---------- Confetti after RSVP ---------- */
  function fireConfetti(){
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const cctx = canvas.getContext('2d');
    const colors = ['#C9A66B', '#5A1E2D', '#F8F2EA', '#E3C793'];
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: Math.random() * 8 + 4,
      h: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 8 - 4,
      drift: Math.random() * 2 - 1
    }));
    let frame = 0;
    function draw(){
      frame++;
      cctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed;
        p.x += p.drift;
        p.rot += p.rotSpeed;
        cctx.save();
        cctx.translate(p.x, p.y);
        cctx.rotate(p.rot * Math.PI / 180);
        cctx.fillStyle = p.color;
        cctx.fillRect(-p.w / 2, -p.h / 2, w(p), h(p));
        function w(p){ return p.w; }
        function h(p){ return p.h; }
        cctx.restore();
      });
      if (frame < 220) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }
    draw();
  }

  /* ---------- Petal animation (ambient, occasional) ---------- */
  function spawnPetal(){
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerHTML = `<svg width="16"
