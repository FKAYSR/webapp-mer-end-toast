# Mer' end Toast
> **Udviklere: Jeppe & Freja**
>> Dette er vores eksamensprojekt afleveret d. 9 juni, 2026
>>>*Her er link til vores webapp: [Github page](https://fkaysr.github.io/webapp-mer-end-toast/)*

## Hvad projektet indeholder
Mer' end Toast er en webapp udviklet til brugere, der ønsker inspiration til madlavning baseret på de ingredienser, de allerede har til rådighed.

Brugeren kan søge efter ingredienser og få vist relevante opskrifter. Fra opskrifternes detaljesider kan ingredienser tilføjes direkte til en personlig indkøbsliste, som gemmes i Supabase.

Appen indeholder blandt andet:

- Søgning efter opskrifter baseret på ingredienser
- Detaljesider med information om opskrifterne
- Indkøbsliste med CRUD-funktionalitet
- Profilside med allergier og præferencer
- Allergi advarselsikon på ProductCards
- Onboarding-flow
- Loading states og brugerfeedback
- Responsivt design
- Animationer implementeret med Lottie

Projektet er udviklet i React med Supabase som backend-løsning til lagring og håndtering af data.

## Fordeling af ansvarsområder ift. koden
### Jeppe 
Ansvarlig for Supabase-opsætning, indkøbslistens CRUD-funktionalitet og allergi advarsel.

Komponenter og sider:
- AllergyPage
- AddAllergyModal
- AddButton
- IngredientToList
- EditModal
- Loading animation

### Freja 
Ansvarlig for routing, navigation, søgefunktion, onboarding og deployment.

Komponenter og sider:
- AddToShoppinglist
- Navbar
- Checkbox
- PreferenceButton
- ProductCard
- ProductGrid
- RecipeToList
- SearchEntry
- SearchInput
- SearchPage
- SavedPage
- ProfilePage
- ProductPage
- OnboardingPage
- HomePage

### Fælles ansvar
- ShoppinglistPage
- DetailPage
- List komponent
- CSS styling

## Projektstruktur
```
.github/
  workflows/
    deploy.yml
src/
  assets/
    animation/
      onboarding-animation.json
    ikoner/
      add-to-shoppinglist-icon.svg
      addButton.svg
      allergy-icon.svg
      app-icon.svg
      back-icon.svg
      butik-icon.svg
      close-icon-large.svg
      close-small-icon.svg
      food-preference-icon.svg
      freeze-icon.svg
      home-active-icon.svg
      home-passive-icon.svg
      profile-active-icon.svg
      profile-passive-icon.svg
      save-active-icon.svg
      save-passive-icon.svg
      search-icon.svg
      settings-icon.svg
      shoppinglist-active-icon.svg
      shoppinglist-passive-icon.svg
      time-active-icon.svg
    logo-big.png
    logo.svg
    profile-picture.png
  components/
    AddAllergyModal.jsx
    AddButton.jsx
    Checkbox.jsx
    EditModal.jsx
    IngredientToList.jsx
    List.jsx
    Loading.jsx
    Navbar.jsx
    ProductCard.jsx
    ProductGrid.jsx
    RecipeToList.jsx
    SearchEntry.jsx
    SearchInput.jsx
  pages/
    AllergyPage.jsx
    DetailPage.jsx
    HomePage.jsx
    NotFoundPage.jsx
    OnboardingPage.jsx
    ProductPage.jsx
    ProfilePage.jsx
    SavedPage.jsx
    SearchPage.jsx
    ShoppinglistPage.jsx
  App.jsx
  main.jsx
  styles.css
  supabaseClient.js
.env
index.html
package-lock.json
package.json
README.md
vite.config.js
```
## Teknologier
- React
- Vite
- React Router
- Supabase
- HTML
- CSS
- JavaScript
- Figma
- Jitter
- Lottie
- GitHub / GitHub Pages