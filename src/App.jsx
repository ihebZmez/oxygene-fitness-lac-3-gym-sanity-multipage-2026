import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransition from "./components/animations/PageTransition";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackgroundMusic from "./components/layout/BackgroundMusic";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Pricing from "./pages/Pricing";
import CorporatePage from "./pages/CorporatePage";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import PersonalTrainingPage from "./pages/PersonalTrainingPage";
import NewsPage from "./pages/NewsPage";
import ShopPage from "./pages/ShopPage";
import { isPackage1SiteVitrine } from "./config/packageMode";

function App() {
  const { i18n } = useTranslation();
  const package1SiteVitrine = isPackage1SiteVitrine();

  // Set RTL based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Navbar />
      <PageTransition>
        <main className="pt-20">
          <Routes>
            {/* Main */}
            <Route path="/" element={<Home />} />

            {/* Existing */}
            <Route path="/activites" element={<Activities />} />
            <Route path="/tarifs" element={<Pricing />} />
            {!package1SiteVitrine && (
              <Route
                path="/coaching-personnel"
                element={<PersonalTrainingPage />}
              />
            )}
            {!package1SiteVitrine && (
              <Route path="/corporate" element={<CorporatePage />} />
            )}
            <Route path="/planning" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />

            {/* New dedicated pages */}
            <Route path="/actualites" element={<NewsPage />} />
            {!package1SiteVitrine && (
              <Route path="/shop" element={<ShopPage />} />
            )}
          </Routes>
        </main>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
      <BackgroundMusic />
    </BrowserRouter>
  );
}

export default App;
