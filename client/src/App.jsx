import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import MatchCard from './components/MatchCard'
import ScheduleTable from './components/ScheduleTable'
import TeamRadar from './components/TeamRadar'
import PlayerStats from './components/PlayerStats'
import useSocket from './hooks/useSocket'
import TeamShowcase from './components/TeamShowcase';

export default function App() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const liveUpdate = useSocket('matchUpdate')

  useEffect(() => {
    axios.get('http://119.91.56.69:3001/api/matches').then(res => setMatches(res.data))
    axios.get('http://119.91.56.69:3001/api/teams').then(res => setTeams(res.data))
    axios.get('http://119.91.56.69:3001/api/players').then(res => setPlayers(res.data))
  }, [])

  useEffect(() => {
    if (liveUpdate) {
      setMatches(prev => prev.map(m => m.id === liveUpdate.id ? liveUpdate : m))
    }
  }, [liveUpdate])

  return (
    <div className="min-h-screen font-cyber">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* 实时比分卡片 */}
        <section>
          <h2 className="text-3xl font-bold neon-text-pink mb-6">⚡ 直播比分</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.filter(m => m.status === 'live').map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* 战队雷达图 */}
        <section>
          <h2 className="text-3xl font-bold neon-text-blue mb-6">📊 战队战力雷达</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.map(team => (
              <TeamRadar key={team.id} team={team} />
            ))}
          </div>
        </section>

         <section>
           <h2 className="text-3xl font-bold neon-text-blue mb-6">👥 战队海报</h2>
           <TeamShowcase teams={teams} />
        </section>

        {/* 赛程表 */}
        <section>
          <h2 className="text-3xl font-bold neon-text-yellow mb-6">🗓️ 赛程安排</h2>
          <ScheduleTable matches={matches} />
        </section>

        {/* 选手数据 */}
        <section>
          <h2 className="text-3xl font-bold neon-text-pink mb-6">👾 选手击杀榜</h2>
          <PlayerStats players={players} />
        </section>
      </main>
    </div>
  )
}