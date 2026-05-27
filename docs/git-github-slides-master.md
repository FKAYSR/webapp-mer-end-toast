---
marp: true
theme: default
paginate: true
title: Git og GitHub Master Slides
---

# Git og GitHub Master Slides

Komplet sæt til undervisning i dette projekt  
React Router SPA + VS Code Source Control + GitHub Desktop + GitHub Pages

---

# Agenda

1. Begreber
2. Git basics i praksis
3. VS Code Source Control + GitHub Desktop
4. Branching, Pull Request, review, merge
5. Deployment og samarbejdsregler
6. Fejl, konflikter og gode vaner

---

# Hvad er Git?

- Et distribueret versionsstyringssystem
- Gemmer historik over ændringer i filer
- Gør det muligt at arbejde parallelt og rulle tilbage

---

# Hvad er GitHub?

- En cloud-platform til Git repositories
- Bruges til samarbejde, Pull Requests og review
- Understøtter automation via GitHub Actions

---

# Hvad er et GitHub Repository?

- En mappe med projektfiler og Git-historik
- Indeholder commits, branches, tags, issues og PRs
- Har typisk `main` som stabil branch

---

# Hvad er GitHub Desktop?

- Grafisk klient til Git/GitHub
- God til clone, commit, push, pull
- Typisk i jeres forløb:
  - `Code -> Open with GitHub Desktop`
  - `Open in VS Code`

---

# Hvad er Source Control i VS Code?

- VS Codes indbyggede Git-panel
- Se ændringer, stage, commit, pull/push/sync
- Hurtigt workflow direkte i editoren
- Genvej: `Cmd+Shift+G` (macOS) / `Ctrl+Shift+G` (Windows/Linux)

---

# Hvad er GitHub Pages?

- Hosting af statiske websites på GitHub
- I dette projekt deployes via GitHub Actions
- Derfor: `main` skal holdes stabil

---

# Projektflow (fra jeres guides)

1. Opret repo fra template
2. Clone via GitHub Desktop
3. Åbn i VS Code
4. `npm install` + `npm run dev`
5. Lav ændringer i feature branch
6. Commit i Source Control
7. Push branch og opret PR
8. Merge og verificer deploy på GitHub Pages

---

# Git Basics: `git config` og `git init`

- Begreb: `git config` sætter Git-identitet (navn/email) på din maskine
- Begreb: `git init` opretter et nyt Git-repository i en mappe
- I jeres øvelser gør I dette mest visuelt via GitHub Desktop/VS Code
- Praktisk hos jer: fokus er normalt `clone`, ikke manuel `init`

```bash
git config --global user.name "Dit Navn"
git config --global user.email "dig@email.dk"
git init
```

---

# Git Basics: `git clone`

- Begreb: `git clone` laver en lokal kopi af repo + historik
- I praksis hos jer:
  - GitHub: `Code -> Open with GitHub Desktop`
  - GitHub Desktop: vælg lokal mappe og klik `Clone`
  - Åbn derefter projektet i VS Code

```bash
git clone https://github.com/<org-eller-bruger>/<repo>.git
```

---

# Git Basics: `git status` (undervurderet)

- Begreb: `git status` viser repositoryets aktuelle tilstand
- Viser branch, staged/unstaged filer og næste handling
- VS Code Source Control viser samme information visuelt:
  - Aktuel branch nederst til venstre
  - `Changes` = unstaged
  - `Staged Changes` = staged

```bash
git status
```

---

# Staging area

- Begreb: staging area er mellemleddet før commit
- Working tree: det du har ændret
- Staging area: det der kommer med i næste commit
- Begreb: commit er et snapshot af det staged arbejde
- VS Code eksempel: `Changes` -> klik `+` -> filen flyttes til `Staged Changes`

---

# `git add`

- Tilføj ændringer til staging area
- Vælg enten hele ændringer eller enkelte filer
- VS Code eksempel: hover på fil -> klik `+` (eller `Stage All Changes`)

```bash
git add .
git add src/pages/ServicesPage.jsx
```

---

# `git commit`

- Begreb: commit er en gemt version (snapshot) i Git-historikken
- Commit indeholder kun filer fra `Staged Changes`
- Skriv korte og præcise commit-beskeder
- VS Code eksempel: skriv besked i commit-felt -> klik `Commit`

```bash
git commit -m "Add services page and route"
```

---

# Discard / Reset / Restore (forsigtigt)

- Begreb: `Discard Changes` i VS Code fortryder lokale ændringer i filer
- VS Code eksempel:
  - I `Changes`: højreklik på fil -> `Discard Changes`
  - Eller via ikon ved filen i Source Control
- Begreb: `git restore <fil>` gør det samme via terminal
- `Reset` bruges oftest til at flytte/fortryde commits og er mere avanceret
- Brug kun når du er sikker

