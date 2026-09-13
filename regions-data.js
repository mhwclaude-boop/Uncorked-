/* =========================================================================
   Uncorked — region data
   -------------------------------------------------------------------------
   ADDING A NEW REGION (no app code required):

   1. Add an entry to REGIONS below. A placeholder needs only:
        { id, name, country, continent, lat, lng, status: 'coming-soon' }

   2. To bring it online, flip status to 'live' and create the content file
        regions/<id>.js
      containing a single call to registerRegion('<id>', { ... }).
      Copy regions/champagne.js as the template — it uses every block and
      every interactive component that exists.

   The app lazy-loads regions/<id>.js only when a live region is opened, so
   the index stays small no matter how many regions are written.

   -------------------------------------------------------------------------
   CONTENT SCHEMA (regions/<id>.js)

   {
     tagline:  short line shown on the region card
     lede:     one paragraph under the region title
     minutes:  estimated read + play time
     facts:    [ { value, label } ]            masthead figures
     sections: [ Section ]                     the seven content sections
     quiz:     { title, intro, questions: [ { q, options, answer, why } ] }
     games:    [ GameConfig ]
   }

   Section = { id, title, kicker, blocks: [ Block ] }

   Block types (all pure data, rendered by components.js):
     { type:'prose',   html }
     { type:'stats',   items:[{ value, label }] }
     { type:'aside',   title, html }
     { type:'pull',    text, cite }
     { type:'deflist', items:[{ term, def }] }
     { type:'ix',      element: Element }      any interactive component

   Element types (config keys documented in components.js):
     soil-section | area-map | blend-builder | process-sim |
     slider-explorer | timeline | pairing-lab | producer-cards |
     quiz | match-game | clue-guess
   ========================================================================= */

window.CONTINENTS = [
  { id: 'europe',   name: 'Europe' },
  { id: 'americas', name: 'Americas' },
  { id: 'oceania',  name: 'Oceania' },
  { id: 'africa',   name: 'Africa' },
  { id: 'asia',     name: 'Asia' }
];

