/* Κουίζ – η λογική του παιχνιδιού. Οι ερωτήσεις βρίσκονται στο quiz/questions.js */
(function () {
  'use strict';

  var root = document.getElementById('quiz');
  if (!root || typeof QUIZ === 'undefined') return;

  var SEAT = { N: 'Βορράς', E: 'Ανατολή', S: 'Νότος', W: 'Δύση' };
  var NEXT = { N: 'E', E: 'S', S: 'W', W: 'N' };
  var SUIT = { '♠': 'Μπαστούνι', '♥': 'Κούπα', '♦': 'Καρό', '♣': 'Σπαθί' };
  var RANK = { A: 'Άσσος', K: 'Ρήγας', Q: 'Ντάμα', J: 'Βαλές' };
  var LETTERS = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ'];

  var state;

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'class') e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function prepare(q) {
    var order = q.options.map(function (_, i) { return i; });
    if (q.shuffle !== false) shuffle(order);
    return { q: q, order: order };
  }

  function start() {
    state = { i: 0, score: 0, wrong: [], items: QUIZ.questions.map(prepare) };
    showQuestion();
  }

  function card(code) {
    var suit = code.charAt(0), rank = code.slice(1);
    var red = suit === '♥' || suit === '♦';
    var name = (RANK[rank] || rank) + ' ' + (SUIT[suit] || '');
    return el('span', { class: 'pcard' + (red ? ' red' : ''), 'aria-label': name, title: name, text: suit + rank });
  }

  function trickTable(q) {
    var seats = ['N', 'W', 'E', 'S'];
    var wrap = el('div', { class: 'trick', role: 'group', 'aria-label': 'Τα φύλλα που παίχτηκαν στο λεβέ' });
    var order = [], s = q.trick.lead;
    for (var k = 0; k < 4; k++) { order.push(s); s = NEXT[s]; }
    seats.forEach(function (p) {
      var n = order.indexOf(p) + 1;
      wrap.appendChild(el('div', { class: 'seat seat-' + p }, [
        el('span', { class: 'seat-name', text: SEAT[p] }),
        card(q.trick.cards[p]),
        el('span', { class: 'seat-order', text: n === 1 ? 'άνοιξε' : n + 'ος' })
      ]));
    });
    wrap.appendChild(el('div', { class: 'trick-center', 'aria-hidden': 'true', text: 'λεβέ' }));
    return wrap;
  }

  function trumpLabel(t) {
    if (t === 'NT') return 'Χωρίς ατού';
    return 'Ατού: ' + t + ' ' + (SUIT[t] || '');
  }

  function progress() {
    var n = state.items.length;
    return el('div', { class: 'quiz-progress' }, [
      el('div', { class: 'quiz-count', text: 'Ερώτηση ' + (state.i + 1) + ' από ' + n + '  ·  Σωστές: ' + state.score }),
      el('div', { class: 'bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(n), 'aria-valuenow': String(state.i) },
        [el('span', { style: 'width:' + (100 * state.i / n) + '%' })])
    ]);
  }

  function showQuestion() {
    var item = state.items[state.i];
    var q = item.q;
    var card_ = el('div', { class: 'quiz-card' });
    card_.appendChild(progress());
    card_.appendChild(el('h2', { class: 'quiz-q', id: 'quiz-q', text: q.q }));
    if (q.trump) card_.appendChild(el('p', { class: 'trump', text: trumpLabel(q.trump) }));
    if (q.trick) card_.appendChild(trickTable(q));

    var list = el('div', { class: 'quiz-options', role: 'group', 'aria-labelledby': 'quiz-q' });
    var feedback = el('div', { class: 'quiz-feedback', role: 'status', 'aria-live': 'polite' });
    var buttons = [];
    item.order.forEach(function (orig, pos) {
      var b = el('button', { type: 'button', class: 'opt' }, [
        el('span', { class: 'opt-letter', 'aria-hidden': 'true', text: LETTERS[pos] }),
        el('span', { class: 'opt-text', text: q.options[orig] }),
        el('span', { class: 'opt-mark', 'aria-hidden': 'true' })
      ]);
      b.addEventListener('click', function () { answer(orig, b, buttons, feedback, item); });
      buttons.push({ btn: b, orig: orig });
      list.appendChild(b);
    });
    card_.appendChild(list);
    card_.appendChild(feedback);
    root.innerHTML = '';
    root.appendChild(card_);
  }

  function answer(orig, btn, buttons, feedback, item) {
    var q = item.q;
    var ok = orig === q.correct;
    buttons.forEach(function (x) {
      x.btn.disabled = true;
      if (x.orig === q.correct) {
        x.btn.classList.add('correct');
        x.btn.querySelector('.opt-mark').textContent = '✓';
      }
    });
    if (!ok) {
      btn.classList.add('wrong');
      btn.querySelector('.opt-mark').textContent = '✗';
      state.wrong.push(item);
    } else {
      state.score++;
    }
    feedback.className = 'quiz-feedback ' + (ok ? 'ok' : 'bad');
    feedback.appendChild(el('p', { class: 'verdict', text: ok ? 'Σωστά!' : 'Λάθος. Η σωστή απάντηση είναι: ' + q.options[q.correct] }));
    feedback.appendChild(el('p', { text: q.explain }));
    var last = state.i === state.items.length - 1;
    var next = el('button', { type: 'button', class: 'btn', text: last ? 'Δείτε το αποτέλεσμα' : 'Επόμενη ερώτηση' });
    next.addEventListener('click', function () {
      state.i++;
      if (state.i < state.items.length) showQuestion(); else showResult();
      root.scrollIntoView({ block: 'start' });
      var h = root.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    });
    feedback.appendChild(next);
    next.focus({ preventScroll: true });
    next.scrollIntoView({ block: 'nearest' });
  }

  function showResult() {
    var n = state.items.length, pct = state.score / n;
    var msg = pct === 1 ? 'Άριστα! Όλες οι απαντήσεις σωστές. Είστε έτοιμοι για το επόμενο βήμα!'
      : pct >= 0.8 ? 'Πολύ καλά! Έχετε κατανοήσει τα βασικά του παιχνιδιού.'
      : pct >= 0.5 ? 'Καλή προσπάθεια! Ρίξτε μια ματιά στις επεξηγήσεις παρακάτω και δοκιμάστε ξανά.'
      : 'Μην απογοητεύεστε, τα βασικά θέλουν λίγη εξάσκηση. Διαβάστε τις επεξηγήσεις και δοκιμάστε ξανά.';
    var card_ = el('div', { class: 'quiz-card quiz-result' }, [
      el('h2', { text: 'Αποτέλεσμα' }),
      el('p', { class: 'score', text: state.score + ' / ' + n }),
      el('p', { text: msg })
    ]);
    if (state.wrong.length) {
      var review = el('div', { class: 'review' }, [el('h3', { text: 'Ερωτήσεις που χρειάζονται επανάληψη' })]);
      state.wrong.forEach(function (it) {
        review.appendChild(el('div', { class: 'review-item' }, [
          el('p', { class: 'review-q', text: it.q.q + (it.q.trump ? ' (' + trumpLabel(it.q.trump) + ')' : '') }),
          it.q.trick ? trickTable(it.q) : null,
          el('p', { class: 'review-a', text: 'Σωστή απάντηση: ' + it.q.options[it.q.correct] }),
          el('p', { class: 'review-e', text: it.q.explain })
        ]));
      });
      card_.appendChild(review);
    }
    var again = el('button', { type: 'button', class: 'btn', text: 'Παίξτε ξανά' });
    again.addEventListener('click', function () { start(); root.scrollIntoView({ block: 'start' }); });
    var lessons = el('a', { class: 'btn btn--outline', href: '../lessons/', text: 'Θέλω να μάθω Bridge' });
    card_.appendChild(el('div', { class: 'btn-row center' }, [again, lessons]));
    root.innerHTML = '';
    root.appendChild(card_);
  }

  start();
})();
