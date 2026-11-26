import { existsSync } from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { domains } from '../data/domains'
import { exerciseById, exercises } from '../data/exercises'
import { tiers } from '../data/tiers'
import { yujiroDomain } from '../data/yujiroDomain'
import type { AppState, Assessment, Duration, GeneratorConfig, SessionLog } from '../types'
import { generateWorkout } from './generator'
import {
  calculateSessionXp,
  canProgressExercise,
  canUnlockTier,
  consistencyStreak,
  countNewRecords,
  levelFromXp,
  personalRecords,
  tierCriteria,
} from './progression'
import { createInitialState, loadState, parseState, saveState, STORAGE_KEY } from './storage'

const durations: Duration[] = [10, 20, 30, 45, 60]
const baseConfig: GeneratorConfig = {
  tier: 'origin',
  domain: 'saitama',
  goal: 'general',
  days: 3,
  duration: 30,
  ability: 'new',
  difficulty: 'moderate',
  readiness: 'recovered',
}

function sessionLog(overrides: Partial<SessionLog> = {}): SessionLog {
  return {
    id: 'log-1',
    date: '2026-11-20',
    title: 'Foundation',
    tier: 'origin',
    domain: 'saitama',
    goal: 'general',
    duration: 30,
    intensity: 'Moderate',
    xp: 60,
    rpe: 7,
    techniqueClean: true,
    results: [],
    ...overrides,
  }
}

function assessment(target: Assessment['target'], overrides: Partial<Assessment> = {}): Assessment {
  return {
    id: `assessment-${target}`,
    date: '2026-11-20',
    target,
    controlledPushups: true,
    squatLungeControl: true,
    standardPushups: true,
    splitSquatControl: true,
    controlledTempo: true,
    landingControl: true,
    recoveryReliable: true,
    plankSeconds: target === 'training' ? 30 : 45,
    ...overrides,
  }
}

describe('exercise and tier data integrity', () => {
  it('contains unique, complete exercise records in every required category', () => {
    expect(exercises.length).toBeGreaterThanOrEqual(36)
    expect(new Set(exercises.map((exercise) => exercise.id)).size).toBe(exercises.length)
    const categories = new Set(exercises.map((exercise) => exercise.category))
    expect([...categories].sort()).toEqual([
      'Boxing conditioning', 'Cardio', 'Core', 'Explosive training', 'Full body',
      'Lower body', 'Mobility', 'Recovery', 'Upper body',
    ].sort())
    for (const exercise of exercises) {
      expect(exerciseById.get(exercise.id)).toBe(exercise)
      expect(exercise.name.length).toBeGreaterThan(2)
      expect(exercise.primary.length).toBeGreaterThan(0)
      expect(exercise.startingVariation.length).toBeGreaterThan(2)
      expect(exercise.easierVariation.length).toBeGreaterThan(2)
      expect(exercise.harderVariation.length).toBeGreaterThan(2)
      expect(exercise.recommendedSets.length).toBeGreaterThan(0)
      expect(exercise.prescription.length).toBeGreaterThan(0)
      expect(exercise.restSeconds).toBeGreaterThanOrEqual(0)
      expect(exercise.technique.length).toBeGreaterThanOrEqual(2)
      expect(exercise.mistakes.length).toBeGreaterThan(0)
      expect(exercise.safety.length).toBeGreaterThan(10)
      expect(exercise.progression.length).toBeGreaterThan(10)
      expect(exercise.domains.length).toBeGreaterThan(0)
      expect(exercise.goals.length).toBeGreaterThan(0)
      if (exercise.repRange) expect(exercise.repRange[0]).toBeLessThanOrEqual(exercise.repRange[1])
    }
  })

  it('provides six domains with three functional templates each', () => {
    expect(domains.map((domain) => domain.id).sort()).toEqual(['baki', 'goku', 'ippo', 'rocklee', 'saitama', 'yujiro-hanma'])
    for (const domain of domains) {
      expect(domain.templates).toHaveLength(3)
      expect(domain.progressionRules.length).toBeGreaterThan(1)
      for (const template of domain.templates) expect(durations).toContain(template.duration)
    }
  })

  it('imports the Yujiro domain and connects all four supplied gallery images', () => {
    const domain = domains.find((item) => item.id === 'yujiro-hanma')
    expect(domain?.name).toBe('Yujiro Hanma')
    expect(domain?.source).toBe('Baki')
    expect(domain?.accent).toBe(yujiroDomain.theme.accent)
    expect(domains.find((item) => item.id === 'baki')?.title).toBe('Combat physicality')
    expect(yujiroDomain.images).toHaveLength(4)
    expect(new Set(yujiroDomain.images.map((image) => image.src)).size).toBe(4)
    for (const image of yujiroDomain.images) {
      expect(image.src.endsWith('.png')).toBe(true)
      expect(existsSync(path.resolve(process.cwd(), 'public', image.src.replace(/^\/+/, '')))).toBe(true)
      expect(image.alt.length).toBeGreaterThan(10)
      expect(image.title.length).toBeGreaterThan(2)
    }
  })

  it('connects exactly twelve existing local images, four per tier', () => {
    const images = tiers.flatMap((tier) => tier.images)
    expect(tiers).toHaveLength(3)
    expect(images).toHaveLength(12)
    expect(new Set(images.map((image) => image.src)).size).toBe(12)
    for (const tier of tiers) expect(tier.images).toHaveLength(4)
    for (const image of images) {
      expect(/\.(webp|png)$/.test(image.src)).toBe(true)
      expect(existsSync(path.resolve(process.cwd(), 'public', image.src))).toBe(true)
      expect(image.alt.length).toBeGreaterThan(10)
    }
  })
})

