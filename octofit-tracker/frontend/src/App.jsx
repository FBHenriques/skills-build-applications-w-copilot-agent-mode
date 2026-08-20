import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit Tracker</span></NavLink>
        <span className="status-pill"><span className="status-dot" /> Sync online</span>
      </header>
      <div className="workspace">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="eyebrow">Your training desk</p>
          <nav className="nav-list">
            <NavLink className="nav-item" to="/">Overview</NavLink>
            <NavLink className="nav-item" to="/activities">Activities</NavLink>
            <NavLink className="nav-item" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-item" to="/teams">Teams</NavLink>
            <NavLink className="nav-item" to="/users">Athletes</NavLink>
            <NavLink className="nav-item" to="/workouts">Workouts</NavLink>
          </nav>
          <div className="sidebar-note"><span className="note-label">This week</span><strong>Keep the rhythm.</strong><span>3 sessions logged</span></div>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Page title="Activity log" kicker="Movement" description="Every session is a vote for the athlete you are becoming."><Activities /></Page>} />
            <Route path="/leaderboard" element={<Page title="Leaderboard" kicker="Momentum"><Leaderboard /></Page>} />
            <Route path="/teams" element={<Page title="Teams" kicker="Community"><Teams /></Page>} />
            <Route path="/users" element={<Page title="Athletes" kicker="The roster"><Users /></Page>} />
            <Route path="/workouts" element={<Page title="Workout library" kicker="Your next move"><Workouts /></Page>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Page({ title, kicker, description, children }) {
  return <><div className="page-heading"><div><span className="kicker">{kicker}</span><h1>{title}</h1>{description && <p>{description}</p>}</div><span className="date-stamp">AUG 20 / 2026</span></div>{children}</>
}

function Overview() {
  return <><div className="page-heading overview-heading"><div><span className="kicker">Good afternoon, Alex</span><h1>Make today count.</h1><p>Your training dashboard, in one clear view.</p></div><span className="date-stamp">AUG 20 / 2026</span></div><section className="stat-grid" aria-label="Weekly statistics"><Stat label="Weekly points" value="920" detail="+18% from last week" accent="coral" /><Stat label="Active minutes" value="184" detail="Target 240 min" accent="gold" /><Stat label="Current rank" value="#01" detail="Top 3 this month" accent="mint" /></section><section className="overview-grid"><div className="feature-panel coral-panel"><span className="panel-index">01 / NEXT SESSION</span><h2>Trail Starter</h2><p>25 minutes · Cardio · Beginner</p><NavLink className="action-link" to="/workouts">View workout <span>↗</span></NavLink></div><div className="quote-panel"><span className="panel-index">FIELD NOTE</span><blockquote>“Consistency is a quiet kind of courage.”</blockquote><span className="quote-byline">— OctoFit coaching desk</span></div></section></>
}

function Stat({ label, value, detail, accent }) {
  return <article className={`stat-card ${accent}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>
}

export default App
