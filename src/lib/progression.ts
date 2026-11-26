import { domains } from '../data/domains'
import type { AppState, DomainId, SessionLog, TierId } from '../types'

export const XP_PER_LEVEL = 300

export function localDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function levelFromXp(xp: number) {
  return Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1
}

export function weekStart(date = new Date()) {
  const copy = new Date(date)
  const day = copy.getDay()
  copy.setDate(copy.getDate() - (day === 0 ? 6 : day - 1))
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function logsThisWeek(logs: SessionLog[], now = new Date()) {
  const start = weekStart(now)
  return logs.filter((log) => new Date(`${log.date}T12:00:00`) >= start)
}

export function latestAssessment(state: AppState, target: 'training' | 'legendary') {
  return [...state.assessments].reverse().find((assessment) => assessment.target === target)
}

export type TierCriterion = { id: string; label: string; met: boolean }

export function tierCriteria(state: AppState, target: 'training' | 'legendary'): TierCriterion[] {
  const assessment = latestAssessment(state, target)
  if (target === 'training') {
    return [
      { id: 'sessions', label: 'Complete at least 8 structured workouts', met: state.logs.filter((log) => log.intensity !== 'Recovery').length >= 8 },
      { id: 'pushups', label: 'Controlled push-ups at your chosen beginner variation', met: Boolean(assessment?.controlledPushups) },
      { id: 'legs', label: 'Controlled squats and reverse lunges', met: Boolean(assessment?.squatLungeControl) },
      { id: 'plank', label: 'A 30-second plank with good form', met: (assessment?.plankSeconds ?? 0) >= 30 },
      { id: 'recovery', label: 'Reliable recovery between sessions', met: Boolean(assessment?.recoveryReliable) },
    ]
  }
  return [
    { id: 'sessions', label: 'Complete at least 16 structured workouts', met: state.logs.filter((log) => log.intensity !== 'Recovery').length >= 16 },
    { id: 'intermediate', label: 'Complete at least 6 Training Arc sessions', met: state.logs.filter((log) => log.tier === 'training' && log.intensity !== 'Recovery').length >= 6 },
    { id: 'pushups', label: 'Controlled standard push-ups', met: Boolean(assessment?.standardPushups) },
    { id: 'split', label: 'Stable split squats and controlled tempo', met: Boolean(assessment?.splitSquatControl && assessment.controlledTempo) },
    { id: 'plank', label: 'A 45-second plank with consistent technique', met: (assessment?.plankSeconds ?? 0) >= 45 },
    { id: 'recovery', label: 'Intermediate sessions completed without excessive fatigue', met: Boolean(assessment?.recoveryReliable) },
  ]
}

export function canUnlockTier(state: AppState, target: 'training' | 'legendary') {
  if (target === 'legendary' && state.unlockedTier === 'origin') return false
  return tierCriteria(state, target).every((criterion) => criterion.met)
}

export function hasLandingControl(state: AppState) {
  return [...state.assessments].reverse().find((assessment) => assessment.target === 'legendary')?.landingControl ?? false
}

export function canProgressExercise(results: number[], upperTarget: number, techniqueClean: boolean, recovered: boolean) {
  return techniqueClean && recovered && results.length > 0 && results.every((result) => result >= upperTarget)
}

export function personalRecords(logs: SessionLog[]) {
  const records = new Map<string, { value: number; unit: string; date: string; exerciseId: string }>()
  for (const log of logs) {
    for (const result of log.results) {
      const current = records.get(result.exerciseId)
      if (!current || result.value > current.value) records.set(result.exerciseId, { ...result, date: log.date })
    }
  }
  return records
}

export function countNewRecords(log: SessionLog, previousLogs: SessionLog[]) {
  const records = personalRecords(previousLogs)
  return log.results.filter((result) => result.value > (records.get(result.exerciseId)?.value ?? -1)).length
}

export function calculateSessionXp({ intensity, techniqueClean, prCount, previousLogCount }: { intensity: SessionLog['intensity']; techniqueClean: boolean; prCount: number; previousLogCount: number }) {
  const base = intensity === 'Recovery' ? 25 : 50
  return base + (techniqueClean ? 10 : 0) + Math.min(15, Math.max(0, prCount) * 5) + (previousLogCount === 0 ? 20 : 0)
}

export function consistencyStreak(state: AppState, now = new Date()) {
  const dates = new Set([...state.logs.map((log) => log.date), ...state.restDays])
  if (dates.size === 0) return 0
  const cursor = new Date(now)
  if (!dates.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (dates.has(localDateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function domainMastery(state: AppState, domainId: DomainId) {
  return Math.min(100, state.logs.filter((log) => log.domain === domainId).length * 10)
}

export function achievementList(state: AppState) {
  const records = personalRecords(state.logs)
  const boxingSessions = state.logs.filter((log) => log.domain === 'ippo').length
  const mastered = domains.some((domain) => domainMastery(state, domain.id) >= 100)
  return [
    { id: 'first', name: 'First Training Session', description: 'Complete your first workout or recovery session.', unlocked: state.logs.length >= 1, progress: Math.min(1, state.logs.length), target: 1 },
    { id: 'ten', name: '10 Workouts Completed', description: 'Build a repeatable training habit.', unlocked: state.logs.length >= 10, progress: Math.min(10, state.logs.length), target: 10 },
    { id: 'pushup', name: 'Push-Up Milestone', description: 'Record 10 controlled standard push-ups.', unlocked: (records.get('pushup')?.value ?? 0) >= 10, progress: Math.min(10, records.get('pushup')?.value ?? 0), target: 10 },
    { id: 'week', name: 'First Full Training Week', description: 'Complete three sessions within one Monday–Sunday week.', unlocked: state.logs.some((log) => logsThisWeek(state.logs, new Date(`${log.date}T12:00:00`)).length >= 3), progress: Math.min(3, logsThisWeek(state.logs).length), target: 3 },
    { id: 'boxing', name: 'Boxing Conditioning Milestone', description: 'Complete three Ippo-domain sessions.', unlocked: boxingSessions >= 3, progress: Math.min(3, boxingSessions), target: 3 },
    { id: 'origin', name: 'Origin Arc Complete', description: 'Meet the Training Arc ability and recovery criteria.', unlocked: state.unlockedTier !== 'origin', progress: state.unlockedTier !== 'origin' ? 1 : 0, target: 1 },
    { id: 'training', name: 'Training Arc Complete', description: 'Meet the Legendary Arc ability and recovery criteria.', unlocked: state.unlockedTier === 'legendary', progress: state.unlockedTier === 'legendary' ? 1 : 0, target: 1 },
    { id: 'legendary', name: 'Legendary Arc Unlocked', description: 'Demonstrate intermediate mastery and recovery.', unlocked: state.unlockedTier === 'legendary', progress: state.unlockedTier === 'legendary' ? 1 : 0, target: 1 },
    { id: 'mastery', name: 'Domain Mastery', description: 'Complete ten sessions in any one domain.', unlocked: mastered, progress: Math.max(...domains.map((domain) => state.logs.filter((log) => log.domain === domain.id).length), 0), target: 10 },
  ]
}

export function tierRank(tier: TierId) {
  return tier === 'legendary' ? 3 : tier === 'training' ? 2 : 1
}
