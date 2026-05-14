export default function TeamShowcase({ teams }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {teams.map(team => (
        <div key={team.id} className="neon-box hover:scale-105 transition-transform duration-300 text-center">
          <div className="w-full aspect-video overflow-hidden rounded-lg mb-3">
            <img
              src={team.poster || '/placeholder.jpg'}
              alt={team.name}
              className="w-full h-full object-cover"
            />
          </div>
          <img
            src={team.logo || ''}
            alt={team.name}
            className="w-10 h-10 mx-auto mb-2 object-contain"
          />
          <h3 className="text-lg font-bold neon-text-pink">{team.name}</h3>
        </div>
      ))}
    </div>
  );
}