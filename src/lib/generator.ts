import { exercises } from '../data/exercises'
import { cooldownStandard, tiers, warmupByDomain } from '../data/tiers'
import type { Exercise, GeneratedWorkout, GeneratorConfig, WorkoutExercise } from '../types'

const mainCount = { 10: 2, 20: 3, 30: 4, 45: 5, 60: 6 } as const

function scoreExercise(exercise: Exercise, config: GeneratorConfig) {
  let score = exercise.goals.includes(config.goal) ? 8 : 0
  if (config.goal === 'general') score += 4
  if (config.goal === 'mobility' && exercise.recovery) score += 8
  if (config.goal === 'cardio' && exercise.conditioning) score += 4
  if (config.goal === 'physique' && ['Upper body', 'Lower body', 'Core'].includes(exercise.category)) score += 2
  if (config.difficulty === 'light' && exercise.impact === 'low') score += 3
  if (config.difficulty === 'hard' && exercise.impact !== 'low') score += 2
  return score
}

function chooseBalanced(candidates: Exercise[], count: number, config: GeneratorConfig) {
  const ranked = [...candidates].sort((a, b) => scoreExercise(b, config) - scoreExercise(a, config) || a.id.localeCompare(b.id))
  const chosen: Exercise[] = []
  const categoryCounts = new Map<string, number>()
  while (chosen.length < Math.min(count, ranked.length)) {
    const remaining = ranked.filter((exercise) => !chosen.includes(exercise))
    remaining.sort((a, b) => {
      const aScore = scoreExercise(a, config) - (categoryCounts.get(a.category) ?? 0) * 3
      const bScore = scoreExercise(b, config) - (categoryCounts.get(b.category) ?? 0) * 3
      return bScore - aScore || a.id.localeCompare(b.id)
    })
    const next = remaining[0]
    if (!next) break
    chosen.push(next)
    categoryCounts.set(next.category, (categoryCounts.get(next.category) ?? 0) + 1)
  }
  return chosen
}

function buildWorkoutExercise(exercise: Exercise, config: GeneratorConfig): WorkoutExercise {
  const tier = tiers.find((item) => item.id === config.tier) ?? tiers[0]
  let sets = tier.level === 1 ? 2 : 3
  if (config.duration === 10) sets -= 1
  if (config.duration === 60) sets += 1
  if (config.difficulty === 'light') sets -= 1
  if (config.difficulty === 'hard' && config.readiness === 'recovered' && tier.level === 3) sets += 1
  if (config.readiness === 'tired') sets -= 1
  if (config.readiness === 'fatigued' || config.readiness === 'pain') sets = 1
  sets = Math.max(1, Math.min(4, sets))
  const variation = config.ability === 'new' || config.readiness === 'tired' ? exercise.easierVariation : exercise.startingVariation
  const restSeconds = exercise.restSeconds + (config.readiness === 'tired' ? 15 : 0)
  return {
    exerciseId: exercise.id,
    name: exercise.name,
    variation,
    sets,
    prescription: exercise.prescription,
    restSeconds,
    metric: exercise.metric,
    target: exercise.repRange?.[1] ?? 0,
    instruction: exercise.technique[0],
    progression: exercise.progression,
    easierVariation: exercise.easierVariation,
  }
}

