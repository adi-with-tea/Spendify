import { ReactNode, useState } from 'react';

/* ---- Card ---- */
export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ---- StatCard ---- */
export function StatCard({ label, value, sub, color }: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <Card>
      <div style={{ fontSize: '0.8rem', color: 'var(--text2)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: '1.75rem', fontFamily: 'Syne, sans-serif', fontWeight: 800, color: color || 'var(--text)', lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: 6 }}>{sub}</div>}
    </Card>
  );
}

/* ---- Button ---- */
export function Btn({ children, onClick, variant = 'primary', style, disabled }: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--accent)', color: 'white', border: 'none' },
    secondary: { background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' },
    danger: { background: 'rgba(255,107,107,0.15)', color: 'var(--red)', border: '1px solid var(--red)' },
    ghost: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)' },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        borderRadius: 'var(--radius-sm)',
        fontWeight: 700,
        fontSize: '0.875rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s',
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* ---- Input ---- */
export function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: '0.8rem', color: 'var(--text2)', fontWeight: 600 }}>{label}</label>}
      <input
        {...props}
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          color: 'var(--text)',
          outline: 'none',
          width: '100%',
          ...props.style,
        }}
      />
    </div>
  );
}

/* ---- Select ---- */
export function Select({ label, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: '0.8rem', color: 'var(--text2)', fontWeight: 600 }}>{label}</label>}
      <select
        {...props}
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          color: 'var(--text)',
          outline: 'none',
          width: '100%',
          ...props.style,
        }}
      >
        {children}
      </select>
    </div>
  );
}

/* ---- Modal ---- */
export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: 32, width: 480, maxWidth: '90vw',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---- ProgressBar ---- */
export function ProgressBar({ value, color }: { value: number; color?: string }) {
  const c = value >= 90 ? 'var(--red)' : value >= 70 ? 'var(--yellow)' : (color || 'var(--accent)');
  return (
    <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.min(value, 100)}%`, background: c, borderRadius: 99, transition: 'width 0.5s ease' }} />
    </div>
  );
}

/* ---- PageHeader ---- */
export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
      <div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.5px' }}>{title}</h1>
        {sub && <p style={{ color: 'var(--text2)', marginTop: 4, fontSize: '0.9rem' }}>{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/* ---- Tag ---- */
export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span style={{
      fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px',
      borderRadius: 99, background: `${color || 'var(--accent)'}22`,
      color: color || 'var(--accent)', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}
