import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'

export function RestTimer({ initial = 90 }: { initial?: number }) {
  const [duration, setDuration] = useState(initial)
  const [seconds, setSeconds] = useState(initial)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setRunning(false)
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [running])

  const setTime = (value: number) => {
    setRunning(false)
    setDuration(value)
    setSeconds(value)
  }

  return <div className="rest-timer" aria-label="Rest timer">
    <div className="rest-readout"><Timer size={17} /><strong>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</strong></div>
    <div className="timer-presets">{[60, 90, 120].map((value) => <button key={value} type="button" className={duration === value ? 'active' : ''} aria-pressed={duration === value} onClick={() => setTime(value)}>{value}s</button>)}</div>
    <button type="button" className="timer-control" aria-label={running ? 'Pause rest timer' : 'Start rest timer'} onClick={() => { if (seconds === 0) setSeconds(duration); setRunning((value) => !value) }}>{running ? <Pause size={17} /> : <Play size={17} />}</button>
    <button type="button" className="timer-reset" aria-label="Reset rest timer" onClick={() => setTime(duration)}><RotateCcw size={16} /></button>
    <span className="sr-only" role="status">{seconds === 0 ? 'Rest complete.' : running ? `${seconds} seconds remaining.` : 'Timer paused.'}</span>
  </div>
}
