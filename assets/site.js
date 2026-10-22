/* ==========================================================================
   Όμιλος Μπριτζ Ηρακλείου – site settings + shared header / footer / popup
   --------------------------------------------------------------------------
   The things you will edit most often are in the SITE block right below:
     • popup  → the lesson poster. Set  enabled: false  to switch it off.
     • menu   → the top navigation (add / remove / rename entries).
     • footer → address, opening hours, e-mail, phone numbers.
   Paths are written relative to the site root (e.g. 'lessons/').
   ========================================================================== */

const SITE = {

  /* ----- Popup (lesson poster) ----- */
  popup: {
    enabled: false,                       // true = show, false = hide
    id: 'mathimata-2026',                 // change this when you change the poster, so people who closed the old one see the new one
    image: 'assets/img/mathimata-2026.png', // the poster image (upload a new file and change this path)
    alt: 'Τα μαθήματα μπριτζ ξεκινούν – Λεωφόρος Δημοκρατίας 73',
    link: 'lessons/',                     // where a click on the poster goes ('' = nowhere)
    delayMs: 500,                         // wait this long before it appears
    hideDays: 30                          // after being closed, stay hidden for this many days
  },

  /* ----- Top menu ----- */
  menu: [
    { label: 'Αρχική', href: '' },
    { label: 'Όμιλος', children: [
      { label: 'Το Διοικητικό συμβούλιο του ΟΜΗ', href: 'ds/' }
    ]},
    { label: 'Το παιχνίδι', children: [
      { label: 'Γενικές πληροφορίες', href: 'γενικές-πληροφορίες-για-το-μπριτζ/' },
      { label: 'Γιατί να μάθετε ΜΠΡΙΤΖ', href: 'γιατί-να-μάθετε-μπριτζ/' },
      { label: 'Χρήσιμα', href: 'χρήσιμα/' },
      { label: 'Διαφάνειες μαθημάτων', href: 'lectures/' },
      { label: 'Κουίζ μαθήματος 1', href: 'quiz/mathima-1/' },
      { label: 'Κουίζ μαθήματος 2', href: 'quiz/mathima-2/' },
      { label: 'Κουίζ μαθήματος 5', href: 'quiz/mathima-5/' },
      { label: 'Κουίζ μαθήματος 6', href: 'quiz/mathima-6/' }
    ]},
    { label: 'Βιβλιοθήκη', href: 'library/' },
    { label: 'Πώς να έρθετε', href: 'directions_gr/' },
    { label: 'Μαθήματα', href: 'lessons/' },
    { label: 'English', children: [
      { label: 'Home', href: 'home/' },
      { label: 'Directions', href: 'directions/' }
    ]}
  ],

  /* ----- Footer ----- */
  footer: {
    address: ['Λεωφόρος Δημοκρατίας 73'],
    hours: ['Κυριακή: 19.30-23.00', 'Δευτέρα 19:30-23:00', 'Τετάρτη: 19.30-23.00', 'Πέμπτη 19:30-23:00'],
    emailUser: 'omi', emailDomain: 'hellasbridge.org',   // written in two parts so spam bots can't read it
    facebook: 'http://fb.com/HeraklionBridgeClub',
    instagram: 'https://www.instagram.com/heraklionbridgeclub/',
    social: 'HeraklionBridgeClub',
    phones: [
      { name: 'Κωτσόπουλος Γιάννης', tel: '+30 6936852562' },
      { name: 'Σαράντου Εύα-Μαρίνα', tel: '+30 6944814373' },
      { name: 'Σαράτσης Φίλιππος', tel: '+30 6974412988' }
    ]
  }
};

/* ==========================================================================
   Below this line: the code that draws the shared parts. No need to edit.
   ========================================================================== */
