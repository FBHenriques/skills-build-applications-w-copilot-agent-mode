import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState('loading')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'

  useEffect(() => {
    fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Could not load athletes'); return response.json() }).then((payload) => setUsers(Array.isArray(payload) ? payload : payload.results ?? payload.data ?? [])).then(() => setState('ready')).catch(() => setState('error'))
  }, [apiUrl])

  return <section className="data-panel"><div className="data-panel-header"><h2>Athlete roster</h2><span className="panel-index">{state === 'ready' ? 'LIVE' : state.toUpperCase()}</span></div>{state === 'loading' && <p className="loading-state">Loading the roster...</p>}{state === 'error' && <p className="error-state">The roster is temporarily unavailable.</p>}{state === 'ready' && <ul className="data-list">{users.length ? users.map((user) => <li className="data-row" key={user._id ?? user.id ?? user.username}><div><div className="data-primary">{user.fullName ?? user.username}</div><div className="data-secondary">@{user.username} · {user.email}</div></div><strong className="data-value">{user.points ?? 0} pts</strong></li>) : <li className="empty-state">No athletes yet.</li>}</ul>}</section>
}

export default Users