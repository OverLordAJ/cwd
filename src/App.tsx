import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Activity, ArrowRight, Award, BookOpen, ChevronRight, Dumbbell, Gauge, HeartPulse, Home, Layers3, Library, ListChecks, Menu, Settings, ShieldCheck, Sparkles, Swords, Trophy, X, Zap } from 'lucide-react'
import { WorkoutGenerator } from './components/WorkoutGenerator'
import { WorkoutSession } from './components/WorkoutSession'
import type { CompletionInput } from './components/WorkoutSession'
import { HomePage } from './pages/Home'
import { TiersPage } from './pages/Tiers'
import { DomainsPage } from './pages/Domains'
import { LibraryPage } from './pages/Library'
import { DashboardPage } from './pages/Dashboard'
import { ProgressionPage } from './pages/Progression'
import { RecoveryPage } from './pages/Recovery'
import { QuestsPage } from './pages/Quests'
import { AchievementsPage } from './pages/Achievements'
import { ProfilePage } from './pages/Profile'
import { generateWorkout } from './lib/generator'
import { calculateSessionXp, countNewRecords, hasLandingControl, levelFromXp, localDateKey, tierRank } from './lib/progression'
import { createInitialState, loadState, saveState, STORAGE_KEY } from './lib/storage'
import type { AppState, Assessment, DomainId, Duration, GeneratorConfig, GoalId, Profile, Readiness, ReadinessEntry, SessionLog, TierId, ToastMessage, ViewId } from './types'
import './App.css'

