const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// ---- 管理员账号 ----
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'sai123456';

// ---- 16支战队 ----
let teams = [
  { id: 1,  name: 'KFC', short: 'DS1', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team1-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team1-poster.jpeg' },
  { id: 2,  name: 'LAL', short: 'DS2', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team2-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team2-poster.jpeg' },
  { id: 3,  name: 'LDL', short: 'DS3', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team3-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team3-poster.jpeg' },
  { id: 4,  name: 'FKQ', short: 'DS4', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team4-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team4-poster.jpeg' },
  { id: 5,  name: 'Star', short: 'DS5', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team5-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team5-poster.jpeg' },
  { id: 6,  name: 'QAQ', short: 'DS6', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team6-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team6-poster.jpeg' },
  { id: 7,  name: 'GKD', short: 'DS7', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team7-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team7-poster.jpeg' },
  { id: 8,  name: 'T1', short: 'DS8', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team8-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team8-poster.jpeg' },
  { id: 9,  name: 'TAG', short: 'DS9', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team9-logo.png',  poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team9-poster.jpeg' },
  { id: 10, name: 'WTF', short: 'DS10', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team10-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team10-poster.png' },
  { id: 11, name: 'SPF', short: 'DS11', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team11-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team11-poster.png' },
  { id: 12, name: 'VIL', short: 'DS12', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team12-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team12-poster.jpeg' },
  { id: 13, name: 'UWU', short: 'DS13', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team13-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team13-poster.jpeg' },
  { id: 14, name: 'CRX', short: 'DS14', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team14-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team14-poster.jpeg' },
  { id: 15, name: 'WEG', short: 'DS15', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team15-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team15-poster.jpeg' },
  { id: 16, name: 'OVO', short: 'DS16', logo: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team16-logo.png', poster: 'https://raw.githubusercontent.com/JINNAN8/CyberTournament/refs/heads/main/client/public/teams/team16-poster.jpeg' },
];

// ---- 选手 ----
let players = [
  { id: 1, nickname: 'RaZoR',   team: teams[0], kills: 32, deaths: 12, assists: 45 },
  { id: 2, nickname: 'Byte',    team: teams[0], kills: 28, deaths: 18, assists: 33 },
  { id: 3, nickname: 'Glitch',  team: teams[1], kills: 45, deaths: 20, assists: 29 },
  { id: 4, nickname: 'Nova',    team: teams[1], kills: 22, deaths: 25, assists: 38 },
  { id: 5, nickname: 'Hex',     team: teams[2], kills: 38, deaths: 15, assists: 41 },
  { id: 6, nickname: 'Cypher',  team: teams[2], kills: 19, deaths: 22, assists: 52 },
  { id: 7, nickname: 'Pulse',   team: teams[3], kills: 33, deaths: 17, assists: 35 },
  { id: 8, nickname: 'Vex',     team: teams[3], kills: 27, deaths: 19, assists: 40 },
];

// ---- 比赛（引用队伍id）----
let matches = [
  { id: 1, round: '小组赛', teamA: teams[0], teamB: teams[1], scoreA: 7, scoreB: 8, status: 'live',     startTime: new Date().toISOString() },
  { id: 2, round: '小组赛', teamA: teams[2], teamB: teams[3], scoreA: 11, scoreB: 5, status: 'live',    startTime: new Date().toISOString() },
  { id: 3, round: '淘汰赛', teamA: teams[0], teamB: teams[2], scoreA: null, scoreB: null, status: 'upcoming', startTime: new Date(Date.now()+86400000).toISOString() },
  { id: 4, round: '淘汰赛', teamA: teams[1], teamB: teams[3], scoreA: null, scoreB: null, status: 'upcoming', startTime: new Date(Date.now()+86400000*2).toISOString() },
];

// ---- 实时比分模拟（可删除）----
setInterval(() => {
  const liveMatches = matches.filter(m => m.status === 'live');
  if (liveMatches.length > 0) {
    const randomMatch = liveMatches[Math.floor(Math.random() * liveMatches.length)];
    if (Math.random() > 0.5) {
      randomMatch.scoreA = (randomMatch.scoreA || 0) + 1;
    } else {
      randomMatch.scoreB = (randomMatch.scoreB || 0) + 1;
    }
    io.emit('matchUpdate', randomMatch);
    console.log(`更新比赛 #${randomMatch.id} 比分: ${randomMatch.scoreA} - ${randomMatch.scoreB}`);
  }
}, 5000);

// ---- API路由 ----
app.get('/api/matches', (req, res) => res.json(matches));
app.get('/api/teams',   (req, res) => res.json(teams));
app.get('/api/players', (req, res) => res.json(players));

// ---- 管理员登录 ----
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: 'cyber-admin-token-2024' });
  }
  res.status(401).json({ success: false, message: '账号或密码错误' });
});

// ---- 权限验证中间件 ----
function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token === 'cyber-admin-token-2024') {
    return next();
  }
  res.status(403).json({ success: false, message: '未授权访问' });
}

// ---- 修改比赛数据（需要登录）----
app.put('/api/matches/:id', checkAuth, (req, res) => {
  const { id } = req.params;
  const { scoreA, scoreB, status } = req.body;
  const match = matches.find(m => m.id == id);
  if (!match) {
    return res.status(404).json({ success: false, message: '比赛不存在' });
  }
  if (scoreA !== undefined) match.scoreA = scoreA;
  if (scoreB !== undefined) match.scoreB = scoreB;
  if (status) match.status = status;
  io.emit('matchUpdate', match);
  res.json({ success: true, match });
});

// ---- 启动服务器 ----
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`赛博服务器已启动，端口：${PORT}`);
});