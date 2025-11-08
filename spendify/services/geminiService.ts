import { GoogleGenAI, Type } from "@google/genai";
import type { BudgetItem } from '../types';

// IMPORTANT: In a real application, the API key would be stored securely
// and not exposed in the client-side code. For this demo, it's assumed
// to be available in an environment variable `process.env.API_KEY`.
// The user of this app should set this up in their environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will be disabled. Please set process.env.API_KEY.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const budgetSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        description: 'The name of the budget category (e.g., "Groceries", "Entertainment").',
      },
      allocated: {
        type: Type.NUMBER,
        description: 'The suggested monthly dollar amount for this category.',
      },
    },
    required: ["category", "allocated"],
  },
};

/**
 * Generates a sample budget using the Gemini API.
 * @param monthlyIncome The user's monthly income.
 * @returns A promise that resolves to an array of BudgetItem objects.
 */
export const generateBudget = async (monthlyIncome: number): Promise<BudgetItem[]> => {
  if (!API_KEY) {
    // Return mock data if API key is not available
    console.log("Using mock data for budget generation.");
    return [
        { category: 'Housing', allocated: monthlyIncome * 0.3, spent: 0 },
        { category: 'Utilities', allocated: monthlyIncome * 0.05, spent: 0 },
        { category: 'Groceries', allocated: monthlyIncome * 0.15, spent: 0 },
        { category: 'Transport', allocated: monthlyIncome * 0.1, spent: 0 },
        { category: 'Savings', allocated: monthlyIncome * 0.2, spent: 0 },
        { category: 'Entertainment', allocated: monthlyIncome * 0.1, spent: 0 },
        { category: 'Miscellaneous', allocated: monthlyIncome * 0.1, spent: 0 },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a simple monthly budget for someone with a monthly income of $${monthlyIncome}. Use standard categories like Housing, Groceries, Savings, etc. Follow the 50/30/20 rule as a guideline but be realistic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: budgetSchema,
      },
    });

    const jsonText = response.text.trim();
    const budgetData = JSON.parse(jsonText);

    // Add 'spent: 0' to each item to match the BudgetItem type
    return budgetData.map((item: { category: string, allocated: number }) => ({ ...item, spent: 0 }));
  } catch (error) {
    console.error("Error generating budget with Gemini API:", error);
    throw new Error("Failed to generate budget.");
  }
};

/**
 * Categorizes a spending description using the Gemini API.
 * @param expenseDescription The text description of the expense.
 * @returns A promise that resolves to a string with the category name.
 */
export const categorizeExpense = async (expenseDescription: string): Promise<string> => {
    if (!API_KEY) {
        // Return mock data if API key is not available
        console.log("Using mock data for expense categorization.");
        const categories = ['Food & Dining', 'Shopping', 'Entertainment', 'Utilities', 'Transportation'];
        return categories[Math.floor(Math.random() * categories.length)];
    }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Categorize the following expense into a simple, common category (e.g., "Groceries", "Entertainment", "Utilities", "Shopping", "Transportation", "Health"): "${expenseDescription}". Respond with only the category name.`,
      config: {
        // Stop sequences can help ensure the model returns only the category.
        stopSequences: ["\n"]
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error categorizing expense with Gemini API:", error);
    throw new Error("Failed to categorize expense.");
  }
};

/**
 * Gets a response from the AI for the financial advisor chatbot.
 * @param message The user's message to the chatbot.
 * @returns A promise that resolves to the AI's string response.
 */
export const getChatbotResponse = async (message: string): Promise<string> => {
  if (!API_KEY) {
    console.log("Using mock data for chatbot response.");
    return "This is a placeholder response because the API key is not configured. In a real scenario, I would provide a detailed answer to your question.";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a friendly and helpful financial advisor chatbot. A user asked: "${message}". Provide a concise and helpful answer suitable for a chat interface.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error getting chatbot response from Gemini API:", error);
    throw new Error("Failed to get chatbot response.");
  }
};