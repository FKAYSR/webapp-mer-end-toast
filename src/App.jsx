import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SavedPage from "./pages/SavedPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ShoppinglistPage from "./pages/ShoppinglistPage";
import SearchPage from "./pages/SearchPage";
import AllergyPage from "./pages/AllergyPage";
import DetailPage from "./pages/DetailPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/indkøbsliste" element={<ShoppinglistPage />} />
        <Route path="/gemte" element={<SavedPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/søg" element={<SearchPage />} />
        <Route path="/allergi" element={<AllergyPage />} />
        <Route path="/opskrift" element={<DetailPage />} />
        <Route path="/produkter" element={<ProductPage />} />
      </Routes>
      <Navbar />
    </>
  );
}
