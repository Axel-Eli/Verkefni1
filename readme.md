# Vefforritun 2 2026 — Verkefni 1

## Lýsing

Vefur sem birtir íslenskar trivia-spurningar úr `questions.csv`, flokkaðar og birtar sem statískar HTML síður með einföldu svara-UI á hverri flokkasíðu.

- Ástæða: Að byggja léttan, hraðan og aðgengilegan vef úr stóru CSV gagnasafni.
- Hvers vegna: Til að æfa gagnavinnslu í Node.js og uppsetningu á einföldu byggingarferli.
- Vandamál: Sía og birta stóran spurningalista á skipulagðan hátt með notendavænni framsetningu.
- Lært: CSV-parsing, gagnahreinsun, HTML/CSS uppbygging og einfalda JS virkni fyrir notendur.

## Efnisyfirlit

- [Uppsetning](#uppsetning)
- [Notkun](#notkun)
- [Eiginleikar](#eiginleikar)
- [Prófanir](#profanir)

## Uppsetning

```bash
npm install
```

## Notkun

Byggir `dist/` (býr til HTML og afritar `public/`):

```bash
npm run build
```

Þróunarþjónn með sjálfvirkri uppfærslu:

```bash
npm run dev
```

## Eiginleikar

- Flokkun spurninga og statískar HTML síður.
- Svar birtist eftir að notandi biður um það.
- Rétt/rangt takkar með teljara á hverri síðu.

## Prófanir

```bash
npm run test
npm run test:coverage
```
## Github readme layout

https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide