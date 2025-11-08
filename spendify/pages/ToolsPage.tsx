import React, { useState, useCallback, useRef, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { generateBudget, categorizeExpense, getChatbotResponse } from '../services/geminiService';
import type { BudgetItem } from '../types';
import { BotIcon, CalculatorIcon, LightbulbIcon, MessageCircleIcon } from '../components/icons/FeatureIcons';

const ToolCard: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <Card className="flex flex-col">
        <div className="flex items-center space-x-4 mb-4">
            {icon}
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        </div>
        <div className="flex-grow">{children}</div>
    </Card>
);

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

const ToolsPage: React.FC = () => {
    // State for Budget Generator
    const [income, setIncome] = useState('5000');
    const [budget, setBudget] = useState<BudgetItem[] | null>(null);
    const [isBudgetLoading, setIsBudgetLoading] = useState(false);
    const [budgetError, setBudgetError] = useState<string | null>(null);

    // State for Expense Categorizer
    const [expense, setExpense] = useState('Coffee at Starbucks');
    const [category, setCategory] = useState<string | null>(null);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    
    // State for Chatbot
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        { sender: 'ai', text: "I'm your AI Financial Advisor. Ask me anything about personal finance!" }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [chatError, setChatError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);


    const handleGenerateBudget = useCallback(async () => {
        setIsBudgetLoading(true);
        setBudgetError(null);
        setBudget(null);
        try {
            const monthlyIncome = parseFloat(income);
            if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
                setBudgetError("Please enter a valid monthly income.");
                return;
            }
            const generatedBudget = await generateBudget(monthlyIncome);
            setBudget(generatedBudget);
        } catch (error) {
            console.error(error);
            setBudgetError("Sorry, we couldn't generate a budget at this time.");
        } finally {
            setIsBudgetLoading(false);
        }
    }, [income]);

    const handleCategorizeExpense = useCallback(async () => {
        setIsCategoryLoading(true);
        setCategoryError(null);
        setCategory(null);
        try {
            if (!expense.trim()) {
                setCategoryError("Please enter an expense description.");
                return;
            }
            const result = await categorizeExpense(expense);
            setCategory(result);
        } catch (error) {
            console.error(error);
            setCategoryError("Sorry, we couldn't categorize this expense.");
        } finally {
            setIsCategoryLoading(false);
        }
    }, [expense]);
    
    const handleChatSubmit = useCallback(async () => {
        if (!chatInput.trim() || isChatLoading) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: chatInput };
        setChatHistory(prev => [...prev, newUserMessage]);
        const currentMessage = chatInput;
        setChatInput('');
        setIsChatLoading(true);
        setChatError(null);

        try {
            // This is where the real AI API call happens.
            const aiResponse = await getChatbotResponse(currentMessage);
            const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
            setChatHistory(prev => [...prev, newAiMessage]);
        } catch (error) {
            console.error(error);
            setChatError("Sorry, I couldn't get a response. Please try again.");
            // Optionally remove the user's message on failure
            setChatHistory(prev => prev.filter(msg => msg !== newUserMessage));
        } finally {
            setIsChatLoading(false);
        }
    }, [chatInput, isChatLoading]);

    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-extrabold text-center mb-12">Your AI Financial Toolkit</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {/* AI Budget Generator */}
                <ToolCard title="AI Budget Generator" icon={<CalculatorIcon className="w-8 h-8 text-primary"/>}>
                    <p className="text-text-secondary mb-4">Enter your monthly income to get a sample budget.</p>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            placeholder="e.g., 5000"
                            className="w-full px-4 py-2 bg-gray-100 text-text-primary placeholder-text-secondary border border-transparent rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                        <Button onClick={handleGenerateBudget} isLoading={isBudgetLoading}>Generate</Button>
                    </div>
                    {budgetError && <p className="text-red-500 text-sm mt-2">{budgetError}</p>}
                    {budget && (
                        <div className="mt-4 space-y-2 text-sm">
                            {budget.map(item => (
                                <div key={item.category} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                                    <span>{item.category}</span>
                                    <span className="font-semibold">${item.allocated.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </ToolCard>

                {/* Expense Categorizer */}
                <ToolCard title="Expense Categorizer" icon={<BotIcon className="w-8 h-8 text-secondary"/>}>
                    <p className="text-text-secondary mb-4">Let AI automatically classify your spending.</p>
                     <div className="flex space-x-2">
                        <input
                            type="text"
                            value={expense}
                            onChange={(e) => setExpense(e.target.value)}
                            placeholder="e.g., Netflix subscription"
                            className="w-full px-4 py-2 bg-gray-100 text-text-primary placeholder-text-secondary border border-transparent rounded-full focus:ring-2 focus:ring-secondary focus:outline-none"
                        />
                        <Button onClick={handleCategorizeExpense} variant="secondary" isLoading={isCategoryLoading}>Categorize</Button>
                    </div>
                    {categoryError && <p className="text-red-500 text-sm mt-2">{categoryError}</p>}
                    {category && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                            <p>Category: <span className="font-bold text-secondary">{category}</span></p>
                        </div>
                    )}
                </ToolCard>

                {/* Investment Suggestion Agent */}
                <ToolCard title="Investment Suggestion Agent" icon={<LightbulbIcon className="w-8 h-8 text-yellow-500"/>}>
                    <p className="text-text-secondary mb-4">Placeholder for AI-driven investment ideas.</p>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-bold">Growth Portfolio Suggestion:</h4>
                        <ul className="list-disc list-inside text-sm mt-2">
                            <li>60% - Low-cost Index Funds (S&P 500)</li>
                            <li>25% - International Stocks</li>
                            <li>15% - Technology Sector ETFs</li>
                        </ul>
                    </div>
                </ToolCard>

                 {/* Chatbot Financial Advisor */}
                <ToolCard title="Chatbot Financial Advisor" icon={<MessageCircleIcon className="w-8 h-8 text-indigo-500"/>}>
                    <p className="text-text-secondary mb-4">Ask our AI assistant basic financial questions.</p>
                    <div ref={chatContainerRef} className="h-48 bg-gray-100 rounded-lg p-3 flex flex-col space-y-2 overflow-y-auto text-sm">
                        {chatHistory.map((msg, index) => (
                           <div key={index} className={`p-2 rounded-lg max-w-xs break-words ${
                                msg.sender === 'user' 
                                ? 'bg-indigo-500 text-white self-end' 
                                : 'bg-white self-start'
                            }`}>
                                {msg.text}
                            </div>
                        ))}
                         {isChatLoading && <div className="bg-white p-2 rounded-lg self-start max-w-xs">...</div>}
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <input 
                            type="text" 
                            placeholder="Ask a question..." 
                            className="w-full px-4 py-2 bg-gray-100 text-text-primary placeholder-text-secondary border border-transparent rounded-full focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:bg-gray-200"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => {if (e.key === 'Enter') handleChatSubmit()}}
                            disabled={isChatLoading}
                        />
                         <Button onClick={handleChatSubmit} variant="secondary" isLoading={isChatLoading} disabled={!chatInput.trim()}>
                            Send
                        </Button>
                    </div>
                    {chatError && <p className="text-red-500 text-sm mt-2">{chatError}</p>}
                </ToolCard>
            </div>
        </div>
    );
};

export default ToolsPage;