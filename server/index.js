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

// ---- 模拟数据 ----
let teams = [
  { id: 1, name: 'KFC', short: 'DS1', logo: '/teams/team1-logo.png', poster: '/teams/team1-poster.jpeg' },
  { id: 2, name: 'LAL', short: 'DS2', logo: '/teams/team2-logo.png', poster: '/teams/team2-poster.jpeg' },
  { id: 3, name: 'LDL', short: 'DS3', logo: '/teams/team3-logo.png', poster: '/teams/team3-poster.jpeg' },
  { id: 4, name: 'FKQ', short: 'DS4', logo: '/teams/team4-logo.png', poster: '/teams/team4-poster.jpeg' },
  { id: 5, name: 'Star', short: 'DS5', logo: '/teams/team5-logo.png', poster: '/teams/team5-poster.jpeg' },
  { id: 6, name: 'QAQ', short: 'DS6', logo: '/teams/team6-logo.png', poster: '/teams/team6-poster.jpeg' },
  { id: 7, name: 'GKD', short: 'DS7', logo: '/teams/team7-logo.png', poster: '/teams/team7-poster.jpeg' },
  { id: 8, name: 'T1', short: 'DS8', logo: '/teams/team8-logo.png', poster: '/teams/team8-poster.jpeg' },
  { id: 9, name: 'TAG', short: 'DS9', logo: '/teams/team9-logo.png', poster: '/teams/team9-poster.jpeg' },
  { id: 10, name: 'WTF', short: 'DS10', logo: '/teams/team10-logo.png', poster: '/teams/team10-poster.png' },
  { id: 11, name: 'SPF', short: 'DS11', logo: '/teams/team11-logo.png', poster: '/teams/team11-poster.png' },
  { id: 12, name: 'VIL', short: 'DS12', logo: '/teams/team12-logo.png', poster: '/teams/team12-poster.jpeg' },
  { id: 13, name: 'UWU', short: 'DS13', logo: '/teams/team13-logo.png', poster: '/teams/team13-poster.jpeg' },
  { id: 14, name: 'CRX', short: 'DS14', logo: '/teams/team14-logo.png', poster: '/teams/team14-poster.jpeg' },
  { id: 15, name: 'WEG', short: 'DS15', logo: '/teams/team15-logo.png', poster: '/teams/team15-poster.jpeg' },
  { id: 16, name: 'OVO', short: 'DS16', logo: '/teams/team16-logo.png', poster: '/teams/team16-poster.jpeg' },
];

let players = [
  { id: 1, nickname: 'RaZoR', team: teams[0], kills: 32, deaths: 12, assists: 45 },
  { id: 2, nickname: 'Byte', team: teams[0], kills: 28, deaths: 18, assists: 33 },
  { id: 3, nickname: 'Glitch', team: teams[1], kills: 45, deaths: 20, assists: 29 },
  { id: 4, nickname: 'Nova', team: teams[1], kills: 22, deaths: 25, assists: 38 },
  { id: 5, nickname: 'Hex', team: teams[2], kills: 38, deaths: 15, assists: 41 },
  { id: 6, nickname: 'Cypher', team: teams[2], kills: 19, deaths: 22, assists: 52 },
  { id: 7, nickname: 'Pulse', team: teams[3], kills: 33, deaths: 17, assists: 35 },
  { id: 8, nickname: 'Vex', team: teams[3], kills: 27, deaths: 19, assists: 40 },
];

let matches = [
  { id: 1, round: '小组赛', teamA: teams[0], teamB: teams[1], scoreA: 2, scoreB: 1, status: 'live', startTime: new Date().toISOString() },
  { id: 2, round: '小组赛', teamA: teams[2], teamB: teams[3], scoreA: 0, scoreB: 2, status: 'live', startTime: new Date().toISOString() },
  { id: 3, round: '淘汰赛', teamA: teams[0], teamB: teams[2], scoreA: null, scoreB: null, status: 'upcoming', startTime: new Date(Date.now()+86400000).toISOString() },
  { id: 4, round: '淘汰赛', teamA: teams[1], teamB: teams[3], scoreA: null, scoreB: null, status: 'upcoming', startTime: new Date(Date.now()+86400000*2).toISOString() },
];

// API 路由
app.get('/api/matches', (req, res) => res.json(matches));
app.get('/api/teams', (req, res) => res.json(teams));
app.get('/api/players', (req, res) => res.json(players));

// WebSocket 实时推送：每5秒随机更新一场直播比赛的比分
setInterval(() => {
  const liveMatches = matches.filter(m => m.status === 'live');
  if (liveMatches.length > 0) {
    const randomMatch = liveMatches[Math.floor(Math.random() * liveMatches.length)];
    // 随机给A或B加1分
    if (Math.random() > 0.5) {
      randomMatch.scoreA = (randomMatch.scoreA || 0) + 1;
    } else {
      randomMatch.scoreB = (randomMatch.scoreB || 0) + 1;
    }
    io.emit('matchUpdate', randomMatch);
    console.log(`更新比赛 #${randomMatch.id} 比分: ${randomMatch.scoreA} - ${randomMatch.scoreB}`);
  }
}, 5000);

server.listen(3001, () => {
  console.log('赛博服务器已启动，地址：http://localhost:3001');
});