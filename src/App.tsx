import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { PageOverlay } from '@/components/PageOverlay';
import { Hero } from '@/sections/Hero';
import { InstitutionsRibbon } from '@/sections/InstitutionsRibbon';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Portfolio } from '@/sections/Portfolio';
import { Testimonials } from '@/sections/Testimonials';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { usePageLoad } from '@/hooks/usePageLoad';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { useContent } from '@/i18n/context';

// Lazy-loaded routes — keep markdown-it / highlight.js out of the home bundle
const ProjectPage = lazy(() => import('@/pages/ProjectPage').then((m) => ({ default: m.ProjectPage })));
const ProjectsListPage = lazy(() => import('@/pages/ProjectsListPage').then((m) => ({ default: m.ProjectsListPage })));
const BlogListPage = lazy(() => import('@/blog/pages/BlogListPage').then((m) => ({ default: m.BlogListPage })));
const BlogPostPage = lazy(() => import('@/blog/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));

function PersonalBrandSite() {
  const { showOverlay } = usePageLoad(500);
  const { siteConfig } = useContent();

  const { hash } = useLocation();

  // Home page title follows the selected language
  useEffect(() => {
    document.title = siteConfig.title;
  }, [siteConfig.title]);

  // Arriving from an inner page with /#section → scroll there once the intro overlay is gone
  useEffect(() => {
    if (!hash || hash.startsWith('#/')) return;
    const timer = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 700);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Load Overlay */}
      <PageOverlay isVisible={showOverlay} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <InstitutionsRibbon />
        <About />
        <Services />
        <Testimonials />
        <Portfolio />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LocaleProvider>
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#0A0B14]" />}>
        <Routes>
          {/* Personal brand homepage */}
          <Route path="/" element={<PersonalBrandSite />} />
          {/* Projects */}
          <Route path="/proyectos" element={<ProjectsListPage />} />
          <Route path="/proyectos/:slug" element={<ProjectPage />} />
          {/* Blog */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/categoria/:cat" element={<BlogListPage />} />
          <Route path="/blog/tag/:tag" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </LocaleProvider>
  );
}

export default App;
