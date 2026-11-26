import { ArrowRight, Lock, Trophy } from 'lucide-react'
import { PageHeading, ProgressBar } from '../components/PageElements'
import { achievementList } from '../lib/progression'
import type { AppState, ViewId } from '../types'

export function AchievementsPage({ state, onNavigate }: { state: AppState; onNavigate: (view: ViewId) => void }) {
  const achievements = achievementList(state)
  const unlocked = achievements.filter((achievement) => achievement.unlocked).length
  return <div className="page achievements-page"><PageHeading eyebrow={`ACHIEVEMENTS · ${unlocked}/${achievements.length} UNLOCKED`} title="Milestones with meaning.">Achievements mark sessions, measurable improvements, recovery-aware progression and domain practice. They do not override exercise prerequisites.</PageHeading>
    <div className="achievement-grid">{achievements.map((achievement, index) => <article key={achievement.id} className={achievement.unlocked ? 'unlocked' : ''}><div className="achievement-icon">{achievement.unlocked ? <Trophy size={23} /> : <Lock size={20} />}</div><span>ACHIEVEMENT {String(index + 1).padStart(2, '0')}</span><h2>{achievement.name}</h2><p>{achievement.description}</p><div className="achievement-progress"><span>{achievement.unlocked ? 'UNLOCKED' : `${Math.min(achievement.progress, achievement.target)}/${achievement.target}`}</span><ProgressBar value={Math.min(100, achievement.progress / achievement.target * 100)} label={achievement.name} /></div></article>)}</div>
    <button className="text-link" type="button" onClick={() => onNavigate('dashboard')}>Review the training history behind these milestones <ArrowRight size={16} /></button>
  </div>
}
