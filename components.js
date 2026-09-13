/* =========================================================================
   Uncorked — components
   Generic renderers. Nothing in this file knows about Champagne; everything
   is driven by the data in regions/<id>.js. Add a region by writing data.
   ========================================================================= */

(function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------- tiny DOM helpers ---------- */

  function h(tag, props, kids) {
    var n = document.createElement(tag);
    apply(n, props);
    add(n, kids);
    return n;
  }
  function s(tag, props, kids) {
    var n = document.createElementNS(SVGNS, tag);
    apply(n, props, true);
    add(n, kids);
    return n;
  }
  function apply(n, props, isSvg) {
    if (!props) return;
    for (var k in props) {
      var v = props[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') { isSvg ? n.setAttribute('class', v) : (n.className = v); }
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'style' && typeof v === 'object') { for (var p in v) n.style[p] = v[p]; }
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') n.addEventListener(k.slice(2).toLowerCase(), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
  }
  function add(n, kids) {
    if (kids === null || kids === undefined) return;
    if (!Array.isArray(kids)) kids = [kids];
    kids.forEach(function (k) {
      if (k === null || k === undefined || k === false) return;
      n.appendChild(typeof k === 'string' || typeof k === 'number' ? document.createTextNode(String(k)) : k);
    });
  }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function reduceMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- interactive shell ---------- */

  function ixShell(cfg, body, footNote) {
    return h('div', { class: 'ix' }, [
      h('div', { class: 'ix-head' }, [
        cfg.eyebrow ? h('span', { class: 'ix-eyebrow', text: cfg.eyebrow }) : null,
        cfg.title ? h('h3', { text: cfg.title }) : null,
        cfg.intro ? h('p', { class: 'ix-intro', text: cfg.intro }) : null
      ]),
      body,
      footNote ? h('p', { class: 'ix-foot', text: footNote }) : null
    ]);
  }

  function iconCheck() {
    return s('svg', { viewBox: '0 0 12 12', fill: 'none' }, [
      s('path', { d: 'M2 6.4 4.6 9 10 3.2', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ]);
  }

  /* =======================================================================
     BLOCKS
     ======================================================================= */

  var Blocks = {
    prose: function (b) { return h('div', { class: 'prose block', html: b.html }); },

    stats: function (b) {
      return h('div', { class: 'statgrid block' }, b.items.map(function (it) {
        return h('div', { class: 'sg' }, [
          h('div', { class: 'sg-v', text: it.value }),
          h('div', { class: 'sg-l', text: it.label })
        ]);
      }));
    },

    aside: function (b) {
      return h('div', { class: 'aside block' }, [
        b.title ? h('h4', { text: b.title }) : null,
        h('div', { html: b.html })
      ]);
    },

    pull: function (b) {
      return h('blockquote', { class: 'pull block' }, [
        h('p', { text: b.text }),
        b.cite ? h('cite', { text: b.cite }) : null
      ]);
    },

    deflist: function (b) {
      return h('ul', { class: 'deflist block' }, b.items.map(function (it) {
        return h('li', {}, [
          h('span', { class: 'dt', text: it.term }),
          h('span', { class: 'dd', html: it.def })
        ]);
      }));
    },

    ix: function (b, ctx) { return renderElement(b.element, ctx); }
  };

  /* =======================================================================
     ELEMENT 1 — soil cross-section
     cfg: { layers:[{ name, depth, span, color, text }], caption }
     ======================================================================= */

  function soilSection(cfg, ctx) {
    var W = 330, H = 320, top = 32;
    var total = cfg.layers.reduce(function (a, l) { return a + l.span; }, 0);
    var info = h('div', { class: 'soil-info' });
    var svg = s('svg', { class: 'soil-svg', viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': 'Cross-section of the soil. Select a layer to read about it.' });
    var groups = [];
    var y = top;

    cfg.layers.forEach(function (layer, i) {
      var hgt = (layer.span / total) * (H - top - 4);
      var g = s('g', { class: 'soil-layer', tabindex: '0', role: 'button', 'aria-label': layer.name });
      g.appendChild(s('rect', { x: 0, y: y, width: W, height: hgt, fill: layer.color, opacity: 0.78 }));
      if (layer.speckle) {
        for (var k = 0; k < 26; k++) {
          g.appendChild(s('circle', {
            cx: (k * 71 % (W - 20)) + 10,
            cy: y + ((k * 37) % Math.max(6, hgt - 8)) + 4,
            r: (k % 3) * 0.6 + 0.7,
            fill: '#fff', opacity: 0.18
          }));
        }
      }
      g.appendChild(s('rect', { class: 'soil-sel', x: 1.5, y: y + 1.5, width: W - 3, height: hgt - 3, rx: 4 }));
      g.appendChild(s('text', { x: 14, y: y + 16, 'font-size': '11', fill: layer.ink || '#0C1018', text: layer.name }));
      g.appendChild(s('text', { x: 14, y: y + 29, 'font-size': '9', 'font-weight': '500', fill: layer.ink || '#0C1018', opacity: '.7', text: layer.depth }));
      groups.push(g);
      svg.appendChild(g);
      y += hgt;
    });

    /* vine above ground, roots reaching down through the layers */
    var vx = 262;
    var deco = s('g', { 'aria-hidden': 'true', 'pointer-events': 'none' });
    deco.appendChild(s('path', {
      d: 'M' + vx + ' 9 L' + vx + ' ' + (top + 18) +
         ' M' + vx + ' 18 C' + (vx - 18) + ' 16 ' + (vx - 24) + ' 10 ' + (vx - 22) + ' 6' +
         ' M' + vx + ' 14 C' + (vx + 16) + ' 13 ' + (vx + 23) + ' 8 ' + (vx + 21) + ' 5',
      stroke: '#4C6B4E', 'stroke-width': '2.6', fill: 'none', 'stroke-linecap': 'round'
    }));
    deco.appendChild(s('path', {
      d: 'M' + vx + ' ' + (top + 12) + ' C' + (vx - 4) + ' 110 ' + (vx - 16) + ' 160 ' + (vx - 20) + ' 214' +
         ' M' + vx + ' ' + (top + 12) + ' C' + (vx + 8) + ' 100 ' + (vx + 16) + ' 140 ' + (vx + 22) + ' 176' +
         ' M' + vx + ' 74 C' + (vx - 18) + ' 96 ' + (vx - 30) + ' 108 ' + (vx - 38) + ' 126' +
         ' M' + vx + ' 120 C' + (vx + 14) + ' 142 ' + (vx + 26) + ' 160 ' + (vx + 34) + ' 186',
      stroke: '#C9B79A', 'stroke-width': '1.6', fill: 'none', opacity: '.8', 'stroke-linecap': 'round'
    }));
    svg.appendChild(deco);

    function select(i) {
      groups.forEach(function (g, j) { g.classList.toggle('on', i === j); });
      var l = cfg.layers[i];
      clear(info);
      add(info, [
        h('h4', { text: l.name }),
        h('p', { class: 'soil-depth', text: l.depth }),
        h('p', { html: l.text })
      ]);
    }
    groups.forEach(function (g, i) {
      g.addEventListener('click', function () { select(i); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
      });
    });
    select(0);

    return ixShell(cfg, h('div', { class: 'soil' }, [svg, info]), cfg.caption);
  }

  /* =======================================================================
     ELEMENT 2 — area map (sub-regions)
     cfg: { viewBox, shapes:[{id,name,tag,d,color,text,lx,ly}], marks:[{x,y,label}], caption }
     ======================================================================= */

  function areaMap(cfg, ctx) {
    var info = h('div', { class: 'area-info' });
    var svg = s('svg', { class: 'areamap-svg', viewBox: cfg.viewBox, role: 'group', 'aria-label': 'Map of sub-regions. Select an area to read about it.' });
    var shapes = [];

    if (cfg.rivers) {
      cfg.rivers.forEach(function (r) {
        svg.appendChild(s('path', { d: r, stroke: '#3E5A78', 'stroke-width': '2.4', fill: 'none', opacity: '.75', 'stroke-linecap': 'round' }));
      });
    }

    cfg.shapes.forEach(function (sh, i) {
      var g = s('g', { class: 'area-shape', tabindex: '0', role: 'button', 'aria-label': sh.name });
      g.appendChild(s('path', { d: sh.d, fill: sh.color, 'fill-opacity': '.55', stroke: sh.color, 'stroke-width': '1.5' }));
      shapes.push(g);
      svg.appendChild(g);
    });

    cfg.shapes.forEach(function (sh) {
      if (sh.lx == null) return;
      svg.appendChild(s('text', { class: 'area-label', x: sh.lx, y: sh.ly, 'text-anchor': sh.anchor || 'middle', text: sh.short || sh.name }));
    });

    (cfg.marks || []).forEach(function (m) {
      svg.appendChild(s('circle', { cx: m.x, cy: m.y, r: 3.2, fill: '#ECE8DF' }));
      svg.appendChild(s('text', {
        class: 'area-label', x: m.x + (m.anchor === 'end' ? -7 : 7), y: m.y + 3.5,
        'text-anchor': m.anchor === 'end' ? 'end' : 'start', 'font-size': '9.5', text: m.label
      }));
    });

    function select(i) {
      shapes.forEach(function (g, j) { g.classList.toggle('on', i === j); });
      var a = cfg.shapes[i];
      clear(info);
      add(info, [
        a.tag ? h('span', { class: 'tag', text: a.tag }) : null,
        h('h4', { text: a.name }),
        h('div', { html: a.text })
      ]);
    }
    shapes.forEach(function (g, i) {
      g.addEventListener('click', function () { select(i); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
      });
    });
    select(0);

    return ixShell(cfg, h('div', { class: 'areamap' }, [svg, info]), cfg.caption);
  }

  /* =======================================================================
     ELEMENT 3 — blend builder (drag and drop)
     cfg: { components:[{id,name,sub,color,initial}], step, presets:[{name,mix}],
            noteRules:[{when:{id,min,max},text}], nameRules:[{when,name}], caption }
     ======================================================================= */

  function blendBuilder(cfg, ctx) {
    var parts = {};
    cfg.components.forEach(function (c) { parts[c.id] = c.initial || 0; });

    var wrap = h('div', { class: 'blend' });
    var glassCol = h('div', { class: 'blend-glass-col' });
    var tray = h('div', { class: 'grape-tray' });
    var bar = h('div', { class: 'blend-bar' });
    var note = h('div', { class: 'blend-note' });
    var presets = h('div', { class: 'blend-presets' });

    /* --- glass --- */
    var glass = s('svg', { class: 'glass-svg', viewBox: '0 0 100 150', 'aria-hidden': 'true' });
    var clip = s('clipPath', { id: 'bowlclip-' + Math.random().toString(36).slice(2, 7) });
    var clipId = clip.getAttribute('id');
    var bowlPath = 'M27 14 L73 14 C73 46 66 68 55 76 L55 118 L70 124 L70 128 L30 128 L30 124 L45 118 L45 76 C34 68 27 46 27 14 Z';
    var bowlOnly = 'M27 14 L73 14 C73 46 66 68 55 76 L45 76 C34 68 27 46 27 14 Z';
    clip.appendChild(s('path', { d: bowlOnly }));
    glass.appendChild(clip);
    var liquid = s('rect', { x: 20, y: 76, width: 60, height: 0, fill: '#E9CE87', opacity: '.9', 'clip-path': 'url(#' + clipId + ')' });
    glass.appendChild(liquid);
    var bubbles = s('g', { 'clip-path': 'url(#' + clipId + ')' });
    glass.appendChild(bubbles);
    glass.appendChild(s('path', { d: bowlPath, fill: 'none', stroke: 'rgba(236,232,222,.5)', 'stroke-width': '1.6', 'stroke-linejoin': 'round' }));
    var dropRing = s('path', { class: 'glass-drop', d: bowlOnly, fill: 'none', stroke: '#E9CE87', 'stroke-width': '2', 'stroke-dasharray': '5 4', opacity: '0' });
    glass.appendChild(dropRing);

    if (!reduceMotion()) {
      for (var b = 0; b < 7; b++) {
        var g = s('g', { class: 'bub', style: { animationDelay: (b * 0.42) + 's', animationDuration: (2.4 + (b % 3) * 0.5) + 's' } });
        g.appendChild(s('circle', { cx: 34 + (b * 7) % 33, cy: 74, r: 1 + (b % 3) * 0.5, fill: '#fff', opacity: '.75' }));
        bubbles.appendChild(g);
      }
    }

    /* --- maths --- */
    function total() {
      return cfg.components.reduce(function (a, c) { return a + parts[c.id]; }, 0);
    }
    function pcts() {
      var t = total(), out = {}, sum = 0, rema = [];
      if (!t) { cfg.components.forEach(function (c) { out[c.id] = 0; }); return out; }
      cfg.components.forEach(function (c) {
        var exact = parts[c.id] / t * 100;
        out[c.id] = Math.floor(exact);
        sum += out[c.id];
        rema.push({ id: c.id, r: exact - Math.floor(exact) });
      });
      rema.sort(function (a, b) { return b.r - a.r; });
      var i = 0;
      while (sum < 100 && rema.length) { out[rema[i % rema.length].id]++; sum++; i++; }
      return out;
    }
    /* The grape swatches are identifiers, not wine colours — a straight average
       of them comes out mauve. Blend the result into the base wine colour so
       the glass shifts with the mix while still looking like wine. */
    function mixColor(p) {
      var base = hex(cfg.baseColor || '#E9CE87');
      var w = cfg.mixWeight == null ? 0.35 : cfg.mixWeight;
      var t = 0, r = 0, gg = 0, bb = 0;
      cfg.components.forEach(function (c) {
        var share = p[c.id]; if (!share) return;
        var col = hex(c.color);
        r += col[0] * share; gg += col[1] * share; bb += col[2] * share;
        t += share;
      });
      if (!t) return 'rgb(' + base.join(',') + ')';
      var mixed = [r / t, gg / t, bb / t];
      return 'rgb(' + mixed.map(function (v, i) {
        return Math.round(base[i] * (1 - w) + v * w);
      }).join(',') + ')';
    }
    function hex(c) {
      var s = c.replace('#', '');
      return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
    }
    function matches(when, p) {
      if (when.all) return when.all.every(function (w) { return matches(w, p); });
      var v = when.id === '*total' ? total() : (p[when.id] || 0);
      if (when.min != null && v < when.min) return false;
      if (when.max != null && v > when.max) return false;
      return true;
    }

    /* --- render --- */
    var rows = {};
    cfg.components.forEach(function (c) {
      var pct = h('span', { class: 'grape-pct' });
      var chip = h('span', {
        class: 'grape-chip', style: { background: c.color }, title: 'Drag into the glass',
        'aria-hidden': 'true'
      }, c.name.slice(0, 2));
      var row = h('div', { class: 'grape' }, [
        chip,
        h('div', { class: 'grape-name' }, [c.name, c.sub ? h('small', { text: c.sub }) : null]),
        h('div', { class: 'grape-steps' }, [
          h('button', { type: 'button', 'aria-label': 'Less ' + c.name, onclick: function () { parts[c.id] = Math.max(0, parts[c.id] - (cfg.step || 1)); paint(); } }, '\u2212'),
          h('button', { type: 'button', 'aria-label': 'More ' + c.name, onclick: function () { parts[c.id] += (cfg.step || 1); paint(); } }, '+'),
          pct
        ])
      ]);
      rows[c.id] = { pct: pct, row: row };
      tray.appendChild(row);
      makeDraggable(chip, c);
    });

    /* pointer drag from chip into the glass */
    function makeDraggable(chip, c) {
      chip.addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        var ghost = chip.cloneNode(true);
        ghost.style.position = 'fixed';
        ghost.style.zIndex = '80';
        ghost.style.pointerEvents = 'none';
        ghost.style.width = '34px'; ghost.style.height = '34px';
        ghost.style.opacity = '.92';
        document.body.appendChild(ghost);
        chip.parentElement.classList.add('dragging');
        wrap.classList.add('drag-over');
        dropRing.style.opacity = '1';

        function move(e) {
          ghost.style.left = (e.clientX - 17) + 'px';
          ghost.style.top = (e.clientY - 17) + 'px';
          var r = glass.getBoundingClientRect();
          var over = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
          dropRing.style.opacity = over ? '1' : '.35';
        }
        function up(e) {
          var r = glass.getBoundingClientRect();
          var over = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
          if (over) { parts[c.id] += (cfg.step || 1); paint(); }
          ghost.remove();
          chip.parentElement.classList.remove('dragging');
          wrap.classList.remove('drag-over');
          dropRing.style.opacity = '0';
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          window.removeEventListener('pointercancel', up);
        }
        move(ev);
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
      });
      chip.addEventListener('click', function () { parts[c.id] += (cfg.step || 1); paint(); });
    }

    (cfg.presets || []).forEach(function (pr) {
      presets.appendChild(h('button', {
        class: 'btn btn-ghost', type: 'button', text: pr.name,
        onclick: function () {
          cfg.components.forEach(function (c) { parts[c.id] = pr.mix[c.id] || 0; });
          paint();
        }
      }));
    });
    presets.appendChild(h('button', {
      class: 'btn btn-ghost', type: 'button', text: 'Empty the glass',
      onclick: function () { cfg.components.forEach(function (c) { parts[c.id] = 0; }); paint(); }
    }));

    function paint() {
      var p = pcts(), t = total();
      cfg.components.forEach(function (c) { rows[c.id].pct.textContent = p[c.id] + '%'; });

      clear(bar);
      cfg.components.forEach(function (c) {
        if (!p[c.id]) return;
        bar.appendChild(h('span', { style: { width: p[c.id] + '%', background: c.color } }));
      });

      var fillH = t ? clamp(14 + Math.min(t, 60) / 60 * 46, 14, 60) : 0;
      liquid.setAttribute('y', 76 - fillH);
      liquid.setAttribute('height', fillH);
      liquid.setAttribute('fill', mixColor(p));
      bubbles.style.opacity = t ? '1' : '0';

      clear(note);
      if (!t) {
        add(note, [
          h('div', { class: 'bn-title', text: 'An empty glass' }),
          h('p', { text: cfg.emptyText || 'Drag a grape into the glass, or use the plus buttons.' })
        ]);
        return;
      }
      var name = cfg.defaultName || 'Your blend';
      for (var i = 0; i < (cfg.nameRules || []).length; i++) {
        if (matches(cfg.nameRules[i].when, p)) { name = cfg.nameRules[i].name; break; }
      }
      var lines = (cfg.noteRules || []).filter(function (r) { return matches(r.when, p); }).map(function (r) { return r.text; });
      add(note, [
        h('div', { class: 'bn-title', text: name }),
        h('p', { text: lines.join(' ') || cfg.defaultNote || '' })
      ]);
    }

    add(glassCol, [glass, h('p', { class: 'glass-hint', text: cfg.hint || 'Drag a grape in' })]);
    add(wrap, [glassCol, h('div', {}, [tray, h('div', { style: { marginTop: '12px' } }, [bar]), note, presets])]);
    paint();

    return ixShell(cfg, wrap, cfg.caption);
  }

  /* =======================================================================
     ELEMENT 4 — process simulation
     cfg: { metrics:[{key,label,unit,max,decimals}], steps:[{...}] }
     ======================================================================= */

  function processSim(cfg, ctx) {
    var i = 0;
    var visual = h('div', { class: 'sim-visual' });
    var stageName = h('div', { class: 'sim-stagename' });
    var metrics = h('div', { class: 'sim-metrics' });
    var rail = h('div', { class: 'sim-rail', role: 'tablist' });
    var stepBox = h('div', { class: 'sim-step' });
    var prev = h('button', { class: 'btn btn-ghost', type: 'button', text: 'Back', onclick: function () { go(i - 1); } });
    var next = h('button', { class: 'btn btn-gold', type: 'button', onclick: function () { go(i + 1); } }, 'Next step');
    var count = h('span', { class: 'count' });
    var svgHolder = h('div', { style: { width: '100%', display: 'grid', justifyItems: 'center' } });

    var railBtns = cfg.steps.map(function (st, idx) {
      return h('button', { type: 'button', text: st.short || st.name, onclick: function () { go(idx); } });
    });
    add(rail, railBtns);

    function vessel(v) {
      var svg = s('svg', { class: 'sim-svg', viewBox: '0 0 120 200', 'aria-hidden': 'true' });

      /* A tilted bottle needs more width than the frame has, so shrink it
         by exactly as much as the rotation demands and no more. */
      var ang = v.angle || 0;
      var rad = ang * Math.PI / 180;
      var halfW = 30, halfH = 86;
      var needW = halfW * Math.abs(Math.cos(rad)) + halfH * Math.abs(Math.sin(rad));
      var needH = halfW * Math.abs(Math.sin(rad)) + halfH * Math.abs(Math.cos(rad));
      var k = Math.min(1, 56 / needW, 92 / needH);
      var g = s('g', {
        transform: 'translate(60 110) rotate(' + ang + ') scale(' + k.toFixed(3) + ') translate(-60 -110)'
      });
      var uid = 'vc' + Math.random().toString(36).slice(2, 7);
      var body, shape;

      if (v.kind === 'press') {
        shape = 'M18 96 L102 96 L96 168 L24 168 Z';
        g.appendChild(s('rect', { x: 14, y: 78, width: 92, height: 12, rx: 3, fill: '#4A5568' }));
        g.appendChild(s('path', { d: 'M60 78 L60 56 M40 56 L80 56', stroke: '#4A5568', 'stroke-width': '5', 'stroke-linecap': 'round' }));
      } else if (v.kind === 'vat') {
        shape = 'M26 62 L94 62 L94 172 C94 178 88 182 60 182 C32 182 26 178 26 172 Z';
      } else if (v.kind === 'glass') {
        shape = 'M36 30 L84 30 C84 64 76 86 64 94 L64 150 L80 156 L80 160 L40 160 L40 156 L56 150 L56 94 C44 86 36 64 36 30 Z';
      } else {
        shape = 'M34 186 C34 189 36 190 40 190 L80 190 C84 190 86 189 86 186 L86 92 C86 76 76 66 70 54 L70 22 L50 22 L50 54 C44 66 34 76 34 92 Z';
      }

      var clip = s('clipPath', { id: uid });
      clip.appendChild(s('path', { d: shape }));
      g.appendChild(clip);
      g.appendChild(s('path', { d: shape, fill: '#0A0D14', stroke: 'rgba(236,232,222,.45)', 'stroke-width': '1.8', 'stroke-linejoin': 'round' }));

      var fill = clamp(v.fill == null ? 0.7 : v.fill, 0, 1);
      if (fill > 0) {
        /* a glass fills only its bowl; everything else fills from the base up */
        var base = v.kind === 'glass' ? 94 : 190;
        var range = v.kind === 'glass' ? 60 : 170;
        var topY = base - fill * range;
        g.appendChild(s('rect', {
          x: 20, y: topY, width: 80, height: base - topY,
          fill: v.color || '#D8C98A', opacity: '.88', 'clip-path': 'url(#' + uid + ')'
        }));
      }
      if (v.bubbles && !reduceMotion()) {
        var bg = s('g', { 'clip-path': 'url(#' + uid + ')' });
        var from = v.kind === 'glass' ? 92 : 178;
        for (var b = 0; b < 8; b++) {
          var bb = s('g', { class: 'bub', style: { animationDelay: (b * 0.34) + 's', animationDuration: (2.2 + (b % 3) * 0.4) + 's' } });
          bb.appendChild(s('circle', { cx: 44 + (b * 9) % 34, cy: from, r: 1 + (b % 2) * 0.7, fill: '#fff', opacity: '.7' }));
          bg.appendChild(bb);
        }
        g.appendChild(bg);
      }
      if (v.sediment) {
        var sg = s('g', { 'clip-path': 'url(#' + uid + ')' });
        for (var k = 0; k < 16; k++) {
          var sy = v.sediment === 'neck' ? 26 + (k % 4) * 5 : 168 + (k % 3) * 5;
          sg.appendChild(s('circle', { cx: (v.sediment === 'neck' ? 54 : 40) + (k * 5) % (v.sediment === 'neck' ? 13 : 40), cy: sy, r: 1.3, fill: '#8A7B4F', opacity: '.9' }));
        }
        g.appendChild(sg);
      }
      if (v.cap === 'crown') {
        g.appendChild(s('rect', { x: 47, y: 14, width: 26, height: 10, rx: 3, fill: '#9AA2B1' }));
      } else if (v.cap === 'cork') {
        g.appendChild(s('path', { d: 'M46 6 L74 6 L72 22 L48 22 Z', fill: '#C9A96B' }));
        g.appendChild(s('path', { d: 'M44 20 L76 20 L76 26 L44 26 Z', fill: '#C8A44D' }));
        g.appendChild(s('path', { d: 'M60 6 L60 26 M50 12 L70 12', stroke: '#8A6E28', 'stroke-width': '1.4' }));
      } else if (v.cap === 'ice') {
        g.appendChild(s('rect', { x: 48, y: 22, width: 24, height: 20, rx: 2, fill: '#9BC7D8', opacity: '.85' }));
      }
      svg.appendChild(g);
      return svg;
    }

    function go(n) {
      i = clamp(n, 0, cfg.steps.length - 1);
      var st = cfg.steps[i];

      clear(svgHolder);
      svgHolder.appendChild(vessel(st.vessel || {}));
      stageName.textContent = st.stage || st.name;

      clear(metrics);
      cfg.metrics.forEach(function (m) {
        var raw = st.metrics ? st.metrics[m.key] : null;
        var shown = raw == null ? '—' : (m.decimals ? Number(raw).toFixed(m.decimals) : raw) + (m.unit || '');
        metrics.appendChild(h('div', { class: 'metric' }, [
          h('div', { class: 'metric-l', text: m.label }),
          h('div', { class: 'metric-v', text: shown }),
          h('div', { class: 'metric-bar' }, [
            h('i', { style: { width: (raw == null ? 0 : clamp(raw / m.max * 100, 0, 100)) + '%' } })
          ])
        ]));
      });

      clear(stepBox);
      add(stepBox, [
        h('h4', { text: st.name }),
        st.where ? h('p', { class: 'sim-where', text: st.where }) : null,
        h('p', { html: st.body }),
        st.detail ? h('p', { class: 'sim-detail', html: st.detail }) : null
      ]);

      railBtns.forEach(function (b, idx) {
        b.classList.toggle('on', idx === i);
        b.classList.toggle('done', idx < i);
      });
      if (railBtns[i] && railBtns[i].scrollIntoView) {
        railBtns[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
      }
      prev.disabled = i === 0;
      next.disabled = i === cfg.steps.length - 1;
      next.textContent = i === cfg.steps.length - 1 ? 'In the glass' : 'Next step';
      count.textContent = (i + 1) + ' of ' + cfg.steps.length;
    }

    add(visual, [svgHolder, stageName]);
    var body = h('div', { class: 'sim' }, [
      visual,
      h('div', {}, [rail, metrics, stepBox, h('div', { class: 'sim-nav' }, [prev, next, count])])
    ]);
    go(0);
    return ixShell(cfg, body, cfg.caption);
  }

  /* =======================================================================
     ELEMENT 5 — slider explorer
     cfg: { min,max,step,start,unit,valueLabel,
            levels:[{from,to,name,color,taste,pairing,seen}], panels:{a,b} }
     ======================================================================= */

  function sliderExplorer(cfg, ctx) {
    var val = cfg.start == null ? cfg.min : cfg.start;
    var valueEl = h('span', { class: 'slider-value' });
    var unitEl = h('span', { class: 'slider-unit', text: cfg.unit || '' });
    var nameEl = h('span', { class: 'slider-name' });
    var bands = h('div', { class: 'slider-bands' });
    var scale = h('div', { class: 'slider-scale' });
    var input = h('input', {
      class: 'dial', type: 'range', min: cfg.min, max: cfg.max, step: cfg.step || 1, value: val,
      'aria-label': cfg.valueLabel || 'Value'
    });
    var pa = h('div', { class: 'slider-panel' });
    var pb = h('div', { class: 'slider-panel' });

    var span = cfg.max - cfg.min;
    cfg.levels.forEach(function (l) {
      var w = (Math.min(l.to, cfg.max) - Math.max(l.from, cfg.min)) / span * 100;
      bands.appendChild(h('i', { style: { width: w + '%', background: l.color }, title: l.name }));
    });
    (cfg.ticks || []).forEach(function (t) {
      scale.appendChild(h('span', { text: t.label, style: { left: clamp((t.at - cfg.min) / span * 100, 2, 98) + '%' } }));
    });

    function level() {
      for (var i = 0; i < cfg.levels.length; i++) {
        if (val >= cfg.levels[i].from && val <= cfg.levels[i].to) return cfg.levels[i];
      }
      return cfg.levels[cfg.levels.length - 1];
    }
    function paint() {
      var l = level();
      valueEl.textContent = val;
      nameEl.textContent = l.name;
      clear(pa); clear(pb);
      add(pa, [h('h4', { text: cfg.panels && cfg.panels.a ? cfg.panels.a : 'In the glass' }), h('p', { class: 'taste', html: l.taste })]);
      add(pb, [h('h4', { text: cfg.panels && cfg.panels.b ? cfg.panels.b : 'Pour it with' }), h('p', { html: l.pairing })]);
    }
    input.addEventListener('input', function () { val = Number(input.value); paint(); });

    var body = h('div', { class: 'slider-ix' }, [
      h('div', { class: 'slider-readout' }, [valueEl, unitEl, nameEl]),
      h('div', { class: 'slider-track-wrap' }, [bands, input, scale]),
      h('div', { class: 'slider-panels' }, [pa, pb])
    ]);
    paint();
    return ixShell(cfg, body, cfg.caption);
  }

  /* =======================================================================
     ELEMENT 6 — timeline
     cfg: { events:[{year,title,text}] }
     ======================================================================= */

  function timeline(cfg, ctx) {
    var i = 0;
    var rail = h('div', { class: 'tl-line' });
    var card = h('div', { class: 'tl-card' });
    var count = h('span', { class: 'count' });
    var prev = h('button', { class: 'btn btn-ghost', type: 'button', text: 'Earlier', onclick: function () { go(i - 1); } });
    var next = h('button', { class: 'btn btn-ghost', type: 'button', text: 'Later', onclick: function () { go(i + 1); } });

    var dots = cfg.events.map(function (e, idx) {
      return h('button', { class: 'tl-dot', type: 'button', text: e.year, onclick: function () { go(idx); } });
    });
    add(rail, dots);

    function go(n) {
      i = clamp(n, 0, cfg.events.length - 1);
      var e = cfg.events[i];
      dots.forEach(function (d, idx) { d.classList.toggle('on', idx === i); });
      clear(card);
      add(card, [
        h('div', { class: 'tl-year', text: e.year }),
        h('h4', { text: e.title }),
        h('p', { html: e.text })
      ]);
      if (dots[i] && dots[i].scrollIntoView) {
        dots[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
      }
      prev.disabled = i === 0;
      next.disabled = i === cfg.events.length - 1;
      count.textContent = (i + 1) + ' of ' + cfg.events.length;
    }

    var body = h('div', {}, [
      h('div', { class: 'tl-rail' }, [rail]),
      card,
      h('div', { class: 'tl-nav' }, [prev, next, count])
    ]);
    go(0);
    return ixShell(cfg, body, cfg.caption);
  }

  /* =======================================================================
     ELEMENT 7 — pairing lab
     cfg: { styles:[{id,name,sub}], dishes:[{name, pairs:{styleId:{v,why}}}], missText }
     ======================================================================= */

  function pairingLab(cfg, ctx) {
    var active = cfg.styles[0].id;
    var chips = h('div', { class: 'pair-chips', role: 'group', 'aria-label': 'Pick a style' });
    var grid = h('div', { class: 'pair-grid' });

    var chipEls = cfg.styles.map(function (st) {
      return h('button', {
        class: 'pair-chip', type: 'button', 'aria-pressed': 'false',
        onclick: function () { active = st.id; paint(); }
      }, [st.name, st.sub ? h('small', { text: st.sub }) : null]);
    });
    add(chips, chipEls);

    function paint() {
      chipEls.forEach(function (c, idx) { c.setAttribute('aria-pressed', cfg.styles[idx].id === active ? 'true' : 'false'); });
      clear(grid);
      var sorted = cfg.dishes.slice().sort(function (a, b) {
        var av = a.pairs[active] ? (a.pairs[active].v === 'perfect' ? 0 : 1) : 2;
        var bv = b.pairs[active] ? (b.pairs[active].v === 'perfect' ? 0 : 1) : 2;
        return av - bv;
      });
      sorted.forEach(function (d) {
        var p = d.pairs[active];
        /* Non-matches carry no explanation — repeating one sentence across
           eight cards is noise. The caption says it once instead. */
        grid.appendChild(h('div', { class: 'pair-item ' + (p ? 'hit' : 'miss') }, [
          h('span', { class: 'verdict', text: p ? (p.v === 'perfect' ? 'Classic' : 'Works well') : 'Not this one' }),
          h('h4', { text: d.name }),
          p ? h('p', { class: 'why', html: p.why }) : null
        ]));
      });
    }
    paint();
    return ixShell(cfg, h('div', {}, [chips, grid]), cfg.caption);
  }

  /* =======================================================================
     ELEMENT 8 — producer cards
     cfg: { filters:[{id,label}], items:[{name,code,place,group,note,try}] }
     ======================================================================= */

  function producerCards(cfg, ctx) {
    var active = 'all';
    var chips = h('div', { class: 'chips', style: { marginBottom: '16px' }, role: 'group', 'aria-label': 'Filter producers' });
    var grid = h('div', { class: 'prod-grid' });
    var all = [{ id: 'all', label: 'Everyone' }].concat(cfg.filters || []);

    var chipEls = all.map(function (f) {
      return h('button', {
        class: 'chip', type: 'button', text: f.label, 'aria-pressed': f.id === 'all' ? 'true' : 'false',
        onclick: function () { active = f.id; paint(); }
      });
    });
    add(chips, chipEls);

    function paint() {
      chipEls.forEach(function (c, idx) { c.setAttribute('aria-pressed', all[idx].id === active ? 'true' : 'false'); });
      clear(grid);
      cfg.items.filter(function (it) { return active === 'all' || it.group === active; }).forEach(function (it) {
        grid.appendChild(h('div', { class: 'prod' }, [
          h('div', { class: 'prod-top' }, [h('h4', { text: it.name }), it.code ? h('span', { class: 'code', text: it.code }) : null]),
          it.place ? h('p', { class: 'place', text: it.place }) : null,
          h('p', { class: 'note', html: it.note }),
          it.try ? h('p', { class: 'try' }, [h('b', {}, 'Start with '), it.try]) : null
        ]));
      });
    }
    paint();
    return ixShell(cfg, h('div', {}, [chips, grid]), cfg.caption);
  }

  /* =======================================================================
     ELEMENT 9 — quiz
     cfg: { questions:[{q,options,answer,why}] }
     ======================================================================= */

  function quiz(cfg, ctx) {
    var i = 0, score = 0, answered = false;
    var body = h('div', {});
    var scoreEl = h('span', { class: 'quiz-score' });

    function paintQuestion() {
      answered = false;
      var q = cfg.questions[i];
      clear(body);
      var opts = h('div', { class: 'quiz-opts' });
      var why = h('div', {});
      var nextBtn = h('button', {
        class: 'btn btn-gold', type: 'button', style: { display: 'none' },
        text: i === cfg.questions.length - 1 ? 'See your score' : 'Next question',
        onclick: function () {
          if (i === cfg.questions.length - 1) { paintDone(); } else { i++; paintQuestion(); }
        }
      });

      var btns = q.options.map(function (o, idx) {
        return h('button', {
          class: 'quiz-opt', type: 'button', onclick: function () {
            if (answered) return;
            answered = true;
            var right = idx === q.answer;
            if (right) score++;
            btns.forEach(function (b, bi) {
              b.disabled = true;
              if (bi === q.answer) b.classList.add('right');
              else if (bi === idx) b.classList.add('wrong');
            });
            clear(why);
            why.appendChild(h('p', { class: 'quiz-why', html: (right ? '' : '') + q.why }));
            nextBtn.style.display = '';
            scoreEl.textContent = score + ' right of ' + (i + 1);
          }
        }, [h('span', { class: 'key', text: 'ABCD'[idx] }), h('span', {}, o)]);
      });
      add(opts, btns);
      add(body, [
        h('div', { class: 'quiz-q' }, [
          h('p', { class: 'quiz-prompt', text: q.q }),
          opts, why
        ]),
        h('div', { class: 'quiz-foot' }, [nextBtn, h('span', { class: 'quiz-score', text: 'Question ' + (i + 1) + ' of ' + cfg.questions.length })])
      ]);
    }

    function paintDone() {
      var n = cfg.questions.length;
      var msg = score === n ? (cfg.perfect || 'Every one. You could pour this for people now.')
        : score >= n * 0.7 ? (cfg.good || 'Solid. The details will stick after a bottle or two.')
        : (cfg.tryAgain || 'Worth another read — the answers are all in the sections above.');
      clear(body);
      add(body, [
        h('div', { class: 'quiz-done' }, [
          h('div', { class: 'big', text: score + '/' + n }),
          h('p', { text: msg }),
          h('button', {
            class: 'btn btn-ghost', type: 'button', text: 'Take it again',
            onclick: function () { i = 0; score = 0; scoreEl.textContent = ''; paintQuestion(); }
          })
        ])
      ]);
      if (ctx && ctx.onQuizDone) ctx.onQuizDone(score, n);
    }

    paintQuestion();
    return ixShell(cfg, body, cfg.caption);
  }

  /* =======================================================================
     ELEMENT 10 — match game
     cfg: { pairs:[{a,b}], leftLabel, rightLabel }
     ======================================================================= */

  function matchGame(cfg, ctx) {
    var sel = null, done = 0, moves = 0, wrong = 0;
    var bar = h('div', { class: 'game-bar' });
    var board = h('div', { class: 'match-cols' });
    var wrapper = h('div', {});

    function start() {
      sel = null; done = 0; moves = 0; wrong = 0;
      clear(wrapper);
      clear(bar);
      var stat = h('span', {}, ['Matched ', h('b', { class: 'sc' }, '0'), ' of ' + cfg.pairs.length]);
      var missEl = h('span', { text: 'Misses: 0' });
      add(bar, [stat, missEl, h('button', { class: 'btn btn-ghost', type: 'button', text: 'Shuffle', onclick: start })]);

      clear(board);
      var left = h('div', { class: 'match-col' }, [h('h4', { text: cfg.leftLabel || 'Term' })]);
      var right = h('div', { class: 'match-col' }, [h('h4', { text: cfg.rightLabel || 'Meaning' })]);

      var ls = shuffle(cfg.pairs.map(function (p, idx) { return { i: idx, t: p.a }; }));
      var rs = shuffle(cfg.pairs.map(function (p, idx) { return { i: idx, t: p.b }; }));

      function makeBtn(item, side) {
        var b = h('button', {
          class: 'match-item', type: 'button', text: item.t,
          onclick: function () {
            if (b.classList.contains('paired')) return;
            if (!sel) { sel = { b: b, item: item, side: side }; b.classList.add('sel'); return; }
            if (sel.b === b) { b.classList.remove('sel'); sel = null; return; }
            if (sel.side === side) { sel.b.classList.remove('sel'); sel = { b: b, item: item, side: side }; b.classList.add('sel'); return; }
            moves++;
            if (sel.item.i === item.i) {
              sel.b.classList.remove('sel'); sel.b.classList.add('paired'); b.classList.add('paired');
              done++;
              stat.querySelector('.sc').textContent = String(done);
              sel = null;
              if (done === cfg.pairs.length) win();
            } else {
              wrong++;
              missEl.textContent = 'Misses: ' + wrong;
              var a = sel.b;
              a.classList.add('shake'); b.classList.add('shake');
              setTimeout(function () { a.classList.remove('shake', 'sel'); b.classList.remove('shake'); }, 360);
              sel = null;
            }
          }
        });
        return b;
      }
      ls.forEach(function (it) { left.appendChild(makeBtn(it, 'l')); });
      rs.forEach(function (it) { right.appendChild(makeBtn(it, 'r')); });
      add(board, [left, right]);
      add(wrapper, [bar, board]);
    }

    function win() {
      setTimeout(function () {
        clear(wrapper);
        var clean = wrong === 0;
        wrapper.appendChild(h('div', { class: 'game-win' }, [
          h('div', { class: 'big', text: clean ? 'Clean sweep' : wrong + (wrong === 1 ? ' miss' : ' misses') }),
          h('p', { text: clean ? (cfg.perfect || 'All matched first time.') : (cfg.okay || 'All matched. Run it again for a clean sweep.') }),
          h('button', { class: 'btn btn-gold', type: 'button', text: 'Play again', onclick: start })
        ]));
      }, 420);
    }

    start();
    return ixShell(cfg, wrapper, cfg.caption);
  }

  /* =======================================================================
     ELEMENT 11 — clue guess
     cfg: { rounds:[{answer, options:[], clues:[], why}] }
     ======================================================================= */

  function clueGuess(cfg, ctx) {
    var r = 0, shown = 1, score = 0, locked = false;
    var wrapper = h('div', {});

    function paint() {
      var round = cfg.rounds[r];
      clear(wrapper);
      var clues = h('div', { class: 'clue-list' });
      round.clues.forEach(function (c, idx) {
        clues.appendChild(h('div', { class: 'clue' + (idx < shown ? '' : ' locked') }, [
          h('span', { class: 'n', text: 'Clue ' + (idx + 1) }),
          h('span', {}, idx < shown ? c : 'Locked — one wrong guess reveals it.')
        ]));
      });

      var feedback = h('div', {});
      var opts = h('div', { class: 'guess-opts' });
      var btns = round.options.map(function (o, idx) {
        return h('button', {
          class: 'quiz-opt', type: 'button', onclick: function () {
            if (locked) return;
            if (o === round.answer) {
              locked = true;
              score += Math.max(1, 4 - shown);
              btns.forEach(function (b, bi) { b.disabled = true; if (round.options[bi] === round.answer) b.classList.add('right'); });
              clear(feedback);
              feedback.appendChild(h('p', { class: 'quiz-why', html: round.why }));
              feedback.appendChild(h('div', { class: 'quiz-foot' }, [
                h('button', {
                  class: 'btn btn-gold', type: 'button',
                  text: r === cfg.rounds.length - 1 ? 'See your score' : 'Next glass',
                  onclick: function () {
                    if (r === cfg.rounds.length - 1) return finish();
                    r++; shown = 1; locked = false; paint();
                  }
                }),
                h('span', { class: 'quiz-score', text: 'Score ' + score })
              ]));
            } else {
              this.classList.add('wrong');
              this.disabled = true;
              if (shown < round.clues.length) { shown++; paint(); }
            }
          }
        }, [h('span', {}, o)]);
      });
      add(opts, btns);
      add(wrapper, [
        h('p', { class: 'guess-round', text: 'Glass ' + (r + 1) + ' of ' + cfg.rounds.length + ', worth ' + (4 - shown) + ' points right now' }),
        clues, opts, feedback
      ]);
    }

    function finish() {
      var max = cfg.rounds.length * 3;
      clear(wrapper);
      wrapper.appendChild(h('div', { class: 'game-win' }, [
        h('div', { class: 'big', text: score + '/' + max }),
        h('p', { text: score === max ? (cfg.perfect || 'First clue every time.') : (cfg.okay || 'Not bad. Fewer clues next time.') }),
        h('button', {
          class: 'btn btn-gold', type: 'button', text: 'Play again',
          onclick: function () { r = 0; shown = 1; score = 0; locked = false; paint(); }
        })
      ]));
    }

    paint();
    return ixShell(cfg, wrapper, cfg.caption);
  }

  /* =======================================================================
     registry
     ======================================================================= */

  var Elements = {
    'soil-section': soilSection,
    'area-map': areaMap,
    'blend-builder': blendBuilder,
    'process-sim': processSim,
    'slider-explorer': sliderExplorer,
    'timeline': timeline,
    'pairing-lab': pairingLab,
    'producer-cards': producerCards,
    'quiz': quiz,
    'match-game': matchGame,
    'clue-guess': clueGuess
  };

  function renderElement(el, ctx) {
    var fn = Elements[el.type];
    if (!fn) return h('div', { class: 'ix' }, [h('p', { text: 'Unknown element: ' + el.type })]);
    try {
      return fn(el, ctx || {});
    } catch (err) {
      console.error('Element failed:', el.type, err);
      return h('div', { class: 'ix' }, [h('p', { text: 'This interactive could not load.' })]);
    }
  }

  function renderBlock(b, ctx) {
    var fn = Blocks[b.type];
    if (!fn) return h('div', {});
    return fn(b, ctx || {});
  }

  window.UC = { h: h, s: s, clear: clear, renderBlock: renderBlock, renderElement: renderElement, iconCheck: iconCheck, shuffle: shuffle };
})();
