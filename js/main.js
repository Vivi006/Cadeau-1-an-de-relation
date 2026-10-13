const $ = s => document.querySelector(s);
const C = CONFIG, T = C.musiques, bgm = $('#bgm'), code = String(C.code);
const show = id => {
  document.querySelectorAll('.screen').forEach(e => e.classList.toggle('active', e.id === id));
  scrollTo(0, 0);
};
function showPage(id) {
  document.querySelectorAll('.page').forEach(page => {
    const active = page.id === id;
    page.hidden = !active;
    page.classList.toggle('active', active);
  });
  scrollTo(0, 0);
}
document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});

/* ---------- Textes ---------- */
$('#gate-title').textContent = `Pour ${C.prenomLui}`;
$('#hint').textContent = `Indice : ${C.indice}`;
$('#hero-title').textContent = C.titrePrincipal;

/* ---------- Code secret (clavier numérique) ---------- */
let buf = '';
const dots = $('#dots');
dots.innerHTML = '<i></i>'.repeat(code.length);
[1,2,3,4,5,6,7,8,9,'',0,'⌫'].forEach(k => {
  const b = document.createElement('button');
  b.textContent = k; b.type = 'button';
  if (k === '') b.className = 'ghost-key', b.tabIndex = -1;
  else b.addEventListener('click', () => key(k));
  $('#pad').appendChild(b);
});
function paint() { [...dots.children].forEach((d, i) => d.classList.toggle('on', i < buf.length)); }
function key(k) {
  if (!$('#gate').classList.contains('active')) return;
  $('#err').textContent = '';
  if (k === '⌫') buf = buf.slice(0, -1);
  else if (buf.length < code.length) buf += k;
  paint();
  if (buf === code) startMusic();
  if (buf.length === code.length) setTimeout(check, 250);
}
function check() {
  const box = $('#gate-box');
  if (buf === code) {
    box.classList.add('leave'); unlock();
    setTimeout(() => show('mail'), 700);
  } else {
    box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
    $('#err').textContent = "Ce n'est pas le bon code. Réessaie.";
    buf = ''; paint();
  }
}
addEventListener('keydown', e => {
  if (/^\d$/.test(e.key)) key(e.key);
  else if (e.key === 'Backspace') key('⌫');
});

/* ---------- Lettre ---------- */
$('#l-title').textContent = C.lettre.titre;
$('#l-sign').textContent = C.lettre.signature;
function openLetter() {
  const body = $('#l-body'); body.innerHTML = '';
  C.lettre.paragraphes.forEach((t, i) => {
    const p = document.createElement('p');
    p.textContent = t;
    p.style.animationDelay = `${Math.min(i * 0.12, 0.6)}s`;
    body.appendChild(p);
  });
  $('#l-sign').style.animationDelay = `${Math.min(C.lettre.paragraphes.length * 0.12, 0.6)}s`;
  $('#letter').hidden = false;
}
$('#envelope').addEventListener('click', e => {
  const envelope = e.currentTarget;
  envelope.disabled = true;
  envelope.classList.add('open');
  setTimeout(openLetter, 850);
}, { once: true });
$('#l-close').addEventListener('click', () => {
  $('#letter').hidden = true;
  if (!$('#main').classList.contains('active')) show('main');
});
$('#reread').addEventListener('click', openLetter);

/* ---------- Lecteur de musique (playlist en boucle) ---------- */
let cur = 0;
function load(i, play) {
  cur = (i + T.length) % T.length;
  bgm.src = T[cur].fichier;
  $('#d-title').textContent = T[cur].titre;
  $('#d-artist').textContent = T[cur].artiste;
  $('#track').textContent = `${T[cur].titre} · ${T[cur].artiste}`;
  document.querySelectorAll('.track').forEach((el, n) => el.classList.toggle('active', n === cur));
  if (play) startMusic();
}
function startMusic() {
  if (!bgm.paused) return;
  bgm.play().then(() => {
    $('#audio-status').textContent = '';
  }).catch(error => {
    if (error.name === 'NotAllowedError') {
      $('#audio-status').textContent = 'La lecture automatique est bloquée. Appuie sur « Lancer la musique ».';
    } else {
      $('#audio-status').textContent = 'La musique n’a pas pu démarrer. Vérifie le fichier audio.';
      console.error('Impossible de lancer la musique :', error);
    }
  });
}
const toggle = () => bgm.paused ? startMusic() : bgm.pause();
bgm.volume = .45;                                       // discret
bgm.addEventListener('ended', () => load(cur + 1, true)); // enchaîne, puis reboucle
bgm.addEventListener('error', () => {
  $('#d-artist').textContent = 'Fichier audio introuvable';
  $('#audio-status').textContent = 'Ajoute le fichier audio indiqué dans js/config.js.';
});
bgm.addEventListener('timeupdate', () => $('#d-bar').style.width = (bgm.currentTime / (bgm.duration || 1) * 100) + '%');
['play', 'pause'].forEach(ev => bgm.addEventListener(ev, () => {
  document.body.classList.toggle('playing', !bgm.paused);
  $('#toggle').textContent = bgm.paused ? 'Lancer la musique' : 'Mettre en pause';
}));
$('#toggle').addEventListener('click', toggle);
$('#deck').addEventListener('click', toggle);
$('#d-disc').addEventListener('click', toggle);
$('#d-prev').addEventListener('click', () => load(cur - 1, true));
$('#d-next').addEventListener('click', () => load(cur + 1, true));