export function generateWorkout(config: GeneratorConfig, id = `session-${Date.now()}`, landingControl = false): GeneratedWorkout {
  const tier = tiers.find((item) => item.id === config.tier) ?? tiers[0]
  const recoveryOnly = config.readiness === 'pain' || config.readiness === 'fatigued' || config.goal === 'mobility'
  const abilityCap = config.ability === 'new' ? 1 : config.ability === 'developing' ? 2 : 3
  const levelCap = Math.min(tier.level, abilityCap) as 1 | 2 | 3
  let candidates = exercises.filter((exercise) => exercise.domains.includes(config.domain) && exercise.level <= levelCap)

  if (recoveryOnly) {
    candidates = candidates.filter((exercise) => exercise.impact === 'low' && (exercise.recovery || exercise.category === 'Mobility'))
  } else {
    if (config.readiness === 'tired') candidates = candidates.filter((exercise) => exercise.impact !== 'high')
    candidates = candidates.filter((exercise) => !exercise.requiresLandingControl || (landingControl && config.readiness === 'recovered' && config.difficulty !== 'light'))
    if (config.difficulty === 'light') candidates = candidates.filter((exercise) => exercise.impact !== 'high')
  }

  const selected = chooseBalanced(candidates, recoveryOnly ? Math.min(3, mainCount[config.duration]) : mainCount[config.duration], config)
  const main = selected.map((exercise) => buildWorkoutExercise(exercise, config))
  const used = new Set(main.map((exercise) => exercise.exerciseId))
  const conditioningCandidates = candidates.filter((exercise) => exercise.conditioning && !used.has(exercise.id) && (!config.readiness || config.readiness === 'recovered' || exercise.impact === 'low'))
  const includeConditioning = !recoveryOnly && config.duration >= 20 && config.readiness !== 'fatigued' && config.readiness !== 'pain'
  const conditioning = includeConditioning ? chooseBalanced(conditioningCandidates, config.duration >= 45 ? 2 : 1, config).map((exercise) => buildWorkoutExercise(exercise, config)) : []
  const warmup = config.domain === 'ippo' ? warmupByDomain.ippo : config.domain === 'rocklee' ? warmupByDomain.rocklee : warmupByDomain.default
  const intensity: GeneratedWorkout['intensity'] = recoveryOnly || config.readiness === 'fatigued' || config.readiness === 'pain'
    ? 'Recovery'
    : config.readiness === 'tired' || config.difficulty === 'light'
      ? 'Base'
      : config.difficulty === 'hard' && tier.level === 3 ? 'Hard' : 'Moderate'
  const title = config.readiness === 'pain' ? 'Pain check · recovery only' : config.readiness === 'fatigued' ? 'Readiness reset' : `${config.domain === 'yujiro-hanma' ? 'Yujiro Hanma' : config.domain[0].toUpperCase() + config.domain.slice(1)} · ${config.goal === 'general' ? 'foundation' : config.goal}`
  const trainingDays = Math.max(1, Math.min(config.days, tier.recommendedDays))

  return {
    id,
    title,
    subtitle: `${tier.name} · ${config.duration} minute target · ${intensity} intensity`,
    tier: config.tier,
    domain: config.domain,
    goal: config.goal,
    duration: config.duration,
    intensity,
    readiness: config.readiness,
    warmup: config.readiness === 'pain' ? ['Sit or lie in a comfortable position', 'Breathe normally and note the location and severity of symptoms', 'Move only within an easy, symptom-free range'] : warmup,
    main,
    conditioning,
    cooldown: cooldownStandard,
    restGuidance: recoveryOnly ? 'No work-to-rest ratio. Move gently, breathe comfortably and stop if symptoms increase.' : `Rest ${main[0]?.restSeconds ?? 60}–${Math.max(120, main[0]?.restSeconds ?? 60)} seconds after demanding sets. Extend rest when form or breathing has not recovered.`,
    progressionTarget: recoveryOnly ? 'Return to structured training only when readiness and symptoms allow. Recovery has no intensity target.' : 'Use double progression: reach the top of each prescribed range in every set with clean technique and 1–3 reps in reserve. Add a set or harder variation only when recovery is reliable; never change all variables at once.',
    weeklyPlan: [
      `${trainingDays} structured day${trainingDays === 1 ? '' : 's'} within your ${config.days} available day${config.days === 1 ? '' : 's'}.`,
      'Place at least one full rest day in the week; use more when fatigue or soreness stays elevated.',
      'Optional outdoor walking or running always has an indoor marching alternative.',
      'Repeat or reduce the current plan when recovery worsens; consistency does not require daily hard training.',
    ],
    safetyNote: config.readiness === 'pain'
      ? 'Pain reported: no demanding workout was generated. Stop movements that worsen symptoms and seek qualified medical guidance for severe, persistent or worsening symptoms.'
      : 'This is general fitness guidance, not medical care. No-equipment pulling work has limited loading potential; prone raises and self-resistance are not equivalent to rows or pull-ups.',
  }
}
