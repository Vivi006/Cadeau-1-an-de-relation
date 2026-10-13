/* Ciel étoilé en arrière-plan */
(() => {
  const c = document.getElementById('sky'), x = c.getContext('2d');
  const fx = document.getElementById('effects'), f = fx.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, stars = [], shoot = null, hearts = [], lastTrail = 0;
  function resize() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    fx.width = w; fx.height = h;
    stars = Array.from({ length: Math.round(w * h / 8000) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.3 + .2, p: Math.random() * 6.28, v: Math.random() * .002 + .0008
    }));
  }
  function draw(t) {
    x.clearRect(0, 0, w, h);
    x.fillStyle = '#ffe4e8';
    for (const s of stars) {
      x.globalAlpha = .3 + .7 * Math.abs(Math.sin(s.p + t * s.v));
      x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.28); x.fill();
      if (!still) { s.y -= .02; if (s.y < -2) s.y = h + 2; }
    }
    if (!still) {
      if (!shoot && Math.random() < .004) shoot = { x: Math.random() * w * .8, y: Math.random() * h * .4, l: 0 };
      if (shoot) {   // étoile filante
        x.globalAlpha = 1 - shoot.l / 60; x.strokeStyle = '#ffd0a6'; x.lineWidth = 1.5;
        x.beginPath(); x.moveTo(shoot.x, shoot.y); x.lineTo(shoot.x - 60, shoot.y - 30); x.stroke();
        shoot.x += 9; shoot.y += 4.5; if (++shoot.l > 60) shoot = null;
      }
      f.clearRect(0, 0, w, h);
      hearts = hearts.filter(p => p.life > 0);
      hearts.forEach(p => {
        f.globalAlpha = Math.min(1, p.life / 35);
        f.fillStyle = p.color;
        f.font = `${p.size}px serif`;
        f.fillText(p.glyph, p.x, p.y);
        p.x += p.vx; p.y += p.vy; p.life--;
      });
      requestAnimationFrame(draw);
    }
  }
  function sprinkle(px, py, count) {
    for (let i = 0; i < count && hearts.length < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = .3 + Math.random() * 1.6;
      hearts.push({
        x: px, y: py, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - .35,
        life: 35 + Math.random() * 35, size: 12 + Math.random() * 15,
        glyph: Math.random() > .35 ? '♥' : '✦',
        color: Math.random() > .5 ? '#ffd0a6' : '#ed91a8'
      });
    }
  }
  if (!still) {
    addEventListener('pointermove', e => {
      const now = performance.now();
      if (now - lastTrail > 75) {
        lastTrail = now;
        sprinkle(e.clientX, e.clientY, 1);
      }
    }, { passive: true });
    addEventListener('pointerdown', e => sprinkle(e.clientX, e.clientY, 10), { passive: true });
  }
  addEventListener('resize', () => { resize(); if (still) draw(0); });
  resize(); requestAnimationFrame(draw);
})();