describe('workout generation and recovery restrictions', () => {
  it('generates complete, domain-specific sessions across tiers, goals, durations and abilities', () => {
    for (const tier of tiers) {
      for (const domain of domains) {
        for (const goal of ['general', 'strength', 'endurance', 'cardio', 'athleticism', 'physique', 'mobility'] as const) {
          for (const duration of durations) {
            for (const ability of ['new', 'developing', 'experienced'] as const) {
              const workout = generateWorkout({ ...baseConfig, tier: tier.id, domain: domain.id, goal, duration, ability }, 'matrix')
              expect(workout.main.length, `${tier.id}/${domain.id}/${goal}/${duration}/${ability}`).toBeGreaterThan(0)
              expect(workout.warmup.length).toBeGreaterThan(0)
              expect(workout.cooldown.length).toBeGreaterThan(0)
              expect(workout.restGuidance.length).toBeGreaterThan(0)
              expect(workout.progressionTarget.length).toBeGreaterThan(0)
              expect(workout.weeklyPlan.length).toBe(4)
              const abilityCap = ability === 'new' ? 1 : ability === 'developing' ? 2 : 3
              for (const item of [...workout.main, ...workout.conditioning]) {
                const exercise = exerciseById.get(item.exerciseId)
                expect(exercise).toBeDefined()
                expect(exercise?.domains).toContain(domain.id)
                expect(exercise?.level).toBeLessThanOrEqual(Math.min(tier.level, abilityCap))
                expect(item.sets).toBeGreaterThanOrEqual(1)
                expect(item.sets).toBeLessThanOrEqual(4)
              }
            }
          }
        }
      }
    }
  })

  it('is deterministic for identical inputs', () => {
    expect(generateWorkout(baseConfig, 'same')).toEqual(generateWorkout(baseConfig, 'same'))
  })

  it.each(['pain', 'fatigued'] as const)('makes %s readiness recovery-only with no conditioning', (readiness) => {
    for (const domain of domains) {
      const workout = generateWorkout({ ...baseConfig, domain: domain.id, goal: 'strength', readiness, difficulty: 'hard' }, readiness)
      expect(workout.intensity).toBe('Recovery')
      expect(workout.conditioning).toHaveLength(0)
      expect(workout.main.length).toBeGreaterThan(0)
      for (const item of workout.main) {
        const exercise = exerciseById.get(item.exerciseId)!
        expect(exercise.impact).toBe('low')
        expect(exercise.recovery || exercise.category === 'Mobility').toBe(true)
        expect(item.sets).toBe(1)
      }
    }
  })

  it('removes high-impact work for tired and light training and adds recovery margins when tired', () => {
    for (const readiness of ['tired', 'recovered'] as const) {
      const difficulty = readiness === 'tired' ? 'hard' : 'light'
      const workout = generateWorkout({ ...baseConfig, tier: 'legendary', ability: 'experienced', domain: 'baki', goal: 'athleticism', readiness, difficulty, duration: 60 })
      expect(workout.conditioning.length).toBeGreaterThan(0)
      for (const item of [...workout.main, ...workout.conditioning]) expect(exerciseById.get(item.exerciseId)?.impact).not.toBe('high')
    }
    const recovered = generateWorkout({ ...baseConfig, duration: 20 }, 'recovered')
    const tired = generateWorkout({ ...baseConfig, duration: 20, readiness: 'tired' }, 'tired')
    const tiredItem = tired.main[0]
    const original = exerciseById.get(tiredItem.exerciseId)!
    expect(tiredItem.restSeconds).toBe(original.restSeconds + 15)
    expect(tiredItem.variation).toBe(original.easierVariation)
    expect(recovered.intensity).toBe('Moderate')
  })

  it('gates landing-controlled power work on assessment, readiness and difficulty', () => {
    const config: GeneratorConfig = { ...baseConfig, tier: 'legendary', domain: 'rocklee', goal: 'athleticism', ability: 'experienced', difficulty: 'hard', duration: 60 }
    const withoutAssessment = generateWorkout(config, 'no-assessment', false)
    expect([...withoutAssessment.main, ...withoutAssessment.conditioning].some((item) => exerciseById.get(item.exerciseId)?.requiresLandingControl)).toBe(false)
    const light = generateWorkout({ ...config, difficulty: 'light' }, 'light', true)
    expect([...light.main, ...light.conditioning].some((item) => exerciseById.get(item.exerciseId)?.requiresLandingControl)).toBe(false)
    const tired = generateWorkout({ ...config, readiness: 'tired' }, 'tired', true)
    expect([...tired.main, ...tired.conditioning].some((item) => exerciseById.get(item.exerciseId)?.requiresLandingControl)).toBe(false)
    const earned = generateWorkout(config, 'earned', true)
    expect([...earned.main, ...earned.conditioning].some((item) => item.exerciseId === 'squat-jump')).toBe(true)
  })

  it('caps structured days at the tier recommendation and discloses pulling limits', () => {
    const workout = generateWorkout({ ...baseConfig, days: 7 })
    expect(workout.weeklyPlan[0]).toContain('3 structured days')
    expect(workout.safetyNote).toContain('not equivalent to rows or pull-ups')
  })
})

