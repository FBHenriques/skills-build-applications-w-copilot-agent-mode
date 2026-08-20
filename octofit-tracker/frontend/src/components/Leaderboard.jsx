import { useEffect, useState } from 'react'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState('loading')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME || (window.location.hostname.endsWith('-5173.app.github.dev') ? window.location.hostname.replace('-5173.app.github.dev', '') : '')
  const apiUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/'

  useEffect(() => {
    fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Could not load leaderboard'); return response.json() }).then((payload) => setEntries(Array.isArray(payload) ? payload : payload.results ?? payload.data ?? [])).then(() => setState('ready')).catch(() => setState('error'))
  }, [apiUrl])

  return <section className="data-panel"><div className="data-panel-header"><h2>Top performers</h2><span className="panel-index">SEASON 01</span></div>{state === 'loading' && <p className="loading-state">Loading rankings...</p>}{state === 'error' && <p className="error-state">Rankings are temporarily unavailable.</p>}{state === 'ready' && <ul className="data-list">{entries.length ? entries.map((entry) => <li className="data-row" key={entry._id ?? entry.id}><div><div className="data-primary"><span className="rank">{entry.rank}</span>{entry.user?.fullName ?? entry.user?.username ?? 'Athlete'}</div><div className="data-secondary">Points earned this season</div></div><strong className="data-value">{entry.points} pts</strong></li>) : <li className="empty-state">No rankings yet.</li>}</ul>}</section>
}

export default Leaderboard