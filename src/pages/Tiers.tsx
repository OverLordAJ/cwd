import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { tiers } from '../data/tiers'
import { tierRank } from '../lib/progression'
import type { TierId } from '../types'

export function TiersPage({ unlockedTier, onTrain, onCriteria }: { unlockedTier: TierId; onTrain: (tier: TierId) => void; onCriteria: () => void }) {
  return <div className="page tiers-page"><header className="page-heading split-heading"><div><p className="eyebrow">TRAINING TIERS · THREE ARCS</p><h1>Evolution is demonstrated.</h1><p>Each arc changes volume and movement complexity. Advancement requires consistency, technique, physical ability and recovery—not XP or elapsed time alone.</p></div><div className="heading-seal"><ShieldCheck size={28} /><strong>ABILITY &gt; XP</strong><span>Recovery stays decisive</span></div></header>
    <div className="tier-chapters">{tiers.map((tier) => { const unlocked = tierRank(tier.id) <= tierRank(unlockedTier); return <section className="tier-chapter" key={tier.id} id={`tier-${tier.id}`}><header className="tier-chapter-heading"><div><span>TIER {tier.level} · {tier.subtitle}</span><h2>{tier.name}</h2><p>{tier.objective}</p></div><div className="tier-frequency"><span>WEEKLY RHYTHM</span><strong>{tier.frequency}</strong><button type="button" className={unlocked ? 'primary-button' : 'secondary-button'} onClick={() => unlocked ? onTrain(tier.id) : onCriteria()}>{unlocked ? <>Train this arc <ArrowRight size={17} /></> : <><Lock size={16} /> View unlock criteria</>}</button></div></header><div className="tier-image-grid">{tier.images.map((image, index) => <figure key={image.src}><img src={image.src} alt={image.alt} loading={tier.id === 'origin' && index < 2 ? 'eager' : 'lazy'} /><figcaption><span>0{index + 1}</span>{image.caption}</figcaption></figure>)}</div></section>})}</div>
  </div>
}
