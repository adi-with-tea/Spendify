import { Page } from '../types';
import s from './Nav.module.css';

interface Props {
  current: Page;
  onNavigate: (p: Page) => void;
}

const links: { page: Page; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { page: 'transactions', label: 'Transactions', icon: '↕' },
  { page: 'budget', label: 'Budget', icon: '◎' },
  { page: 'goals', label: 'Goals', icon: '◈' },
  { page: 'ai', label: 'AI Agent', icon: '✦' },
];

export default function Nav({ current, onNavigate }: Props) {
  return (
    <nav className={s.nav}>
      <div className={s.logo}>
        <span className={s.logoIcon}>$</span>
        <span className={s.logoText}>Spendify</span>
      </div>
      <ul className={s.links}>
        {links.map(l => (
          <li key={l.page}>
            <button
              className={`${s.link} ${current === l.page ? s.active : ''}`}
              onClick={() => onNavigate(l.page)}
            >
              <span className={s.icon}>{l.icon}</span>
              <span>{l.label}</span>
              {l.page === 'ai' && <span className={s.badge}>AI</span>}
            </button>
          </li>
        ))}
      </ul>
      <div className={s.footer}>
        <div className={s.version}>v2.0 · Agentic AI</div>
      </div>
    </nav>
  );
}
