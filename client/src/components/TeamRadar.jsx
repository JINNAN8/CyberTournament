import ReactECharts from 'echarts-for-react'

export default function TeamRadar({ team }) {
  const option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: '击杀', max: 100 },
        { name: '经济', max: 100 },
        { name: '推塔', max: 100 },
        { name: '生存', max: 100 },
        { name: '助攻', max: 100 }
      ],
      axisName: {
        color: '#00f0ff',
        fontSize: 12,
        fontFamily: 'Share Tech Mono',
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(0,240,255,0.02)', 'rgba(0,240,255,0.04)']
        }
      }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [
          team.stats?.kill || Math.random()*80+20,
          team.stats?.gold || Math.random()*80+20,
          team.stats?.tower || Math.random()*80+20,
          team.stats?.survive || Math.random()*80+20,
          team.stats?.assist || Math.random()*80+20,
        ],
        name: team.name,
        areaStyle: { color: 'rgba(255,45,149,0.2)' },
        lineStyle: { color: '#ff2d95', width: 2 },
        itemStyle: { color: '#ffea00' }
      }]
    }]
  }

  return (
    <div className="neon-box">
      <h3 className="text-xl font-bold neon-text-pink mb-2 text-center">{team.name}</h3>
      <ReactECharts option={option} style={{ height: 250 }} />
    </div>
  )
}