window.REGIONS = [
  /* ---------- Europe ---------- */
  { id: 'champagne', name: 'Champagne', country: 'France', continent: 'europe', lat: 49.04, lng: 3.96, status: 'live', tagline: 'Chalk, cold nights, and the long way round to a bubble.' },
  { id: 'bordeaux', name: 'Bordeaux', country: 'France', continent: 'europe', lat: 44.84, lng: -0.58, status: 'coming-soon' },
  { id: 'burgundy', name: 'Burgundy', country: 'France', continent: 'europe', lat: 47.05, lng: 4.85, status: 'coming-soon' },
  { id: 'chablis', name: 'Chablis', country: 'France', continent: 'europe', lat: 47.82, lng: 3.80, status: 'coming-soon' },
  { id: 'beaujolais', name: 'Beaujolais', country: 'France', continent: 'europe', lat: 46.10, lng: 4.65, status: 'coming-soon' },
  { id: 'northern-rhone', name: 'Northern Rhône', country: 'France', continent: 'europe', lat: 45.07, lng: 4.85, status: 'coming-soon' },
  { id: 'southern-rhone', name: 'Southern Rhône', country: 'France', continent: 'europe', lat: 44.06, lng: 4.81, status: 'coming-soon' },
  { id: 'loire-valley', name: 'Loire Valley', country: 'France', continent: 'europe', lat: 47.32, lng: 0.55, status: 'coming-soon' },
  { id: 'alsace', name: 'Alsace', country: 'France', continent: 'europe', lat: 48.10, lng: 7.35, status: 'coming-soon' },
  { id: 'provence', name: 'Provence', country: 'France', continent: 'europe', lat: 43.45, lng: 6.10, status: 'coming-soon' },
  { id: 'languedoc', name: 'Languedoc', country: 'France', continent: 'europe', lat: 43.35, lng: 3.20, status: 'coming-soon' },
  { id: 'jura', name: 'Jura', country: 'France', continent: 'europe', lat: 46.90, lng: 5.75, status: 'coming-soon' },

  { id: 'barolo', name: 'Barolo & the Langhe', country: 'Italy', continent: 'europe', lat: 44.61, lng: 7.94, status: 'coming-soon' },
  { id: 'chianti-classico', name: 'Chianti Classico', country: 'Italy', continent: 'europe', lat: 43.47, lng: 11.30, status: 'coming-soon' },
  { id: 'montalcino', name: 'Montalcino', country: 'Italy', continent: 'europe', lat: 43.06, lng: 11.49, status: 'coming-soon' },
  { id: 'bolgheri', name: 'Bolgheri', country: 'Italy', continent: 'europe', lat: 43.23, lng: 10.61, status: 'coming-soon' },
  { id: 'valpolicella', name: 'Valpolicella', country: 'Italy', continent: 'europe', lat: 45.50, lng: 10.87, status: 'coming-soon' },
  { id: 'prosecco', name: 'Conegliano Valdobbiadene', country: 'Italy', continent: 'europe', lat: 45.90, lng: 12.10, status: 'coming-soon' },
  { id: 'friuli', name: 'Friuli Collio', country: 'Italy', continent: 'europe', lat: 45.95, lng: 13.50, status: 'coming-soon' },
  { id: 'alto-adige', name: 'Alto Adige', country: 'Italy', continent: 'europe', lat: 46.50, lng: 11.35, status: 'coming-soon' },
  { id: 'etna', name: 'Etna', country: 'Italy', continent: 'europe', lat: 37.72, lng: 15.00, status: 'coming-soon' },

  { id: 'rioja', name: 'Rioja', country: 'Spain', continent: 'europe', lat: 42.45, lng: -2.45, status: 'coming-soon' },
  { id: 'ribera-del-duero', name: 'Ribera del Duero', country: 'Spain', continent: 'europe', lat: 41.63, lng: -3.69, status: 'coming-soon' },
  { id: 'priorat', name: 'Priorat', country: 'Spain', continent: 'europe', lat: 41.20, lng: 0.80, status: 'coming-soon' },
  { id: 'rias-baixas', name: 'Rías Baixas', country: 'Spain', continent: 'europe', lat: 42.40, lng: -8.70, status: 'coming-soon' },
  { id: 'jerez', name: 'Jerez', country: 'Spain', continent: 'europe', lat: 36.68, lng: -6.14, status: 'coming-soon' },
  { id: 'penedes', name: 'Penedès', country: 'Spain', continent: 'europe', lat: 41.35, lng: 1.70, status: 'coming-soon' },

  { id: 'douro', name: 'Douro Valley', country: 'Portugal', continent: 'europe', lat: 41.16, lng: -7.55, status: 'coming-soon' },
  { id: 'vinho-verde', name: 'Vinho Verde', country: 'Portugal', continent: 'europe', lat: 41.55, lng: -8.40, status: 'coming-soon' },
  { id: 'alentejo', name: 'Alentejo', country: 'Portugal', continent: 'europe', lat: 38.57, lng: -7.91, status: 'coming-soon' },
  { id: 'madeira', name: 'Madeira', country: 'Portugal', continent: 'europe', lat: 32.65, lng: -16.91, status: 'coming-soon' },

  { id: 'mosel', name: 'Mosel', country: 'Germany', continent: 'europe', lat: 49.90, lng: 6.95, status: 'coming-soon' },
  { id: 'rheingau', name: 'Rheingau', country: 'Germany', continent: 'europe', lat: 50.02, lng: 8.00, status: 'coming-soon' },
  { id: 'pfalz', name: 'Pfalz', country: 'Germany', continent: 'europe', lat: 49.35, lng: 8.15, status: 'coming-soon' },

  { id: 'wachau', name: 'Wachau', country: 'Austria', continent: 'europe', lat: 48.37, lng: 15.43, status: 'coming-soon' },
  { id: 'burgenland', name: 'Burgenland', country: 'Austria', continent: 'europe', lat: 47.75, lng: 16.75, status: 'coming-soon' },

  { id: 'tokaj', name: 'Tokaj', country: 'Hungary', continent: 'europe', lat: 48.12, lng: 21.41, status: 'coming-soon' },
  { id: 'santorini', name: 'Santorini', country: 'Greece', continent: 'europe', lat: 36.40, lng: 25.43, status: 'coming-soon' },
  { id: 'valais', name: 'Valais', country: 'Switzerland', continent: 'europe', lat: 46.23, lng: 7.36, status: 'coming-soon' },
  { id: 'sussex', name: 'Sussex', country: 'United Kingdom', continent: 'europe', lat: 50.95, lng: -0.35, status: 'coming-soon' },
  { id: 'kakheti', name: 'Kakheti', country: 'Georgia', continent: 'europe', lat: 41.90, lng: 45.70, status: 'coming-soon' },

  /* ---------- Americas ---------- */
  { id: 'napa-valley', name: 'Napa Valley', country: 'United States of America', continent: 'americas', lat: 38.50, lng: -122.35, status: 'coming-soon' },
  { id: 'sonoma-county', name: 'Sonoma County', country: 'United States of America', continent: 'americas', lat: 38.44, lng: -122.72, status: 'coming-soon' },
  { id: 'willamette-valley', name: 'Willamette Valley', country: 'United States of America', continent: 'americas', lat: 45.20, lng: -123.10, status: 'coming-soon' },
  { id: 'columbia-valley', name: 'Columbia Valley', country: 'United States of America', continent: 'americas', lat: 46.30, lng: -119.50, status: 'coming-soon' },
  { id: 'finger-lakes', name: 'Finger Lakes', country: 'United States of America', continent: 'americas', lat: 42.60, lng: -76.90, status: 'coming-soon' },
  { id: 'sta-rita-hills', name: 'Sta. Rita Hills', country: 'United States of America', continent: 'americas', lat: 34.65, lng: -120.30, status: 'coming-soon' },
  { id: 'paso-robles', name: 'Paso Robles', country: 'United States of America', continent: 'americas', lat: 35.63, lng: -120.69, status: 'coming-soon' },

  { id: 'niagara-peninsula', name: 'Niagara Peninsula', country: 'Canada', continent: 'americas', lat: 43.15, lng: -79.30, status: 'coming-soon' },
  { id: 'okanagan-valley', name: 'Okanagan Valley', country: 'Canada', continent: 'americas', lat: 49.80, lng: -119.60, status: 'coming-soon' },
  { id: 'valle-de-guadalupe', name: 'Valle de Guadalupe', country: 'Mexico', continent: 'americas', lat: 32.10, lng: -116.60, status: 'coming-soon' },

  { id: 'mendoza', name: 'Mendoza', country: 'Argentina', continent: 'americas', lat: -33.30, lng: -69.10, status: 'coming-soon' },
  { id: 'salta', name: 'Salta & Cafayate', country: 'Argentina', continent: 'americas', lat: -26.07, lng: -65.98, status: 'coming-soon' },
  { id: 'patagonia', name: 'Patagonia', country: 'Argentina', continent: 'americas', lat: -39.03, lng: -67.58, status: 'coming-soon' },

  { id: 'maipo-valley', name: 'Maipo Valley', country: 'Chile', continent: 'americas', lat: -33.70, lng: -70.70, status: 'coming-soon' },
  { id: 'colchagua-valley', name: 'Colchagua Valley', country: 'Chile', continent: 'americas', lat: -34.65, lng: -71.10, status: 'coming-soon' },
  { id: 'casablanca-valley', name: 'Casablanca Valley', country: 'Chile', continent: 'americas', lat: -33.32, lng: -71.41, status: 'coming-soon' },

  { id: 'canelones', name: 'Canelones', country: 'Uruguay', continent: 'americas', lat: -34.55, lng: -56.28, status: 'coming-soon' },
  { id: 'serra-gaucha', name: 'Serra Gaúcha', country: 'Brazil', continent: 'americas', lat: -29.17, lng: -51.52, status: 'coming-soon' },

  /* ---------- Oceania ---------- */
  { id: 'barossa-valley', name: 'Barossa Valley', country: 'Australia', continent: 'oceania', lat: -34.53, lng: 138.95, status: 'coming-soon' },
  { id: 'mclaren-vale', name: 'McLaren Vale', country: 'Australia', continent: 'oceania', lat: -35.22, lng: 138.54, status: 'coming-soon' },
  { id: 'clare-valley', name: 'Clare Valley', country: 'Australia', continent: 'oceania', lat: -33.83, lng: 138.61, status: 'coming-soon' },
  { id: 'coonawarra', name: 'Coonawarra', country: 'Australia', continent: 'oceania', lat: -37.29, lng: 140.83, status: 'coming-soon' },
  { id: 'yarra-valley', name: 'Yarra Valley', country: 'Australia', continent: 'oceania', lat: -37.70, lng: 145.40, status: 'coming-soon' },
  { id: 'margaret-river', name: 'Margaret River', country: 'Australia', continent: 'oceania', lat: -33.95, lng: 115.07, status: 'coming-soon' },
  { id: 'hunter-valley', name: 'Hunter Valley', country: 'Australia', continent: 'oceania', lat: -32.78, lng: 151.30, status: 'coming-soon' },
  { id: 'tasmania', name: 'Tasmania', country: 'Australia', continent: 'oceania', lat: -42.10, lng: 147.20, status: 'coming-soon' },

  { id: 'marlborough', name: 'Marlborough', country: 'New Zealand', continent: 'oceania', lat: -41.52, lng: 173.86, status: 'coming-soon' },
  { id: 'central-otago', name: 'Central Otago', country: 'New Zealand', continent: 'oceania', lat: -45.03, lng: 169.19, status: 'coming-soon' },
  { id: 'hawkes-bay', name: "Hawke's Bay", country: 'New Zealand', continent: 'oceania', lat: -39.60, lng: 176.75, status: 'coming-soon' },
  { id: 'martinborough', name: 'Martinborough', country: 'New Zealand', continent: 'oceania', lat: -41.22, lng: 175.46, status: 'coming-soon' },

  /* ---------- Africa ---------- */
  { id: 'stellenbosch', name: 'Stellenbosch', country: 'South Africa', continent: 'africa', lat: -33.94, lng: 18.86, status: 'coming-soon' },
  { id: 'swartland', name: 'Swartland', country: 'South Africa', continent: 'africa', lat: -33.20, lng: 18.75, status: 'coming-soon' },
  { id: 'hemel-en-aarde', name: 'Hemel-en-Aarde', country: 'South Africa', continent: 'africa', lat: -34.38, lng: 19.28, status: 'coming-soon' },
  { id: 'constantia', name: 'Constantia', country: 'South Africa', continent: 'africa', lat: -34.03, lng: 18.42, status: 'coming-soon' },
  { id: 'meknes', name: 'Meknès', country: 'Morocco', continent: 'africa', lat: 33.90, lng: -5.55, status: 'coming-soon' },

  /* ---------- Asia ---------- */
  { id: 'ningxia', name: 'Ningxia', country: 'China', continent: 'asia', lat: 38.35, lng: 106.00, status: 'coming-soon' },
  { id: 'yamanashi', name: 'Yamanashi', country: 'Japan', continent: 'asia', lat: 35.66, lng: 138.57, status: 'coming-soon' },
  { id: 'bekaa-valley', name: 'Bekaa Valley', country: 'Lebanon', continent: 'asia', lat: 33.85, lng: 35.90, status: 'coming-soon' },
  { id: 'nashik', name: 'Nashik', country: 'India', continent: 'asia', lat: 20.00, lng: 73.79, status: 'coming-soon' },
  { id: 'galilee', name: 'Galilee', country: 'Israel', continent: 'asia', lat: 33.00, lng: 35.40, status: 'coming-soon' }
];