describe('ability-gated progression, records and XP', () => {
  it('does not allow XP alone to unlock either advanced tier', () => {
    const state: AppState = { ...createInitialState(), xp: 1_000_000 }
    expect(canUnlockTier(state, 'training')).toBe(false)
    expect(canUnlockTier(state, 'legendary')).toBe(false)
    expect(tierCriteria(state, 'training').every((criterion) => !criterion.met)).toBe(true)
  })

  it('unlocks Training only after all consistency, ability and recovery criteria', () => {
    const state = createInitialState()
    state.logs = Array.from({ length: 8 }, (_, index) => sessionLog({ id: `log-${index}` }))
    expect(canUnlockTier(state, 'training')).toBe(false)
    state.assessments = [assessment('training')]
    expect(canUnlockTier(state, 'training')).toBe(true)
    state.assessments = [assessment('training', { recoveryReliable: false })]
    expect(canUnlockTier(state, 'training')).toBe(false)
  })

  it('requires sequential tier unlocks and intermediate experience for Legendary', () => {
    const state = createInitialState()
    state.logs = [
      ...Array.from({ length: 10 }, (_, index) => sessionLog({ id: `origin-${index}` })),
      ...Array.from({ length: 6 }, (_, index) => sessionLog({ id: `training-${index}`, tier: 'training' })),
    ]
    state.assessments = [assessment('legendary')]
    expect(canUnlockTier(state, 'legendary')).toBe(false)
    state.unlockedTier = 'training'
    expect(canUnlockTier(state, 'legendary')).toBe(true)
    state.logs = state.logs.filter((log) => log.tier !== 'training').slice(0, 16)
    expect(canUnlockTier(state, 'legendary')).toBe(false)
  })

  it('uses double progression and rejects early, unclean or unrecovered progressions', () => {
    expect(canProgressExercise([10, 10, 10], 10, true, true)).toBe(true)
    expect(canProgressExercise([10, 9, 10], 10, true, true)).toBe(false)
    expect(canProgressExercise([12, 12], 10, false, true)).toBe(false)
    expect(canProgressExercise([12, 12], 10, true, false)).toBe(false)
    expect(canProgressExercise([], 10, true, true)).toBe(false)
  })

  it('calculates levels and session XP without volume-based rewards', () => {
    expect(levelFromXp(-20)).toBe(1)
    expect(levelFromXp(0)).toBe(1)
    expect(levelFromXp(299)).toBe(1)
    expect(levelFromXp(300)).toBe(2)
    expect(calculateSessionXp({ intensity: 'Moderate', techniqueClean: true, prCount: 0, previousLogCount: 0 })).toBe(80)
    expect(calculateSessionXp({ intensity: 'Recovery', techniqueClean: false, prCount: 0, previousLogCount: 2 })).toBe(25)
    expect(calculateSessionXp({ intensity: 'Hard', techniqueClean: true, prCount: 20, previousLogCount: 2 })).toBe(75)
    expect(calculateSessionXp({ intensity: 'Hard', techniqueClean: true, prCount: -5, previousLogCount: 2 })).toBe(60)
  })

  it('tracks personal records, first records and consecutive planned rest days', () => {
    const previous = [sessionLog({ results: [{ exerciseId: 'pushup', value: 8, unit: 'reps' }] })]
    const current = sessionLog({
      id: 'current',
      results: [
        { exerciseId: 'pushup', value: 10, unit: 'reps' },
        { exerciseId: 'plank', value: 30, unit: 'seconds' },
      ],
    })
    expect(countNewRecords(current, previous)).toBe(2)
    expect(personalRecords([...previous, current]).get('pushup')?.value).toBe(10)
    const state = createInitialState()
    state.logs = [sessionLog({ date: '2026-11-24' })]
    state.restDays = ['2026-11-25', '2026-11-26']
    expect(consistencyStreak(state, new Date('2026-11-26T12:00:00'))).toBe(3)
  })
})

