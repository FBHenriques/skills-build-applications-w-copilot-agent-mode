import { useEffect, useState } from 'react'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState('loading')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || (window.location.hostname.endsWith('-5173.app.github.dev') ? window.location.hostname.replace('-5173.app.github.dev', '') : '')
  const apiUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Could not load workouts'); return response.json() }).then((payload) => setWorkouts(Array.isArray(payload) ? payload : payload.results ?? payload.data ?? [])).then(() => setState('ready')).catch(() => setState('error'))
  }, [apiUrl])

  return <>{state === 'loading' && <p className="loading-state">Loading workouts...</p>}{state === 'error' && <p className="error-state">Workouts are temporarily unavailable.</p>}{state === 'ready' && <div className="workout-grid">{workouts.length ? workouts.map((workout) => <article className="workout-card" key={workout._id ?? workout.id ?? workout.name}><span className="panel-index">{workout.difficulty} · {workout.durationMinutes} MIN</span><h2>{workout.name}</h2><p>{workout.focus} focus</p><ul className="exercise-list">{(workout.exercises ?? []).map((exercise) => <li key={exercise._id ?? exercise.name}><span>{exercise.name}</span><span>{exercise.sets} × {exercise.reps}</span></li>)}</ul></article>) : <p className="empty-state">No workouts yet.</p>}</div>}</>
}

export default Workouts