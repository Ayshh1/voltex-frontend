import React from 'react'

const StatCard = ({ title, value, subtitle, animationDelay = 0 }) => {
  return (
    <div className="stat-card min-w-[200px]">
      <div className="text-star-white/60 font-syne text-xs uppercase tracking-wider mb-2">
        {title}
      </div>
      <div className="font-orbitron text-2xl font-bold text-star-white mb-1">
        {value}
      </div>
      <div className="text-star-white/40 font-syne text-xs">
        {subtitle}
      </div>
    </div>
  )
}

export default StatCard