describe('defensive local persistence', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('handles absent, malformed and wrong-version data with a clean Origin state', () => {
    expect(parseState(null)).toEqual(createInitialState())
    expect(parseState('not-json')).toEqual(createInitialState())
    expect(parseState('[]')).toEqual(createInitialState())
    expect(parseState('{"version":1,"xp":9000}')).toEqual(createInitialState())
  })

  it('clamps profile values, filters malformed collections and preserves valid progress', () => {
    const state = parseState(JSON.stringify({
      version: 2,
      profile: { name: 'A'.repeat(80), defaultDays: 99, defaultDuration: 22, reducedMotion: true },
      xp: 42.6,
      unlockedTier: 'training',
      selectedDomain: 'goku',
      activeProgress: ['warmup-0', 4, null],
      logs: [sessionLog(), {}, 'bad', null],
      readiness: [{ date: '2026-11-26', status: 'tired', soreness: 3, sleep: 'okay' }, {}, 2],
      assessments: [assessment('training'), {}, false],
      restDays: ['2026-11-26', 3],
    }))
    expect(state.profile.name).toHaveLength(40)
    expect(state.profile.defaultDays).toBe(7)
    expect(state.profile.defaultDuration).toBe(30)
    expect(state.profile.reducedMotion).toBe(true)
    expect(state.xp).toBe(43)
    expect(state.unlockedTier).toBe('training')
    expect(state.selectedDomain).toBe('goku')
    expect(state.activeProgress).toEqual(['warmup-0'])
    expect(state.logs).toEqual([sessionLog()])
    expect(state.readiness).toEqual([{ date: '2026-11-26', status: 'tired', soreness: 3, sleep: 'okay' }])
    expect(state.assessments).toEqual([assessment('training')])
    expect(state.restDays).toEqual(['2026-11-26'])
  })

  it('rejects malformed nested records and unsafe active workouts', () => {
    const malformedLog = { ...sessionLog(), results: [{}] }
    const workout = generateWorkout(baseConfig, 'valid')
    const malformedWorkout = { ...workout, main: [{ ...workout.main[0], exerciseId: 'invented-exercise' }] }
    const state = parseState(JSON.stringify({
      ...createInitialState(),
      logs: [malformedLog],
      readiness: [{ date: '2026-11-26', status: 'pain', soreness: 99, sleep: 'poor' }],
      assessments: [{ ...assessment('training'), plankSeconds: 9000 }],
      activeWorkout: malformedWorkout,
      profile: { defaultDays: Number.NaN },
    }))
    expect(state.logs).toEqual([])
    expect(state.readiness).toEqual([])
    expect(state.assessments).toEqual([])
    expect(state.activeWorkout).toBeNull()
    expect(state.profile.defaultDays).toBe(3)
    expect(parseState(JSON.stringify({ ...createInitialState(), activeWorkout: workout })).activeWorkout).toEqual(workout)
  })

  it('reports storage write failures and load access failures instead of claiming success', () => {
    const state = createInitialState()
    vi.stubGlobal('localStorage', {
      setItem: vi.fn(() => { throw new Error('quota exceeded') }),
      getItem: vi.fn(() => { throw new Error('access denied') }),
    })
    expect(saveState(state)).toBe(false)
    expect(loadState()).toEqual(createInitialState())
    const setItem = vi.fn()
    vi.stubGlobal('localStorage', { setItem, getItem: vi.fn(() => null) })
    expect(saveState(state)).toBe(true)
    expect(setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(state))
  })
})
