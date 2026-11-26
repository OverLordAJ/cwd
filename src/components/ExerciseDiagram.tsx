import { useId } from 'react'
import type { DemoKind } from '../types'

const labels: Record<DemoKind, string> = {
  pushup: 'Strong line → controlled depth', squat: 'Standing → hips and knees flex', lunge: 'Stable stance → controlled lower',
  bridge: 'Hips down → glutes extend hips', plank: 'Brace → breathe and hold', deadbug: 'Centered → opposite limbs reach',
  boxing: 'Balanced guard → relaxed extension', march: 'Tall posture → alternating knee lift', mobility: 'Comfortable start → slow controlled range',
  crawl: 'Quadruped brace → opposite limbs move', climber: 'Strong plank → alternate knees', jump: 'Controlled squat → soft stick landing',
  balance: 'Supported stand → stable single leg', calf: 'Heels down → controlled rise', hollow: 'Tucked brace → extend within control',
}

function Pose({ kind, end = false }: { kind: DemoKind; end?: boolean }) {
  const common = { stroke: 'currentColor', strokeWidth: 5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  if (kind === 'pushup' || kind === 'plank' || kind === 'climber') return <g {...common}>
    <circle cx={end ? 51 : 49} cy={end ? 64 : 45} r="10" />
    <path d={end ? 'M43 72 L89 91 L132 91 M50 73 L64 97 L64 127 M64 127 L63 146 M90 91 L115 112 L132 91 M132 91 L146 113 M43 72 L28 98 L43 112' : 'M40 54 L89 77 L135 83 M48 57 L62 83 L62 126 M62 126 L63 146 M89 77 L116 99 L135 83 M135 83 L151 105 M40 54 L25 80 L40 98'} />
    {kind === 'climber' && <path d="M89 77 L106 61 L118 76" className="diagram-accent" />}
  </g>
  if (kind === 'bridge' || kind === 'deadbug' || kind === 'hollow') return <g {...common}>
    <circle cx={end ? 43 : 38} cy="92" r="10" />
    <path d={end ? 'M51 92 L87 67 L121 85 M87 67 L110 44 L130 49 M87 67 L101 99 L132 105 M51 92 L75 112 L101 99' : 'M47 93 L84 101 L117 110 M84 101 L100 76 L119 80 M84 101 L106 124 L139 124 M47 93 L71 120 L106 124'} />
    {kind !== 'bridge' && <path d={end ? 'M53 88 L77 48 L93 39' : 'M50 88 L75 69 L95 59'} className="diagram-accent" />}
  </g>
  if (kind === 'squat' || kind === 'jump') return <g {...common}>
    <circle cx={end ? 75 : 67} cy={end ? 43 : 26} r="11" />
    <path d={end ? 'M75 55 L87 88 L60 112 M87 88 L119 109 L127 140 M60 112 L50 140 M76 60 L48 83 M76 60 L105 78' : 'M67 38 L67 87 M67 87 L48 116 L49 143 M67 87 L86 116 L87 143 M67 48 L40 72 M67 48 L95 70'} />
    {kind === 'jump' && end && <path d="M143 121 L143 83 M136 91 L143 82 L150 91" className="diagram-accent" />}
  </g>
  if (kind === 'lunge') return <g {...common}>
    <circle cx={end ? 71 : 68} cy={end ? 40 : 25} r="11" />
    <path d={end ? 'M70 52 L70 91 L44 114 L38 143 M70 91 L105 111 L130 137 M70 59 L46 78 M70 59 L96 78' : 'M68 37 L68 85 M68 85 L43 112 L39 143 M68 85 L98 112 L107 143 M68 48 L43 70 M68 48 L94 70'} />
  </g>
  if (kind === 'crawl') return <g {...common}>
    <circle cx={end ? 47 : 42} cy="55" r="10" />
    <path d={end ? 'M53 61 L88 80 L119 75 M63 66 L47 95 L42 126 M88 80 L77 108 L65 134 M119 75 L135 99 L147 125 M119 75 L110 105 L122 132' : 'M48 61 L84 75 L119 73 M60 66 L54 96 L48 126 M84 75 L78 106 L69 133 M119 73 L132 99 L139 126 M119 73 L108 104 L113 132'} />
  </g>
  if (kind === 'boxing') return <g {...common}>
    <circle cx="70" cy="27" r="11" />
    <path d="M69 39 L66 85 M66 85 L43 115 L39 143 M66 85 L93 112 L104 143 M67 48 L42 59 L47 38 M67 48 L94 60 L88 39" />
    {end && <path d="M67 48 L112 47 L139 43 M133 36 L141 43 L133 50" className="diagram-accent" />}
  </g>
  if (kind === 'march' || kind === 'balance' || kind === 'calf') return <g {...common}>
    <circle cx="70" cy={kind === 'calf' && end ? 20 : 26} r="11" />
    <path d={end && kind !== 'calf' ? 'M70 38 L70 85 M70 85 L49 113 L47 143 M70 85 L96 88 L111 69 M70 48 L45 66 M70 48 L95 62' : 'M70 38 L70 85 M70 85 L50 115 L48 143 M70 85 L91 115 L93 143 M70 48 L45 69 M70 48 L95 69'} />
    {kind === 'calf' && end && <path d="M45 146 L52 140 M90 146 L97 140" className="diagram-accent" />}
  </g>
  return <g {...common}>
    <circle cx="70" cy="27" r="11" />
    <path d={end ? 'M70 39 L70 86 M70 86 L49 116 L47 143 M70 86 L92 116 L94 143 M70 49 L36 31 M70 49 L105 31' : 'M70 39 L70 86 M70 86 L49 116 L47 143 M70 86 L92 116 L94 143 M70 49 L43 69 M70 49 L98 69'} />
    <path d={end ? 'M28 42 Q28 20 47 15 M113 42 Q113 20 94 15' : 'M36 80 Q26 67 32 53 M105 80 Q115 67 109 53'} className="diagram-accent" />
  </g>
}

export function ExerciseDiagram({ kind, name, compact = false }: { kind: DemoKind; name: string; compact?: boolean }) {
  const id = useId()
  return <figure className={`exercise-diagram ${compact ? 'compact' : ''}`}>
    <svg viewBox="0 0 360 190" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{name}: two-position technique diagram</title>
      <desc id={`${id}-desc`}>{labels[kind]}. Use the written instructions for range and safety.</desc>
      <defs><pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".08" /></pattern></defs>
      <rect width="360" height="190" fill={`url(#${id}-grid)`} />
      <path d="M18 158H342" className="diagram-floor" />
      <g transform="translate(5 5)"><Pose kind={kind} /></g>
      <g transform="translate(178 5)"><Pose kind={kind} end /></g>
      <text x="22" y="180">POSITION A</text><text x="202" y="180">POSITION B</text>
    </svg>
    <figcaption>{labels[kind]} <span>· controlled, symptom-free range</span></figcaption>
  </figure>
}
