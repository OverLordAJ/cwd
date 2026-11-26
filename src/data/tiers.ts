import type { Tier } from '../types'

export const tiers: Tier[] = [
  {
    id: 'origin', level: 1, name: 'Origin Arc', subtitle: 'Beginner · Saitama + Ippo',
    objective: 'Build foundational strength, cardiovascular fitness, mobility, coordination and exercise technique.',
    frequency: '3 structured days · 2 optional easy-cardio days · at least 1 full rest day', recommendedDays: 3,
    images: [
      { src: 'images/tiers/origin-saitama-foundation.webp', alt: 'Anime-inspired beginner performing a controlled knee push-up', caption: 'Saitama · full-body foundation' },
      { src: 'images/tiers/origin-ippo-boxing.webp', alt: 'Anime-inspired boxer practicing stance and guard', caption: 'Ippo · boxing fundamentals' },
      { src: 'images/tiers/origin-saitama-conditioning.webp', alt: 'Anime-inspired athlete practicing a bodyweight squat', caption: 'Saitama · bodyweight conditioning' },
      { src: 'images/tiers/origin-ippo-footwork.webp', alt: 'Anime-inspired boxer practicing controlled footwork sequences', caption: 'Ippo · footwork and endurance' },
    ],
  },
  {
    id: 'training', level: 2, name: 'Training Arc', subtitle: 'Intermediate · Rock Lee + Goku',
    objective: 'Improve strength, muscular endurance, movement control, athletic conditioning and recoverable training capacity.',
    frequency: '4 structured days · 1–2 optional easy sessions · at least 1 full rest day', recommendedDays: 4,
    images: [
      { src: 'images/tiers/training-rocklee-strength.webp', alt: 'Anime-inspired martial artist performing a split squat', caption: 'Rock Lee · strength control' },
      { src: 'images/tiers/training-rocklee-mobility.webp', alt: 'Anime-inspired martial artist practicing a controlled martial movement', caption: 'Rock Lee · mobility and athleticism' },
      { src: 'images/tiers/training-goku-overload.webp', alt: 'Anime-inspired athlete performing a controlled push-up', caption: 'Goku · progressive overload' },
      { src: 'images/tiers/training-goku-bodyweight.webp', alt: 'Anime-inspired athlete holding a pike push-up position', caption: 'Goku · advanced bodyweight skill' },
    ],
  },
  {
    id: 'legendary', level: 3, name: 'Legendary Arc', subtitle: 'Advanced · Baki + Goku + Yujiro Hanma',
    objective: 'Develop advanced relative strength, muscular endurance, earned explosive ability, conditioning and movement mastery.',
    frequency: '4–5 structured days · 1 optional recovery session · at least 1 full rest day', recommendedDays: 5,
    images: [
      { src: 'images/tiers/legendary-baki-combat.webp', alt: 'Anime-inspired martial artist performing a controlled bear crawl', caption: 'Baki · combat physicality' },
      { src: 'images/tiers/yujiro-01-physique.png', alt: 'Yujiro-inspired physique domain hero artwork', caption: 'Yujiro Hanma · The Ogre' },
      { src: 'images/tiers/legendary-goku-strength.webp', alt: 'Anime-inspired athlete performing advanced push-up training', caption: 'Goku · strength and conditioning' },
      { src: 'images/tiers/legendary-dashboard.webp', alt: 'Anime-inspired athletes reviewing training analytics', caption: 'Legendary Arc · measure the journey' },
    ],
  },
]

export const warmupByDomain = {
  default: ['March in place at an easy pace', 'Circle arms and hips through comfortable ranges', 'Perform 8–10 easy squats', 'Rehearse the first movement with a light half-set'],
  ippo: ['March in place and relax the shoulders', 'Practice stance, guard and small steps', 'Circle arms and rotate the trunk gently', 'Shadowbox lightly without snapping punches'],
  rocklee: ['March with controlled knee lifts', 'Circle hips and ankles through comfortable ranges', 'Practice a supported balance on each leg', 'Perform 8–10 easy squats'],
}

export const cooldownStandard = ['Walk slowly and let breathing settle', 'Use gentle chest, hip and leg stretches without forcing range', 'Record effort, technique and any symptoms']
