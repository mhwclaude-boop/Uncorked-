/* =========================================================================
   Champagne — the reference region.
   Copy this file as the template for any new region: same keys, same
   component types, new words. No app code needs to change.
   ========================================================================= */

registerRegion('champagne', {

  lede: 'A cold, flat-lit corner of northern France sitting on a hundred metres of seashell chalk, where the wine was an accident before it was an industry — and where making it still takes years of deliberate, fiddly work.',

  minutes: 18,

  facts: [
    { value: '49°N', label: 'Latitude — among the northernmost vineyards in France' },
    { value: '34,000 ha', label: 'Under vine, across roughly 320 villages' },
    { value: '3', label: 'Grapes that matter, of seven that are legal' },
    { value: '6 atm', label: 'Pressure in a finished bottle' },
    { value: '15 months', label: 'Minimum ageing before a non-vintage can be sold' }
  ],

  sections: [

    /* ================================================================== */
    {
      id: 'terroir',
      title: 'Terroir & climate',
      navLabel: 'Terroir',
      kicker: 'A place almost too cold for wine, built on the floor of a vanished sea.',
      blocks: [
        {
          type: 'prose',
          html: '<p>Champagne is, by the standards of the wine world, a difficult place to grow grapes. The vineyards sit at 49° north, about 145 kilometres east of Paris. For most of the past thousand years that was the outer edge of where grapes would ripen at all. Spring frost can take a chunk of the crop in a single clear night. Rain often arrives before the fruit is properly ripe. Two years in ten are genuinely hard.</p><p>In a warm region this would read as a list of problems. Here it is the entire point. Grapes that struggle to ripen hold on to their acidity and never build much sugar, and a thin, sharp base wine of ten or eleven percent alcohol is exactly what you want if your plan is to ferment it a second time inside a sealed bottle. Warm-climate fruit makes flabby sparkling wine. Champagne is good at this because it is cold.</p>'
        },
        {
          type: 'stats',
          items: [
            { value: '10.8°C', label: 'Mean annual temperature — cool enough that ripening is never guaranteed' },
            { value: '~2 weeks', label: 'How much earlier harvest starts than it did in the 1980s' },
            { value: '200 m+', label: 'Depth of the chalk under parts of the region' },
            { value: '300 million', label: 'Bottles shipped in a typical year' }
          ]
        },
        {
          type: 'prose',
          html: '<p>Underneath the vines is the thing everyone is gesturing at when they say a Champagne tastes chalky. Around ninety million years ago this was the floor of a warm, shallow sea. Generations of plankton skeletons settled and compacted, along with the bullet-shaped internal shells of squid relatives called <em>belemnites</em>, and the whole seabed became chalk — in places more than two hundred metres of it.</p><p>Chalk does two contradictory things at once, which is why it is so useful. It is porous enough to hold a serious volume of water and release it back slowly, so vines keep working through a dry August. It also drains, so roots are not sitting in water through a wet October. It is soft enough for roots to push metres down, pale enough to reflect light back up into the canopy, and slow enough to change temperature that it buffers the vine against a cold snap.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'soil-section',
            eyebrow: 'Dig down',
            title: 'What a vine roots into here',
            intro: 'Select a layer to see what it does. The whole profile is why this cold place makes wine worth ageing.',
            caption: 'Depths are typical for the Côte des Blancs and the Montagne de Reims. The Côte des Bar, an hour south, sits on something else entirely.',
            layers: [
              {
                name: 'Topsoil',
                depth: '0 – 40 cm',
                span: 1.6,
                color: '#6B5136',
                ink: '#F3EFE6',
                text: 'Thin, stony and not very fertile. In much of the region it is only a few dozen centimetres deep before the vine hits chalk. Growers spent much of the twentieth century adding organic matter to it — including, notoriously, shredded urban waste, which was banned in the 1990s and is still being picked out of the soil today.'
              },
              {
                name: 'Weathered chalk and flint',
                depth: '0.4 – 1.5 m',
                span: 2,
                color: '#9C8A6B',
                ink: '#1A140C',
                speckle: true,
                text: 'Frost-shattered chalk rubble mixed with clay and silica. This is the layer that actually anchors the vine and holds its working water supply. Where there is more clay — the Marne valley, much of the Meunier country — the soil is colder, heavier and slower, and the wines come out rounder.'
              },
              {
                name: 'Belemnite chalk',
                depth: '1.5 – 30 m',
                span: 3.4,
                color: '#E6E2D6',
                ink: '#0C1018',
                speckle: true,
                text: 'The Campanian chalk, packed with belemnite fossils. Soft, brilliant white, and able to hold roughly a quarter of its own volume in water, which it gives back to the vine slowly through the summer. The best-rated villages of the Côte des Blancs and the Montagne de Reims sit directly on it. Roots that reach this far down stop caring about the weather.'
              },
              {
                name: 'The crayères',
                depth: '10 – 40 m',
                span: 2.2,
                color: '#2A3140',
                ink: '#ECE8DF',
                text: 'Not a soil layer but a human one: pyramidal pits cut into the chalk by Gallo-Roman quarrymen looking for building stone, later joined up into hundreds of kilometres of galleries beneath Reims and Épernay. They sit at a steady 10–12°C with high humidity all year, which happens to be a perfect cellar. Wine is stored in holes dug by people who had never tasted it.'
              },
              {
                name: 'Micraster chalk and the water table',
                depth: '40 m and below',
                span: 3,
                color: '#C9C6BC',
                ink: '#0C1018',
                speckle: true,
                text: 'Older, harder Turonian chalk named for the sea urchins fossilised in it, sitting above the region groundwater. Vine roots rarely get this far, but the whole reservoir above it is what keeps the hillside from drying out. This is also the same chalk formation that continues under the Channel and surfaces again in the North and South Downs of England — which is precisely why English sparkling wine happened.'
              }
            ]
          }
        },
        {
          type: 'aside',
          title: 'Can you actually taste the chalk?',
          html: '<p>Strictly, no. Chalk is calcium carbonate and does not travel from soil to glass as a flavour compound. What the chalk does is shape the vine: how much water it gets and when, how deep it roots, how fast it ripens, how much acid survives to harvest.</p><p>That shows up in the glass as a taut, dry, faintly saline finish that drinkers have called chalky for two centuries because no better word exists. The effect is real. The mechanism is just indirect.</p>'
        },
        {
          type: 'prose',
          html: '<p>Champagne is not one hillside. Around 34,000 hectares of vines are scattered across roughly 320 villages in five districts, each with its own aspect, soil and grape logic — and blending across them is the central craft of the place.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'area-map',
            eyebrow: 'Five districts',
            title: 'Where the vines actually are',
            intro: 'A schematic, not a survey map. Select a district to see what grows there and why.',
            viewBox: '30 26 336 330',
            rivers: ['M208 170 C176 180 146 174 112 182 C88 188 70 187 46 192'],
            marks: [
              { x: 206, y: 44, label: 'Reims' },
              { x: 200, y: 172, label: 'Épernay' },
              { x: 236, y: 302, label: 'Troyes', anchor: 'end' }
            ],
            shapes: [
              {
                id: 'montagne',
                name: 'Montagne de Reims',
                short: 'Montagne de Reims',
                tag: 'Pinot Noir country',
                color: '#8E4B5C',
                lx: 207, ly: 96,
                d: 'M150 64 C138 96 152 134 190 142 C226 150 254 132 264 102 C272 80 262 62 246 66 C232 70 234 84 230 100 C224 120 202 126 188 116 C174 106 174 84 178 66 C181 50 157 48 150 64 Z',
                text: '<p>A broad forested plateau with vines on the slopes all the way around it, so the aspect changes village by village — some face full south, some face north into the cold. Pinot Noir rules here and gives Champagne its frame: red-fruited, broad, structured.</p><p>Nine of the seventeen grand cru villages are on this hill, including Verzenay and Mailly on the improbable north-facing side, and Ambonnay and Bouzy on the south.</p>'
              },
              {
                id: 'marne',
                name: 'Vallée de la Marne',
                short: 'Vallée de la Marne',
                tag: 'Meunier country',
                color: '#7C6AA8',
                lx: 118, ly: 176,
                d: 'M56 160 C88 148 118 158 148 154 C174 151 194 160 198 172 C202 186 184 194 158 190 C128 185 102 194 74 194 C54 194 46 172 56 160 Z',
                text: '<p>A long river valley running west from Épernay, with heavier clay and marl soils and a frost-prone valley floor. Meunier dominates because it buds late enough to dodge the worst frosts and ripens early enough to beat the autumn rain.</p><p>This is the everyday engine room of Champagne — the wine that makes a non-vintage blend taste generous the moment you open it.</p>'
              },
              {
                id: 'blancs',
                name: 'Côte des Blancs',
                short: 'Côte des Blancs',
                tag: 'Chardonnay country',
                color: '#C8A44D',
                lx: 220, ly: 226, anchor: 'start',
                d: 'M188 182 C202 178 214 188 212 204 C210 228 205 250 199 262 C195 272 181 270 179 258 C177 234 180 202 188 182 Z',
                text: '<p>A single east-facing escarpment running south from Épernay, with the purest, shallowest chalk in the region. Almost everything planted is Chardonnay, and the wines are the tightest and longest-lived in Champagne — severe when young, extraordinary at fifteen years.</p><p>Cramant, Avize, Oger and Le Mesnil-sur-Oger are all grand cru and all within a few kilometres of each other.</p>'
              },
              {
                id: 'sezanne',
                name: 'Côte de Sézanne',
                short: 'Côte de Sézanne',
                tag: 'Softer Chardonnay',
                color: '#B08C56',
                lx: 124, ly: 280, anchor: 'end',
                d: 'M146 254 C158 248 170 256 166 270 C162 284 156 296 148 300 C140 304 130 296 133 284 C136 270 139 258 146 254 Z',
                text: '<p>A smaller, warmer continuation of the Côte des Blancs further southwest, with more clay over the chalk. Also mostly Chardonnay, but riper and rounder — less mineral tension, more orchard fruit.</p><p>Rarely named on a label. Frequently in the blend.</p>'
              },
              {
                id: 'bar',
                name: 'Côte des Bar',
                short: 'Côte des Bar',
                tag: 'Pinot Noir on Kimmeridgian marl',
                color: '#9C5A4A',
                lx: 286, ly: 314,
                d: 'M252 288 C277 276 310 280 324 296 C336 310 330 332 308 340 C284 348 256 342 245 326 C235 312 240 296 252 288 Z',
                text: '<p>An hour and a half south, nearer to Chablis than to Reims, and geologically part of the same world: Kimmeridgian marl rather than chalk. Steep, sunny slopes planted overwhelmingly to Pinot Noir, giving riper and rounder wine than the Montagne.</p><p>Long treated as a junior supplier of fruit to the big houses. Its growers were the ones who rioted in 1911 over being excluded from the appellation, and it is now the most interesting source of single-parcel grower Champagne in the region.</p>'
              }
            ]
          }
        },
        {
          type: 'pull',
          text: 'The whole region is a bet that a bad climate, handled carefully enough, beats a good one.',
          cite: 'Why anyone bothered planting at 49° north'
        }
      ]
    },

    /* ================================================================== */
    {
      id: 'grapes',
      title: 'Grape varieties',
      navLabel: 'Grapes',
      kicker: 'Seven are legal. Three do almost all of the work — and two of those are red.',
      blocks: [
        {
          type: 'prose',
          html: '<p>The first surprising thing about Champagne is that most of it is made from black grapes. Around seven parts in ten of the vineyard is planted to Pinot Noir and Meunier; the juice simply comes out colourless if you press the fruit gently enough and get it off the skins fast enough.</p><p>The second surprising thing is how differently the three grapes behave, and how deliberately they are used against each other. A blend here is not a compromise. It is a recipe.</p>'
        },
        {
          type: 'deflist',
          items: [
            { term: 'Pinot Noir — 38%', def: 'Structure, weight and red fruit. Gives a blend its spine and its shoulders, and the length that lets a wine age. Best on the Montagne de Reims and in the Côte des Bar.' },
            { term: 'Meunier — 31%', def: 'Softness, roundness and early charm. Buds late, ripens early, tolerates the cold clay of the Marne valley. Long treated as the workhorse nobody mentioned; now taken seriously on its own.' },
            { term: 'Chardonnay — 30%', def: 'Acidity, precision and the capacity to age for decades. Lemon peel and white flowers when young, hazelnut and toast at fifteen years. Owns the Côte des Blancs.' },
            { term: 'The other four — under 1%', def: 'Arbane, Petit Meslier, Pinot Blanc and Pinot Gris survive in tiny plantings, mostly kept alive by growers making deliberately archaic cuvées from all seven varieties at once.' }
          ]
        },
        {
          type: 'ix',
          element: {
            type: 'blend-builder',
            eyebrow: 'Drag to blend',
            title: 'Build a blend, read the wine',
            intro: 'Drag a grape into the glass — or use the plus buttons — and the tasting note rewrites itself. Try one grape on its own, then all three.',
            caption: 'Simplified, obviously: real assemblage also blends across dozens of villages and several past vintages. But the direction of travel is right.',
            hint: 'Drag a grape in',
            step: 10,
            baseColor: '#E9CE87',
            mixWeight: 0.38,
            emptyText: 'Drag a grape into the glass, or press the plus buttons. Champagne is blended by percentage, so what matters is the ratio, not the amount.',
            components: [
              { id: 'chardonnay', name: 'Chardonnay', sub: 'Côte des Blancs', color: '#D9C77A', initial: 30 },
              { id: 'pinot', name: 'Pinot Noir', sub: 'Montagne de Reims', color: '#8E4B5C', initial: 40 },
              { id: 'meunier', name: 'Meunier', sub: 'Vallée de la Marne', color: '#8D77B4', initial: 30 }
            ],
            presets: [
              { name: 'Blanc de Blancs', mix: { chardonnay: 100, pinot: 0, meunier: 0 } },
              { name: 'Blanc de Noirs', mix: { chardonnay: 0, pinot: 60, meunier: 40 } },
              { name: 'Classic house blend', mix: { chardonnay: 30, pinot: 40, meunier: 30 } },
              { name: 'Marne valley grower', mix: { chardonnay: 10, pinot: 30, meunier: 60 } }
            ],
            nameRules: [
              { when: { id: 'chardonnay', min: 100 }, name: 'Blanc de Blancs' },
              { when: { all: [{ id: 'chardonnay', max: 0 }] }, name: 'Blanc de Noirs' },
              { when: { id: 'chardonnay', min: 70 }, name: 'Chardonnay-led blend' },
              { when: { id: 'pinot', min: 60 }, name: 'Pinot-led blend' },
              { when: { id: 'meunier', min: 50 }, name: 'Meunier-led blend' },
              { when: { all: [{ id: 'chardonnay', min: 20 }, { id: 'pinot', min: 20 }, { id: 'meunier', min: 20 }] }, name: 'A balanced three-grape blend' }
            ],
            defaultName: 'Your blend',
            noteRules: [
              { when: { id: 'chardonnay', min: 70 }, text: 'Lemon peel, white blossom and green apple over a hard, bright line of acidity.' },
              { when: { id: 'chardonnay', min: 25, max: 69 }, text: 'Chardonnay gives it citrus lift and tension down the middle.' },
              { when: { id: 'chardonnay', min: 1, max: 24 }, text: 'A little Chardonnay brightens the top of the palate.' },
              { when: { id: 'pinot', min: 60 }, text: 'Pinot Noir takes charge: red apple, raspberry skin, broad shoulders and a firm finish that stands up to food.' },
              { when: { id: 'pinot', min: 25, max: 59 }, text: 'Pinot Noir brings weight, red fruit and structure.' },
              { when: { id: 'pinot', min: 1, max: 24 }, text: 'A touch of Pinot Noir adds depth without changing the shape.' },
              { when: { id: 'meunier', min: 50 }, text: 'Meunier makes it soft, round and immediately drinkable — baked apple and pastry, no waiting required.' },
              { when: { id: 'meunier', min: 20, max: 49 }, text: 'Meunier rounds the edges and makes it generous early.' },
              { when: { id: 'meunier', min: 1, max: 19 }, text: 'A dash of Meunier softens the finish.' },
              { when: { all: [{ id: 'chardonnay', min: 20 }, { id: 'pinot', min: 20 }, { id: 'meunier', min: 20 }] }, text: 'Nothing dominates, which is the point: this is the shape most houses chase for a non-vintage, where tasting the same every year matters more than drama.' },
              { when: { id: 'chardonnay', min: 100 }, text: 'Give it ten years and the citrus turns to hazelnut and toast.' },
              { when: { all: [{ id: 'chardonnay', max: 0 }, { id: 'pinot', min: 1 }] }, text: 'No white grapes at all — deeper in colour, fuller in the mouth, and often mistaken for an older wine than it is.' }
            ]
          }
        },
        {
          type: 'prose',
          html: '<p>Three words on labels follow directly from the blend. <strong>Blanc de blancs</strong> means white wine from white grapes — in practice, Chardonnay. <strong>Blanc de noirs</strong> means white wine from black grapes: Pinot Noir, Meunier, or both. And <strong>rosé</strong> is the odd one out, because Champagne is the one significant French appellation where you are allowed to make pink wine by simply adding red wine to white.</p>'
        },
        {
          type: 'deflist',
          items: [
            { term: 'Rosé d\u2019assemblage', def: 'The common method: blend a small percentage of still red wine, usually Pinot Noir from Bouzy or Ambonnay, into the white base before bottling. Precise, repeatable, and the way nearly every house does it.' },
            { term: 'Rosé de saignée', def: 'Bleed off juice after a few hours of skin contact and ferment that. Rarer, darker, more tannic, more divisive — a fruit-driven wine rather than a tinted one.' }
          ]
        },
        {
          type: 'aside',
          title: 'The grapes nobody plants',
          html: '<p>Arbane, Petit Meslier, Pinot Blanc and Pinot Gris are all still legal, and together account for well under one percent of the vineyard. A handful of producers — Drappier, Tarlant, Laherte Frères, Aubry — make cuvées from all seven varieties, partly as a historical argument and partly because the old varieties ripen and acidify differently in a warming climate.</p><p>That last point is not nostalgia. In 2021 the appellation also authorised <em>Voltis</em>, a disease-resistant hybrid, on a trial basis with tight limits on how much can be planted and blended. A region defined by its rules is quietly testing which rules were about quality and which were about habit.</p>'
        }
      ]
    }
,

    /* ================================================================== */
    {
      id: 'winemaking',
      title: 'Winemaking style',
      navLabel: 'How it is made',
      kicker: 'The long way round: two fermentations, years of waiting, and a fair amount of work done one bottle at a time.',
      blocks: [
        {
          type: 'prose',
          html: '<p>Every sparkling wine has to get its bubbles from somewhere, and there are cheaper ways than this one. You can carry out the second fermentation in a pressurised tank and bottle the result, which is how Prosecco is made and which takes weeks. You can inject carbon dioxide, which takes minutes.</p><p>Champagne does it inside each individual bottle, then leaves the wine sitting on its dead yeast for years, then removes that yeast from every bottle one at a time. The method is called <em>méthode traditionnelle</em>, and the reason it survives is that the long contact with the yeast is where the bread, pastry and toasted-nut flavours come from. You cannot fake that part.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'process-sim',
            eyebrow: 'Step through',
            title: 'Grape to cork, eleven steps',
            intro: 'Move through the process and watch the numbers change. Pay attention to the pressure gauge at step six — that is the moment a still wine becomes Champagne.',
            caption: 'Figures are typical for a non-vintage brut. Individual houses vary enormously, especially on ageing.',
            metrics: [
              { key: 'abv', label: 'Alcohol', unit: '%', max: 13, decimals: 1 },
              { key: 'pressure', label: 'Pressure', unit: ' atm', max: 6.5, decimals: 1 },
              { key: 'sugar', label: 'Sugar added', unit: ' g/L', max: 25 },
              { key: 'age', label: 'Since harvest', unit: ' mo', max: 36 }
            ],
            steps: [
              {
                name: 'Harvest',
                short: 'Harvest',
                stage: 'September, by hand',
                where: 'In the vineyard',
                body: 'Picking by hand is not a tradition here, it is the law. Machines break the skins, and broken black skins tint the juice — which is fatal when seven vines in ten are red and the wine is meant to be white. Whole bunches go into small crates and travel to a press within the village.',
                detail: 'Around 100,000 seasonal pickers arrive for a harvest that lasts about three weeks.',
                metrics: { abv: 0, pressure: 1, sugar: null, age: 0 },
                vessel: { kind: 'press', fill: 0.55, color: '#9BAF6E' }
              },
              {
                name: 'The press',
                short: 'Press',
                stage: 'Gentle and fast',
                where: 'At the pressoir',
                body: 'Whole bunches are pressed slowly and gently so the juice runs clear. The yields are legally fixed: 4,000 kg of grapes may yield at most 2,550 litres of juice — the first 2,050 litres are the <em>cuvée</em>, the finest fraction, and the next 500 are the <em>taille</em>, coarser and more tannic.',
                detail: 'Many top producers use the taille only for their cheapest wines, or sell it on entirely.',
                metrics: { abv: 0, pressure: 1, sugar: null, age: 0 },
                vessel: { kind: 'press', fill: 0.32, color: '#E3D9A8' }
              },
              {
                name: 'First fermentation',
                short: 'Ferment',
                stage: 'Still wine, and not a nice one',
                where: 'Cellar, October',
                body: 'Each parcel ferments separately, usually in stainless steel, occasionally in old oak barrels for producers wanting more texture. What comes out is a <em>vin clair</em>: bone dry, low in alcohol, painfully high in acid, and undrinkable on its own by most standards.',
                detail: 'Whether to allow malolactic fermentation — which softens sharp malic acid into rounder lactic acid — is one of the biggest stylistic decisions a house makes, and some block it deliberately to keep the wines taut.',
                metrics: { abv: 10.5, pressure: 1, sugar: null, age: 1 },
                vessel: { kind: 'vat', fill: 0.78, color: '#DDD094', bubbles: true }
              },
              {
                name: 'Assemblage',
                short: 'Blend',
                stage: 'The real craft',
                where: 'The tasting room, January',
                body: 'The chef de cave sits down with dozens or hundreds of separate base wines — different villages, different grapes, different years — and builds the blend. Reserve wines from past vintages are the trick that lets a non-vintage taste the same every year despite the weather.',
                detail: 'Krug\u2019s Grande Cuvée is typically built from well over a hundred wines spanning a decade. Bollinger keeps reserve wines in magnums under cork. The blend is the house.',
                metrics: { abv: 10.5, pressure: 1, sugar: null, age: 5 },
                vessel: { kind: 'vat', fill: 0.7, color: '#E5D9A4' }
              },
              {
                name: 'Tirage',
                short: 'Tirage',
                stage: 'Sealed in',
                where: 'Bottling line, spring',
                body: 'The blend is bottled with a measured dose of sugar and yeast — the <em>liqueur de tirage</em>, about 24 grams of sugar per litre — and sealed with a crown cap, the same kind used on a beer bottle. Nothing visible happens for a few weeks.',
                detail: 'Roughly four grams of sugar per litre produces one atmosphere of pressure. Twenty-four grams is how you arrive at six.',
                metrics: { abv: 10.5, pressure: 1, sugar: 24, age: 7 },
                vessel: { kind: 'bottle', fill: 0.8, color: '#E5D9A4', cap: 'crown' }
              },
              {
                name: 'Prise de mousse',
                short: 'Second ferment',
                stage: 'The bubbles arrive',
                where: 'Cellar, 10–12°C',
                body: 'The yeast eats the sugar inside the sealed bottle. The alcohol rises by about 1.2%, and because the carbon dioxide cannot escape, it dissolves into the wine instead. Six to eight weeks later the bottle holds around six atmospheres — roughly three times the pressure in a car tyre.',
                detail: 'Slow and cold is better: fine, persistent bubbles come from a lazy second fermentation, not a fast one.',
                metrics: { abv: 11.8, pressure: 6, sugar: 0, age: 9 },
                vessel: { kind: 'bottle', fill: 0.8, color: '#E8DCA6', cap: 'crown', bubbles: true }
              },
              {
                name: 'Ageing on the lees',
                short: 'Lees ageing',
                stage: 'Doing nothing, on purpose',
                where: 'Stacked horizontally in the chalk',
                body: 'The yeast has finished and died, and now it slowly breaks itself down — <em>autolysis</em>. Over months and years the dead cells release compounds that give Champagne its bread crust, brioche and toasted-nut character, plus a rounder texture that softens the acid.',
                detail: 'The legal minimum is 12 months on the lees and 15 months in total for non-vintage, and 36 months for a vintage. Serious houses run to three, six or ten years.',
                metrics: { abv: 11.8, pressure: 6, sugar: 0, age: 24 },
                vessel: { kind: 'bottle', fill: 0.8, color: '#E3D49B', cap: 'crown', angle: 90, sediment: 'body' }
              },
              {
                name: 'Remuage',
                short: 'Riddling',
                stage: 'Moving the sediment',
                where: 'On pupitres, or in a gyropalette',
                body: 'All that spent yeast has to come out, so it is walked into the neck: bottles are given an eighth of a turn and tipped a little steeper, day after day, until they stand almost vertically upside down with the sediment collected against the cap.',
                detail: 'By hand on a hinged wooden rack it takes six to eight weeks; a good riddler can turn tens of thousands of bottles a day. A gyropalette — a computerised crate that shakes 500 bottles at once — does it in under a week, which is how nearly all of it is done now.',
                metrics: { abv: 11.8, pressure: 6, sugar: 0, age: 26 },
                vessel: { kind: 'bottle', fill: 0.8, color: '#E3D49B', cap: 'crown', angle: 150, sediment: 'neck' }
              },
              {
                name: 'Dégorgement',
                short: 'Disgorging',
                stage: 'Firing out the plug',
                where: 'Upside down, over a brine bath',
                body: 'The neck is dipped into freezing brine at about −25°C, which locks the sediment into a plug of ice. The bottle is turned upright and the crown cap flicked off; six atmospheres of pressure does the rest and ejects the plug in one go.',
                detail: 'Before the ice trick was worked out in the nineteenth century this was done by hand on the fly — <em>à la volée</em> — with losses to match.',
                metrics: { abv: 11.8, pressure: 6, sugar: 0, age: 27 },
                vessel: { kind: 'bottle', fill: 0.78, color: '#E3D49B', cap: 'ice', angle: 180, sediment: 'neck' }
              },
              {
                name: 'Dosage and corking',
                short: 'Dosage',
                stage: 'The last decision',
                where: 'Seconds after disgorging',
                body: 'The small volume lost is topped up with the <em>liqueur d\u2019expédition</em> — wine, sometimes old reserve wine, usually with some sugar dissolved in it. This is the last lever the producer pulls, and it sets whether the finished wine reads as bone dry or noticeably sweet.',
                detail: 'Then the real cork goes in, compressed to about half its width, and the wire cage is twisted shut with six half-turns.',
                metrics: { abv: 12, pressure: 6, sugar: 9, age: 27 },
                vessel: { kind: 'bottle', fill: 0.82, color: '#E9CE87', cap: 'cork' }
              },
              {
                name: 'Rest, then the glass',
                short: 'In the glass',
                stage: 'Three years after picking',
                where: 'Your table',
                body: 'Most producers rest the bottle for another few months so the dosage integrates and the wine settles after the shock of disgorging. Then it is finally sold — around three years after the grapes were picked, for the cheapest possible example.',
                detail: 'Pour into a white wine glass rather than a flute if you actually want to smell it, and serve at 8–10°C, not fridge-cold.',
                metrics: { abv: 12, pressure: 6, sugar: 9, age: 30 },
                vessel: { kind: 'glass', fill: 0.72, color: '#E9CE87', bubbles: true }
              }
            ]
          }
        },
        {
          type: 'aside',
          title: 'Why the bottle is that heavy',
          html: '<p>Six atmospheres is a lot to hold. Before the English worked out how to make coal-fired glass strong enough in the seventeenth century, bottles simply exploded — and in the early nineteenth century, before anyone could measure sugar accurately, cellar workers wore iron masks because losing a large share of a cellar in a season was normal.</p><p>A modern Champagne bottle weighs about 835 grams empty, with thick walls and a deep punt to spread the load. It is also the single biggest contributor to the region\u2019s carbon footprint, which is why the standard bottle quietly got lighter in 2010 and is being reduced again.</p>'
        }
      ]
    },

    /* ================================================================== */
    {
      id: 'classification',
      title: 'Classification system',
      navLabel: 'Reading the label',
      kicker: 'One appellation, seventeen grand cru villages, a sweetness ladder nobody can remember, and two letters in tiny print that tell you the most.',
      blocks: [
        {
          type: 'prose',
          html: '<p>Champagne has one appellation covering the whole region, which means the word on the front of the bottle tells you almost nothing about quality. The useful information is elsewhere on the label, and some of it is deliberately small.</p><p>The village hierarchy is the <em>échelle des crus</em> — literally the ladder of growths. It began as a price scale: grapes from the best-rated villages were bought at 100% of the agreed price, lesser villages at some percentage below. Seventeen villages rated 100% became grand cru, and forty-two rated 90–99% became premier cru. The pricing machinery behind it was dismantled in the 2000s, but the names stayed, and they are still a decent shorthand.</p>'
        },
        {
          type: 'deflist',
          items: [
            { term: 'Grand cru', def: 'The 17 top-rated villages, including Cramant, Avize, Le Mesnil-sur-Oger, Ambonnay, Bouzy, Aÿ and Verzenay. It rates the whole village, not an individual vineyard — unlike Burgundy, where a grand cru is a specific plot.' },
            { term: 'Premier cru', def: 'The next 42 villages. Reliable, and often much better value, because the word carries less weight in a shop.' },
            { term: 'Non-vintage (NV)', def: 'A blend across years, built to taste the same each time. The house style in its purest form, and about 85% of everything made.' },
            { term: 'Vintage (millésime)', def: 'A single year, declared only when the producer thinks the harvest justifies it. At least a fifth of every harvest must be held back in reserve, so no vintage can ever use the whole crop.' },
            { term: 'Prestige cuvée', def: 'The top bottling, usually a specific blend of the best parcels with very long ageing. Cristal, Dom Pérignon, Grande Cuvée, Comtes de Champagne.' }
          ]
        },
        {
          type: 'prose',
          html: '<p>The other number on the label is sweetness, and it catches people out constantly — <strong>extra dry is sweeter than brut</strong>, a leftover from the nineteenth century when almost everything was sweet and brut was the radical option. Drag through the ladder below to see what the sugar actually does.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'slider-explorer',
            eyebrow: 'Set the dosage',
            title: 'How much sugar goes back in',
            intro: 'The dosage is the last thing added before the cork. A few grams per litre change the name on the label, the taste in the glass, and what the bottle is good with.',
            caption: 'The official categories overlap, because each is defined as an upper limit rather than a band — a wine at 5 g/L can legally be sold as extra brut or brut. They are shown separately here so you can feel the difference.',
            min: 0, max: 60, step: 1, start: 9,
            unit: 'grams of sugar per litre',
            valueLabel: 'Dosage in grams per litre',
            panels: { a: 'In the glass', b: 'Pour it with' },
            ticks: [
              { at: 0, label: '0' }, { at: 6, label: '6' }, { at: 12, label: '12' },
              { at: 17, label: '17' }, { at: 32, label: '32' }, { at: 50, label: '50' }
            ],
            levels: [
              {
                from: 0, to: 3, name: 'Brut Nature', color: '#DDE7EE',
                taste: 'Nothing added at all. Stark, mineral and completely transparent — every flaw and every virtue of the base wine is on display, with no sugar to hide behind. Needs either very ripe fruit or long ageing, or it just tastes severe.',
                pairing: 'Raw oysters, sashimi, anything salty and cold. Avoid anything with chilli or noticeable sweetness, which will make it taste sour.'
              },
              {
                from: 3, to: 6, name: 'Extra Brut', color: '#E6E3CF',
                taste: 'Bone dry but no longer austere. A sliver of sugar rounds off the sharpest edge and lets the fruit through. The house style of the grower movement over the last twenty years.',
                pairing: 'Shellfish, sushi, goat cheese, fried whitebait. Excellent as the first glass of an evening.'
              },
              {
                from: 6, to: 12, name: 'Brut', color: '#E9CE87',
                taste: 'The standard, and around nine bottles in ten. Reads as dry, but the sugar is doing quiet work: filling the mid-palate, softening the acid, making the wine taste generous rather than lean.',
                pairing: 'Almost anything. Roast chicken, hard cheese, potato crisps, fish and chips. This is the flexible one.'
              },
              {
                from: 12, to: 17, name: 'Extra Dry', color: '#E4B96A',
                taste: 'Confusingly named and distinctly off-dry. Noticeably rounder, with ripe orchard fruit and a soft finish. Rare in Europe, more common in markets that like a little sweetness.',
                pairing: 'Brunch food, smoked salmon, mildly spiced dishes, anything with a sweet glaze.'
              },
              {
                from: 17, to: 32, name: 'Sec', color: '#D89E4E',
                taste: 'Sec means dry and is nothing of the sort — clearly sweet, with honeyed fruit against the acidity. A nineteenth-century style that has mostly fallen out of fashion.',
                pairing: 'Pâté, mildly spicy Asian dishes, aged hard cheeses, salty-sweet combinations.'
              },
              {
                from: 32, to: 50, name: 'Demi-Sec', color: '#C67F3A',
                taste: 'Properly sweet, and the acidity is what keeps it from being cloying. Baked apple, honey and dried apricot, with the bubbles scrubbing the sugar off the palate between sips.',
                pairing: 'Fruit tarts, foie gras, blue cheese, wedding cake. The only Champagne that genuinely works with dessert.'
              },
              {
                from: 50, to: 60, name: 'Doux', color: '#A8602A',
                taste: 'Very sweet and now almost extinct — fewer than a handful of producers still make it. In the nineteenth century this was the normal taste of Champagne, at levels that would now read as syrup.',
                pairing: 'Rich desserts, or curiosity. Mostly a historical exhibit.'
              }
            ]
          }
        },
        {
          type: 'prose',
          html: '<p>Finally, the two small letters near the bottom of the label, which tell you who actually made the wine. This is the single most useful thing on the bottle and the least advertised.</p>'
        },
        {
          type: 'deflist',
          items: [
            { term: 'NM — négociant manipulant', def: 'A house that buys in grapes and makes wine from them. Every famous name is an NM. Scale, consistency and blending across the whole region.' },
            { term: 'RM — récoltant manipulant', def: 'A grower making wine from their own fruit. Smaller, more variable, more tied to one place. Usually where the interesting value is.' },
            { term: 'CM — coopérative de manipulation', def: 'A co-operative making wine from its members\u2019 grapes. Often the source of supermarket own-label Champagne, and frequently decent.' },
            { term: 'RC — récoltant coopérateur', def: 'A grower selling wine that was made at the co-op under their own name.' },
            { term: 'MA — marque d\u2019acheteur', def: 'A buyer\u2019s own brand. The name on the label owns the brand, not the wine. This is what a supermarket label usually is.' }
          ]
        },
        {
          type: 'aside',
          title: 'The one date worth looking for',
          html: '<p>Some producers print the disgorgement date on the back label. It matters because the clock on a Champagne\u2019s post-disgorgement life starts then, not at bottling: a wine disgorged six months ago will taste younger and tighter than the same wine disgorged four years ago.</p><p>If you find two bottles of the same cuvée with different disgorgement dates, buy both. It is the cheapest wine experiment there is.</p>'
        }
      ]
    },

    /* ================================================================== */
    {
      id: 'pairing',
      title: 'Food pairing',
      navLabel: 'With food',
      kicker: 'High acid, fine bubbles and a savoury finish — the reason it handles fried food better than almost any white wine.',
      blocks: [
        {
          type: 'prose',
          html: '<p>Champagne\u2019s reputation as a celebration drink has done it real damage at the table, because it is one of the most useful food wines there is and most of it gets drunk on an empty stomach at the wrong temperature.</p><p>Three things make it work. The acidity is high, which cuts through fat the way a squeeze of lemon does. The carbon dioxide physically scrubs the palate between mouthfuls, which is why it handles anything fried or fatty. And the years on the lees leave a savoury, bready, nutty core that bridges to toasted and roasted flavours in the food — a bridge that a simple crisp white does not have.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'pairing-lab',
            eyebrow: 'Match a style',
            title: 'The pairing bench',
            intro: 'Pick a style of Champagne and see what it is actually built for. The dimmed dishes are not disasters — they are just not what that bottle is for.',
            caption: 'The dimmed dishes are not clashes, just not what that bottle is for. Rule of thumb when stuck: the leaner and more mineral the wine, the colder and saltier the food should be.',
            missText: 'The dimmed dishes are not clashes, just not what that bottle is for.',
            styles: [
              { id: 'bdb', name: 'Blanc de Blancs', sub: 'all Chardonnay' },
              { id: 'brut', name: 'Brut NV', sub: 'the house blend' },
              { id: 'bdn', name: 'Blanc de Noirs', sub: 'black grapes only' },
              { id: 'rose', name: 'Rosé', sub: 'pink, and food-friendly' },
              { id: 'vintage', name: 'Aged vintage', sub: 'eight years and up' },
              { id: 'demisec', name: 'Demi-Sec', sub: 'properly sweet' }
            ],
            dishes: [
              {
                name: 'Raw oysters',
                pairs: {
                  bdb: { v: 'perfect', why: 'The textbook pairing, and it earns it: chalk-grown Chardonnay has a saline edge that meets the brine instead of fighting it.' },
                  brut: { v: 'good', why: 'Works fine. Slightly rounder and less precise than a blanc de blancs, but nobody will complain.' }
                }
              },
              {
                name: 'Fish and chips',
                pairs: {
                  brut: { v: 'perfect', why: 'Acid and bubbles strip the batter fat off the palate between bites. This is the pairing that converts sceptics.' },
                  bdn: { v: 'good', why: 'Enough weight to stand up to the fish, though it loses a little of the cutting edge.' }
                }
              },
              {
                name: 'Salted crisps',
                pairs: {
                  brut: { v: 'perfect', why: 'Salt makes the wine taste fruitier and rounder; fat makes the acid feel refreshing rather than sharp. Absurdly effective.' },
                  bdb: { v: 'good', why: 'Also excellent, if slightly wasted on a crisp.' }
                }
              },
              {
                name: 'Sushi and sashimi',
                pairs: {
                  bdb: { v: 'perfect', why: 'Delicate, clean and salty, with nothing to overwhelm. A low-dosage blanc de blancs is close to ideal.' },
                  rose: { v: 'good', why: 'Handles fattier fish — salmon, toro — where a leaner wine gets lost.' }
                }
              },
              {
                name: 'Comté, aged 18 months',
                pairs: {
                  vintage: { v: 'perfect', why: 'Both have gone nutty and savoury with age. The wine\u2019s autolytic character and the cheese\u2019s crystalline sweetness meet exactly in the middle.' },
                  bdb: { v: 'good', why: 'A younger, tighter version of the same idea.' }
                }
              },
              {
                name: 'Chaource or Langres',
                pairs: {
                  brut: { v: 'perfect', why: 'Both are local cheeses from the region — soft, lactic, faintly sour. Champagne and its own cheeses were designed by the same weather.' },
                  bdn: { v: 'good', why: 'The extra body copes well with the richer, washed-rind end of the pairing.' }
                }
              },
              {
                name: 'Roast chicken',
                pairs: {
                  bdn: { v: 'perfect', why: 'Pinot-driven weight and red-fruit depth against roasted skin and dark meat. Far better than most people expect.' },
                  vintage: { v: 'good', why: 'An older wine\u2019s mushroom and toast notes lean into the roasting flavours.' }
                }
              },
              {
                name: 'Mushroom risotto',
                pairs: {
                  vintage: { v: 'perfect', why: 'Aged Champagne develops genuine mushroom and truffle character. This is the pairing that shows why people age it.' },
                  bdn: { v: 'good', why: 'Plenty of body to carry the dish without the earthy notes of age.' }
                }
              },
              {
                name: 'Charcuterie and jambon de Reims',
                pairs: {
                  rose: { v: 'perfect', why: 'The small addition of red wine gives just enough red fruit and grip to handle cured pork and fat.' },
                  bdn: { v: 'good', why: 'Weight and structure do the same job from a different direction.' }
                }
              },
              {
                name: 'Seared duck breast',
                pairs: {
                  rose: { v: 'perfect', why: 'One of the few white-adjacent wines that genuinely works with duck: red fruit for the meat, acid and bubbles for the fat.' },
                  vintage: { v: 'good', why: 'Needs to be a Pinot-dominant vintage with some age, but it works.' }
                }
              },
              {
                name: 'Strawberries and cream',
                pairs: {
                  demisec: { v: 'perfect', why: 'Sweetness in the glass has to match or exceed sweetness on the plate, or the wine tastes sour. This is what demi-sec is for.' },
                  rose: { v: 'good', why: 'Works if the fruit is barely sweetened — the red-berry note echoes the strawberries.' }
                }
              },
              {
                name: 'Foie gras',
                pairs: {
                  demisec: { v: 'perfect', why: 'Sugar against richness, acid and bubbles against fat. A cleaner match than the usual sweet white, and considerably more refreshing.' },
                  vintage: { v: 'good', why: 'A drier, more savoury take that works if you would rather cut the fat than frame it.' }
                }
              }
            ]
          }
        },
        {
          type: 'aside',
          title: 'Two practical fixes',
          html: '<p><strong>Stop using flutes.</strong> A narrow flute preserves the look of the bubbles and hides everything you would otherwise smell. A normal white wine glass, filled a third of the way, makes a good Champagne taste noticeably better and a mediocre one taste no worse.</p><p><strong>Stop serving it freezing.</strong> At 4°C you taste nothing but cold and acid. Aim for 8–10°C — about twenty minutes out of the fridge, or thirty minutes in ice water rather than three hours in the door of the fridge.</p>'
        }
      ]
    }
