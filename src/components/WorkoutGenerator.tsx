import type { FormEvent } from 'react'
import { AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react'
import { domains } from '../data/domains'
import { tiers } from '../data/tiers'
import type { GeneratorConfig, TierId } from '../types'
import { tierRank } from '../lib/progression'

const goals = [
  ['general', 'General fitness'], ['strength', 'Strength'], ['endurance', 'Muscular endurance'], ['cardio', 'Cardiovascular conditioning'],
  ['athleticism', 'Athleticism'], ['physique', 'Physique development'], ['mobility', 'Mobility'],
] as const

export function WorkoutGenerator({ config, onChange, onGenerate, unlockedTier, error }: {
  config: GeneratorConfig
  onChange: (config: GeneratorConfig) => void
  onGenerate: () => void
  unlockedTier: TierId
  error: string
}) {
  const update = <K extends keyof GeneratorConfig>(key: K, value: GeneratorConfig[K]) => onChange({ ...config, [key]: value })
  const submit = (event: FormEvent) => { event.preventDefault(); onGenerate() }
  return <div className="page generator-page">
    <header className="page-heading split-heading"><div><p className="eyebrow">SESSION FORGE · SAFETY FIRST</p><h1>Build today’s workout.</h1><p>Your tier, ability and recovery set the ceiling. The generator balances movement patterns instead of rolling random exercises.</p></div><div className="heading-seal"><ShieldCheck size={28} /><strong>NO EQUIPMENT</strong><span>Ordinary floor space</span></div></header>
    <form className="generator-form" onSubmit={submit}>
      <section className="form-section"><div className="form-section-title"><span>01</span><div><h2>Training direction</h2><p>Locked arcs require ability and recovery benchmarks, never XP.</p></div></div>
        <div className="form-grid three-col">
          <label>Training tier<select value={config.tier} onChange={(event) => update('tier', event.target.value as TierId)}>{tiers.map((tier) => <option key={tier.id} value={tier.id} disabled={tierRank(tier.id) > tierRank(unlockedTier)}>{tier.name}{tierRank(tier.id) > tierRank(unlockedTier) ? ' · Locked' : ''}</option>)}</select></label>
          <label>Anime domain<select value={config.domain} onChange={(event) => update('domain', event.target.value as GeneratorConfig['domain'])}>{domains.map((domain) => <option key={domain.id} value={domain.id}>{domain.name} · {domain.title}</option>)}</select></label>
          <label>Fitness goal<select value={config.goal} onChange={(event) => update('goal', event.target.value as GeneratorConfig['goal'])}>{goals.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
        </div>
      </section>
      <section className="form-section"><div className="form-section-title"><span>02</span><div><h2>Capacity and schedule</h2><p>Choose your real current ability, not the character you aspire to match.</p></div></div>
        <div className="form-grid four-col">
          <label>Available days<select value={config.days} onChange={(event) => update('days', Number(event.target.value))}>{[1, 2, 3, 4, 5, 6, 7].map((day) => <option key={day} value={day}>{day} day{day > 1 ? 's' : ''} / week</option>)}</select></label>
          <label>Workout duration<select value={config.duration} onChange={(event) => update('duration', Number(event.target.value) as GeneratorConfig['duration'])}>{[10, 20, 30, 45, 60].map((duration) => <option key={duration} value={duration}>{duration} minutes</option>)}</select></label>
          <label>Current ability<select value={config.ability} onChange={(event) => update('ability', event.target.value as GeneratorConfig['ability'])}><option value="new">New to the movements</option><option value="developing">Developing control</option><option value="experienced">Experienced and controlled</option></select></label>
          <label>Preferred difficulty<select value={config.difficulty} onChange={(event) => update('difficulty', event.target.value as GeneratorConfig['difficulty'])}><option value="light">Light</option><option value="moderate">Moderate</option><option value="hard">Hard · earned</option></select></label>
        </div>
      </section>
      <section className="form-section"><div className="form-section-title"><span>03</span><div><h2>Readiness check</h2><p>Today’s recovery can change the session type, variation, sets and power work.</p></div></div>
        <fieldset className="readiness-options"><legend className="sr-only">Current recovery status</legend>{([
          ['recovered', 'Feeling recovered', 'Normal planned training'], ['tired', 'Somewhat tired', 'Easier variations, fewer sets'],
          ['fatigued', 'Very fatigued', 'Recovery-only movement'], ['pain', 'Experiencing pain', 'No demanding workout'],
        ] as const).map(([value, label, note]) => <label key={value} className={config.readiness === value ? 'selected' : ''}><input type="radio" name="readiness" value={value} checked={config.readiness === value} onChange={() => update('readiness', value)} /><strong>{label}</strong><span>{note}</span></label>)}</fieldset>
        {config.readiness === 'pain' && <div className="safety-banner" role="alert"><AlertTriangle size={20} /><p>Pain does not earn a training adaptation. The result will be a recovery check only. Stop aggravating movements and seek qualified medical guidance when symptoms are severe, persistent or worsening.</p></div>}
      </section>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="generator-submit"><div><strong>{config.readiness === 'pain' ? 'Recovery check' : config.readiness === 'fatigued' ? 'Recovery session' : `${config.duration}-minute session`}</strong><span>Warm-up · main work · rest · cool-down · progression target</span></div><button className="primary-button" type="submit">Generate session <ArrowRight size={18} /></button></div>
    </form>
    <aside className="truth-note"><strong>The pulling limitation is real.</strong><p>Without an anchor or equipment, back and biceps loading is limited. Prone raises and self-resisted isometrics can train control and activation, but they are not equivalent to loaded rows or pull-ups.</p></aside>
  </div>
}