```bash
git restore src/pages/HomePage.jsx
```

---

# Stash (midlertidig parkering)

- Gem ikke-færdigt arbejde uden commit
- Nyttigt før branch-skift eller hurtig hotfix

```bash
git stash
git checkout main
git stash pop
```

---

# Fetch, Pull, Push

- `fetch`: hent nyt fra remote uden merge
- `pull`: fetch + merge/rebase
- `push`: send lokale commits til GitHub
- VS Code eksempel:
  - `...` menu -> `Fetch`
  - `...` menu -> `Pull`
  - `Sync Changes` eller `Push`

Tommelregel: `fetch/pull` før du starter ny feature

---

# Branching

- Lav altid feature branch
- Arbejd ikke direkte på `main`
- Eksempler:
  - `feature/add-footer`
  - `feature/improve-homepage`
  - `feature/add-services-page`
- VS Code eksempel: klik branch-navn nederst til venstre -> `Create new branch...`

---

# Pull Request (PR)

- PR = forslag om at merge branch til `main`
- Indeholder ændringer, beskrivelse og diskussion
- Er entry point til review og kvalitetssikring
- I øvelserne: push branch fra VS Code -> opret PR på GitHub

---

# Review

- Review før merge reducerer fejl og regression
- Tjek:
  - Funktionalitet
  - Læsbarhed
  - Risiko/sideeffekter
  - Relevante tests

---

# Merge

- Merge først når PR er godkendt
- Slet branch efter merge
- `main` udløser deployment workflow

---

# Merge conflicts

- Opstår når samme kodeområde er ændret i flere branches
- Løs konflikter i VS Code editor
- Test efter løsning og commit konfliktløsning

---

# Branch protection (anbefalet)

- Beskyt `main` med regler:
  - kræv PR
  - kræv review
  - blokér direkte push
- Giver stabilitet når `main` deployes

---

# `.gitignore` (hvad må ikke med)

- Ignorér lokalt genererede filer
- I JS-projekter typisk:
  - `node_modules/`
  - build output
  - lokale miljøfiler

---

# VS Code Source Control: hurtig demo

1. Skift til din feature branch
2. Lav ændring i fx `Footer`/`HomePage`/`ServicesPage`
3. Stage fil (`+`) i Source Control
4. Skriv commit-besked og klik `Commit`
5. Klik `Sync Changes` (push)
6. Åbn GitHub og opret PR

---

# GitHub Desktop: hurtig demo

1. Se ændringer i `Changes`
2. Commit med besked
3. `Push origin` / `Sync Changes`
4. `View on GitHub` for PR

---

# Samlet end-to-end workflow

1. `Code -> Open with GitHub Desktop` og åbn i VS Code
2. Kør `npm install` og `npm run dev`
3. Klik `Sync Changes` på `main` (sørg for nyeste)
4. Opret feature branch i VS Code
5. Implementer øvelsesfeature
6. Stage + commit i Source Control
7. Push (`Sync Changes`) og opret PR på GitHub
8. Få review og lav evt. rettelser
9. Merge til `main` og verificer GitHub Pages deployment

---

# Typiske fejl (og hurtig løsning)

- Forkert branch: skift branch før du arbejder
- Glemte at pull/fetch: opdater før ny feature
- For stor commit: split i mindre commits
- Uklare commit-beskeder: brug konkrete beskrivelser

---

# Klasseøvelse (kan skæres til)

1. Opret branch: `feature/add-footer`
2. Tilføj lille ændring
3. Commit og push
4. Opret PR
5. Få review fra sidemand
6. Merge og verificer deployment

---

# Cheatsheet

```bash
git status
git switch -c feature/min-branch
git add .
git commit -m "Kort besked"
git fetch
git pull
git push -u origin feature/min-branch
git stash
git stash pop
```

---

# Team-regler (skal følges)

1. Arbejd aldrig direkte på `main`
2. Opret altid en feature branch pr. opgave
3. Commit små, fokuserede ændringer ofte
4. Opret altid PR før merge
5. Merge først efter review

---

# Commit og PR-guidelines

- Commit-besked skal være konkret:
  - God: `Add services route to App.jsx`
  - Dårlig: `fix stuff`
- En PR bør være lille nok til at kunne reviewes på 5-10 min
- PR-beskrivelse skal altid have:
  - Hvad er ændret?
  - Hvorfor?
  - Hvordan testes det?

---

# Daglig Git-rutine (checkliste)

1. Start: `fetch/pull` på `main`
2. Opret/skift til feature branch
3. Lav ændringer og test lokalt
4. Stage + commit i Source Control
5. Push og opret PR
6. Håndter review-kommentarer
7. Merge og verificer deployment
