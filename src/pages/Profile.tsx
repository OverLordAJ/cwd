import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Download, RotateCcw, Save, ShieldCheck } from 'lucide-react'
import { PageHeading } from '../components/PageElements'
import { levelFromXp } from '../lib/progression'
import type { AppState, Profile } from '../types'

export function ProfilePage({ state, storageOkay, onSave, onExport, onReset }: { state: AppState; storageOkay: boolean; onSave: (profile: Profile) => void; onExport: () => void; onReset: () => void }) {
  const [profile, setProfile] = useState(state.profile)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!profile.name.trim() || profile.name.trim().length > 40) { setError('Enter a display name between 1 and 40 characters.'); return }
    setError('')
    onSave({ ...profile, name: profile.name.trim() })
    setSaved(true)
  }
  return <div className="page profile-page"><PageHeading eyebrow="PROFILE & SETTINGS" title={`Your arc, ${state.profile.name}.`}>Set useful defaults, reduce interface motion, export your records or reset this browser’s data. No account or cloud profile is implied.</PageHeading>
    <div className="profile-summary"><div><span>CURRENT LEVEL</span><strong>{levelFromXp(state.xp)}</strong></div><div><span>TOTAL XP</span><strong>{state.xp}</strong></div><div><span>SESSIONS</span><strong>{state.logs.length}</strong></div><div><span>TIER</span><strong>{state.unlockedTier}</strong></div></div>
    <div className="settings-layout"><section className="settings-panel"><div className="panel-heading"><div><span>TRAINING DEFAULTS</span><h2>Profile settings</h2></div></div><form onSubmit={submit}><label>Display name<input type="text" maxLength={40} value={profile.name} onChange={(event) => { setProfile({ ...profile, name: event.target.value }); setSaved(false) }} required /></label><label>Available days per week<select value={profile.defaultDays} onChange={(event) => { setProfile({ ...profile, defaultDays: Number(event.target.value) }); setSaved(false) }}>{[1, 2, 3, 4, 5, 6, 7].map((day) => <option key={day} value={day}>{day}</option>)}</select></label><label>Default workout duration<select value={profile.defaultDuration} onChange={(event) => { setProfile({ ...profile, defaultDuration: Number(event.target.value) as Profile['defaultDuration'] }); setSaved(false) }}>{[10, 20, 30, 45, 60].map((duration) => <option key={duration} value={duration}>{duration} minutes</option>)}</select></label><label className="checkbox-label"><input type="checkbox" checked={profile.reducedMotion} onChange={(event) => { setProfile({ ...profile, reducedMotion: event.target.checked }); setSaved(false) }} /> Reduce interface motion <span>· system preference is always respected</span></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">{saved ? <Check size={17} /> : <Save size={17} />}{saved ? 'Settings saved' : 'Save settings'}</button></form></section>
      <aside className="data-panel"><ShieldCheck size={27} /><h2>Your data stays here.</h2><p>Progress is stored in this browser only. It does not sync across devices, and clearing browser data can erase it. Export a JSON copy for your own backup.</p><p className={`storage-status ${storageOkay ? '' : 'warning'}`} role="status">{storageOkay ? 'Local saving is available.' : 'Local saving is unavailable. Export your data before leaving.'}</p><button className="secondary-button" type="button" onClick={onExport}><Download size={17} /> Export training data</button><button className="danger-link" type="button" onClick={onReset}><RotateCcw size={16} /> Reset all progress</button></aside></div>
    <section className="medical-note"><h2>General fitness, not medical care.</h2><p>This platform does not diagnose injuries or medical conditions. Stop for sharp pain, dizziness, chest pain or unusual breathlessness, and seek qualified professional guidance when symptoms are severe, persistent or worsening.</p></section>
  </div>
}