type NavItem = { id: ViewId; label: string; icon: ComponentType<{ size?: number }> }
const mainNav: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home }, { id: 'generator', label: 'Workout generator', icon: Zap },
  { id: 'tiers', label: 'Training tiers', icon: Layers3 }, { id: 'domains', label: 'Six domains', icon: Swords },
  { id: 'library', label: 'Exercise library', icon: Library }, { id: 'dashboard', label: 'Dashboard', icon: Gauge },
]
const journeyNav: NavItem[] = [
  { id: 'progression', label: 'Progression', icon: Activity }, { id: 'recovery', label: 'Recovery center', icon: HeartPulse },
  { id: 'quests', label: 'Daily quests', icon: ListChecks }, { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'profile', label: 'Profile & settings', icon: Settings },
]
const pageNames: Record<ViewId, string> = { home: 'Overview', tiers: 'Training tiers', domains: 'Training domains', generator: 'Workout generator', session: 'Active session', library: 'Exercise library', dashboard: 'Training dashboard', progression: 'Progression system', recovery: 'Recovery center', quests: 'Quests & challenges', achievements: 'Achievements', profile: 'Profile & settings' }

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [view, setView] = useState<ViewId>('home')
  const [config, setConfig] = useState<GeneratorConfig>(() => ({ tier: state.unlockedTier, domain: state.selectedDomain, goal: 'general', days: state.profile.defaultDays, duration: state.profile.defaultDuration, ability: 'new', difficulty: 'light', readiness: 'recovered' }))
  const [generatorError, setGeneratorError] = useState('')
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const [storageOkay, setStorageOkay] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const level = levelFromXp(state.xp)

  useEffect(() => { setStorageOkay(saveState(state)) }, [state])
  useEffect(() => { document.documentElement.classList.toggle('reduce-motion', state.profile.reducedMotion) }, [state.profile.reducedMotion])
  useEffect(() => { window.scrollTo({ top: 0, behavior: state.profile.reducedMotion ? 'auto' : 'smooth' }); setMobileMenu(false) }, [view, state.profile.reducedMotion])
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(() => setToast(null), 5000); return () => window.clearTimeout(timeout) }, [toast])

  const navigate = (next: ViewId) => {
    if (next === 'session' && !state.activeWorkout) next = 'generator'
    setView(next)
  }
  const selectDomain = (domain: DomainId) => {
    setState((current) => ({ ...current, selectedDomain: domain }))
    setConfig((current) => ({ ...current, domain }))
    navigate('domains')
  }
  const startReadiness = (readiness: Readiness) => {
    setConfig((current) => ({ ...current, readiness, goal: readiness === 'fatigued' || readiness === 'pain' ? 'mobility' : current.goal, difficulty: readiness === 'recovered' ? current.difficulty : 'light' }))
    navigate('generator')
  }
  const generate = () => {
    if (tierRank(config.tier) > tierRank(state.unlockedTier)) { setGeneratorError('That arc is locked. Complete its ability, consistency and recovery criteria in Progression first.'); return }
    setGeneratorError('')
    const workout = generateWorkout(config, `session-${Date.now()}`, hasLandingControl(state))
    setState((current) => ({ ...current, selectedDomain: config.domain, activeWorkout: workout, activeProgress: [] }))
    setView('session')
  }
  const openTemplate = (domain: DomainId, goal: GoalId, duration: Duration) => {
    setConfig((current) => ({ ...current, tier: state.unlockedTier, domain, goal, duration, readiness: 'recovered', difficulty: 'light' }))
    navigate('generator')
  }
  const trainTier = (tier: TierId) => {
    setConfig((current) => ({ ...current, tier, ability: tier === 'origin' ? 'new' : tier === 'training' ? 'developing' : 'experienced', difficulty: tier === 'legendary' ? 'moderate' : 'light' }))
    navigate('generator')
  }
  const toggleProgress = (id: string) => setState((current) => ({ ...current, activeProgress: current.activeProgress.includes(id) ? current.activeProgress.filter((item) => item !== id) : [...current.activeProgress, id] }))
  const regressExercise = (exerciseId: string) => {
    setState((current) => {
      if (!current.activeWorkout) return current
      const update = (item: typeof current.activeWorkout.main[number]) => item.exerciseId === exerciseId ? { ...item, variation: item.easierVariation, sets: Math.max(1, item.sets - 1) } : item
      return { ...current, activeWorkout: { ...current.activeWorkout, main: current.activeWorkout.main.map(update), conditioning: current.activeWorkout.conditioning.map(update) } }
    })
    setToast({ title: 'Variation regressed', body: 'The easier movement is active and one set was removed. Clean technique decides the next progression.' })
  }
  const completeWorkout = (input: CompletionInput) => {
    const workout = state.activeWorkout
    if (!workout) return
    const provisional: SessionLog = { id: workout.id, date: localDateKey(), title: workout.title, tier: workout.tier, domain: workout.domain, goal: workout.goal, duration: workout.duration, intensity: workout.intensity, xp: 0, rpe: input.rpe, techniqueClean: input.techniqueClean, results: input.results }
    const prCount = countNewRecords(provisional, state.logs)
    const xp = calculateSessionXp({ intensity: workout.intensity, techniqueClean: input.techniqueClean, prCount, previousLogCount: state.logs.length })
    const log = { ...provisional, xp }
    setState((current) => ({ ...current, xp: current.xp + xp, logs: [...current.logs, log], activeWorkout: null, activeProgress: [] }))
    setToast({ title: `SESSION CLEARED · +${xp} XP`, body: `${prCount} personal record${prCount === 1 ? '' : 's'} logged. Recovery and the next honest session move the arc forward.` })
    navigate('dashboard')
  }
  const saveReadiness = (entry: ReadinessEntry) => {
    setState((current) => ({ ...current, readiness: [...current.readiness.filter((item) => item.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date)) }))
    setConfig((current) => ({ ...current, readiness: entry.status }))
    setToast({ title: 'READINESS SAVED', body: entry.status === 'pain' ? 'Pain mode is active. The generator will not create a demanding workout.' : 'Your next generated session will use this recovery status.' })
  }
  const logRestDay = () => {
    const today = localDateKey()
    setState((current) => ({ ...current, restDays: current.restDays.includes(today) ? current.restDays : [...current.restDays, today] }))
    setToast({ title: 'REST DAY LOGGED', body: 'Your consistency streak is preserved. No training is required today.' })
  }
  const generateRecovery = () => {
    const recoveryConfig: GeneratorConfig = { ...config, goal: 'mobility', readiness: 'fatigued', difficulty: 'light', duration: 20, tier: state.unlockedTier }
    setConfig(recoveryConfig)
    const workout = generateWorkout(recoveryConfig, `recovery-${Date.now()}`, false)
    setState((current) => ({ ...current, activeWorkout: workout, activeProgress: [] }))
    setView('session')
  }
  const saveAssessment = (assessment: Assessment) => {
    setState((current) => ({ ...current, assessments: [...current.assessments, assessment] }))
    setToast({ title: 'ASSESSMENT SAVED', body: 'The tier criteria now use this record. Unlock only when every requirement is met.' })
  }
  const unlockTier = (tier: 'training' | 'legendary') => {
    setState((current) => ({ ...current, unlockedTier: tier }))
    setConfig((current) => ({ ...current, tier }))
    setToast({ title: `${tier === 'training' ? 'TRAINING' : 'LEGENDARY'} ARC UNLOCKED`, body: 'Ability and recovery criteria are met. Keep progression gradual at the new tier.' })
  }
  const saveProfile = (profile: Profile) => {
    setState((current) => ({ ...current, profile }))
    setConfig((current) => ({ ...current, days: profile.defaultDays, duration: profile.defaultDuration }))
    setToast({ title: 'SETTINGS SAVED', body: 'Your generator defaults and motion preference are updated.' })
  }
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data: state }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `anime-fitness-evolve-${localDateKey()}.json`
    anchor.click()
    URL.revokeObjectURL(url)
    setToast({ title: 'DATA EXPORTED', body: 'Your browser received a JSON backup of sessions, settings and progress.' })
  }
  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
    const initial = createInitialState()
    setState(initial)
    setConfig({ tier: 'origin', domain: 'saitama', goal: 'general', days: 3, duration: 30, ability: 'new', difficulty: 'light', readiness: 'recovered' })
    setResetOpen(false)
    navigate('home')
    setToast({ title: 'PROGRESS RESET', body: 'A clean Origin Arc is ready in this browser.' })
  }

  const navButton = (item: NavItem) => <button key={item.id} type="button" className={view === item.id ? 'active' : ''} aria-current={view === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}><item.icon size={18} /><span>{item.label}</span><ChevronRight size={14} /></button>

  return <div className="app-shell">
    <aside className="desktop-sidebar"><button className="brand" type="button" onClick={() => navigate('home')} aria-label="Anime Fitness Evolve home"><span className="brand-mark"><i /><i /><i /></span><span>ANIME FITNESS<strong>EVOLVE</strong></span></button><div className="sidebar-profile"><div className="avatar-mark">{state.profile.name.slice(0, 1).toUpperCase()}</div><div><strong>{state.profile.name}</strong><span>LEVEL {level} · {state.unlockedTier.toUpperCase()}</span></div></div><nav aria-label="Primary navigation"><span className="nav-label">TRAIN</span>{mainNav.map(navButton)}<span className="nav-label">JOURNEY</span>{journeyNav.map(navButton)}</nav><div className="sidebar-bottom"><div><span>LEVEL {level}</span><strong>{state.xp % 300} / 300 XP</strong></div><div className="mini-progress"><span style={{ transform: `scaleX(${(state.xp % 300) / 300})` }} /></div><small>XP never unlocks exercises.</small></div></aside>
    <header className="mobile-header"><button className="brand" type="button" onClick={() => navigate('home')}><span className="brand-mark"><i /><i /><i /></span><span>AFE<strong>EVOLVE</strong></span></button><div><span>LV {level}</span><button className="icon-button" type="button" aria-label="Open navigation menu" onClick={() => setMobileMenu(true)}><Menu size={21} /></button></div></header>
    <div className="app-main"><header className="desktop-topbar"><div><span>ANIME FITNESS EVOLVE</span><ChevronRight size={13} /><strong>{pageNames[view]}</strong></div><button className="topbar-action" type="button" onClick={() => navigate(state.activeWorkout ? 'session' : 'generator')}><Sparkles size={16} />{state.activeWorkout ? 'Resume session' : 'Quick workout'}</button></header>
      <main id="main-content">
        {view === 'home' && <HomePage state={state} onNavigate={navigate} onReadiness={startReadiness} onDomain={selectDomain} />}
        {view === 'tiers' && <TiersPage unlockedTier={state.unlockedTier} onTrain={trainTier} onCriteria={() => navigate('progression')} />}
        {view === 'domains' && <DomainsPage selected={state.selectedDomain} onSelect={(domain) => setState((current) => ({ ...current, selectedDomain: domain }))} onTemplate={openTemplate} />}
        {view === 'generator' && <WorkoutGenerator config={config} onChange={(next) => { setConfig(next); setGeneratorError('') }} onGenerate={generate} unlockedTier={state.unlockedTier} error={generatorError} />}
        {view === 'session' && state.activeWorkout && <WorkoutSession key={state.activeWorkout.id} workout={state.activeWorkout} progress={state.activeProgress} onToggle={toggleProgress} onRegress={regressExercise} onComplete={completeWorkout} onExit={() => navigate('generator')} onRecovery={() => navigate('recovery')} />}
        {view === 'library' && <LibraryPage />}
        {view === 'dashboard' && <DashboardPage state={state} onNavigate={navigate} />}
        {view === 'progression' && <ProgressionPage key={state.unlockedTier} state={state} onSaveAssessment={saveAssessment} onUnlock={unlockTier} />}
        {view === 'recovery' && <RecoveryPage state={state} onSave={saveReadiness} onRestDay={logRestDay} onGenerateRecovery={generateRecovery} />}
        {view === 'quests' && <QuestsPage state={state} onNavigate={navigate} />}
        {view === 'achievements' && <AchievementsPage state={state} onNavigate={navigate} />}
        {view === 'profile' && <ProfilePage state={state} storageOkay={storageOkay} onSave={saveProfile} onExport={exportData} onReset={() => setResetOpen(true)} />}
      </main>
      <footer className="site-footer"><button className="brand footer-brand" type="button" onClick={() => navigate('home')}><Dumbbell size={20} /><span>ANIME FITNESS<strong>EVOLVE</strong></span></button><p>Train like an anime character. Progress like an athlete.</p><span>General fitness guidance · local browser storage · no account</span></footer>
    </div>
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">{([{ id: 'home', label: 'Home', icon: Home }, { id: 'generator', label: 'Train', icon: Zap }, { id: 'library', label: 'Library', icon: BookOpen }, { id: 'dashboard', label: 'Progress', icon: Activity }] as NavItem[]).map((item) => <button key={item.id} type="button" className={view === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><item.icon size={20} /><span>{item.label}</span></button>)}<button type="button" onClick={() => setMobileMenu(true)}><Menu size={20} /><span>More</span></button></nav>

    <Dialog.Root open={mobileMenu} onOpenChange={setMobileMenu}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="mobile-menu-dialog"><div className="dialog-heading"><div><p className="eyebrow">NAVIGATION</p><Dialog.Title>Your training console</Dialog.Title></div><Dialog.Close className="icon-button" aria-label="Close navigation menu"><X size={20} /></Dialog.Close></div><Dialog.Description>All training, progression and settings pages.</Dialog.Description><nav>{[...mainNav, ...journeyNav].map((item) => <button key={item.id} type="button" className={view === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><item.icon size={19} /><span>{item.label}</span><ArrowRight size={16} /></button>)}</nav></Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={resetOpen} onOpenChange={setResetOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content reset-dialog"><div className="dialog-heading"><Dialog.Title>Reset every training record?</Dialog.Title><Dialog.Close className="icon-button" aria-label="Close reset confirmation"><X size={20} /></Dialog.Close></div><Dialog.Description>This clears sessions, XP, tier unlocks, assessments, check-ins and settings from this browser. Export first if you need a backup.</Dialog.Description><div className="reset-actions"><Dialog.Close className="secondary-button">Keep my progress</Dialog.Close><button className="danger-button" type="button" onClick={resetProgress}>Reset everything</button></div></Dialog.Content></Dialog.Portal></Dialog.Root>
    {toast && <div className="achievement-toast" role="status"><Award size={25} /><div><strong>{toast.title}</strong><p>{toast.body}</p></div><button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={17} /></button></div>}
    {!storageOkay && <div className="storage-warning" role="alert"><ShieldCheck size={17} /> Browser storage is unavailable. Export data before leaving.</div>}
  </div>
}
