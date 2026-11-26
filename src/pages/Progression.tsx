import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Check, Lock, ShieldCheck } from 'lucide-react'
import { PageHeading, ProgressBar } from '../components/PageElements'
import { canUnlockTier, latestAssessment, tierCriteria, XP_PER_LEVEL } from '../lib/progression'
import type { AppState, Assessment } from '../types'

const stages = [
  ['Technique', 'Learn the movement and establish control.'], ['Volume', 'Build repetitions inside the prescribed range.'], ['Sets', 'Add a set only when recovery supports it.'],
  ['Difficulty', 'Move to a harder leverage or reduced assistance.'], ['Tempo', 'Use controlled eccentrics and pauses.'], ['Mastery', 'Repeat consistent performance before progressing again.'],
]

export function ProgressionPage({ state, onSaveAssessment, onUnlock }: { state: AppState; onSaveAssessment: (assessment: Assessment) => void; onUnlock: (tier: 'training' | 'legendary') => void }) {
  const target = state.unlockedTier === 'origin' ? 'training' : 'legendary'
  const [plankSeconds, setPlankSeconds] = useState(0)
  const [checks, setChecks] = useState({ controlledPushups: false, squatLungeControl: false, standardPushups: false, splitSquatControl: false, controlledTempo: false, landingControl: false, recoveryReliable: false })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const criteria = tierCriteria(state, target)
  const eligible = canUnlockTier(state, target)
  const completed = criteria.filter((criterion) => criterion.met).length
  const latest = latestAssessment(state, target)
  const update = (key: keyof typeof checks, value: boolean) => { setChecks({ ...checks, [key]: value }); setSaved(false) }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!Number.isFinite(plankSeconds) || plankSeconds < 0 || plankSeconds > 600) { setError('Enter a plank result from 0 to 600 seconds. Stop at form failure.'); return }
    setError('')
    onSaveAssessment({ id: `assessment-${Date.now()}`, date: new Date().toISOString(), target, ...checks, plankSeconds })
    setSaved(true)
  }
  return <div className="page progression-page"><PageHeading eyebrow="PROGRESSION SYSTEM · DOUBLE PROGRESSION" title="Master the current rung.">Build reps, then sets, then difficulty or tempo—one useful change at a time. Physical benchmarks decide tier access; XP remains a consistency record.</PageHeading>
    <section className="stage-track">{stages.map(([name, body], index) => <div key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{body}</p></div>)}</section>
    <section className="double-progression"><div><p className="eyebrow">EXAMPLE · 3 × 8–12</p><h2>Own twelve. Then evolve.</h2></div><div className="double-steps"><div><span>STEP A</span><strong>8 → 12 reps in all three sets</strong><p>Technique stays clean and one to three reps remain in reserve.</p></div><ArrowRight size={22} /><div><span>STEP B</span><strong>Repeat consistently and recover</strong><p>Only then choose a harder variation or a controlled tempo.</p></div></div></section>
    {state.unlockedTier === 'legendary' ? <section className="legendary-complete"><ShieldCheck size={34} /><div><p className="eyebrow">ALL THREE ARCS AVAILABLE</p><h2>Legendary does not mean reckless.</h2><p>Keep using readiness, clean technique and recovery to select appropriate work. Advanced exercises remain optional, and power work still requires controlled landings.</p></div></section> : <div className="assessment-layout"><section className="eligibility-panel"><div className="panel-heading"><div><span>NEXT TIER</span><h2>{target === 'training' ? 'Training Arc' : 'Legendary Arc'}</h2></div><Lock size={22} /></div><div className="eligibility-progress"><strong>{completed}/{criteria.length}</strong><span>criteria met</span><ProgressBar value={completed / criteria.length * 100} label="Tier unlock criteria" /></div><ul className="criteria-list">{criteria.map((criterion) => <li key={criterion.id} className={criterion.met ? 'met' : ''}><span>{criterion.met && <Check size={15} />}</span>{criterion.label}</li>)}</ul><button className="primary-button" type="button" disabled={!eligible} onClick={() => onUnlock(target)}>{eligible ? `Unlock ${target === 'training' ? 'Training' : 'Legendary'} Arc` : 'Complete and save every criterion'} <ArrowRight size={17} /></button><p className="fine-print">Suggested program benchmarks, not a medical clearance. Do not rush a test or train through pain.</p></section>
      <section className="assessment-panel"><div className="panel-heading"><div><span>SELF-ASSESSMENT</span><h2>Demonstrate readiness</h2></div></div><form onSubmit={submit}><p>Save an honest assessment after a rested technique check. A benchmark is not a maximal test.</p><label>Best controlled plank · seconds<input type="number" min="0" max="600" value={plankSeconds} onChange={(event) => { setPlankSeconds(Number(event.target.value)); setSaved(false) }} required /></label>{target === 'training' ? <><label className="checkbox-label"><input type="checkbox" checked={checks.controlledPushups} onChange={(event) => update('controlledPushups', event.target.checked)} /> Controlled push-ups at my beginner variation</label><label className="checkbox-label"><input type="checkbox" checked={checks.squatLungeControl} onChange={(event) => update('squatLungeControl', event.target.checked)} /> Controlled squats and reverse lunges</label></> : <><label className="checkbox-label"><input type="checkbox" checked={checks.standardPushups} onChange={(event) => update('standardPushups', event.target.checked)} /> Controlled standard push-ups</label><label className="checkbox-label"><input type="checkbox" checked={checks.splitSquatControl} onChange={(event) => update('splitSquatControl', event.target.checked)} /> Stable split squats on both sides</label><label className="checkbox-label"><input type="checkbox" checked={checks.controlledTempo} onChange={(event) => update('controlledTempo', event.target.checked)} /> Controlled lowering and pauses</label><label className="checkbox-label"><input type="checkbox" checked={checks.landingControl} onChange={(event) => update('landingControl', event.target.checked)} /> Quiet, stable jump landings <span>· enables optional power work</span></label></>}<label className="checkbox-label"><input type="checkbox" checked={checks.recoveryReliable} onChange={(event) => update('recoveryReliable', event.target.checked)} /> I recover without excessive fatigue between sessions</label>{error && <p className="form-error" role="alert">{error}</p>}<button className="secondary-button" type="submit">{saved ? <Check size={17} /> : null}{saved ? 'Assessment saved' : 'Save readiness assessment'}</button>{latest && <p className="fine-print">Latest saved assessment: {latest.date.slice(0, 10)}</p>}</form></section></div>}
    <aside className="xp-rule"><span>LV XP</span><div><strong>{XP_PER_LEVEL} XP marks a level. It does not unlock an exercise.</strong><p>Completion, technique, recovery and personal improvements can earn XP. Pain, skipped rest and excessive volume never do.</p></div></aside>
  </div>
}
