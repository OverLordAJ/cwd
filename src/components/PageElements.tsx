import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const normalized = Math.max(0, Math.min(100, value))
  return <div className="progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(normalized)}><span style={{ transform: `scaleX(${normalized / 100})` }} /></div>
}

export function PageHeading({ eyebrow, title, children, action }: { eyebrow: string; title: string; children: ReactNode; action?: ReactNode }) {
  return <header className="page-heading split-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{children}</p></div>{action}</header>
}

export function EmptyState({ title, body, actionLabel, onAction }: { title: string; body: string; actionLabel: string; onAction: () => void }) {
  return <div className="empty-state"><strong>{title}</strong><p>{body}</p><button type="button" className="text-link" onClick={onAction}>{actionLabel} <ArrowRight size={16} /></button></div>
}
