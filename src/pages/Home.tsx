import type { CSSProperties } from 'react'
import { Activity, ArrowRight, CalendarDays, Check, Flame, ShieldCheck, Trophy } from 'lucide-react'
import { domains } from '../data/domains'
import { tiers } from '../data/tiers'
import { consistencyStreak, levelFromXp, logsThisWeek, XP_PER_LEVEL } from '../lib/progression'
import type { AppState, Readiness, ViewId } from '../types'
import { ProgressBar } from '../components/PageElements'

export function HomePage({ state, onNavigate, onReadiness, onDomain }: { state: AppState; onNavigate: (view: ViewId) => void; onReadiness: (status: Readiness) => void; onDomain: (domain: AppState['selectedDomain']) => void }) {
  const level = levelFromXp(state.xp)
  const levelXp = state.xp % XP_PER_LEVEL
  const today = new Date().toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })
  return <div className="home-page">
    <section className="home-hero">
      <div className="home-hero-copy"><p className="eyebrow"><span className="live-dot" /> {today} · ORIGIN SYSTEM ONLINE</p><h1>Train like a character.<br /><em>Progress like an athlete.</em></h1><p className="hero-description">A complete no-equipment calisthenics program with six anime-inspired domains, honest progression and recovery built into every arc.</p><div className="hero-actions"><button className="primary-button" type="button" onClick={() => onNavigate(state.activeWorkout ? 'session' : 'generator')}>{state.activeWorkout ? 'Resume active session' : 'Build today’s workout'} <ArrowRight size={18} /></button><button className="text-link" type="button" onClick={() => onNavigate('tiers')}>Explore training arcs</button></div><div className="hero-promises"><span><Check size={15} /> No gym equipment</span><span><Check size={15} /> Ability-gated progress</span><span><Check size={15} /> Rest without penalty</span></div></div>
      <div className="hero-visual"><img src="images/tiers/origin-saitama-foundation.webp" alt="Anime-inspired athlete performing a controlled foundation exercise" /><div className="hero-visual-shade" /><div className="hero-status"><div className="hero-level"><span>LV</span><strong>{String(level).padStart(2, '0')}</strong></div><div className="hero-level-copy"><span>YOUR CURRENT ARC</span><strong>{state.unlockedTier === 'legendary' ? 'Legendary Arc' : state.unlockedTier === 'training' ? 'Training Arc' : 'Origin Arc'}</strong><ProgressBar value={levelXp / XP_PER_LEVEL * 100} label={`${levelXp} of ${XP_PER_LEVEL} XP toward next level`} /><small>{levelXp} / {XP_PER_LEVEL} XP · XP does not unlock tiers</small></div></div></div>
    </section>

    <section className="metric-ribbon" aria-label="Training summary"><div><Activity size={19} /><span>Workouts</span><strong>{state.logs.length}</strong></div><div><Flame size={19} /><span>Consistency streak</span><strong>{consistencyStreak(state)} <small>days</small></strong></div><div><CalendarDays size={19} /><span>This week</span><strong>{logsThisWeek(state.logs).length} <small>sessions</small></strong></div><div><Trophy size={19} /><span>Total XP</span><strong>{state.xp}</strong></div></section>

    <section className="home-section readiness-home"><div className="section-heading"><div><p className="eyebrow">BEFORE YOU TRAIN</p><h2>How ready are you?</h2></div><p>A truthful check changes the plan. “Hard” is never more important than “ready.”</p></div><div className="home-readiness-grid">{([
      ['recovered', 'Recovered', 'Normal plan'], ['tired', 'Somewhat tired', 'Reduce the work'], ['fatigued', 'Very fatigued', 'Recovery only'], ['pain', 'Pain', 'Stop and assess'],
    ] as const).map(([value, label, note]) => <button key={value} type="button" onClick={() => onReadiness(value)}><span>{label}</span><small>{note}</small><ArrowRight size={17} /></button>)}</div></section>

    <section className="home-section"><div className="section-heading"><div><p className="eyebrow">SIX TRAINING DOMAINS</p><h2>Choose your discipline.</h2></div><p>Each domain changes exercise selection and training emphasis. Every session remains equipment-free.</p></div><div className="domain-home-grid">{domains.map((domain, index) => <button key={domain.id} type="button" style={{ '--domain-accent': domain.accent } as CSSProperties} onClick={() => onDomain(domain.id)}><span className="domain-index">0{index + 1}</span><div><strong>{domain.name}</strong><span>{domain.title}</span></div><ArrowRight size={19} /></button>)}</div></section>

    <section className="home-section tier-preview-section"><div className="section-heading"><div><p className="eyebrow">YOUR TRAINING JOURNEY</p><h2>Three arcs. Earned evolution.</h2></div><p>Time and XP can mark consistency. Only demonstrated technique, ability and recovery unlock the next training tier.</p></div><div className="tier-preview-grid">{tiers.map((tier, index) => { const unlocked = index === 0 || state.unlockedTier === 'legendary' || (state.unlockedTier === 'training' && index === 1); return <article className="tier-preview" key={tier.id}><img src={tier.images[0].src} alt={tier.images[0].alt} /><div><span>TIER {tier.level} · {unlocked ? 'AVAILABLE' : 'LOCKED'}</span><h3>{tier.name}</h3><p>{tier.objective}</p><button className="text-link" type="button" onClick={() => onNavigate(unlocked ? 'tiers' : 'progression')}>{unlocked ? 'View arc' : 'View unlock criteria'} <ArrowRight size={15} /></button></div></article>})}</div></section>

    <section className="home-truth"><ShieldCheck size={30} /><div><p className="eyebrow">THE TRUTH BENEATH THE THEME</p><h2>Anime supplies the story.<br />Physiology sets the pace.</h2></div><p>Progressive overload, adequate volume, specificity, conditioning, mobility and recovery shape the plan. No-equipment training has real limits—especially for loaded pulling—and this program names them instead of hiding them.</p></section>
  </div>
}