T.forEach((t, i) => {
  const el = document.createElement('article');
  el.className = 'track';
  el.innerHTML = '<div class="mini-disc"></div><div class="t-txt"><b></b><span></span></div><div class="eq"><i></i><i></i><i></i></div>';
  el.querySelector('b').textContent = t.titre;
  el.querySelector('span').textContent = t.artiste;
  if (t.spotify) {
    const a = document.createElement('a');
    a.href = t.spotify; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Spotify';
    a.addEventListener('click', e => e.stopPropagation());
    el.appendChild(a);
  }
  el.addEventListener('click', () => i === cur ? toggle() : load(i, true));
  $('#track-list').appendChild(el);
});
load(0, false);
function unlock() {
  startMusic();
  $('#dock').hidden = false;
  document.body.classList.add('has-dock');
}

/* ---------- Compteur en direct ---------- */
const start = new Date(C.dateRencontre);
function tick() {
  let s = Math.max(0, Math.floor((Date.now() - start) / 1000));
  const v = [[Math.floor(s / 86400), 'jours'], [Math.floor(s / 3600) % 24, 'heures'], [Math.floor(s / 60) % 60, 'minutes'], [s % 60, 'secondes']];
  $('#clock').innerHTML = '<p class="small">Ensemble depuis</p>' + v.map(([n, l]) => `<div class="u"><b>${n}</b><span>${l}</span></div>`).join('');
}
tick(); setInterval(tick, 1000);

/* ---------- Frise ---------- */
if (!C.histoire.length) {
  $('#story').hidden = true;
  document.querySelector('.home-card[data-page="story"]').hidden = true;
  document.querySelector('#photos [data-page="story"]').hidden = true;
}
C.histoire.forEach(h => {
  const a = document.createElement('article');
  a.innerHTML = '<time></time><h4></h4><p></p>';
  a.querySelector('time').textContent = h.date;
  a.querySelector('h4').textContent = h.titre;
  a.querySelector('p').textContent = h.texte;
  $('#timeline').appendChild(a);
});

/* ---------- Photos ---------- */
C.photos.forEach(ph => {
  const f = document.createElement('figure');
  f.className = 'polaroid';
  f.tabIndex = 0;
  f.setAttribute('role', 'button');
  f.setAttribute('aria-pressed', 'false');
  f.innerHTML = '<div class="pic"><img loading="lazy" alt=""></div><figcaption></figcaption>';
  const img = f.querySelector('img');
  img.alt = ph.legende; img.src = ph.src;
  img.onerror = () => {
    f.classList.add('missing');
    f.tabIndex = -1;
    f.setAttribute('aria-disabled', 'true');
  };
  f.querySelector('figcaption').textContent = ph.legende;
  const toggleSize = () => {
    if (f.classList.contains('missing')) return;
    const expanded = f.classList.toggle('is-expanded');
    f.setAttribute('aria-pressed', String(expanded));
  };
  f.addEventListener('click', toggleSize);
  f.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSize();
    }
  });
  $('#gallery').appendChild(f);
});
if (!C.photos.length) {
  $('#photos').hidden = true;
  document.querySelector('.home-card[data-page="photos"]').hidden = true;
  document.querySelector('#story [data-page="photos"]').hidden = true;
  document.querySelector('#library [data-page="photos"]').hidden = true;
}

startMusic();
