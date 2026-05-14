export default function Header() {
  return (
    <header className="neon-box border-b border-neon-blue/50 py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-black neon-text-pink animate-flicker">
          CYBER ARENA
        </h1>
        <nav className="flex gap-6 text-sm md:text-lg">
          <span className="cursor-pointer hover:neon-text-blue transition-all">赛程</span>
          <span className="cursor-pointer hover:neon-text-blue transition-all">战队</span>
          <span className="cursor-pointer hover:neon-text-blue transition-all">选手</span>
          <span className="cursor-pointer hover:neon-text-blue transition-all">关于</span>
        </nav>
      </div>
    </header>
  )
}