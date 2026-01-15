# Vefforritun 2 2026, verkefni 1

## Markmið

- HTML og CSS Upprifjun úr vefforritun 1.
- Ósamstillt forritun með Node.js og notkun á innbyggðum módúlum.
- Vinnsla með gögn og staðfestingu á þeim.
- Prófanir á Node.js kóða.

## Verkefnið

Í GitHub repoinu [is-trivia-questions](https://github.com/sveinn-steinarsson/is-trivia-questions) er listi af yfir 11.000 spurningum á íslensku í [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) skrá.

Verkefnið snýst um að útbúa lítinn vef sem birtir spurningar úr þessum lista, það er er í grunninn tvíþætt:

- Lestur á þessum gögnum með Node.js, vinnsla á þeim og að skrifa út HTML.
- Ákveða form HTML, útbúa CSS til að þær líti sæmilega út og smíða JavaScript virkni til að fylgjast með hvort notandi svarar rétt eða ekki.

Skrifa skal allan kóða, ekki skal nota forritasöfn frá t.d. NPM (fyrir utan þau em nefnd eru hér eða gefin í verkefni). Í raunverulegu verkefni myndum við forritasöfn en markmið þessa verkefnis er að snerta á hinum ýmsu hlutum sem í grunninn koma með Node.js og upprifjun á HTML, CSS og JavaScript.

### Lestur og vinnsla gagna

Sækja skal [`questions.csv`](https://github.com/sveinn-steinarsson/is-trivia-questions/blob/master/questions.csv) skjalið og vista á vél.

Skoða skal gögn og skjölun um hvernig þau eru uppsett.

Skrifa skal forrit sem:

1. Les inn `questions.csv` í minni.
2. Fyrir hverja línu í skjali vinnur þá línu:
   1. Býr til hlut (object) sem inniheldur þáttuð (parsed) gögn þeirrar línu.
   2. Meðhöndla þarf hvernig gögn eru kóðuð og hvort þau séu valfrjáls eða ekki.
   3. Bæta þeim við fylki (array).
3. Miðað við fylkið skal taka út ákveðið hlutmengi af spurningum:
   1. Að hámarki 100 spurningar úr hverjum flokki.
   2. Að minnsta kosti spurningu, svar og flokk.
   3. Flokkun sem þið megið velja.
4. Skrifa HTML fyrir forsíðu og hvern flokk:
   1. Forsíða inniheldur einhvern inngangstexta og hlekki á allar flokkasíður.
   2. Hver flokkasíðu inniheldur allar spurningar og svör.

Fyrir flokkun:

1. Aðeins spurningar með ákveðið erfiðleikastig.
2. Aðeins spurningar með ákveðið gæðastig.
3. Annað sem ykkur dettur í hug.

Fyrir fasta er æskilegt að setja það í einhverja fasta (t.d. `const MAX_QUESTIONS_PER_CATEGORY = 100`) í staðinn fyrir að hafa [„galdra tölur“](<https://en.wikipedia.org/wiki/Magic_number_(programming)>).

Athugið að gögnin eru ekki fullkomin, þau geta innihaldið villur, auka gögn eða gögn sem ekki passa við gefnar gagnatýpur. Ef villa er til staðar í gögnum (þ.e.a.s. gögn uppfylla ekki það sem skilgreint er að ofan) skal hunsa það og birta upplýsingar um það í `console`.

Allan forritskóða skal hafa í `./src/` möppu og keyrðann með `./src/generate.js`. Í `./src/lib` skal vera kóði sem keyrir ákveðna virkni ásamt prófum fyrir það, sjá það sem gefið er.

### Birting gagna

Eftir lestur og vinnslu skal útbúa HTML skrár sem birta gögnin. Þær skulu vera í möppunni `dist/` og vera:

- `index.html`, forsíða sem hefur einhvern lýsingartexta (í versta falli `lorem ipsum` texta) ásamt tenglum á alla gefna flokka.
- `<flokkur>.html`, síður sem passa við spurningaflokka.
  - Þar sem flokkar eru á íslensku getur verið gott að útbúa [„slug“](https://en.wikipedia.org/wiki/Clean_URL#Slug) í staðinn og nota sem heiti.

Huga skal að merkingarfræði og aðgengi HTML og velja viðeigandi element.

Þar sem gögn innan `dist/` möppu eru _afleidd_ frá því sem er í `data/` möppu skal **ekki** setja þær inn í Git og hunsa þær með `.gitignore` (sjá gefna `.gitignore` skrá).

Þegar unnið er með HTML í gegnum [_template strings_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) getur verið gott að nota extension sem virkjar syntax hightlight, t.d. [`Comment tagged template`](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates) fyrir vscode. Þá þarf að merkja með athugasemd fyrir framan strenginn:

```javascript
const html = /* html */ `
  <div>
    <h1>Titill</h1>
  </div>
`;
```

Með CSS skal setja upp _einfalt_ útlit á vefnum með flexbox eða grid. Takmarka heildarstærð og vera _responsive_.

Forsíða skal hafa lista af spurningaflokkum með hlekk á síðu fyrir spurningaflokk.

Fyrir hverja spurningu skal ekki birta svar strax (þetta er hægt að leysa með HTML) en eftir að svar hefur verið birt skulu vera tveir takkar, annar til að merkja að notandi hafi svarað rétt og hinn vitlaust. Á einhvern hátt skal notandi geta séð fjölda réttra og rangra svara. Þetta þarf eingöngu að vera á hverri síðu og þarf ekki að fylgja notanda á öllum vef eða vistast á nokkurn máta.

CSS og JavaScript skal geyma í `./public` möppu og fært yfir í `./dist` möppu þegar build ferli er keyrt.

### Prófanir

Í verkefni skal skrifa próf með [Node.js test runner](https://nodejs.org/docs/latest-v24.x/api/test.html).

Allar skrár með kóða í `./src/lib` möppu skulu hafa test og line coverage skal vera a.m.k. 50% í heildina. Þetta á við node.js kóða, ekki þarf að telja með þann kóða sem keyrður er úr CLI/gegnum `build` scriptu.

Ekki er krafa um að skrifa test fyrir kóða á framenda.

Setja skal upp keyrslu á testum með [GitHub Actions](https://docs.github.com/en/actions) þannig að þau keyra sjálfkrafa þegar commitað er á GitHub á `main` branch, eða í pull requestum. Förum yfir þetta saman í fyrirlestri.

### Uppsetning á verkefni

Nota skal Node.js 24 og NPM.

Nota skal það einfalda build ferli sem gefið er.

Aðeins skal nota ECMAScript modules (ESM, `import` og `export`) og ekki CommonJS (`require`).

Setja skal upp `eslint`, engar villur eða viðvaranir skulu vera til staðar.

Uppsetning á `package.json` skrá:

- `name`, `version`, `description`, `author` og `license` eru sett upp sjálfkrafa við að keyra `npm init`.
- [`"type": "module"`](https://nodejs.org/api/packages.html#type) skilgreinir að við notum ECMAScript modules.
- [`main`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#main) skilgreinir inngang í forritið sem `"main": "src/generate.js"`, en það í raun er ekki notað þar sem þetta er ekki pakki fyrir aðra til að nota.
- [`engines`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#engines) skilgreinir að við notum `node` útgáfu 24.
- [`scripts`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#scripts) skilgreinir skipanir sem við getum keyrt með `npm run`:
  - `build` keyrir ferli sem útbýr vefinn með því að keyra eftirfarandi skipanir í röð (með `npm-run-all` í _serial mode_):
    - `clean` eyðir `dist` möppu ef til með `rimraf` pakkanum,
    - `generate` býr til `dist` möppu (óútfært),
    - `copy-public` afritar `public` möppu yfir í `dist` möppu.
  - `dev` keyrir einfaldann vefþjón með gamla góða `browser-sync`, hjálplegt meðan við erum að vinna HTML, CSS og JavaScript hluta.
  - `test` keyrir prófanir.
  - `test:watch` keyrir prófanir ítrekað meðan unnið er.
  - `test:coverage` keyrir prófanir og birtir _code coverage_.
  - `lint` keyrir `eslint` sem var upphaflega uppsett með `npm init @eslint/config@latest` og athugar JavaScript og CSS skrár.
- [`dependencies`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#dependencies) skilgreinir hvaða pakka við notum í keyrslu.
- [`devDependencies`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devdependencies) skilgreinir hvaða pakka við notum í þróun (_development_).

### Hýsing

Setja skal upp vefinn með niðurstöðum á Netlify tengt við GitHub. Við hvert commit ætti GitHub action að keyra lint og test, Netlify ætti að keyra `build` scriptu og birta vefinn.

## Mat

- 30% — Lestur og vinnsla gagna.
- 30% — Birting gagna.
- 20% — Prófanir.
- 10% — Uppsetning á verkefni.
- 10% — Hýsing.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðvikudaginn 14. janúar 2026.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 29. janúar 2026.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Netlify.
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - Koma seinna

## Aðstoð

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ekki er heimilt að nota stór mállíkön til að vinna verkefni í námskeiðinu, [sjá nánar um notkun](https://github.com/vefforritun/vef2-2026/blob/main/mallikon.md).

## Einkunn

Sett verða fyrir ([sjá nánar í kynningu á áfanga](https://github.com/vefforritun/vef2-2026/blob/main/namsefni/01.kynning/1.kynning.md)):

- fimm minni sem gilda 10% hvert, samtals 50% af lokaeinkunn.
- tvö hópverkefni þar sem hvort um sig gildir 20%, samtals 40% af lokaeinkunn.
- einstaklingsverkefni sem gildir 15–25% af lokaeinkunn.

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
