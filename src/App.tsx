import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ScaleFinderWizard } from './components/ScaleFinderWizard';
import { SolutionsSection } from './components/SolutionsSection';
import { IndustrialShowcaseSection } from './components/IndustrialShowcaseSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { InstagramSection } from './components/InstagramSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { QuoteView } from './components/QuoteView';
import { CheckoutView } from './components/CheckoutView';
import { AdminView } from './components/AdminView';
import { CartDrawer } from './components/CartDrawer';
import { CompareDrawer } from './components/CompareDrawer';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';

const MainRouter: React.FC = () => {
  const { currentView, selectedProduct, selectedCategorySlug } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-orange-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <TrustBar />
            <CategoriesSection />
            <FeaturedProducts />
            <ScaleFinderWizard />
            <SolutionsSection />
            <IndustrialShowcaseSection />
            <ServicesSection />
            <AboutSection />
            <InstagramSection />
            <FinalCtaSection />
          </>
        )}

        {currentView === 'products' && (
          <CatalogView initialCategorySlug={null} />
        )}

        {currentView === 'category' && (
          <CatalogView initialCategorySlug={selectedCategorySlug} />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailView product={selectedProduct} />
        )}

        {currentView === 'quote' && (
          <QuoteView preselectedProduct={selectedProduct} />
        )}

        {currentView === 'checkout' && (
          <CheckoutView />
        )}

        {currentView === 'admin' && (
          <AdminView />
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <FinalCtaSection />
          </div>
        )}

        {currentView === 'services' && (
          <div className="pt-6">
            <ServicesSection />
            <FinalCtaSection />
          </div>
        )}

        {currentView === 'solutions' && (
          <div className="pt-6">
            <SolutionsSection />
            <FinalCtaSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays & Utilities */}
      <WhatsAppFloating />
      <CartDrawer />
      <CompareDrawer />
      <QuickQuoteModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
