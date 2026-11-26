import { useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronDown, ShieldCheck, X } from 'lucide-react'
import { exerciseById } from '../data/exercises'
import type { GeneratedWorkout, PerformanceResult } from '../types'
import { ExerciseDiagram } from './ExerciseDiagram'
import { RestTimer } from './RestTimer'

export type CompletionInput = { rpe: number; techniqueClean: boolean; results: PerformanceResult[] }

export function WorkoutSession({ workout, progress, onToggle, onRegress, onComplete, onExit, onRecovery }: {
  workout: GeneratedWorkout
  progress: string[]
  onToggle: (id: string) => void
  onRegress: (exerciseId: string) => void
  onComplete: (input: CompletionInput) => void
  onExit: () => void
  onRecovery: () => void
}) {
  const [completeOpen, setCompleteOpen] = useState(false)
  const [rpe, setRpe] = useState(6)
  const [techniqueClean, setTechniqueClean] = useState(true)
  const [results, setResults] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const warmupIds = workout.warmup.map((_, index) => `warmup-${index}`)
  const mainIds = workout.main.map((exercise) => `main-${exercise.exerciseId}`)
  const conditioningIds = workout.conditioning.map((exercise) => `conditioning-${exercise.exerciseId}`)
  const cooldownIds = workout.cooldown.map((_, index) => `cooldown-${index}`)
  const allIds = [...warmupIds, ...mainIds, ...conditioningIds, ...cooldownIds]
  const remaining = allIds.filter((id) => !progress.includes(id)).length
  const measured = [...workout.main, ...workout.conditioning]

  const openCompletion = () => {
    setResults(Object.fromEntries(measured.map((exercise) => [exercise.exerciseId, String(exercise.target || 0)])))
    setError('')
    setCompleteOpen(true)
  }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const output = measured.map((exercise) => ({ exerciseId: exercise.exerciseId, value: Number(results[exercise.exerciseId]), unit: exercise.metric }))
    if (output.some((result) => !Number.isFinite(result.value) || result.value < 0 || result.value > 1000)) {
      setError('Enter a result from 0 to 1000 for every measured exercise. Zero is valid when a movement was not appropriate.')
      return
    }
    onComplete({ rpe, techniqueClean, results: output })
    setCompleteOpen(false)
  }

  const checkRow = (id: string, title: string, detail?: string) => <label className={`session-check-row ${progress.includes(id) ? 'checked' : ''}`} key={id}><input type="checkbox" checked={progress.includes(id)} onChange={() => onToggle(id)} /><span className="custom-check">{progress.includes(id) && <Check size={15} />}</span><span><strong>{title}</strong>{detail && <small>{detail}</small>}</span></label>

  return <div className="page session-page">
    <div className="session-topline"><button className="text-button" type="button" onClick={onExit}><ArrowLeft size={17} /> Session setup</button><span>{remaining} steps remaining</span></div>
    <header className="workout-hero"><div><p className="eyebrow">LIVE SESSION · {workout.domain.toUpperCase()} DOMAIN</p><h1>{workout.title}</h1><p>{workout.subtitle}</p></div><div className="session-progress-ring" style={{ '--progress': `${Math.round((allIds.length - remaining) / allIds.length * 100) * 3.6}deg` } as CSSProperties}><div><strong>{Math.round((allIds.length - remaining) / allIds.length * 100)}%</strong><span>COMPLETE</span></div></div></header>
    <div className={`safety-banner ${workout.readiness === 'pain' ? 'urgent' : ''}`}><ShieldCheck size={21} /><p>{workout.safetyNote}</p></div>
    <div className="session-layout">
      <div className="session-content">
        <section className="workout-phase"><div className="phase-heading"><span>01</span><div><h2>Warm-up</h2><p>Prepare movement; do not turn this into conditioning.</p></div></div>{workout.warmup.map((item, index) => checkRow(`warmup-${index}`, item, 'Easy, controlled range'))}</section>
        <section className="workout-phase"><div className="phase-heading"><span>02</span><div><h2>{workout.intensity === 'Recovery' ? 'Recovery movement' : 'Main workout'}</h2><p>Check a movement only after all planned sets are complete with acceptable technique.</p></div></div>
          {workout.main.length === 0 ? <p className="empty-copy">No structured exercise is prescribed. Use the comfort check above and cool down when ready.</p> : workout.main.map((item) => {
            const exercise = exerciseById.get(item.exerciseId)!
            return <article className="workout-exercise" key={item.exerciseId}>
              <div className="workout-exercise-head"><div><span>{exercise.category} · Level {exercise.level}</span><h3>{item.variation}</h3><p>{item.sets} sets · {item.prescription} · Rest {item.restSeconds}s</p></div><ExerciseDiagram kind={exercise.demo} name={item.variation} compact /></div>
              <div className="technique-line"><strong>Key cue</strong><span>{item.instruction}</span></div>
              <details className="exercise-details"><summary>Technique, mistakes and safety <ChevronDown size={17} /></summary><div className="detail-columns"><div><h4>Technique</h4><ul>{exercise.technique.map((cue) => <li key={cue}>{cue}</li>)}</ul></div><div><h4>Common mistakes</h4><ul>{exercise.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></div></div><p className="safety-copy">{exercise.safety}</p><p><strong>Progression:</strong> {item.progression}</p></details>
              <div className="exercise-actions">{checkRow(`main-${item.exerciseId}`, 'Movement complete', `${item.sets} sets · stop with clean reps available`)}<button className="secondary-button small" type="button" disabled={item.variation === item.easierVariation && item.sets === 1} title={item.variation === item.easierVariation && item.sets === 1 ? 'Already using the easiest variation and minimum set count' : undefined} onClick={() => onRegress(item.exerciseId)}>Use easier: {item.easierVariation}</button></div>
            </article>
          })}
        </section>
        {workout.conditioning.length > 0 && <section className="workout-phase"><div className="phase-heading"><span>03</span><div><h2>Conditioning</h2><p>Crisp, repeatable effort. Stop before coordination or landing quality deteriorates.</p></div></div>{workout.conditioning.map((item) => <div className="conditioning-item" key={item.exerciseId}>{checkRow(`conditioning-${item.exerciseId}`, item.variation, `${item.sets} sets · ${item.prescription} · Rest ${item.restSeconds}s`)}<p>{item.instruction}</p></div>)}</section>}
        <section className="workout-phase"><div className="phase-heading"><span>{workout.conditioning.length > 0 ? '04' : '03'}</span><div><h2>Cool-down</h2><p>Let breathing settle and leave an honest performance record.</p></div></div>{workout.cooldown.map((item, index) => checkRow(`cooldown-${index}`, item))}</section>
      </div>
      <aside className="session-sidebar"><div className="sticky-panel"><p className="eyebrow">RECOVERY IS PART OF THE SET</p><RestTimer initial={workout.main[0]?.restSeconds || 60} /><div className="rest-guidance"><strong>Rest guidance</strong><p>{workout.restGuidance}</p></div><div className="rest-guidance"><strong>Next progression</strong><p>{workout.progressionTarget}</p></div><button className="text-button pain-link" type="button" onClick={onRecovery}><AlertTriangle size={16} /> Pain or unusual symptoms</button></div></aside>
    </div>
    <section className="weekly-plan"><div><p className="eyebrow">WEEK STRUCTURE</p><h2>Recover for the next arc.</h2></div><ul>{workout.weeklyPlan.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <div className="session-completion"><div><strong>{remaining === 0 ? 'Session ready to log' : `${remaining} steps before completion`}</strong><p>XP rewards completion, clean technique, recovery and personal bests—not extra suffering or volume.</p></div><button className="primary-button" type="button" disabled={remaining > 0} onClick={openCompletion}>Log session <ArrowRight size={18} /></button></div>

    <Dialog.Root open={completeOpen} onOpenChange={setCompleteOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content completion-dialog"><div className="dialog-heading"><div><p className="eyebrow">SESSION DEBRIEF</p><Dialog.Title>Record honest performance.</Dialog.Title></div><Dialog.Close className="icon-button" aria-label="Close session debrief"><X size={20} /></Dialog.Close></div><Dialog.Description>Enter your best clean set or hold for each movement. Use zero when appropriate. Results are compared only with your own history.</Dialog.Description>
      <form onSubmit={submit}><div className="result-grid">{measured.map((exercise) => <label key={exercise.exerciseId}>{exercise.name}<span>Best clean set · {exercise.metric}</span><input type="number" min="0" max="1000" required value={results[exercise.exerciseId] ?? ''} onChange={(event) => setResults({ ...results, [exercise.exerciseId]: event.target.value })} /></label>)}</div>
        <label className="range-label">Session effort · RPE {rpe}<input type="range" min="2" max="9" value={rpe} onChange={(event) => setRpe(Number(event.target.value))} /><span>2 = very easy · 9 = very hard. Most sessions should not be maximal.</span></label>
        <label className="checkbox-label"><input type="checkbox" checked={techniqueClean} onChange={(event) => setTechniqueClean(event.target.checked)} /> Technique stayed controlled throughout</label>
        {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button form-submit" type="submit">Save session and XP <ArrowRight size={18} /></button>
      </form></Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>
}
