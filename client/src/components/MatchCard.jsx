export default function MatchCard({ match }) {
  const statusStyles = {
    live: 'text-red-500 neon-text-pink animate-pulse',
    upcoming: 'text-neon-blue',
    finished: 'text-gray-500',
  }

  return (
    <div className="neon-box hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className={statusStyles[match.status]}>
          {match.status.toUpperCase()}
        </span>
        <span className="text-xs text-neon-blue/60 font-mono">{match.round}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center w-1/3">
          <div className="w-12 h-12 rounded-full bg-neon-purple/30 flex items-center justify-center mb-2 border border-neon-purple overflow-hidden">
  {match.teamA?.logo ? (
    <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full object-cover" />
  ) : (
    <span className="font-mono text-xs">{match.teamA?.short || 'T1'}</span>
  )}
</div>
          <span className="text-sm truncate max-w-[80px]">{match.teamA?.name || 'Team A'}</span>
        </div>
        <div className="text-4xl font-black neon-text-yellow mx-4">
          {match.scoreA ?? '?'} : {match.scoreB ?? '?'}
        </div>
        <div className="flex flex-col items-center w-1/3">
         <div className="w-12 h-12 rounded-full bg-neon-pink/30 flex items-center justify-center mb-2 border border-neon-pink overflow-hidden">
  {match.teamB?.logo ? (
    <img src={match.teamB.logo} alt={match.teamB.name} className="w-full h-full object-cover" />
  ) : (
    <span className="font-mono text-xs">{match.teamB?.short || 'T2'}</span>
  )}
</div>
          <span className="text-sm truncate max-w-[80px]">{match.teamB?.name || 'Team B'}</span>
        </div>
      </div>
      <div className="text-center mt-3 text-xs text-neon-blue/70 font-mono">
        {match.startTime && new Date(match.startTime).toLocaleTimeString()}
      </div>
    </div>
  )
}