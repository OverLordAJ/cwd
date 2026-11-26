import { exerciseById } from '../data/exercises'
import type { AppState, Profile } from '../types'

export const STORAGE_KEY = 'anime-fitness-evolve-v2'

export const defaultProfile: Profile = { name: 'Athlete', defaultDays: 3, defaultDuration: 30, reducedMotion: false }

export function createInitialState(profile: Partial<Profile> = {}): AppState {
  return {
    version: 2,
    profile: { ...defaultProfile, ...profile },
    xp: 0,
    unlockedTier: 'origin',
    selectedDomain: 'saitama',
    activeWorkout: null,
    activeProgress: [],
    logs: [],
    readiness: [],
    assessments: [],
    restDays: [],
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isPerformanceResult(value: unknown): value is AppState['logs'][number]['results'][number] {
  return isObject(value) &&
    typeof value.exerciseId === 'string' && exerciseById.has(value.exerciseId) &&
    isFiniteNumber(value.value) && value.value >= 0 && value.value <= 1000 &&
    ['reps', 'seconds', 'minutes', 'rounds'].includes(String(value.unit))
}

function isSessionLog(value: unknown): value is AppState['logs'][number] {
  return isObject(value) &&
    ['id', 'date', 'title'].every((key) => typeof value[key] === 'string') &&
    ['origin', 'training', 'legendary'].includes(String(value.tier)) &&
    ['ippo', 'saitama', 'rocklee', 'goku', 'baki', 'yujiro-hanma'].includes(String(value.domain)) &&
    ['general', 'strength', 'endurance', 'cardio', 'athleticism', 'physique', 'mobility'].includes(String(value.goal)) &&
    [10, 20, 30, 45, 60].includes(Number(value.duration)) &&
    ['Recovery', 'Base', 'Moderate', 'Hard'].includes(String(value.intensity)) &&
    isFiniteNumber(value.xp) && value.xp >= 0 &&
    isFiniteNumber(value.rpe) && value.rpe >= 2 && value.rpe <= 9 &&
    typeof value.techniqueClean === 'boolean' &&
    Array.isArray(value.results) && value.results.every(isPerformanceResult)
}

function isReadinessEntry(value: unknown): value is AppState['readiness'][number] {
  return isObject(value) && typeof value.date === 'string' &&
    ['recovered', 'tired', 'fatigued', 'pain'].includes(String(value.status)) &&
    isFiniteNumber(value.soreness) && value.soreness >= 0 && value.soreness <= 10 &&
    ['poor', 'okay', 'good'].includes(String(value.sleep))
}

function isAssessment(value: unknown): value is AppState['assessments'][number] {
  return isObject(value) && typeof value.id === 'string' && typeof value.date === 'string' &&
    ['training', 'legendary'].includes(String(value.target)) &&
    ['controlledPushups', 'squatLungeControl', 'standardPushups', 'splitSquatControl', 'controlledTempo', 'landingControl', 'recoveryReliable']
      .every((key) => typeof value[key] === 'boolean') &&
    isFiniteNumber(value.plankSeconds) && value.plankSeconds >= 0 && value.plankSeconds <= 600
}

function isWorkoutExercise(value: unknown): value is NonNullable<AppState['activeWorkout']>['main'][number] {
  return isObject(value) && typeof value.exerciseId === 'string' && exerciseById.has(value.exerciseId) &&
    ['name', 'variation', 'prescription', 'instruction', 'progression', 'easierVariation'].every((key) => typeof value[key] === 'string') &&
    isFiniteNumber(value.sets) && value.sets >= 1 && value.sets <= 4 &&
    isFiniteNumber(value.restSeconds) && value.restSeconds >= 0 && value.restSeconds <= 3600 &&
    isFiniteNumber(value.target) && value.target >= 0 && value.target <= 1000 &&
    ['reps', 'seconds', 'minutes', 'rounds'].includes(String(value.metric))
}

function isGeneratedWorkout(value: unknown): value is NonNullable<AppState['activeWorkout']> {
  return isObject(value) &&
    ['id', 'title', 'subtitle', 'restGuidance', 'progressionTarget', 'safetyNote'].every((key) => typeof value[key] === 'string') &&
    ['origin', 'training', 'legendary'].includes(String(value.tier)) &&
    ['ippo', 'saitama', 'rocklee', 'goku', 'baki', 'yujiro-hanma'].includes(String(value.domain)) &&
    ['general', 'strength', 'endurance', 'cardio', 'athleticism', 'physique', 'mobility'].includes(String(value.goal)) &&
    [10, 20, 30, 45, 60].includes(Number(value.duration)) &&
    ['Recovery', 'Base', 'Moderate', 'Hard'].includes(String(value.intensity)) &&
    ['recovered', 'tired', 'fatigued', 'pain'].includes(String(value.readiness)) &&
    isStringArray(value.warmup) && value.warmup.length > 0 &&
    Array.isArray(value.main) && value.main.every(isWorkoutExercise) &&
    Array.isArray(value.conditioning) && value.conditioning.every(isWorkoutExercise) &&
    isStringArray(value.cooldown) && value.cooldown.length > 0 &&
    isStringArray(value.weeklyPlan)
}

export function parseState(raw: string | null): AppState {
  if (!raw) return createInitialState()
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isObject(parsed) || parsed.version !== 2) return createInitialState()
    const fallback = createInitialState()
    const profile = isObject(parsed.profile) ? parsed.profile : {}
    const validTier = parsed.unlockedTier === 'training' || parsed.unlockedTier === 'legendary' ? parsed.unlockedTier : 'origin'
    const validDomain = ['ippo', 'saitama', 'rocklee', 'goku', 'baki', 'yujiro-hanma'].includes(String(parsed.selectedDomain)) ? parsed.selectedDomain as AppState['selectedDomain'] : 'saitama'
    return {
      ...fallback,
      profile: {
        name: typeof profile.name === 'string' ? profile.name.slice(0, 40) : 'Athlete',
        defaultDays: isFiniteNumber(profile.defaultDays) ? Math.max(1, Math.min(7, Math.round(profile.defaultDays))) : 3,
        defaultDuration: [10, 20, 30, 45, 60].includes(Number(profile.defaultDuration)) ? Number(profile.defaultDuration) as Profile['defaultDuration'] : 30,
        reducedMotion: typeof profile.reducedMotion === 'boolean' ? profile.reducedMotion : false,
      },
      xp: isFiniteNumber(parsed.xp) ? Math.max(0, Math.round(parsed.xp)) : 0,
      unlockedTier: validTier,
      selectedDomain: validDomain,
      activeWorkout: isGeneratedWorkout(parsed.activeWorkout) ? parsed.activeWorkout : null,
      activeProgress: Array.isArray(parsed.activeProgress) ? parsed.activeProgress.filter((item): item is string => typeof item === 'string') : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs.filter(isSessionLog) : [],
      readiness: Array.isArray(parsed.readiness) ? parsed.readiness.filter(isReadinessEntry) : [],
      assessments: Array.isArray(parsed.assessments) ? parsed.assessments.filter(isAssessment) : [],
      restDays: Array.isArray(parsed.restDays) ? parsed.restDays.filter((item): item is string => typeof item === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item)) : [],
    }
  } catch {
    return createInitialState()
  }
}

export function loadState() {
  try {
    return parseState(localStorage.getItem(STORAGE_KEY))
  } catch {
    return createInitialState()
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}
