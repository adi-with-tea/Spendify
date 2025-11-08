
import React from 'react';
import type { Page } from '../App';
import { WalletIcon } from './icons/WalletIcon';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  navigateTo: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, navigateTo, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => navigateTo(page)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-text-secondary hover:text-primary'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('home')}>
          <WalletIcon className="w-8 h-8 text-primary" />
          <span className="text-2xl font-extrabold text-text-primary">Spendify</span>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
          <NavLink page="home" currentPage={currentPage} navigateTo={navigateTo}>Home</NavLink>
          <NavLink page="features" currentPage={currentPage} navigateTo={navigateTo}>Features</NavLink>
          <NavLink page="tools" currentPage={currentPage} navigateTo={navigateTo}>Tools</NavLink>
          <NavLink page="about" currentPage={currentPage} navigateTo={navigateTo}>About</NavLink>
        </div>
        <div className="md:hidden">
          {/* Mobile menu could be implemented here */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;
