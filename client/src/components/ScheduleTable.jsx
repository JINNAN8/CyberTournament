export default function ScheduleTable({ matches }) {
  return (
    <div className="neon-box overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-neon-blue/30 text-neon-blue font-mono">
            <th className="p-3">时间</th>
            <th className="p-3">战队A</th>
            <th className="p-3">比分</th>
            <th className="p-3">战队B</th>
            <th className="p-3">状态</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(m => (
            <tr key={m.id} className="border-b border-neon-purple/20 hover:bg-neon-pink/10 transition-colors">
              <td className="p-3 font-mono text-sm">
                {m.startTime ? new Date(m.startTime).toLocaleString() : 'TBD'}
              </td>
              <td className="p-3">{m.teamA?.name || 'TBD'}</td>
              <td className="p-3 font-black neon-text-yellow">
                {m.status === 'upcoming' ? 'vs' : `${m.scoreA ?? '-'} : ${m.scoreB ?? '-'}`}
              </td>
              <td className="p-3">{m.teamB?.name || 'TBD'}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                  m.status === 'live' ? 'bg-red-500/20 text-red-400' : 
                  m.status === 'finished' ? 'bg-gray-500/20 text-gray-400' : 'bg-neon-blue/20 text-neon-blue'
                }`}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}