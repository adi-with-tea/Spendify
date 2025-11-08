
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-text-primary">About Spendify</h1>
        <p className="mt-4 text-lg text-text-secondary">
          Harnessing the power of Agentic AI to illuminate your path to financial wellness.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-16 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
          <p className="mt-4 text-text-secondary">
            Empowering individuals to make smarter financial decisions using Agentic AI. We believe that financial management should be simple, intelligent, and accessible to everyone. Our mission is to automate the complexities of personal finance, providing clear, data-driven insights that help you achieve your goals, whether it's saving for a dream vacation, buying a home, or securing a comfortable retirement.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-secondary">Why Use Spendify?</h2>
          <ul className="mt-4 space-y-3 text-text-secondary list-disc list-inside">
            <li>
              <strong>Simplicity:</strong> We cut through the jargon and present your financial life in a way that's easy to understand and act upon.
            </li>
            <li>
              <strong>AI Automation:</strong> Our smart agents work tirelessly in the background to categorize transactions, identify savings opportunities, and create personalized budgets.
            </li>
            <li>
              <strong>Data-Driven Insights:</strong> Move beyond guesswork. Every recommendation is backed by an analysis of your unique financial behavior, helping you make confident decisions.
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-700">About the Agentic AI</h2>
          <p className="mt-4 text-text-secondary">
            Spendify is powered by a sophisticated Agentic AI system. Unlike traditional algorithms, our AI agents are designed to be proactive and adaptive. They continuously learn from your spending habits, financial goals, and market trends. As you interact with the platform, the AI becomes more attuned to your personal financial style, allowing it to provide increasingly accurate and relevant suggestions over time. It's like having a personal financial analyst that's always learning and working just for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
