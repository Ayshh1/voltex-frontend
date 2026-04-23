import React, { useState, useEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import axios from 'axios'

const LiveTicker = () => {
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)

  // Socket connection for live updates
  useSocket({
    'price:initial': (initialPrices) => {
      setPrices(initialPrices)
      setLoading(false)
    },
    'price:update': (updatedPrices) => {
      setPrices(updatedPrices)
    }
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatChange = (change) => {
    const isPositive = change >= 0
    return (
      <span className={`font-orbitron font-bold ${isPositive ? 'text-gain-green' : 'text-loss-red'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    )
  }

  if (loading) {
    return (
      <div className="glass-card p-6">
        <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
          Live Market Data
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-star-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
        Live Market Data
      </h3>
      
      <div className="space-y-3">
        {Object.entries(prices).map(([symbol, data]) => (
          <div 
            key={symbol}
            className="flex items-center justify-between p-3 rounded-lg bg-void-black/30 border border-star-white/10 hover:border-nebula-purple/50 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nebula-purple to-aurora-cyan flex items-center justify-center">
                <span className="text-star-white font-orbitron text-xs font-bold">
                  {symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <div className="text-star-white font-orbitron font-bold">
                  {symbol}
                </div>
                <div className="text-star-white/60 font-syne text-xs">
                  {symbol === 'BTC' || symbol === 'ETH' || symbol === 'SOL' ? 'Crypto' : 'Stock'}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-star-white font-orbitron font-bold">
                {formatPrice(data.price)}
              </div>
              <div>
                {formatChange(data.changePercent)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-star-white/40 font-syne text-xs">
          Updates every 2 seconds
        </span>
      </div>
    </div>
  )
}

export default LiveTicker
