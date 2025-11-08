
import React from 'react';
import type { Page } from '../App';
import Button from '../components/Button';
import { TrendingUpIcon, PieChartIcon, TargetIcon } from '../components/icons/FeatureIcons';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <div className="relative bg-gradient-to-br from-green-100 via-blue-100 to-teal-100 rounded-3xl py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary leading-tight">
            "The secret to financial freedom is spending less than you earn and investing the difference."
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary">
            AI-powered financial optimization, expense tracking, and investment planning.
          </p>
          <div className="mt-10">
            <Button onClick={() => navigateTo('tools')}>
              Let AI Optimize My Finances
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-text-primary">How It Works</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="bg-green-100 p-4 rounded-full">
              <TrendingUpIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mt-4">1. Track</h3>
            <p className="text-text-secondary mt-2">Connect your accounts and let our AI seamlessly track your income and spending.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="bg-blue-100 p-4 rounded-full">
              <PieChartIcon className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mt-4">2. Analyze</h3>
            <p className="text-text-secondary mt-2">Our Agentic AI analyzes your financial patterns to find optimization opportunities.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="bg-teal-100 p-4 rounded-full">
              <TargetIcon className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold mt-4">3. Optimize</h3>
            <p className="text-text-secondary mt-2">Receive personalized suggestions to cut costs, save more, and invest smarter.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
