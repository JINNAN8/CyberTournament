export default function PlayerStats({ players }) {
  return (
    <div className="neon-box overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-neon-blue border-b border-neon-blue/30 font-mono">
            <th className="p-3">#</th>
            <th className="p-3">选手</th>
            <th className="p-3">战队</th>
            <th className="p-3">击杀</th>
            <th className="p-3">死亡</th>
            <th className="p-3">助攻</th>
            <th className="p-3">KDA</th>
          </tr>
        </thead>
        <tbody>
          {players.sort((a,b) => b.kills - a.kills).map((p, idx) => (
            <tr key={p.id} className="border-b border-neon-purple/20 hover:bg-neon-pink/10 transition-colors">
              <td className="p-3 font-mono neon-text-yellow">{idx+1}</td>
              <td className="p-3 font-bold">{p.nickname}</td>
              <td className="p-3 text-neon-blue">{p.team?.name || '-'}</td>
              <td className="p-3">{p.kills}</td>
              <td className="p-3">{p.deaths}</td>
              <td className="p-3">{p.assists}</td>
              <td className="p-3 font-mono neon-text-pink">
                {((p.kills + p.assists) / Math.max(p.deaths, 1)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}