
import React from 'react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { SavingsGoal } from '../types';
import { ActivityIcon, BanknoteIcon, RocketIcon, PiggyBankIcon, ShieldCheckIcon, SparklesIcon } from '../components/icons/FeatureIcons';

const expenseData = [
  { name: 'Groceries', value: 400 },
  { name: 'Dining Out', value: 300 },
  { name: 'Transport', value: 150 },
  { name: 'Shopping', value: 200 },
  { name: 'Utilities', value: 250 },
];

const investmentData = [
    { name: 'Stocks', value: 40 },
    { name: 'Mutual Funds', value: 30 },
    { name: 'Crypto', value: 20 },
    { name: 'Bonds', value: 10 },
];
const COLORS = ['#00B894', '#0984E3', '#FDCB6E', '#6C5CE7'];

const savingsGoals: SavingsGoal[] = [
  { name: 'Emergency Fund', target: 5000, current: 3500 },
  { name: 'Vacation', target: 2000, current: 800 },
  { name: 'New Laptop', target: 1500, current: 1100 },
];

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
);

const FeatureCard: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({title, icon, children}) => (
    <Card className="flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
            {icon}
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        </div>
        <div className="flex-grow">{children}</div>
    </Card>
);

const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-12">Intelligent Financial Features</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        <FeatureCard title="Smart Expense Analyzer" icon={<ActivityIcon className="w-8 h-8 text-primary"/>}>
          <p className="text-text-secondary mb-4">AI-powered identification of your spending trends.</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={expenseData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fill: '#636E72', fontSize: 12 }} />
              <YAxis tick={{ fill: '#636E72', fontSize: 12 }}/>
              <Tooltip cursor={{fill: 'rgba(0, 184, 148, 0.1)'}}/>
              <Bar dataKey="value" fill="#00B894" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </FeatureCard>

        <FeatureCard title="Budget Optimizer" icon={<BanknoteIcon className="w-8 h-8 text-secondary"/>}>
            <p className="text-text-secondary mb-4">Dynamic budget adjustments based on your goals.</p>
            {['Groceries', 'Entertainment', 'Shopping'].map(cat => (
                <div key={cat} className="mb-3">
                    <div className="flex justify-between text-sm font-medium mb-1">
                        <span>{cat}</span>
                        <span className="text-text-secondary">$250 / $400</span>
                    </div>
                    <ProgressBar value={62.5} />
                </div>
            ))}
        </FeatureCard>
        
        <FeatureCard title="Investment Planner" icon={<RocketIcon className="w-8 h-8 text-purple-500"/>}>
            <p className="text-text-secondary mb-4">Growth-oriented suggestions for your portfolio.</p>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie data={investmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {investmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
          </ResponsiveContainer>
        </FeatureCard>

        <FeatureCard title="Savings Goal Tracker" icon={<PiggyBankIcon className="w-8 h-8 text-yellow-500"/>}>
            <p className="text-text-secondary mb-4">Visualize your progress towards your financial goals.</p>
            {savingsGoals.map(goal => (
                <div key={goal.name} className="mb-4">
                     <div className="flex justify-between text-sm font-medium mb-1">
                        <span>{goal.name}</span>
                        <span className="text-text-secondary">${goal.current} / ${goal.target}</span>
                    </div>
                    <ProgressBar value={(goal.current/goal.target)*100} />
                </div>
            ))}
        </FeatureCard>
        
        <FeatureCard title="Financial Health Score" icon={<ShieldCheckIcon className="w-8 h-8 text-red-500"/>}>
            <p className="text-text-secondary mb-4">A simple score representing your current financial status.</p>
            <div className="flex items-center justify-center h-full">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-primary" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-primary">85</span>
                        <span className="text-sm text-text-secondary">Excellent</span>
                    </div>
                </div>
            </div>
        </FeatureCard>

        <FeatureCard title="AI Recommendations" icon={<SparklesIcon className="w-8 h-8 text-indigo-500"/>}>
            <p className="text-text-secondary mb-4">Personalized daily insights on saving and spending.</p>
            <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg text-sm">💡 You can save $35/month by switching your phone plan.</div>
                <div className="bg-yellow-50 p-3 rounded-lg text-sm">⚠️ Your 'Dining Out' spending is 20% higher this month.</div>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">🚀 Consider investing an extra $50 into your growth fund.</div>
            </div>
        </FeatureCard>

      </div>
    </div>
  );
};

export default FeaturesPage;
