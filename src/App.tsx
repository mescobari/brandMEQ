import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Portfolio } from '@/sections/Portfolio';
import { Testimonials } from '@/sections/Testimonials';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { usePageLoad } from '@/hooks/usePageLoad';
import { ITIL4SalesPage } from '@/pages/ITIL4SalesPage';
import SalesPage     from '@/pages/SalesPage';
import CheckoutPage  from '@/pages/CheckoutPage';
import DeliveryPage  from '@/pages/DeliveryPage';
import UpsellPage    from '@/pages/UpsellPage';
import ThankYouPage  from '@/pages/ThankYouPage';

function PersonalBrandSite() {
  const { showOverlay } = usePageLoad(500);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Load Overlay */}
      <PageOverlay isVisible={showOverlay} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Personal brand homepage */}
        <Route path="/" element={<PersonalBrandSite />} />
        {/* ITIL 4 Book sales page */}
        <Route path="/itil4" element={<ITIL4SalesPage />} />
        <Route path="/libro-itil" element={<ITIL4SalesPage />} />
        {/* ── Funnel de ventas ── */}
        <Route path="/ventas"          element={<SalesPage />} />
        <Route path="/checkout"        element={<CheckoutPage />} />
        <Route path="/entrega/:token" element={<DeliveryPage />} />
        <Route path="/upsell"          element={<UpsellPage />} />
        <Route path="/gracias"         element={<ThankYouPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
