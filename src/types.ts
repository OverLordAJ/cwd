export type TierId = 'origin' | 'training' | 'legendary'
export type DomainId = 'ippo' | 'saitama' | 'rocklee' | 'goku' | 'baki' | 'yujiro-hanma'
export type GoalId = 'general' | 'strength' | 'endurance' | 'cardio' | 'athleticism' | 'physique' | 'mobility'
export type Readiness = 'recovered' | 'tired' | 'fatigued' | 'pain'
export type Ability = 'new' | 'developing' | 'experienced'
export type Difficulty = 'light' | 'moderate' | 'hard'
export type Duration = 10 | 20 | 30 | 45 | 60
export type ExerciseCategory = 'Upper body' | 'Lower body' | 'Core' | 'Full body' | 'Boxing conditioning' | 'Cardio' | 'Mobility' | 'Explosive training' | 'Recovery'
export type Metric = 'reps' | 'seconds' | 'minutes' | 'rounds'
export type DemoKind = 'pushup' | 'squat' | 'lunge' | 'bridge' | 'plank' | 'deadbug' | 'boxing' | 'march' | 'mobility' | 'crawl' | 'climber' | 'jump' | 'balance' | 'calf' | 'hollow'

export type Exercise = {
  id: string
  name: string
  category: ExerciseCategory
  primary: string[]
  secondary: string[]
  level: 1 | 2 | 3
  startingVariation: string
  easierVariation: string
  harderVariation: string
  recommendedSets: string
  prescription: string
  repRange?: [number, number]
  restSeconds: number
  technique: string[]
  mistakes: string[]
  safety: string
  progression: string
  domains: DomainId[]
  goals: GoalId[]
  impact: 'low' | 'moderate' | 'high'
  metric: Metric
  demo: DemoKind
  conditioning?: boolean
  recovery?: boolean
  requiresLandingControl?: boolean
}

export type DomainTemplate = {
  name: string
  description: string
  goal: GoalId
  duration: Duration
}

export type Domain = {
  id: DomainId
  name: string
  source: string
  title: string
  philosophy: string
  objective: string
  accent: string
  progressionRules: string[]
  templates: DomainTemplate[]
}

export type TierImage = {
  src: string
  alt: string
  caption: string
}

export type Tier = {
  id: TierId
  level: 1 | 2 | 3
  name: string
  subtitle: string
  objective: string
  frequency: string
  recommendedDays: number
  images: TierImage[]
}

export type GeneratorConfig = {
  tier: TierId
  domain: DomainId
  goal: GoalId
  days: number
  duration: Duration
  ability: Ability
  difficulty: Difficulty
  readiness: Readiness
}

export type WorkoutExercise = {
  exerciseId: string
  name: string
  variation: string
  sets: number
  prescription: string
  restSeconds: number
  metric: Metric
  target: number
  instruction: string
  progression: string
  easierVariation: string
}

export type GeneratedWorkout = {
  id: string
  title: string
  subtitle: string
  tier: TierId
  domain: DomainId
  goal: GoalId
  duration: Duration
  intensity: 'Recovery' | 'Base' | 'Moderate' | 'Hard'
  readiness: Readiness
  warmup: string[]
  main: WorkoutExercise[]
  conditioning: WorkoutExercise[]
  cooldown: string[]
  restGuidance: string
  progressionTarget: string
  weeklyPlan: string[]
  safetyNote: string
}

export type PerformanceResult = {
  exerciseId: string
  value: number
  unit: Metric
}

export type SessionLog = {
  id: string
  date: string
  title: string
  tier: TierId
  domain: DomainId
  goal: GoalId
  duration: Duration
  intensity: GeneratedWorkout['intensity']
  xp: number
  rpe: number
  techniqueClean: boolean
  results: PerformanceResult[]
}

export type ReadinessEntry = {
  date: string
  status: Readiness
  soreness: number
  sleep: 'poor' | 'okay' | 'good'
}

export type Assessment = {
  id: string
  date: string
  target: Exclude<TierId, 'origin'>
  controlledPushups: boolean
  squatLungeControl: boolean
  standardPushups: boolean
  splitSquatControl: boolean
  controlledTempo: boolean
  landingControl: boolean
  recoveryReliable: boolean
  plankSeconds: number
}

export type Profile = {
  name: string
  defaultDays: number
  defaultDuration: Duration
  reducedMotion: boolean
}

export type AppState = {
  version: 2
  profile: Profile
  xp: number
  unlockedTier: TierId
  selectedDomain: DomainId
  activeWorkout: GeneratedWorkout | null
  activeProgress: string[]
  logs: SessionLog[]
  readiness: ReadinessEntry[]
  assessments: Assessment[]
  restDays: string[]
}

export type ViewId = 'home' | 'tiers' | 'domains' | 'generator' | 'session' | 'library' | 'dashboard' | 'progression' | 'recovery' | 'quests' | 'achievements' | 'profile'

export type ToastMessage = {
  title: string
  body: string
}
