import { useState, useRef, useEffect } from 'react';
import { AppState } from '../types';
import {
  getCurrentMonthTransactions, getTotalExpenses, getTotalIncome,
  getExpensesByCategory, getBudgetUsage, formatCurrency,
} from '../helpers';
import { PageHeader, Btn, Card } from '../components/UI';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props { state: AppState; }

const QUICK_ACTIONS = [
  { label: '📊 Full Financial Report', prompt: 'Give me a complete financial health report based on my actual data. Include spending patterns, budget performance, savings rate, and specific recommendations.' },
  { label: '✂️ Where to Cut Spending', prompt: 'Analyze my expenses and tell me exactly where I am overspending. Give me 3-5 specific actionable cuts I can make this month.' },
  { label: '💰 Investment Suggestions', prompt: 'Based on my income, expenses, and savings rate, what should I be investing in? Give me specific suggestions suitable for someone in India.' },
  { label: '🎯 Goal Planning', prompt: 'Look at my savings goals and current savings rate. Am I on track? What do I need to change to hit my goals on time?' },
  { label: '📅 Monthly Budget Plan', prompt: 'Create an optimized monthly budget plan based on my income and current spending habits. Use the 50/30/20 rule as a guide.' },
  { label: '⚠️ Financial Risks', prompt: 'Identify any financial risks or red flags in my current spending and saving patterns. What should I be worried about?' },
];

function buildSystemPrompt(state: AppState): string {
  const monthTx = getCurrentMonthTransactions(state.transactions);
  const income = getTotalIncome(monthTx);
  const expenses = getTotalExpenses(monthTx);
  const savings = income - expenses;
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;
  const catExpenses = getExpensesByCategory(monthTx);
  const budgetUsage = getBudgetUsage(state.transactions, state.budgets);

  return `You are Spendify AI, a personal financial advisor with access to the user's REAL financial data. 
Be specific, reference their actual numbers, and give actionable advice. Be concise but thorough.
Use bullet points and clear formatting. Speak directly and confidently.

USER'S FINANCIAL DATA (Current Month):
- Monthly Income: ${formatCurrency(income)}
- Total Expenses: ${formatCurrency(expenses)}
- Net Savings: ${formatCurrency(savings)}
- Savings Rate: ${savingsRate}%

SPENDING BREAKDOWN:
${Object.entries(catExpenses).map(([cat, amt]) => `- ${cat}: ${formatCurrency(amt)} (${income > 0 ? Math.round((amt/income)*100) : 0}% of income)`).join('\n')}

BUDGET STATUS:
${budgetUsage.map(b => `- ${b.category}: spent ${formatCurrency(b.spent)} of ${formatCurrency(b.limit)} limit (${Math.round(b.percentage)}%${b.percentage >= 90 ? ' ⚠️ OVER' : b.percentage >= 70 ? ' ⚠️ WARNING' : ' ✓'})`).join('\n')}

SAVINGS GOALS:
${state.goals.map(g => `- ${g.name}: ${formatCurrency(g.currentAmount)} / ${formatCurrency(g.targetAmount)} (${Math.round((g.currentAmount/g.targetAmount)*100)}%) — target: ${new Date(g.targetDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}`).join('\n')}

RECENT TRANSACTIONS (last 10):
${state.transactions.slice(-10).reverse().map(t => `- ${t.description}: ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)} [${t.category}]`).join('\n')}

Always ground your advice in these specific numbers. Do not give generic advice.`;
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '14px 18px', background: 'var(--surface2)', borderRadius: '16px 16px 16px 4px', width: 'fit-content' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)',
          animation: 'bounce 1.2s infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: 'white', marginRight: 10, flexShrink: 0, marginTop: 4 }}>✦</div>
      )}
      <div style={{
        maxWidth: '72%',
        padding: '14px 18px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser ? 'var(--accent)' : 'var(--surface2)',
        color: isUser ? 'white' : 'var(--text)',
        fontSize: '0.9rem',
        lineHeight: 1.65,
        whiteSpace: 'pre-wrap',
        border: isUser ? 'none' : '1px solid var(--border)',
      }}>
        {msg.content}
      </div>
    </div>
  );
}

export default function AIAgent({ state }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your Spendify AI Agent. I have full access to your financial data — transactions, budgets, and goals.\n\nI can analyze your spending patterns, identify where you're overspending, suggest investments, and help you plan to hit your goals faster.\n\nTry a quick action below or ask me anything about your finances!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError('');

    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: buildSystemPrompt(state),
          messages: apiMessages,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(`API error: ${err.error?.message || res.statusText}`);
        setMessages(prev => prev.slice(0, -1));
        setLoading(false);
        return;
      }

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setError('Network error. Make sure you are connected to the internet.');
      setMessages(prev => prev.slice(0, -1));
    }
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <PageHeader
        title="AI Agent"
        sub="Powered by Claude · Knows your real data"
      />

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {QUICK_ACTIONS.map(a => (
          <button key={a.label} onClick={() => sendMessage(a.prompt)} disabled={loading}
            style={{
              padding: '7px 14px', borderRadius: 99,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text2)', fontSize: '0.8rem', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s', fontFamily: 'DM Sans',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'var(--accent)'; (e.target as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text2)'; }}
          >
            {a.label}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid var(--red)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 12, color: 'var(--red)', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {/* Chat window */}
      <Card style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', marginBottom: 16 }}>
        {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: 'white' }}>✦</div>
            <TypingDots />
          </div>
        )}
        <div ref={bottomRef} />
      </Card>

      {/* Input */}
      <div style={{ display: 'flex', gap: 12 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything about your finances... (Enter to send)"
          rows={2}
          style={{
            flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--text)',
            outline: 'none', resize: 'none', fontFamily: 'DM Sans', fontSize: '0.9rem',
            lineHeight: 1.5,
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <Btn onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{ alignSelf: 'flex-end', padding: '12px 24px' }}>
          {loading ? '⟳' : '↑ Send'}
        </Btn>
      </div>
    </div>
  );
}