/* -------------------------------------------------------------------------
   Content store — lazy-loads regions/<id>.js on demand.
   ------------------------------------------------------------------------- */

window.REGION_CONTENT = {};

window.registerRegion = function (id, content) {
  window.REGION_CONTENT[id] = content;
  if (window.__regionWaiters && window.__regionWaiters[id]) {
    window.__regionWaiters[id].forEach(function (fn) { fn(content); });
    delete window.__regionWaiters[id];
  }
};

window.RegionStore = {
  all: function () { return window.REGIONS; },

  byId: function (id) {
    for (var i = 0; i < window.REGIONS.length; i++) {
      if (window.REGIONS[i].id === id) return window.REGIONS[i];
    }
    return null;
  },

  byCountry: function () {
    var map = {};
    window.REGIONS.forEach(function (r) {
      (map[r.country] = map[r.country] || []).push(r);
    });
    return map;
  },

  /* Resolves with the content object, or rejects if the file is missing. */
  loadContent: function (id) {
    return new Promise(function (resolve, reject) {
      if (window.REGION_CONTENT[id]) return resolve(window.REGION_CONTENT[id]);

      window.__regionWaiters = window.__regionWaiters || {};
      (window.__regionWaiters[id] = window.__regionWaiters[id] || []).push(resolve);

      if (document.querySelector('script[data-region="' + id + '"]')) return;

      var s = document.createElement('script');
      s.src = 'regions/' + id + '.js';
      s.async = true;
      s.setAttribute('data-region', id);
      s.onerror = function () {
        delete window.__regionWaiters[id];
        reject(new Error('No content file for ' + id));
      };
      document.head.appendChild(s);
    });
  }
};
