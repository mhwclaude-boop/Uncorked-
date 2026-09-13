/* =========================================================================
   Uncorked — app shell
   Routing, the world map, the list view, region pages and local progress.
   ========================================================================= */

(function () {
  'use strict';

  var h = UC.h, s = UC.s, clear = UC.clear;
  var REGIONS = window.REGIONS;
  var CONTINENTS = window.CONTINENTS;

  /* =======================================================================
     Progress — localStorage, with a memory fallback if storage is blocked
     ======================================================================= */

  var KEY = 'uncorked.progress.v1';
  var Progress = (function () {
    var mem = { visited: {}, notes: {}, quiz: {} };
    var ok = true;
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        mem.visited = parsed.visited || {};
        mem.notes = parsed.notes || {};
        mem.quiz = parsed.quiz || {};
      }
    } catch (e) { ok = false; }

    function save() {
      if (!ok) return;
      try { window.localStorage.setItem(KEY, JSON.stringify(mem)); }
      catch (e) { ok = false; }
    }
    return {
      storageWorks: function () { return ok; },
      isVisited: function (id) { return !!mem.visited[id]; },
      toggleVisited: function (id) { mem.visited[id] ? delete mem.visited[id] : mem.visited[id] = Date.now(); save(); return !!mem.visited[id]; },
      countVisited: function () { return Object.keys(mem.visited).length; },
      getNote: function (id) { return mem.notes[id] || ''; },
      setNote: function (id, txt) { txt ? mem.notes[id] = txt : delete mem.notes[id]; save(); },
      hasNote: function (id) { return !!mem.notes[id]; },
      setQuiz: function (id, score, total) { mem.quiz[id] = { score: score, total: total, at: Date.now() }; save(); },
      getQuiz: function (id) { return mem.quiz[id] || null; }
    };
  })();

  /* =======================================================================
     Small helpers
     ======================================================================= */

  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
      setTimeout(function () { toastEl.hidden = true; }, 250);
    }, 2200);
  }

  function continentName(id) {
    for (var i = 0; i < CONTINENTS.length; i++) if (CONTINENTS[i].id === id) return CONTINENTS[i].name;
    return id;
  }
  function projX(lng) { return (lng + 180) / 360 * 1000; }
  function projY(lat) { return (90 - lat) / 180 * 500; }

  function updateProgressPill() {
    document.getElementById('progress-count').textContent = Progress.countVisited();
    document.getElementById('progress-total').textContent = REGIONS.length;
  }

  function backLink(label) {
    return h('a', { class: 'backlink', href: '#/map' }, [
      s('svg', { viewBox: '0 0 14 14', fill: 'none' }, [
        s('path', { d: 'M8.5 2.5 4 7l4.5 4.5', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
      ]),
      label || 'All regions'
    ]);
  }

  /* Notes box — shared by live and coming-soon pages */
  function notesBox(region) {
    var saved = h('span', { text: Progress.getNote(region.id) ? 'Saved' : '' });
    var ta = h('textarea', {
      placeholder: 'Tried a bottle? Write what it tasted like, who you drank it with, what you paid.',
      'aria-label': 'Your notes on ' + region.name
    });
    ta.value = Progress.getNote(region.id);
    var t;
    ta.addEventListener('input', function () {
      clearTimeout(t);
      saved.textContent = 'Saving…';
      t = setTimeout(function () {
        Progress.setNote(region.id, ta.value.trim());
        saved.textContent = ta.value.trim() ? 'Saved on this device' : '';
      }, 500);
    });
    return h('div', { class: 'notes-box' }, [
      h('h3', { text: 'Your notes' }),
      ta,
      h('div', { class: 'notes-foot' }, [
        saved,
        h('button', {
          class: 'btn btn-ghost', type: 'button', text: 'Clear',
          onclick: function () { ta.value = ''; Progress.setNote(region.id, ''); saved.textContent = ''; }
        })
      ])
    ]);
  }

  var readMarks = [];
  function readMarkButton(region) {
    var label = h('span', { text: Progress.isVisited(region.id) ? 'Marked as read' : 'Mark as read' });
    var btn = h('button', {
      class: 'readmark', type: 'button',
      'aria-pressed': Progress.isVisited(region.id) ? 'true' : 'false',
      onclick: function () {
        var now = Progress.toggleVisited(region.id);
        updateProgressPill();
        readMarks.forEach(function (m) { m.sync(); });
        toast(now ? region.name + ' marked as read' : 'Unmarked ' + region.name);
      }
    }, [h('span', { class: 'box' }, [UC.iconCheck()]), label]);

    var mark = {
      sync: function () {
        var on = Progress.isVisited(region.id);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        label.textContent = on ? 'Marked as read' : 'Mark as read';
      }
    };
    readMarks.push(mark);
    return btn;
  }

  /* =======================================================================
     MAP VIEW
     ======================================================================= */

  var mapState = { k: 1, tx: 0, ty: 0, openCountry: null, built: false };
  var svgMap = document.getElementById('worldmap');
  var panG = document.getElementById('map-pan');
  var pinsG = document.getElementById('map-pins');
  var countriesG = document.getElementById('map-countries');
  var mapPanel = document.getElementById('map-panel');
  var pinIndex = {};

  function buildMap() {
    if (mapState.built) return;
    mapState.built = true;

    var byCountry = window.RegionStore.byCountry();
    var wineCountries = {};
    Object.keys(byCountry).forEach(function (c) {
      wineCountries[c] = byCountry[c].some(function (r) { return r.status === 'live'; }) ? 'live' : 'wine';
    });

    (window.WORLD_PATHS || []).forEach(function (p) {
      var cls = 'country';
      if (wineCountries[p[0]] === 'live') cls += ' has-live';
      else if (wineCountries[p[0]]) cls += ' has-wine';
      countriesG.appendChild(s('path', { class: cls, d: p[1] }));
    });

    Object.keys(byCountry).sort().forEach(function (country) {
      var list = byCountry[country];
      var x = 0, y = 0;
      list.forEach(function (r) { x += projX(r.lng); y += projY(r.lat); });
      x /= list.length; y /= list.length;
      var hasLive = list.some(function (r) { return r.status === 'live'; });

      var g = s('g', {
        class: 'pin' + (hasLive ? ' is-live' : ''),
        transform: 'translate(' + x + ',' + y + ')',
        tabindex: '0', role: 'button',
        'aria-label': country + ', ' + list.length + ' region' + (list.length > 1 ? 's' : '')
      });
      var inner = s('g', {});
      inner.appendChild(s('circle', { class: 'pin-dot', r: 7.5 }));
      inner.appendChild(s('text', { class: 'pin-count', y: 2.6, text: String(list.length) }));
      inner.appendChild(s('text', { class: 'pin-label', y: 17, text: country === 'United States of America' ? 'USA' : country }));
      g.appendChild(inner);
      g._inner = inner;
      g._x = x; g._y = y;

      function open(zoom) {
        if (svgMap._dragged) return;
        openCountry(country);
        if (zoom !== false) focusOn(x, y, Math.max(mapState.k, list.length > 4 ? 3.2 : 2.4));
      }
      g.addEventListener('click', function () { open(); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
      pinsG.appendChild(g);
      pinIndex[country] = g;
    });

    applyTransform();
    wireMapGestures();
  }

  /* One viewBox unit is worth fewer screen pixels on a phone, so pins are
     counter-scaled by both the zoom level and the rendered size. Without this
     a marker is about three pixels wide on a 390px screen — untappable. */
  function viewCentre() {
    var vb = svgMap.viewBox.baseVal;
    return { x: vb.x + vb.width / 2, y: vb.y + vb.height / 2 };
  }

  function unitsPerPixel() {
    var w = svgMap.getBoundingClientRect().width;
    if (!w) return 1;
    return svgMap.viewBox.baseVal.width / w;
  }

  function applyTransform() {
    panG.setAttribute('transform', 'translate(' + mapState.tx + ',' + mapState.ty + ') scale(' + mapState.k + ')');
    var pinScale = Math.max(0.5, unitsPerPixel()) / mapState.k;
    Object.keys(pinIndex).forEach(function (c) {
      var g = pinIndex[c];
      g._inner.setAttribute('transform', 'scale(' + pinScale.toFixed(3) + ')');
      var lbl = g._inner.querySelector('.pin-label');
      if (lbl) lbl.style.opacity = mapState.k >= 1.7 ? '1' : '0';
    });
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    if (!mapState.built) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyTransform, 120);
  });

  /* Centre the view on a country at a readable zoom. */
  function focusOn(x, y, k) {
    var c = viewCentre();
    mapState.k = Math.max(1, Math.min(7, k));
    mapState.tx = c.x - x * mapState.k;
    mapState.ty = c.y - y * mapState.k;
    clampPan();
    applyTransform();
  }

  function clampPan() {
    var k = mapState.k;
    var minTx = 1000 - 1000 * k, minTy = 500 - 500 * k;
    mapState.tx = Math.min(0, Math.max(minTx, mapState.tx));
    mapState.ty = Math.min(0, Math.max(minTy, mapState.ty));
    if (k <= 1) { mapState.tx = 0; mapState.ty = 0; }
  }

  function zoomAt(cx, cy, factor) {
    var k0 = mapState.k;
    var k1 = Math.max(1, Math.min(7, k0 * factor));
    if (k1 === k0) return;
    mapState.tx = cx - (cx - mapState.tx) * (k1 / k0);
    mapState.ty = cy - (cy - mapState.ty) * (k1 / k0);
    mapState.k = k1;
    clampPan();
    applyTransform();
  }

  function svgPoint(clientX, clientY) {
    var r = svgMap.getBoundingClientRect();
    var vb = svgMap.viewBox.baseVal;
    var scale = Math.min(r.width / vb.width, r.height / vb.height);
    var offX = (r.width - vb.width * scale) / 2;
    var offY = (r.height - vb.height * scale) / 2;
    return {
      x: (clientX - r.left - offX) / scale + vb.x,
      y: (clientY - r.top - offY) / scale + vb.y
    };
  }

  function wireMapGestures() {
    var pointers = {}, last = null, pinchDist = 0, moved = 0;

    svgMap.addEventListener('pointerdown', function (e) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (Object.keys(pointers).length === 1) {
        last = { x: e.clientX, y: e.clientY };
        moved = 0;
        svgMap._dragged = false;
        svgMap.classList.add('dragging');
        try { svgMap.setPointerCapture(e.pointerId); } catch (err) {}
      } else if (Object.keys(pointers).length === 2) {
        var ks = Object.keys(pointers);
        pinchDist = dist(pointers[ks[0]], pointers[ks[1]]);
      }
    });

    svgMap.addEventListener('pointermove', function (e) {
      if (!pointers[e.pointerId]) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ks = Object.keys(pointers);

      if (ks.length === 2) {
        var d = dist(pointers[ks[0]], pointers[ks[1]]);
        if (pinchDist) {
          var mid = { x: (pointers[ks[0]].x + pointers[ks[1]].x) / 2, y: (pointers[ks[0]].y + pointers[ks[1]].y) / 2 };
          var p = svgPoint(mid.x, mid.y);
          zoomAt(p.x, p.y, d / pinchDist);
        }
        pinchDist = d;
        return;
      }
      if (ks.length === 1 && last) {
        var r = svgMap.getBoundingClientRect();
        var vb = svgMap.viewBox.baseVal;
        var scale = Math.min(r.width / vb.width, r.height / vb.height);
        var dx = (e.clientX - last.x) / scale;
        var dy = (e.clientY - last.y) / scale;
        moved += Math.abs(dx * scale) + Math.abs(dy * scale);
        if (moved > 8) svgMap._dragged = true;
        mapState.tx += dx; mapState.ty += dy;
        clampPan(); applyTransform();
        last = { x: e.clientX, y: e.clientY };
      }
    });

    function end(e) {
      delete pointers[e.pointerId];
      if (!Object.keys(pointers).length) { last = null; pinchDist = 0; svgMap.classList.remove('dragging'); }
    }
    svgMap.addEventListener('pointerup', end);
    svgMap.addEventListener('pointercancel', end);
    svgMap.addEventListener('pointerleave', end);

    svgMap.addEventListener('wheel', function (e) {
      e.preventDefault();
      var p = svgPoint(e.clientX, e.clientY);
      zoomAt(p.x, p.y, e.deltaY < 0 ? 1.16 : 1 / 1.16);
    }, { passive: false });

    document.getElementById('zoom-in').addEventListener('click', function () {
      var c = viewCentre(); zoomAt(c.x, c.y, 1.4);
    });
    document.getElementById('zoom-out').addEventListener('click', function () {
      var c = viewCentre(); zoomAt(c.x, c.y, 1 / 1.4);
    });
    document.getElementById('zoom-reset').addEventListener('click', function () {
      mapState.k = 1; mapState.tx = 0; mapState.ty = 0;
      svgMap._dragged = false;
      applyTransform(); resetPanel();
    });

    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  }

  function resetPanel() {
    mapState.openCountry = null;
    Object.keys(pinIndex).forEach(function (c) { pinIndex[c].classList.remove('is-open'); });
    clear(mapPanel);
    mapPanel.appendChild(h('div', { class: 'map-panel-empty' }, [
      h('h2', { text: REGIONS.length + ' regions on the map' }),
      h('p', { text: 'Tap a gold marker to see which regions sit inside that country. A filled marker means there is something to read today.' }),
      h('a', { class: 'btn btn-gold', href: '#/region/champagne', text: 'Open Champagne' })
    ]));
  }

  function openCountry(country) {
    mapState.openCountry = country;
    Object.keys(pinIndex).forEach(function (c) { pinIndex[c].classList.toggle('is-open', c === country); });
    var list = window.RegionStore.byCountry()[country] || [];
    clear(mapPanel);
    mapPanel.appendChild(h('div', { class: 'panel-country' }, [
      h('h2', { text: country === 'United States of America' ? 'United States' : country }),
      h('span', { text: list.length + ' region' + (list.length > 1 ? 's' : '') })
    ]));
    mapPanel.appendChild(h('ul', { class: 'panel-list' }, list.map(function (r) {
      return h('li', {}, [
        h('a', { href: '#/region/' + r.id, class: r.status === 'live' ? '' : 'soon' }, [
          r.name,
          Progress.isVisited(r.id) ? h('span', { class: 'tick', text: 'Read' })
            : r.status === 'live' ? h('span', { class: 'tick', text: 'Open' })
            : h('span', { class: 'lock', text: 'Soon' })
        ])
      ]);
    })));
    mapPanel.appendChild(h('button', {
      class: 'btn btn-ghost', type: 'button', text: 'Back to the whole world',
      style: { marginTop: '14px' },
      onclick: function () {
        mapState.k = 1; mapState.tx = 0; mapState.ty = 0;
        applyTransform();
        resetPanel();
      }
    }));
  }

  /* =======================================================================
     LIST VIEW
     ======================================================================= */

  var listState = { q: '', continent: 'all', built: false };

  function buildList() {
    if (listState.built) return;
    listState.built = true;
    var box = document.getElementById('continent-filters');
    var all = [{ id: 'all', name: 'Everywhere' }].concat(CONTINENTS);
    all.forEach(function (c) {
      box.appendChild(h('button', {
        class: 'chip', type: 'button', text: c.name,
        'aria-pressed': c.id === 'all' ? 'true' : 'false',
        onclick: function () {
          listState.continent = c.id;
          Array.prototype.forEach.call(box.children, function (b, i) {
            b.setAttribute('aria-pressed', all[i].id === c.id ? 'true' : 'false');
          });
          paintList();
        }
      }));
    });
    var search = document.getElementById('region-search');
    search.placeholder = 'Search ' + REGIONS.length + ' regions…';
    search.addEventListener('input', function () { listState.q = search.value.toLowerCase().trim(); paintList(); });
  }

  function paintList() {
    var grid = document.getElementById('region-grid');
    clear(grid);
    var matched = REGIONS.filter(function (r) {
      if (listState.continent !== 'all' && r.continent !== listState.continent) return false;
      if (!listState.q) return true;
      return (r.name + ' ' + r.country + ' ' + continentName(r.continent)).toLowerCase().indexOf(listState.q) > -1;
    });
    document.getElementById('list-empty').hidden = matched.length > 0;

    CONTINENTS.forEach(function (c) {
      var inC = matched.filter(function (r) { return r.continent === c.id; });
      if (!inC.length) return;
      grid.appendChild(h('h2', {
        class: 'grid-group-title',
        text: inC.length + (inC.length === 1 ? ' region in ' : ' regions in ') + c.name
      }));
      inC.forEach(function (r) { grid.appendChild(regionCard(r)); });
    });
  }

  function regionCard(r) {
    var live = r.status === 'live';
    return h('a', {
      class: 'region-card ' + (live ? 'is-live' : 'is-soon'),
      href: '#/region/' + r.id
    }, [
      Progress.isVisited(r.id) ? h('span', { class: 'rc-check' }, [UC.iconCheck()]) : null,
      h('h3', { class: 'rc-name', text: r.name }),
      h('p', { class: 'rc-place', text: r.country }),
      r.tagline ? h('p', { class: 'rc-tag', text: r.tagline }) : null,
      h('div', { class: 'rc-foot' }, [live ? 'Open now' : 'Coming soon'])
    ]);
  }

  /* =======================================================================
     REGION PAGE
     ======================================================================= */

  var regionView = document.getElementById('view-region');

  function renderComingSoon(region) {
    clear(regionView);
    regionView.appendChild(h('div', { class: 'region-page' }, [
      backLink(),
      h('div', { class: 'soon-page' }, [
        s('svg', { class: 'soon-mark', viewBox: '0 0 64 64', fill: 'none' }, [
          s('path', { d: 'M22 8h20l-2.2 17.5A9.9 9.9 0 0 1 32 34a9.9 9.9 0 0 1-7.8-8.5z', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linejoin': 'round' }),
          s('path', { d: 'M32 34v18M24 52h16', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }),
          s('path', { d: 'M22 8h20', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' })
        ]),
        h('p', { class: 'soon-place', text: region.country + ', ' + continentName(region.continent) }),
        h('h1', { text: region.name }),
        h('div', { class: 'soon-status', text: 'Not written yet' }),
        h('p', { text: 'This region is on the map because it belongs there. The chapter is still being written — Champagne is the one you can read today.' }),
        h('div', { class: 'soon-actions' }, [
          h('a', { class: 'btn btn-gold', href: '#/region/champagne', text: 'Read Champagne instead' }),
          h('a', { class: 'btn', href: '#/list', text: 'Browse all regions' })
        ]),
        notesBox(region)
      ])
    ]));
    document.documentElement.setAttribute('data-continent', region.continent);
  }

  function renderRegionError(region) {
    clear(regionView);
    regionView.appendChild(h('div', { class: 'region-page' }, [
      backLink(),
      h('div', { class: 'soon-page' }, [
        h('h1', { text: region.name }),
        h('p', { text: 'The content file for this region did not load. Reload the page to try again.' }),
        h('div', { class: 'soon-actions' }, [h('a', { class: 'btn btn-gold', href: '#/map', text: 'Back to the map' })])
      ])
    ]));
  }

  function renderLiveRegion(region, content) {
    clear(regionView);
    document.documentElement.setAttribute('data-continent', region.continent);

    var page = h('div', { class: 'region-page' });
    page.appendChild(backLink());

    /* masthead */
    var mast = h('header', { class: 'masthead' }, [
      h('p', { class: 'masthead-place', text: region.country + ', ' + continentName(region.continent) }),
      h('h1', { text: region.name }),
      h('p', { class: 'masthead-lede', text: content.lede }),
      h('div', { class: 'masthead-actions' }, [
        readMarkButton(region),
        h('button', {
          class: 'btn', type: 'button', text: 'Your notes',
          onclick: function () {
            var t = document.getElementById('notes');
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }),
        h('span', { style: { fontSize: '.82rem', color: 'var(--text-faint)' }, text: 'About ' + content.minutes + ' minutes' })
      ])
    ]);
    page.appendChild(mast);

    if (content.facts && content.facts.length) {
      page.appendChild(h('div', { class: 'factstrip' }, content.facts.map(function (f) {
        return h('div', { class: 'fact' }, [
          h('span', { class: 'fact-value', text: f.value }),
          h('span', { class: 'fact-label', text: f.label })
        ]);
      })));
    }

    /* section nav */
    var navItems = content.sections.map(function (sec) { return { id: sec.id, label: sec.navLabel || sec.title }; });
    if (content.quiz) navItems.push({ id: 'quiz', label: 'Quiz' });
    (content.games || []).forEach(function (g, i) { navItems.push({ id: 'game-' + i, label: g.navLabel || 'Game' }); });
    navItems.push({ id: 'notes', label: 'Notes' });

    var nav = h('nav', { class: 'secnav', 'aria-label': 'Sections' }, navItems.map(function (it) {
      return h('a', { href: '#' + it.id, 'data-sec': it.id, text: it.label, onclick: function (e) {
        e.preventDefault();
        var t = document.getElementById(it.id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#/region/' + region.id);
      } });
    }));
    page.appendChild(nav);

    var ctx = {
      regionId: region.id,
      onQuizDone: function (score, total) {
        Progress.setQuiz(region.id, score, total);
        toast('Quiz saved: ' + score + '/' + total);
      }
    };

    /* sections */
    content.sections.forEach(function (sec) {
      var el = h('section', { class: 'section', id: sec.id });
      el.appendChild(h('div', { class: 'section-head' }, [
        h('h2', { text: sec.title }),
        sec.kicker ? h('p', { class: 'section-kicker', text: sec.kicker }) : null
      ]));
      sec.blocks.forEach(function (b) { el.appendChild(UC.renderBlock(b, ctx)); });
      page.appendChild(el);
    });

    /* quiz */
    if (content.quiz) {
      var q = h('section', { class: 'section', id: 'quiz' });
      q.appendChild(h('div', { class: 'section-head' }, [
        h('h2', { text: content.quiz.title || 'Check yourself' }),
        content.quiz.kicker ? h('p', { class: 'section-kicker', text: content.quiz.kicker }) : null
      ]));
      var prev = Progress.getQuiz(region.id);
      if (prev) q.appendChild(h('p', { class: 'section-kicker', style: { color: 'var(--text-faint)', marginBottom: '10px' }, text: 'Last time you scored ' + prev.score + ' of ' + prev.total + '.' }));
      q.appendChild(UC.renderElement({ type: 'quiz', questions: content.quiz.questions, perfect: content.quiz.perfect, good: content.quiz.good, tryAgain: content.quiz.tryAgain }, ctx));
      page.appendChild(q);
    }

    /* games */
    (content.games || []).forEach(function (g, i) {
      var sec = h('section', { class: 'section', id: 'game-' + i });
      sec.appendChild(h('div', { class: 'section-head' }, [
        h('h2', { text: g.title }),
        g.kicker ? h('p', { class: 'section-kicker', text: g.kicker }) : null
      ]));
      sec.appendChild(UC.renderElement(g.element, ctx));
      page.appendChild(sec);
    });

    /* notes */
    var notes = h('section', { class: 'section', id: 'notes' });
    notes.appendChild(h('div', { class: 'section-head' }, [
      h('h2', { text: 'Your tasting log' }),
      h('p', { class: 'section-kicker', text: Progress.storageWorks() ? 'Saved in this browser only — no account, no server.' : 'Storage is blocked in this browser, so notes will not survive a reload.' })
    ]));
    notes.appendChild(notesBox(region));
    notes.appendChild(h('div', { style: { marginTop: '26px' } }, [readMarkButton(region)]));
    page.appendChild(notes);

    regionView.appendChild(page);
    wireScrollSpy(nav, navItems);
  }

  function wireScrollSpy(nav, items) {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    items.forEach(function (it) { links[it.id] = nav.querySelector('[data-sec="' + it.id + '"]'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { if (links[k]) links[k].classList.remove('active'); });
        var a = links[e.target.id];
        if (a) {
          a.classList.add('active');
          if (a.scrollIntoView) a.scrollIntoView({ block: 'nearest', inline: 'center' });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    items.forEach(function (it) {
      var t = document.getElementById(it.id);
      if (t) io.observe(t);
    });
  }

  function openRegion(id) {
    var region = window.RegionStore.byId(id);
    if (!region) return go('#/map');

    if (region.status !== 'live') return renderComingSoon(region);

    clear(regionView);
    regionView.appendChild(h('div', { class: 'region-page' }, [
      h('p', { style: { color: 'var(--text-dim)', padding: '40px 0' }, text: 'Opening ' + region.name + '…' })
    ]));

    window.RegionStore.loadContent(id).then(function (content) {
      if (location.hash.indexOf('/region/' + id) === -1) return;
      renderLiveRegion(region, content);
    }).catch(function () {
      renderRegionError(region);
    });
  }

  /* =======================================================================
     ROUTER
     ======================================================================= */

  var views = {
    map: document.getElementById('view-map'),
    list: document.getElementById('view-list'),
    region: document.getElementById('view-region')
  };

  function show(name) {
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
    document.querySelectorAll('[data-view-link]').forEach(function (a) {
      if (a.getAttribute('data-view-link') === name) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function go(hash) { location.hash = hash; }

  function route() {
    var hash = location.hash.replace(/^#/, '');
    var parts = hash.split('/').filter(Boolean);
    readMarks.length = 0;

    if (parts[0] === 'region' && parts[1]) {
      show('region');
      openRegion(parts[1]);
      window.scrollTo(0, 0);
      return;
    }

    document.documentElement.setAttribute('data-continent', 'europe');

    if (parts[0] === 'list') {
      show('list');
      buildList();
      paintList();
      updateProgressPill();
      return;
    }

    show('map');
    buildMap();
    if (!mapState.openCountry) resetPanel();
    updateProgressPill();
  }

  window.addEventListener('hashchange', route);

  document.getElementById('progress-pill').addEventListener('click', function () {
    var v = Progress.countVisited();
    toast(v === 0 ? 'Nothing marked as read yet — open a region and tick it off.'
      : v + ' of ' + REGIONS.length + ' regions marked as read on this device.');
  });

  /* first paint */
  updateProgressPill();
  if (!location.hash) location.replace('#/map');
  route();
})();
