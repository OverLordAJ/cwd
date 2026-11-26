export const yujiroDomain = {
  id: "yujiro-hanma",
  title: "YUJIRO HANMA",
  subtitle: "The Ogre — Functional Strength & Physique Development",
  franchise: "Baki",
  tier: "Legendary Arc",
  theme: {
    accent: "#d62828",
    background: "#101014",
    mood: "intense, disciplined, controlled"
  },
  purpose: "Develop balanced bodyweight strength, muscular endurance, core control, athletic conditioning, and movement mastery.",
  trainingPrinciples: [
    "Progressive overload through harder variations, reps, sets, tempo, or range of motion",
    "Controlled technique before intensity",
    "Balanced weekly workload and planned recovery",
    "No training through sharp or worsening pain",
    "No-equipment exercises are the default"
  ],
  images: [
    { src: "/images/tiers/yujiro-01-physique.png", alt: "Yujiro-inspired physique domain hero artwork", title: "The Ogre Standard" },
    { src: "/images/tiers/yujiro-02-bodyweight-strength.png", alt: "Yujiro-inspired bodyweight strength artwork", title: "Bodyweight Strength" },
    { src: "/images/tiers/yujiro-03-strength-mastery.png", alt: "Yujiro-inspired strength mastery training montage", title: "Strength Mastery" },
    { src: "/images/tiers/yujiro-04-athletic-conditioning.png", alt: "Yujiro-inspired athletic conditioning training montage", title: "Athletic Conditioning" }
  ],
  exerciseLibrary: [
    { name: "Push-up", sets: "3", reps: "6–15", rest: "60–120 sec", muscles: ["chest", "triceps", "front shoulders"], regression: "Incline or knee push-up", progression: "Decline or tempo push-up" },
    { name: "Pike push-up", sets: "3", reps: "5–10", rest: "90–120 sec", muscles: ["shoulders", "triceps"], regression: "Short-range pike push-up", progression: "Feet-elevated pike push-up" },
    { name: "Split squat", sets: "3", reps: "8–12 per leg", rest: "60–120 sec", muscles: ["quadriceps", "glutes"], regression: "Supported shallow split squat", progression: "Slow-tempo or 1.5-rep split squat" },
    { name: "Single-leg glute bridge", sets: "3", reps: "8–12 per leg", rest: "60–90 sec", muscles: ["glutes", "hamstrings"], regression: "Two-leg glute bridge", progression: "Long-pause single-leg bridge" },
    { name: "Hollow-body hold", sets: "3", reps: "15–40 sec", rest: "45–75 sec", muscles: ["abdominals", "hip flexors"], regression: "Dead bug", progression: "Longer-lever hollow hold" },
    { name: "Prone Y-T-W raises", sets: "2", reps: "6–10 each shape", rest: "45–60 sec", muscles: ["upper back", "rear shoulders"], regression: "Small-range prone arm lifts", progression: "Longer controlled pauses" },
    { name: "Shadowboxing", sets: "4", reps: "2 min rounds", rest: "1 min", muscles: ["cardiovascular system", "shoulders", "core", "legs"], regression: "1-minute easy rounds", progression: "Add footwork while maintaining technique" }
  ],
  sampleWeek: [
    { day: "Monday", focus: "Upper-body strength", session: ["Push-up", "Pike push-up", "Prone Y-T-W raises", "Hollow-body hold"] },
    { day: "Tuesday", focus: "Lower-body strength", session: ["Split squat", "Reverse lunge", "Single-leg glute bridge", "Calf raise"] },
    { day: "Wednesday", focus: "Recovery", session: ["Easy walk", "Gentle hip, shoulder, and ankle mobility"] },
    { day: "Thursday", focus: "Athletic conditioning", session: ["Shadowboxing", "Lateral steps", "Mountain climber", "Dead bug"] },
    { day: "Friday", focus: "Full-body practice", session: ["Push-up variation", "Squat variation", "Glute bridge", "Plank"] },
    { day: "Saturday", focus: "Optional easy cardio or mobility", session: ["Easy walk or indoor march", "Mobility flow"] },
    { day: "Sunday", focus: "Rest", session: [] }
  ],
  progressionRules: [
    "Use a rep range and add reps only while technique remains controlled.",
    "When all sets reach the top of the range for two sessions, advance one variable or choose a harder variation.",
    "Do not increase sets, reps, difficulty, and weekly frequency simultaneously.",
    "Keep approximately 1–3 good repetitions in reserve on most strength sets.",
    "Scale the session down when recovery is poor; stop movements that cause pain."
  ],
  limitationNotice: "Without external resistance or a secure pulling anchor, comprehensive back and biceps development is limited. Prone Y-T-W raises and reverse snow angels train parts of the upper back but are not equivalent to rows or pull-ups."
};