,

    /* ================================================================== */
    {
      id: 'history',
      title: 'History',
      navLabel: 'History',
      kicker: 'A flawed wine from a cold place became the most famous bottle on earth, mostly on purpose.',
      blocks: [
        {
          type: 'prose',
          html: '<p>For most of its history Champagne made still wine, and it was not especially good. What it had was location: the region sat on the trade route to Flanders and on the road to Reims, where French kings were crowned, which gave its wines a reputation out of proportion to their quality.</p><p>The bubbles began as a fault. In a cold cellar the fermentation would stall over winter and restart in spring once the wine was already in barrel or bottle, producing gas that nobody wanted. It took the English, an English scientific paper, two centuries of engineering and one extremely good marketing widow to turn that fault into an industry.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'timeline',
            eyebrow: 'Step through',
            title: 'How the accident became the plan',
            intro: 'Twelve moments that turned a failed still wine into the most protected name in drink.',
            events: [
              {
                year: '1st c.',
                title: 'The Romans dig the cellars first',
                text: 'Gallo-Roman quarrymen cut deep pyramidal pits into the chalk under Reims to extract building stone. Centuries later those <em>crayères</em> are joined up into hundreds of kilometres of galleries at a constant 10–12°C — the finest wine cellars in Europe, dug by people looking for something else.'
              },
              {
                year: '1027',
                title: 'Kings are crowned at Reims',
                text: 'Reims becomes the established coronation city of French monarchs. The local wine is what gets served, and for the next six hundred years Champagne trades on the reputation of being the wine of kings — while still being a pale, thin, non-sparkling red.'
              },
              {
                year: '1662',
                title: 'An Englishman writes the bubbles down',
                text: 'Christopher Merret presents a paper to the Royal Society describing how adding sugar to wine makes it brisk and sparkling. England had coal-fired glass furnaces producing bottles strong enough to hold the pressure, and a supply of Iberian cork. The technique is documented in London decades before it is deliberate in France.'
              },
              {
                year: '1668',
                title: 'Dom Pérignon takes the job at Hautvillers',
                text: 'A Benedictine monk becomes cellarer at the abbey of Hautvillers and spends 47 years there. He did not invent sparkling wine — he spent much of his career trying to prevent it. His actual legacy is enormous anyway: blending across parcels, pressing black grapes gently enough to get white juice, and a standard of cleanliness nobody else bothered with.'
              },
              {
                year: '1729',
                title: 'The first house opens',
                text: 'A royal decree finally permits wine to be shipped in bottles rather than barrels, which makes a sparkling business possible at all. Ruinart is founded in Reims the same year, the first Champagne house. Moët follows in 1743, Clicquot in 1772.'
              },
              {
                year: '1816',
                title: 'Madame Clicquot invents the riddling table',
                text: 'Barbe-Nicole Clicquot Ponsardin, widowed at 27 and running the firm herself, works with her cellar master Antoine de Müller on a way to get the dead yeast out without losing the wine: holes cut in a kitchen table, bottles turned by hand a little each day. The <em>pupitre</em> is still in use, and the process is still called riddling.'
              },
              {
                year: '1836',
                title: 'Someone finally measures the sugar',
                text: 'Jean-Baptiste François, a pharmacist in Châlons, publishes a method for measuring residual sugar so the right amount can be added at bottling. Before this, bottles exploded at a catastrophic rate and cellar workers wore iron masks. This is the unglamorous invention that made Champagne an industry rather than a gamble.'
              },
              {
                year: '1874',
                title: 'The British ask for it dry',
                text: 'Champagne had always been sweet — often startlingly so. British buyers develop a taste for something drier, and Pommery ships a genuinely dry cuvée in 1874 that becomes the template. Brut wins, and stays won for the next 150 years.'
              },
              {
                year: '1890s',
                title: 'Phylloxera arrives',
                text: 'The root louse that destroyed French viticulture reaches Champagne last, decades after the south. The entire region is eventually replanted on grafted American rootstock — the same solution used everywhere, and the reason nearly every vine you see today is two plants joined together.'
              },
              {
                year: '1911',
                title: 'The growers riot',
                text: 'After years of fraud — wine trucked in from the Loire and sold as Champagne — and a bitter argument over whether the Aube belonged in the region at all, growers revolt. Cellars are sacked and burned in Aÿ and Damery, and 40,000 troops are sent into the vineyards. The boundary fight is settled by law in 1927, with the Aube included.'
              },
              {
                year: '1936',
                title: 'The appellation, then the committee',
                text: 'Champagne becomes a protected AOC. Five years later, under German occupation, growers and houses form the CIVC to negotiate as one body — an organisation that survives the war and still sets harvest dates, yields and rules for the entire region today.'
              },
              {
                year: '2015',
                title: 'Growers, low dosage, and a warming region',
                text: 'The hillsides, houses and cellars of Champagne are listed as a UNESCO World Heritage site. Meanwhile the real story is elsewhere: a generation of growers bottling their own single-parcel wines, dosage levels falling as fruit ripens more easily, and a region built on marginal cold starting to work out what it becomes when the cold goes.'
              }
            ]
          }
        },
        {
          type: 'pull',
          text: 'It was sold as the wine of kings for six hundred years before it had a single bubble in it.',
          cite: 'Reims, coronation city'
        }
      ]
    },

    /* ================================================================== */
    {
      id: 'producers',
      title: 'Notable producers',
      navLabel: 'Producers',
      kicker: 'The famous houses, the growers worth hunting down, and the co-op behind a lot of the wine you have already drunk.',
      blocks: [
        {
          type: 'prose',
          html: '<p>Champagne splits into two worlds. The <strong>houses</strong> buy grapes from hundreds of growers across the region and blend for consistency — they are brands in the proper sense, and their skill is making the same wine every year out of different weather. The <strong>growers</strong> make wine only from their own land, which means more variation, more sense of a specific place, and usually a better bottle for the money.</p><p>Neither is better in the abstract. But if you have only ever drunk the four names everyone knows, the growers are where the surprises are.</p>'
        },
        {
          type: 'ix',
          element: {
            type: 'producer-cards',
            eyebrow: 'Who to drink',
            title: 'Fourteen worth knowing',
            intro: 'Filter by type. The two letters after each name are the producer code from the label.',
            caption: 'Not a best-of list — a map of the different things Champagne can be.',
            filters: [
              { id: 'house', label: 'Houses' },
              { id: 'grower', label: 'Growers' },
              { id: 'coop', label: 'Co-operatives' }
            ],
            items: [
              { name: 'Krug', code: 'NM', place: 'Reims', group: 'house', note: 'Ferments every base wine separately in small old oak casks, then blends more than a hundred of them across a decade for the Grande Cuvée. The most deliberately complicated wine in the region.', try: 'Grande Cuvée, if the budget allows' },
              { name: 'Bollinger', code: 'NM', place: 'Aÿ', group: 'house', note: 'Pinot-dominant, barrel-fermented, and famously keeps reserve wines in magnums under cork rather than in tank. Broad, savoury and structured rather than pretty.', try: 'Special Cuvée' },
              { name: 'Louis Roederer', code: 'NM', place: 'Reims', group: 'house', note: 'Owns an unusually large share of the vineyards it uses, much of it now biodynamic, which is rare for a house at this scale. Precise and increasingly serious.', try: 'Collection, or Cristal for the occasion' },
              { name: 'Pol Roger', code: 'NM', place: 'Épernay', group: 'house', note: 'Churchill\u2019s house, and still one of the few that riddles a portion of its production by hand. Elegant, restrained, consistently underrated.', try: 'Brut Réserve' },
              { name: 'Charles Heidsieck', code: 'NM', place: 'Reims', group: 'house', note: 'Ages far longer than the rules require and blends in a very high proportion of reserve wine, giving a rich, toasty, almost savoury style. Cellars in the Gallo-Roman crayères.', try: 'Brut Réserve' },
              { name: 'Billecart-Salmon', code: 'NM', place: 'Mareuil-sur-Aÿ', group: 'house', note: 'Cold-settles the juice and ferments slowly and cool, which gives an unusually delicate, fine-boned style. Its rosé is the benchmark most others are measured against.', try: 'Brut Rosé' },
              { name: 'Taittinger', code: 'NM', place: 'Reims', group: 'house', note: 'Chardonnay-led where most houses are Pinot-led, which makes the style lighter and more floral. Cellars sit in the chalk beneath the ruins of Saint-Nicaise abbey.', try: 'Comtes de Champagne Blanc de Blancs' },
              { name: 'Jacques Selosse', code: 'RM', place: 'Avize', group: 'grower', note: 'Anselme Selosse applied Burgundian thinking — low yields, oak, oxidative handling, solera-style reserves — and effectively started the entire grower movement. Divisive, expensive, impossible to ignore.', try: 'Initial, if you can find it' },
              { name: 'Pierre Péters', code: 'RM', place: 'Le Mesnil-sur-Oger', group: 'grower', note: 'Six generations of Chardonnay on grand cru chalk, with a perpetual reserve running back decades. Among the purest expressions of the Côte des Blancs.', try: 'Cuvée de Réserve Blanc de Blancs' },
              { name: 'Egly-Ouriet', code: 'RM', place: 'Ambonnay', group: 'grower', note: 'Very ripe Pinot Noir, very low yields and very long lees ageing — often double the legal minimum. Powerful, vinous Champagne that drinks like fine red wine with bubbles.', try: 'Brut Tradition Grand Cru' },
              { name: 'Agrapart & Fils', code: 'RM', place: 'Avize', group: 'grower', note: 'Soil-obsessed blanc de blancs, some parcels ploughed by horse, each cuvée built to show a different depth of chalk. As close as Champagne gets to a Burgundian climat argument.', try: 'Les 7 Crus' },
              { name: 'Larmandier-Bernier', code: 'RM', place: 'Vertus', group: 'grower', note: 'Biodynamic since the 1990s, minimal dosage, long ageing. Made the case early that Champagne could be a wine of place rather than a product of blending.', try: 'Latitude Blanc de Blancs' },
              { name: 'Chartogne-Taillet', code: 'RM', place: 'Merfy', group: 'grower', note: 'Alexandre Chartogne farms a village north of Reims that had been written off, bottling individual parcels — including plots of the near-extinct Arbane and Petit Meslier.', try: 'Cuvée Sainte Anne' },
              { name: 'Nicolas Feuillatte', code: 'CM', place: 'Chouilly', group: 'coop', note: 'The brand of a vast co-operative drawing on thousands of growers, and one of the biggest producers in the region. Proof that co-operative Champagne can be genuinely good at a sane price.', try: 'Réserve Exclusive Brut' }
            ]
          }
        },
        {
          type: 'aside',
          title: 'How to buy well',
          html: '<p>Three habits get you better bottles without spending more. Look for <strong>RM</strong> in the small print if you want individuality, or a <strong>premier cru</strong> village if you want grand-cru quality at a discount on the word rather than the wine. Buy from a shop that stores bottles lying down and out of the light. And when a wine you like comes in both non-vintage and vintage, taste the non-vintage first — it is the house showing you its actual style.</p>'
        }
      ]
    }
  ],

  /* ==================================================================== */
  quiz: {
    title: 'Check yourself',
    kicker: 'Eight questions. Everything here is somewhere above.',
    perfect: 'All eight. You can order confidently and explain why to whoever you are with.',
    good: 'Good. The mechanics have landed — the details will stick after a bottle or two.',
    tryAgain: 'Worth another pass. Every answer is in the sections above.',
    questions: [
      {
        q: 'What proportion of Champagne\u2019s vineyard is planted to black grapes?',
        options: ['Almost none — it is a white wine region', 'About a third', 'About seven parts in ten', 'Exactly half'],
        answer: 2,
        why: 'Pinot Noir is around 38% of plantings and Meunier around 31%, so roughly 70% of the vineyard is black grapes. The juice runs colourless because the fruit is pressed whole, quickly and gently.'
      },
      {
        q: 'Where does the second fermentation happen?',
        options: ['In a pressurised steel tank', 'Inside the individual sealed bottle', 'In oak barrels', 'In the vineyard, before harvest'],
        answer: 1,
        why: 'That is what méthode traditionnelle means. Tank fermentation is the Charmat method used for Prosecco — faster and cheaper, but it does not give the wine years of contact with its own dead yeast.'
      },
      {
        q: 'Which is sweeter: brut or extra dry?',
        options: ['Brut', 'Extra dry', 'They are identical', 'It depends on the vintage'],
        answer: 1,
        why: 'Extra dry sits at 12–17 g/L of sugar; brut is under 12. The naming is a nineteenth-century leftover from when almost all Champagne was sweet and brut was the radical dry option.'
      },
      {
        q: 'What is remuage?',
        options: ['Blending the base wines', 'Adding sugar and yeast at bottling', 'Turning and tilting bottles to move sediment into the neck', 'Topping the bottle up after disgorging'],
        answer: 2,
        why: 'Riddling in English. Bottles get an eighth of a turn and a steeper tilt repeatedly until the spent yeast collects against the cap, ready to be frozen and fired out.'
      },
      {
        q: 'Why is the chalk underneath the vines so useful?',
        options: ['It adds a chalky flavour directly to the wine', 'It holds water and releases it slowly, while still draining', 'It keeps the vine roots near the surface', 'It raises the sugar content of the grapes'],
        answer: 1,
        why: 'Chalk can hold around a quarter of its volume in water and give it back gradually through summer, while still draining in a wet autumn. It does not travel into the glass as flavour — it shapes the vine, which shapes the wine.'
      },
      {
        q: 'A label says RM in small letters. What does that tell you?',
        options: ['It is a reserve wine', 'It was made by a grower from their own grapes', 'It is a rosé made by blending', 'It has been aged for a minimum of ten years'],
        answer: 1,
        why: 'Récoltant manipulant — a grower who makes wine from fruit they farmed themselves. NM is a house buying in grapes, and CM is a co-operative.'
      },
      {
        q: 'Roughly how much pressure is inside a finished bottle?',
        options: ['About 1 atmosphere', 'About 3 atmospheres', 'About 6 atmospheres', 'About 20 atmospheres'],
        answer: 2,
        why: 'Around six, or three times a typical car tyre. It comes from about 24 g/L of sugar added at tirage, at a rate of roughly one atmosphere per four grams.'
      },
      {
        q: 'What does grand cru refer to in Champagne?',
        options: ['A single named vineyard plot', 'An entire village', 'A minimum ageing period', 'A specific blend of all three grapes'],
        answer: 1,
        why: 'Unlike Burgundy, the rating applies to the whole village. Seventeen villages hold it, from an old price ladder — the échelle des crus — whose pricing machinery was dismantled in the 2000s.'
      }
    ]
  },

  /* ==================================================================== */
  games: [
    {
      title: 'Cellar match',
      navLabel: 'Match game',
      kicker: 'Eight bits of Champagne vocabulary against what they actually mean. Tap one on each side to pair them.',
      element: {
        type: 'match-game',
        leftLabel: 'The word',
        rightLabel: 'What it means',
        perfect: 'Eight from eight with no misses. That is the whole working vocabulary of a Champagne cellar.',
        okay: 'All matched. Run it again for a clean sweep.',
        pairs: [
          { a: 'Assemblage', b: 'Blending wines across villages, grapes and years' },
          { a: 'Tirage', b: 'Bottling with sugar and yeast added' },
          { a: 'Prise de mousse', b: 'The second fermentation, inside the sealed bottle' },
          { a: 'Remuage', b: 'Turning bottles to move sediment into the neck' },
          { a: 'Dégorgement', b: 'Freezing the neck and firing the plug out' },
          { a: 'Dosage', b: 'The final top-up that sets the sweetness' },
          { a: 'Autolyse', b: 'Dead yeast breaking down into bread flavours' },
          { a: 'Crayères', b: 'Roman chalk pits used as cellars' }
        ]
      }
    },
    {
      title: 'Blind glass',
      navLabel: 'Guess it',
      kicker: 'Four glasses, three clues each. Guess from the first clue for three points, the second for two, the third for one.',
      element: {
        type: 'clue-guess',
        perfect: 'First clue every time. Slightly alarming.',
        okay: 'Solid work. Fewer clues next time.',
        rounds: [
          {
            answer: 'Blanc de Blancs',
            options: ['Blanc de Blancs', 'Blanc de Noirs', 'Rosé de saignée', 'Demi-Sec'],
            clues: [
              'One grape variety only, and it is a white one.',
              'The best examples come from an east-facing chalk escarpment running south from Épernay.',
              'Lemon peel and chalk dust at three years; hazelnut and toast at fifteen.'
            ],
            why: 'Blanc de blancs — white wine from white grapes, meaning Chardonnay, and at its most precise on the Côte des Blancs.'
          },
          {
            answer: 'Brut Nature',
            options: ['Brut Nature', 'Sec', 'Extra Dry', 'Demi-Sec'],
            clues: [
              'Absolutely nothing is added after the yeast plug is fired out.',
              'Under three grams of sugar per litre.',
              'It either needs very ripe fruit or a long time on the lees, or it tastes severe.'
            ],
            why: 'Brut nature, sometimes labelled zéro dosage or brut zéro. No sugar to hide behind, which is exactly why some producers love it and others avoid it.'
          },
          {
            answer: 'Meunier',
            options: ['Meunier', 'Pinot Noir', 'Chardonnay', 'Arbane'],
            clues: [
              'It buds late and ripens early, so it dodges spring frost at both ends.',
              'It dominates the cold clay slopes of a river valley running west from Épernay.',
              'For decades it was the grape the houses relied on and never printed on the label.'
            ],
            why: 'Meunier — about 31% of the vineyard, the reason a young non-vintage tastes generous, and now finally taken seriously in its own right.'
          },
          {
            answer: 'Grand Cru',
            options: ['Grand Cru', 'Premier Cru', 'Grande Marque', 'Tête de Cuvée'],
            clues: [
              'It rates a whole village, not an individual vineyard.',
              'Exactly seventeen places in the region hold it.',
              'It came from a price ladder that was dismantled in the 2000s, but the words stayed on the labels.'
            ],
            why: 'Grand cru — the 17 villages once rated at 100% on the échelle des crus. Premier cru covers the 42 rated between 90 and 99%.'
          }
        ]
      }
    }
  ]
});
