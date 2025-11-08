
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-gray-200 mt-16">
      <div className="container mx-auto px-6 py-8 text-center text-text-secondary">
        <p>&copy; {new Date().getFullYear()} Spendify. All rights reserved.</p>
        <p className="text-sm mt-2">Empowering smarter financial decisions with Agentic AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
