import { useEffect, useState } from 'react'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState('loading')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || (window.location.hostname.endsWith('-5173.app.github.dev') ? window.location.hostname.replace('-5173.app.github.dev', '') : '')
  const apiUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Could not load activities'); return response.json() }).then((payload) => setActivities(Array.isArray(payload) ? payload : payload.results ?? payload.data ?? [])).then(() => setState('ready')).catch(() => setState('error'))
  }, [apiUrl])

  return <section className="data-panel"><div className="data-panel-header"><h2>Recent sessions</h2><span className="panel-index">{state === 'ready' ? `${activities.length} LOGGED` : state.toUpperCase()}</span></div>{state === 'loading' && <p className="loading-state">Loading movement...</p>}{state === 'error' && <p className="error-state">Activities are temporarily unavailable.</p>}{state === 'ready' && <ul className="data-list">{activities.length ? activities.map((activity) => <li className="data-row" key={activity._id ?? activity.id}><div><div className="data-primary">{activity.type}</div><div className="data-secondary">{activity.user?.fullName ?? 'Athlete'} · {activity.durationMinutes} minutes</div></div><strong className="data-value">{activity.calories} kcal</strong></li>) : <li className="empty-state">No activities yet.</li>}</ul>}</section>
}

export default Activities