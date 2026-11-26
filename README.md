# ANIME FITNESS EVOLVE

**TRAIN LIKE AN ANIME CHARACTER. PROGRESS LIKE AN ATHLETE.**

An original, equipment-free calisthenics platform with six training domains, three ability-gated tiers, readiness-aware workout generation, guided sessions and analytics based only on saved workouts.

## Training domains

- **Ippo:** boxing conditioning, footwork, guard, defense, shadowboxing, core and intervals.
- **Saitama:** general physical preparedness and gradual work-capacity development—not an immediate 100-100-100/10 km prescription.
- **Rock Lee:** lower-body strength, balance, mobility, coordination and gradually earned explosive work.
- **Goku:** progressive overload through technique, repetitions, sets, leverage, tempo and mastery.
- **Baki:** combat physicality, muscular endurance, body control and demanding but bounded conditioning.
- **Yujiro Hanma (Baki):** The Ogre—functional bodyweight strength, physique development, core control, athletic conditioning, explosive power and movement mastery.

## Run locally

Requires a current Node.js LTS release.

```sh
npm install
npm run dev
```

The development server listens on port 3000.

## Verify and build

```sh
npm test
npm run build
npm run preview
```

The production output is in `dist/`. The build may report a large-chunk warning for the application bundle; this is a performance warning, not a build failure.

## Safety and progression model

- Three arcs: Origin, Training and Legendary. XP and elapsed time cannot unlock a tier without demonstrated ability, consistency and recovery.
- Ten-, 20-, 30-, 45- and 60-minute sessions include warm-up, main work, appropriate conditioning and cool-down.
- Readiness, ability, tier, goal and saved landing-control assessment constrain exercise selection.
- Pain or high fatigue produces recovery-only guidance. Stop exercise that causes sharp, worsening or concerning pain and seek qualified medical help when appropriate.
- Double progression requires the upper repetition or hold target on every set, clean technique and adequate recovery before increasing difficulty.
- Prone raises and self-resistance do not replicate loaded rows or pull-ups. This app cannot provide complete pulling development without suitable equipment.
- Outdoor running, walking, stairs and hills always have indoor alternatives.

## Product features

- Searchable exercise library with instructional two-position diagrams, regressions, progressions, technique, mistakes and safety notes.
- Resumeable guided workouts, rest timer, clean-performance logging and personal records.
- Readiness check-ins, planned rest days, deload guidance and recovery-only sessions.
- XP, consistency streaks, quests, domain mastery, achievements and gated tier unlocks.
- Workout history and charts generated exclusively from the current browser’s saved results.
- Keyboard-accessible dialogs, mobile navigation, reduced-motion support and an installable PWA.

## Data and privacy

Progress is stored only in this browser’s `localStorage` under `anime-fitness-evolve-v2`. There is no account, server database or cross-device synchronization. Clearing browser data removes progress. Use **Profile / Settings → Export data** for a JSON backup. A storage failure is disclosed in the interface; it is not silently presented as a successful save.

## Content scope

The character-inspired domains are original training interpretations, not official character workouts or affiliated anime products. Exercise diagrams are instructional vector illustrations; the twelve tier images are original presentation artwork and are not exercise demonstrations.
