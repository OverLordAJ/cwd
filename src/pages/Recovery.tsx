import { useState } from 'react'
import type { FormEvent } from 'react'
import { AlertTriangle, ArrowRight, BatteryLow, BedDouble, Check, Droplets, HeartPulse, Moon, ShieldCheck } from 'lucide-react'
import { PageHeading } from '../components/PageElements'
import { localDateKey, logsThisWeek } from '../lib/progression'
import type { AppState, Readiness, ReadinessEntry } from '../types'

export function RecoveryPage({ state, onSave, onRestDay, onGenerateRecovery }: { state: AppState; onSave: (entry: ReadinessEntry) => void; onRestDay: () => void; onGenerateRecovery: () => void }) {
  const [status, setStatus] = useState<Readiness>('recovered')
  const [soreness, setSoreness] = useState(2)
  const [sleep, setSleep] = useState<ReadinessEntry['sleep']>('okay')
  const [saved, setSaved] = useState(false)
  const today = localDateKey()
  const recentCheckins = state.readiness.slice(-7).reverse()
  const hardSessions = logsThisWeek(state.logs).filter((log) => log.intensity === 'Hard').length
  const fatigueFlags = state.readiness.slice(-4).filter((entry) => entry.status === 'fatigued' || entry.status === 'pain' || entry.soreness >= 7).length
  const deloadSuggested = hardSessions >= 3 || fatigueFlags >= 2
  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSave({ date: today, status, soreness, sleep })
    setSaved(true)
  }
  return <div className="page recovery-page"><PageHeading eyebrow="RECOVERY CENTER · READINESS BEFORE WORK" title="Recovery is training.">Track fatigue, soreness and sleep context. Rest days preserve consistency; pain changes the plan instead of becoming a challenge to conquer.</PageHeading>
    <div className="recovery-grid"><section className="checkin-panel"><div className="panel-heading"><div><span>DAILY CHECK-IN</span><h2>Today’s readiness</h2></div><HeartPulse size={22} /></div><form onSubmit={submit}><fieldset className="readiness-options compact"><legend className="sr-only">Readiness status</legend>{(['recovered', 'tired', 'fatigued', 'pain'] as const).map((value) => <label key={value} className={status === value ? 'selected' : ''}><input type="radio" name="recovery-status" checked={status === value} onChange={() => { setStatus(value); setSaved(false) }} /><strong>{value === 'recovered' ? 'Recovered' : value === 'tired' ? 'Somewhat tired' : value === 'fatigued' ? 'Very fatigued' : 'Experiencing pain'}</strong></label>)}</fieldset><label className="range-label">Muscle soreness · {soreness}/10<input type="range" min="0" max="10" value={soreness} onChange={(event) => { setSoreness(Number(event.target.value)); setSaved(false) }} /><span>0 = none · 10 = severe. High or worsening soreness is a reason to reduce or postpone training.</span></label><label>Last night’s sleep<select value={sleep} onChange={(event) => { setSleep(event.target.value as ReadinessEntry['sleep']); setSaved(false) }}><option value="good">Restful</option><option value="okay">Adequate</option><option value="poor">Poor or disrupted</option></select></label>{status === 'pain' && <div className="safety-banner urgent" role="alert"><AlertTriangle size={19} /><p>Do not train through sharp, severe or worsening pain. This app cannot diagnose symptoms. Seek qualified medical guidance when warranted.</p></div>}<button className="primary-button" type="submit">{saved ? <Check size={17} /> : null}{saved ? 'Check-in saved' : 'Save readiness check-in'}</button></form></section>
      <aside className="recovery-action-panel"><BatteryLow size={27} /><p className="eyebrow">TODAY’S DECISION</p><h2>{status === 'pain' ? 'Prioritize assessment, not exertion.' : status === 'fatigued' || soreness >= 7 ? 'Choose a lower-demand day.' : deloadSuggested ? 'A deload is worth considering.' : 'Match training to recovery.'}</h2><p>{status === 'pain' ? 'Use the generator’s pain setting for a recovery-only response. Persistent, severe or worsening symptoms warrant professional guidance.' : deloadSuggested ? 'Recent hard sessions or fatigue flags suggest reducing sets, avoiding power work, or taking a full rest day.' : 'A good plan leaves enough recovery to repeat quality work later in the week.'}</p><button className="secondary-button" type="button" onClick={onGenerateRecovery}>Generate gentle recovery <ArrowRight size={17} /></button><button className="text-link" type="button" disabled={state.restDays.includes(today)} onClick={onRestDay}>{state.restDays.includes(today) ? 'Rest day logged today' : 'Log a planned rest day'} <Moon size={16} /></button></aside></div>

    <section className="recovery-guidance"><div><BedDouble size={22} /><h3>Sleep routine</h3><p>Keep a consistent sleep opportunity and wind-down routine. Poor sleep is useful context for reducing intensity, not a moral failure.</p></div><div><Droplets size={22} /><h3>Hydration</h3><p>Drink regularly and respond to thirst, heat and session sweat. More is not always better; avoid forcing excessive fluids.</p></div><div><ShieldCheck size={22} /><h3>Deload</h3><p>When fatigue accumulates, reduce sets and avoid explosive work for several days while keeping easy technique and mobility.</p></div></section>
    <section className="recovery-history"><div className="section-heading"><div><p className="eyebrow">RECOVERY HISTORY</p><h2>Recent signals.</h2></div><p>Look for patterns rather than judging one isolated day. Readiness entries are saved locally on this browser.</p></div>{recentCheckins.length === 0 ? <p className="empty-copy">No check-ins yet. Save today’s readiness to begin the record.</p> : <div className="checkin-history">{recentCheckins.map((entry) => <div key={entry.date}><span>{entry.date}</span><strong>{entry.status}</strong><span>Soreness {entry.soreness}/10</span><span>Sleep {entry.sleep}</span></div>)}</div>}</section>
  </div>
}
