import { ArrowRight, Check, Circle } from 'lucide-react'
import { PageHeading, ProgressBar } from '../components/PageElements'
import { localDateKey, logsThisWeek } from '../lib/progression'
import type { AppState, ViewId } from '../types'

type Quest = { name: string; description: string; progress: number; target: number; action: string; view: ViewId }

export function QuestsPage({ state, onNavigate }: { state: AppState; onNavigate: (view: ViewId) => void }) {
  const today = localDateKey()
  const todayLogs = state.logs.filter((log) => log.date === today)
  const weekly = logsThisWeek(state.logs)
  const daily: Quest[] = [
    { name: 'Read the readiness signal', description: 'Save today’s recovery check-in.', progress: state.readiness.some((entry) => entry.date === today) ? 1 : 0, target: 1, action: 'Open recovery', view: 'recovery' },
    { name: 'Complete the daily arc', description: 'Finish one appropriate workout or recovery session.', progress: Math.min(1, todayLogs.length), target: 1, action: 'Build session', view: 'generator' },
    { name: 'Clean technique', description: 'Log one session with technique controlled throughout.', progress: todayLogs.some((log) => log.techniqueClean) ? 1 : 0, target: 1, action: 'Train with control', view: 'generator' },
    { name: 'Recover without penalty', description: 'Log a recovery session or a planned rest day.', progress: todayLogs.some((log) => log.intensity === 'Recovery') || state.restDays.includes(today) ? 1 : 0, target: 1, action: 'Choose recovery', view: 'recovery' },
  ]
  const weeklyQuests: Quest[] = [
    { name: 'Three quality sessions', description: 'Complete three sessions this Monday–Sunday week.', progress: Math.min(3, weekly.length), target: 3, action: 'View dashboard', view: 'dashboard' },
    { name: 'Cross-domain training', description: 'Complete sessions in two different domains.', progress: Math.min(2, new Set(weekly.map((log) => log.domain)).size), target: 2, action: 'Choose domain', view: 'domains' },
    { name: 'Recovery awareness', description: 'Save two readiness check-ins this week.', progress: Math.min(2, state.readiness.filter((entry) => new Date(`${entry.date}T12:00:00`) >= new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))).length), target: 2, action: 'Save check-in', view: 'recovery' },
  ]
  const questGroup = (title: string, eyebrow: string, quests: Quest[]) => <section className="quest-group"><div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p>Progress applies automatically from saved activity. There is no bonus for extra volume, pain or skipped recovery.</p></div><div className="quest-list">{quests.map((quest) => { const done = quest.progress >= quest.target; return <article key={quest.name} className={done ? 'quest-complete' : ''}><div className="quest-status">{done ? <Check size={19} /> : <Circle size={19} />}</div><div><span>{done ? 'COMPLETE' : `${quest.progress}/${quest.target}`}</span><h3>{quest.name}</h3><p>{quest.description}</p><ProgressBar value={quest.progress / quest.target * 100} label={quest.name} /></div><button className="text-link" type="button" onClick={() => onNavigate(quest.view)}>{done ? 'Review' : quest.action} <ArrowRight size={15} /></button></article>})}</div></section>
  return <div className="page quests-page"><PageHeading eyebrow="DAILY QUESTS · WEEKLY CHALLENGES" title="Consistency over suffering.">Short quests reinforce readiness, clean sessions and recovery. They are prompts—not obligations to train hard every day.</PageHeading>{questGroup('Today’s quests', 'DAILY RESET', daily)}{questGroup('This week’s challenges', 'MONDAY–SUNDAY', weeklyQuests)}</div>
}
