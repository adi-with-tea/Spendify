
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

export type Page = 'home' | 'features' | 'tools' | 'about';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'features':
        return <FeaturesPage />;
      case 'tools':
        return <ToolsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary">
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
