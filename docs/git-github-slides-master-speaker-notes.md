# Speaker Notes: Git og GitHub Master Slides

Brug sammen med [git-github-slides-master.md](/Users/race/Developer/react-router-spa/docs/git-github-slides-master.md).

## Slide 1 - Git og GitHub Master Slides
- Sæt rammen: vi tager både begreber og konkret workflow fra jeres øvelser.
- Nævn at fokus er VS Code Source Control + GitHub Desktop.

## Slide 2 - Agenda
- Fortæl at decket er komplet, og at I kan skære ned bagefter.
- Peg på progression: forståelse -> handling -> samarbejde.

## Slide 3 - Hvad er Git?
- Brug analogien “versionshistorik for kode”.
- Nævn at Git er lokalt først, cloud bagefter.

## Slide 4 - Hvad er GitHub?
- Forklar forskellen: Git = system, GitHub = platform.
- Nævn PR/review som den vigtigste samarbejdsdel.

## Slide 5 - Hvad er et GitHub Repository?
- Forklar at repo er både filer og historik.
- Markér `main` som referencepunktet i teamet.

## Slide 6 - Hvad er GitHub Desktop?
- Sig at det er en blød indgang for dem, der ikke er terminalvante.
- Knyt til jeres flow: clone via Desktop, kod i VS Code.

## Slide 7 - Hvad er Source Control i VS Code?
- Vis Source Control-panelet kort live.
- Nævn genvejen `Cmd+Shift+G` / `Ctrl+Shift+G`.

## Slide 8 - Hvad er GitHub Pages?
- Forklar at `main` skal være stabil, fordi den deployes.
- Nævn at deploy styres af GitHub Actions i projektet.

## Slide 9 - Projektflow (fra jeres guides)
- Læs flowet op som “rød tråd”.
- Peg på hvor øvelserne ligger: feature branch -> PR -> merge.

## Slide 10 - Git Basics: `git config` og `git init`
- Nævn at `config` typisk sættes én gang per maskine.
- Forklar at `init` er vigtigt begreb, men at I ofte bruger `clone`.

## Slide 11 - Git Basics: `git clone`
- Forklar at clone henter hele historikken, ikke kun filer.
- Knyt til praksis: i klassen ofte via GitHub Desktop-knappen.

## Slide 12 - Git Basics: `git status`
- Sig “denne kommando er jeres sikkerhedssele”.
- Brug den før commit og før branch-skift.

## Slide 13 - Staging area
- Forklar staged vs unstaged med et konkret eksempel.
- Pointér at staging giver bedre commits.

## Slide 14 - `git add`
- Vis at man kan stage én fil ad gangen i VS Code.
- Nævn hvorfor små, fokuserede commits er lettere at reviewe.

## Slide 15 - `git commit`
- Giv eksempel på god commit-besked i handlingsform.
- Nævn at commit ikke sender noget til GitHub endnu.

## Slide 16 - Discard / Reset / Restore
- Understreg “forsigtigt”: discard kan ikke altid fortrydes nemt.
- Vis kun let eksempel med `git restore`.

## Slide 17 - Stash
- Brug scenario: “jeg skal skifte branch NU, men er ikke færdig”.
- Nævn at stash er midlertidigt, ikke langtidshistorik.

## Slide 18 - Fetch, Pull, Push
- Forklar forskellen tydeligt: fetch henter, pull integrerer, push sender.
- Anbefal fetch/pull før nyt arbejde.

## Slide 19 - Branching
- Gentag hovedregel: aldrig direkte arbejde på `main`.
- Giv navngivningsmønster `feature/...`.

## Slide 20 - Pull Request (PR)
- Forklar at PR er både teknisk merge-forslag og faglig dialog.
- Nævn at god PR-beskrivelse sparer review-tid.

## Slide 21 - Review
- Brug en simpel review-checkliste: virker det, er det læsbart, er risikoen ok.
- Nævn at review beskytter kvalitet, ikke person.

## Slide 22 - Merge
- Forklar hvornår man merger: efter godkendelse og grønt build.
- Nævn branch cleanup efter merge.

## Slide 23 - Merge conflicts
- Normalisér konflikter: de sker i teams.
- Vis processen: vælg løsning -> test -> commit.

## Slide 24 - Branch protection
- Forklar at reglerne håndhæver gode vaner automatisk.
- Fremhæv værdi i undervisning: færre fejl på `main`.

## Slide 25 - `.gitignore`
- Nævn hvorfor `node_modules` aldrig skal med i Git.
- Knyt til repo-hygiejne og mindre støj i commits.

## Slide 26 - VS Code Source Control: hurtig demo
- Brug én af øvelsesfeatures som live eksempel.
- Hold demo stram: edit -> stage -> commit -> sync -> PR.

## Slide 27 - GitHub Desktop: hurtig demo
- Vis samme flow i Desktop som alternativ.
- Markér at teams gerne må blande værktøjer, men samme Git-flow.

## Slide 28 - Samlet end-to-end workflow
- Brug sliden som opsummering af hele kurven.
- Spørg kort om alt giver mening inden øvelse.

## Slide 29 - Typiske fejl
- Brug 1-2 konkrete fejl fra tidligere hold hvis muligt.
- Forklar hurtig løsning pr. fejl, ikke kun problemet.

## Slide 30 - Klasseøvelse
- Sæt tydelig tidsramme (fx 12-15 min).
- Kør makkerreview før merge.

## Slide 31 - Cheatsheet
- Sig at dette er “minimumskommandoer til hverdagen”.
- Slut med at henvise til guides i `docs/` til næste skridt.

## Slide 32 - Team-regler (skal følges)
- Præsenter reglerne som fælles samarbejdsaftale, ikke forslag.
- Understreg især: ingen direkte arbejde på `main`.

## Slide 33 - Commit og PR-guidelines
- Vis forskellen på gode og dårlige commit-beskeder.
- Nævn at små PRs giver hurtigere og bedre reviews.

## Slide 34 - Daglig Git-rutine (checkliste)
- Brug denne slide som “standardstart” i hver workshop.
- Lad de studerende åbne sliden mens de arbejder.
