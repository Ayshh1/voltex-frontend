import React, { useRef, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const TrajectoryChart = ({ data = [] }) => {
  const chartRef = useRef()

  // Generate mock data if none provided
  const chartData = data.length > 0 ? data : Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 200000 + Math.random() * 50000 + (i * 1000),
    timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-nebula-purple/50">
          <p className="text-star-white font-syne text-sm">
            Day {label}
          </p>
          <p className="text-star-white font-orbitron font-bold">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass-card p-6">
      <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
        Portfolio Trajectory
      </h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} ref={chartRef}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7b2fff" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="#00c9ff" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#ff6b9d" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(123, 47, 255, 0.1)" 
              strokeOpacity={0.3}
            />
            
            <XAxis 
              dataKey="day" 
              stroke="rgba(226, 232, 255, 0.3)"
              tick={{ fill: 'rgba(226, 232, 255, 0.5)', fontSize: 12 }}
            />
            
            <YAxis 
              stroke="rgba(226, 232, 255, 0.3)"
              tick={{ fill: 'rgba(226, 232, 255, 0.5)', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#colorValue)"
              strokeWidth={3}
              fill="url(#colorValue)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-star-white/60 font-syne">30-Day Performance</span>
        <span className="text-gain-green font-syne font-bold">
          +12.4%
        </span>
      </div>
    </div>
  )
}

export default TrajectoryChart