(function () {
  'use strict';

  var script = document.currentScript;
  var ROOT = script ? script.src.replace(/assets\/site\.js(\?.*)?$/, '') : '/';
  var path = decodeURIComponent(location.pathname);
  var rootPath = decodeURIComponent(new URL(ROOT).pathname);
  var here = path.indexOf(rootPath) === 0 ? path.slice(rootPath.length) : path;
  here = here.replace(/index\.html$/, '');

  var ICON = {
    map: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M22 6l-10 7L2 6"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true">' + ICON[name] + '</svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function url(href) { return encodeURI(ROOT + href); }
  function isCurrent(href) { return href === here || (href === '' && here === ''); }

  /* ----- header ----- */
  function buildHeader() {
    var items = SITE.menu.map(function (m) {
      if (m.children) {
        var cur = m.children.some(function (c) { return isCurrent(c.href); });
        var subs = m.children.map(function (c) {
          return '<li' + (isCurrent(c.href) ? ' class="current"' : '') + '><a href="' + esc(url(c.href)) + '">' + esc(c.label) + '</a></li>';
        }).join('');
        return '<li class="has-sub' + (cur ? ' current' : '') + '"><button type="button" class="sub-toggle" aria-expanded="false">' + esc(m.label) + '</button><ul class="sub">' + subs + '</ul></li>';
      }
      return '<li' + (isCurrent(m.href) ? ' class="current"' : '') + '><a href="' + esc(url(m.href)) + '">' + esc(m.label) + '</a></li>';
    }).join('');

    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<div class="wrap">' +
        '<a class="brand" href="' + esc(url('')) + '"><img src="' + esc(url('assets/img/logo.png')) + '" width="66" height="66" alt="Όμιλος Μπριτζ Ηρακλείου"></a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><b class="sr">Μενού</b></button>' +
        '<nav class="site-nav" id="site-nav" aria-label="Κύριο μενού"><ul>' + items + '</ul></nav>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);

    var toggle = header.querySelector('.nav-toggle');
    var nav = header.querySelector('.site-nav');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    header.querySelectorAll('.sub-toggle').forEach(function (b) {
      b.addEventListener('click', function () {
        var li = b.parentNode;
        var open = li.classList.toggle('open');
        b.setAttribute('aria-expanded', open);
      });
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        header.querySelectorAll('.has-sub.open').forEach(function (li) { li.classList.remove('open'); });
      }
    });

    var skip = document.createElement('a');
    skip.className = 'skip';
    skip.href = '#main';
    skip.textContent = 'Μετάβαση στο περιεχόμενο';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  /* ----- footer ----- */
  function buildFooter() {
    var f = SITE.footer;
    var email = f.emailUser + '@' + f.emailDomain;
    var phones = f.phones.map(function (p) {
      return esc(p.name) + '<br><a href="tel:' + esc(p.tel.replace(/\s+/g, '')) + '">' + esc(p.tel) + '</a>';
    }).join('<br><br>');
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="cols">' +
        '<div>' + svg('map', 'ico-big') + f.address.map(esc).join('<br>') + '<br><br>' + f.hours.map(esc).join('<br>') + '</div>' +
        '<div>' + svg('mail', 'ico-big') + '<ul>' +
          '<li>' + svg('mail', 'ico') + '<a href="mailto:' + esc(email) + '">' + esc(email) + '</a></li>' +
          '<li>' + svg('facebook', 'ico') + '<a href="' + esc(f.facebook) + '" rel="noopener">' + esc(f.social) + '</a></li>' +
          '<li>' + svg('instagram', 'ico') + '<a href="' + esc(f.instagram) + '" rel="noopener">' + esc(f.social) + '</a></li>' +
        '</ul></div>' +
        '<div>' + svg('phone', 'ico-big') + phones + '</div>' +
      '</div>' +
      '<div class="copy">© ' + new Date().getFullYear() + ' Όμιλος Μπριτζ Ηρακλείου (ΟΜΗ)</div>';
    document.body.appendChild(footer);
  }

  /* ----- scroll-to-top button ----- */
  function buildToTop() {
    var b = document.createElement('button');
    b.className = 'to-top';
    b.type = 'button';
    b.setAttribute('aria-label', 'Επιστροφή στην κορυφή');
    b.innerHTML = svg('up', '');
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(b);
    function toggle() { b.classList.toggle('show', window.scrollY > 300); }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  /* ----- typing effect (elements with class "typing") ----- */
  function initTyping() {
    var els = document.querySelectorAll('.typing');
    if (!els.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    els.forEach(function (el) {
      var text = el.textContent;
      var speed = el.hasAttribute('data-fast') ? 35 : 70;
      el.setAttribute('aria-label', text);
      el.textContent = '';
      var caret = document.createElement('span');
      caret.className = 'typing-caret';
      caret.setAttribute('aria-hidden', 'true');
      el.appendChild(caret);
      var started = false;
      new IntersectionObserver(function (entries, obs) {
        if (started || !entries[0].isIntersecting) return;
        started = true; obs.disconnect();
        var i = 0;
        (function step() {
          el.insertBefore(document.createTextNode(text.charAt(i++)), caret);
          if (i < text.length) setTimeout(step, speed);
        })();
      }, { threshold: 0.6 }).observe(el);
    });
  }

  /* ----- popup ----- */
  function initPopup() {
    var p = SITE.popup;
    if (!p || !p.enabled) return;
    var key = 'popup-closed-' + p.id;
    try {
      var until = parseInt(localStorage.getItem(key) || '0', 10);
      if (until > Date.now()) return;
    } catch (e) { /* storage blocked – just show it */ }

    var overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', p.alt || 'Ανακοίνωση');
    var img = '<img src="' + esc(url(p.image)) + '" alt="' + esc(p.alt || '') + '">';
    overlay.innerHTML =
      '<div class="popup-box">' +
        '<button class="popup-close" type="button">CLOSE</button>' +
        (p.link ? '<a href="' + esc(url(p.link)) + '">' + img + '</a>' : img) +
      '</div>';
    document.body.appendChild(overlay);

    var previous = null;
    function close() {
      overlay.classList.remove('visible');
      setTimeout(function () { overlay.classList.remove('show'); }, 350);
      document.body.classList.remove('popup-open');
      document.removeEventListener('keydown', onKey);
      try { localStorage.setItem(key, String(Date.now() + p.hideDays * 864e5)); } catch (e) {}
      if (previous && previous.focus) previous.focus();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.popup-close').addEventListener('click', close);

    setTimeout(function () {
      previous = document.activeElement;
      overlay.classList.add('show');
      requestAnimationFrame(function () { overlay.classList.add('visible'); });
      document.body.classList.add('popup-open');
      document.addEventListener('keydown', onKey);
      overlay.querySelector('.popup-close').focus();
    }, p.delayMs || 0);
  }

  function init() {
    buildHeader();
    buildFooter();
    buildToTop();
    initTyping();
    initPopup();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
