import { useEffect, useState } from 'react'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState('loading')
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'

  useEffect(() => {
    fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Could not load teams'); return response.json() }).then((payload) => setTeams(Array.isArray(payload) ? payload : payload.results ?? payload.data ?? [])).then(() => setState('ready')).catch(() => setState('error'))
  }, [apiUrl])

  return <section className="data-panel"><div className="data-panel-header"><h2>Training crews</h2><span className="panel-index">{state === 'ready' ? `${teams.length} ACTIVE` : state.toUpperCase()}</span></div>{state === 'loading' && <p className="loading-state">Loading teams...</p>}{state === 'error' && <p className="error-state">Teams are temporarily unavailable.</p>}{state === 'ready' && <ul className="data-list">{teams.length ? teams.map((team) => <li className="data-row" key={team._id ?? team.id ?? team.name}><div><div className="data-primary">{team.name}</div><div className="data-secondary">{team.motto}</div></div><strong className="data-value">{team.members?.length ?? 0} members</strong></li>) : <li className="empty-state">No teams yet.</li>}</ul>}</section>
}

export default Teams