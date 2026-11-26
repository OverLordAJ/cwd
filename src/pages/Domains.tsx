import type { CSSProperties } from 'react'
import { ArrowRight, Check, Dumbbell, Gauge, MoveUpRight } from 'lucide-react'
import { domains } from '../data/domains'
import { exercises } from '../data/exercises'
import { yujiroDomain } from '../data/yujiroDomain'
import type { DomainId, Duration, GoalId } from '../types'
import { PageHeading } from '../components/PageElements'

export function DomainsPage({ selected, onSelect, onTemplate }: { selected: DomainId; onSelect: (domain: DomainId) => void; onTemplate: (domain: DomainId, goal: GoalId, duration: Duration) => void }) {
  const domain = domains.find((item) => item.id === selected) ?? domains[0]
  const libraryCount = exercises.filter((exercise) => exercise.domains.includes(domain.id)).length
  return <div className="page domains-page"><PageHeading eyebrow="SIX TRAINING DOMAINS" title="One program. Six disciplines.">Each domain has a distinct training philosophy, progression logic and workout templates. The character supplies identity; the method remains grounded.</PageHeading>
    <div className="domain-tabs" role="tablist" aria-label="Training domains">{domains.map((item) => <button key={item.id} role="tab" aria-selected={item.id === domain.id} type="button" className={item.id === domain.id ? 'active' : ''} style={{ '--domain-accent': item.accent } as CSSProperties} onClick={() => onSelect(item.id)}><span>{item.name}</span><small>{item.title}</small></button>)}</div>
    <section className="domain-detail" style={{ '--domain-accent': domain.accent } as CSSProperties}><div className="domain-detail-intro"><p className="eyebrow">{domain.source} · {domain.name.toUpperCase()} DOMAIN</p><h2>{domain.title}</h2><p className="domain-philosophy">{domain.philosophy}</p><div className="domain-facts"><div><Dumbbell size={18} /><span>{libraryCount} compatible exercises</span></div><div><Gauge size={18} /><span>Tier-scaled difficulty</span></div></div></div><div className="domain-objective"><span>PRIMARY OBJECTIVE</span><p>{domain.objective}</p><h3>Progression rules</h3><ul>{domain.progressionRules.map((rule) => <li key={rule}><Check size={16} />{rule}</li>)}</ul></div></section>
    {domain.id === yujiroDomain.id && <section className="domain-gallery" aria-labelledby="yujiro-gallery-title"><div className="section-heading"><div><p className="eyebrow">THE OGRE · DOMAIN GALLERY</p><h2 id="yujiro-gallery-title">Strength made visible.</h2></div><p>Yujiro-themed presentation artwork. Use the exercise library for technique instruction.</p></div><div className="yujiro-gallery-grid">{yujiroDomain.images.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" /><figcaption>{image.title}</figcaption></figure>)}</div></section>}
    <section className="domain-templates"><div className="section-heading"><div><p className="eyebrow">WORKOUT TEMPLATES</p><h2>Enter the {domain.name} domain.</h2></div><p>Templates set direction and duration. Your tier, ability and readiness still determine the final session.</p></div><div className="template-list">{domain.templates.map((template, index) => <button key={template.name} type="button" onClick={() => onTemplate(domain.id, template.goal, template.duration)}><span>0{index + 1}</span><div><strong>{template.name}</strong><p>{template.description}</p></div><small>{template.duration} MIN</small><MoveUpRight size={20} /></button>)}</div></section>
    <div className="domain-cta"><p>Need a different goal or recovery setting?</p><button className="text-link" type="button" onClick={() => onTemplate(domain.id, 'general', 30)}>Open a balanced {domain.name} session <ArrowRight size={17} /></button></div>
  </div>
}
