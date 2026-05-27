# React Router SPA Template

Et minimalt React 19 + Vite 8 + React Router v7 template-projekt, klar til undervisning, samarbejde i branches og deployment til GitHub Pages.

## Hvad projektet indeholder

- React 19 + Vite 8 med den officielle React-plugin
- React Router v7 med `BrowserRouter` og `basename` via `import.meta.env.BASE_URL`
- 4 sider out-of-the-box: `Home`, `About`, `Contact`, `NotFound`
- Eksempler på billedbrug i `HomePage`:
  - import fra `src/assets`
  - fil fra `public`
  - ekstern URL
- GitHub Actions workflow til automatisk deploy på push til `main`
- SPA-fallback på GitHub Pages via `404.html`

## Kom hurtigt i gang

```bash
npm install
npm run dev
```

Appen starter lokalt via Vite (typisk `http://localhost:5173`).
Node 24 LTS anbefales. Vite 8 kræver mindst Node `20.19.0` eller `22.12.0`.

## Scripts

```bash
npm run dev      # start udviklingsserver
npm run build    # production build
npm run preview  # preview af build lokalt
npm run lint     # eslint
```

## Projektstruktur

```text
src/
  App.jsx               # Routes
  main.jsx              # BrowserRouter + basename
  styles.css            # Global styling
  assets/               # Lokale assets (fx example.svg)
  components/
    Navbar.jsx
  pages/
    HomePage.jsx
    AboutPage.jsx
    ContactPage.jsx
    NotFoundPage.jsx
public/
  logo.webp             # Public asset
.github/
  workflows/
    deploy.yml          # Build + deploy til GitHub Pages
```

## Onboarding (Del 1 + Del 2)

Brug guiderne i denne rækkefølge:

1. Del 1: [docs/template-to-github-pages-setup.md](docs/template-to-github-pages-setup.md)
   Fokus: opret repository fra template, lokal opsætning, `base`-konfiguration og deployment.
2. Del 2: [docs/collaboration-guide.md](docs/collaboration-guide.md)
   Fokus: collaborators, branches, Pull Requests, review og merge-flow.

## Opgaver i Del 2 (teamarbejde)

I samarbejdsguiden fordeles opgaver typisk sådan:

- Person A: tilføj `Footer` komponent
- Person B: forbedr `HomePage` med intro-sektion og cards (behold billedeksempler)
- Person C: tilføj `ServicesPage` + route + nav-link
- Person D: forbedr indhold/layout på `AboutPage`
- Person E: forbedr `ContactPage` med kontaktkort og call-to-action

Bemærk: Disse ændringer er øvelsesopgaver i Del 2 og er ikke nødvendigvis en del af base-templaten på `main`.

## Deployment til GitHub Pages

`package.json` indeholder en `base` værdi, som bruges ved build:

```json
{
  "base": "/react-router-spa/"
}
```

Hvis repository-navnet ændres, opdatér `base` tilsvarende og push igen.

Workflowet i `.github/workflows/deploy.yml`:

- bygger projektet
- deployer til GitHub Pages
- kopierer `index.html` til `404.html` (så client-side routing virker på refresh/deep links)

## Routing

Routes er defineret i `src/App.jsx`.

- `/` -> `HomePage`
- `/about` -> `AboutPage`
- `/contact` -> `ContactPage`
- `*` -> `NotFoundPage`

## Billeder i React

Projektet viser 3 måder at bruge billeder på i `HomePage`. Brug den metode, der passer til behovet:

1. `src/assets` (import i komponenten)  
   Bruges når billedet er en del af appens kildekode.
   - God til illustrationer, ikoner og billeder der versionstyres med koden.
   - Vite håndterer filen i build-processen og giver den et unikt filnavn.
   ```jsx
   import logo from "../assets/example.svg";
   <img src={logo} alt="Eksempel-logo" />;
   ```

2. `public` (direkte filsti, uden import)  
   Bruges når billedet skal ligge på en fast offentlig sti.
   - God til fx logo/favicons eller filer, du vil kunne referere direkte til.
   - Filen bliver ikke importeret i JavaScript.
   ```jsx
   const publicLogoUrl = `${import.meta.env.BASE_URL}logo.webp`;
   <img src={publicLogoUrl} alt="Logo fra public" />;
   ```

3. Ekstern URL  
   Bruges når billedet kommer fra en ekstern kilde.
   - God til API-data, CDN eller tredjeparts-indhold.
   - Kræver internetadgang og at URL'en er stabil.
   ```jsx
   <img src="https://picsum.photos/200" alt="Eksternt billede" />;
   ```

Tip:
- Brug altid meningsfuld `alt`-tekst af hensyn til tilgængelighed.
- Brug `src/assets`, når billedet er en fast del af projektet.
- Brug `public`, når du vil have en enkel, stabil sti uden import.
