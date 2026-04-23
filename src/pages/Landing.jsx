import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import CosmosBackground from '../canvas/CosmosBackground'
import useSocket from '../hooks/useSocket'
import useCountUp from '../hooks/useCountUp'

const Markets = () => {
  const [marketData, setMarketData] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock market metrics
  const totalVolume = useCountUp(1240000000, 2000)
  const marketCap = useCountUp(28450000000, 2000)
  const activeMarkets = useCountUp(156, 2000)
  const change24h = useCountUp(2.4, 2000, true)

  // Socket connection for live updates
  useSocket({
    'price:initial': (initialPrices) => {
      setMarketData(initialPrices)
      setLoading(false)
    },
    'price:update': (updatedPrices) => {
      setMarketData(updatedPrices)
    }
  })

  useEffect(() => {
    // Animate market cards
    gsap.fromTo('.market-card',
      { opacity: 0, scale: 0.9, y: 30 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    )
  }, [])

  const categories = [
    { id: 'all', name: 'All Markets', icon: '🌍' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
    { id: 'stocks', name: 'Stocks', icon: '📈' },
    { id: 'defi', name: 'DeFi', icon: '🔗' }
  ]

  const allMarkets = [
    { symbol: 'BTC', name: 'Bitcoin', category: 'crypto', price: 43250, change: 2.4, volume: '28.5B', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', category: 'crypto', price: 2280, change: -1.2, volume: '15.2B', icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', category: 'crypto', price: 98, change: 5.7, volume: '2.8B', icon: '◎' },
    { symbol: 'NVDA', name: 'NVIDIA', category: 'stocks', price: 450, change: 1.8, volume: '45.2B', icon: '🚀' },
    { symbol: 'AAPL', name: 'Apple', category: 'stocks', price: 178, change: -0.5, volume: '89.3B', icon: '🍎' },
    { symbol: 'MSFT', name: 'Microsoft', category: 'stocks', price: 379, change: 0.9, volume: '67.8B', icon: '🪟' }
  ]

  const filteredMarkets = selectedCategory === 'all' 
    ? allMarkets 
    : allMarkets.filter(market => market.category === selectedCategory)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2
    }).format(price)
  }

  const formatVolume = (volume) => {
    const num = parseFloat(volume)
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toString()
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-void-black">
        <CosmosBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-star-white font-orbitron text-2xl animate-pulse">
            LOADING MARKET DATA...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-void-black">
      <CosmosBackground />
      
      <div className="relative z-10 pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <section className="text-center mb-12">
            <h1 className="font-orbitron text-5xl font-bold gradient-text mb-6">
              GLOBAL MARKETS
            </h1>
            <p className="text-star-white/80 font-syne text-lg max-w-3xl mx-auto">
              Real-time market data across cryptocurrencies, stocks, and decentralized finance protocols.
            </p>
          </section>

          {/* Market Overview Stats */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6">
              <div className="text-star-white/60 font-syne text-sm mb-2">
                24h Volume
              </div>
              <div className="text-2xl font-orbitron font-bold text-star-white">
                ${(totalVolume / 1e9).toFixed(1)}B
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-star-white/60 font-syne text-sm mb-2">
                Market Cap
              </div>
              <div className="text-2xl font-orbitron font-bold text-star-white">
                ${(marketCap / 1e9).toFixed(0)}B
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-star-white/60 font-syne text-sm mb-2">
                Active Markets
              </div>
              <div className="text-2xl font-orbitron font-bold text-star-white">
                {activeMarkets.toLocaleString()}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="text-star-white/60 font-syne text-sm mb-2">
                24h Change
              </div>
              <div className={`text-2xl font-orbitron font-bold ${change24h >= 0 ? 'text-gain-green' : 'text-loss-red'}`}>
                {change24h >= 0 ? '+' : ''}{change24h}%
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-syne font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'cosmic-button'
                      : 'cosmic-button-outline'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          {/* Markets Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market, index) => (
              <div key={market.symbol} className="market-card glass-card p-6 hover:glass-card-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{market.icon}</div>
                    <div>
                      <div className="font-orbitron font-bold text-star-white">
                        {market.symbol}
                      </div>
                      <div className="text-star-white/60 font-syne text-sm">
                        {market.name}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-orbitron font-bold ${
                    market.category === 'crypto' ? 'bg-nebula-purple/20 text-nebula-purple' :
                    market.category === 'stocks' ? 'bg-aurora-cyan/20 text-aurora-cyan' :
                    'bg-cosmic-pink/20 text-cosmic-pink'
                  }`}>
                    {market.category.toUpperCase()}
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-orbitron font-bold text-star-white">
                      {formatPrice(marketData[market.symbol]?.price || market.price)}
                    </div>
                    <div className="text-star-white/60 font-syne text-sm">
                      Vol: {formatVolume(market.volume)}
                    </div>
                  </div>
                  
                  <div className={`text-right ${
                    (marketData[market.symbol]?.changePercent || market.change) >= 0 
                      ? 'text-gain-green' 
                      : 'text-loss-red'
                  }`}>
                    <div className="font-orbitron font-bold">
                      {(marketData[market.symbol]?.changePercent || market.change) >= 0 ? '+' : ''}
                      {(marketData[market.symbol]?.changePercent || market.change).toFixed(2)}%
                    </div>
                    <div className="text-xs font-syne">
                      24h
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Market Insights */}
          <section className="mt-16">
            <h2 className="font-orbitron text-3xl font-bold text-center text-star-white mb-12">
              MARKET INSIGHTS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-xl font-bold text-star-white mb-4">
                  🔥 Trending Now
                </h3>
                <div className="space-y-3">
                  {[
                    { symbol: 'SOL', change: 5.7, reason: 'DeFi ecosystem growth' },
                    { symbol: 'NVDA', change: 1.8, reason: 'AI chip demand' },
                    { symbol: 'ETH', change: -1.2, reason: 'Profit taking' }
                  ].map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-orbitron text-star-white">{trend.symbol}</span>
                        <span className="text-star-white/60 font-syne text-sm ml-2">
                          {trend.reason}
                        </span>
                      </div>
                      <span className={`font-orbitron font-bold ${
                        trend.change >= 0 ? 'text-gain-green' : 'text-loss-red'
                      }`}>
                        {trend.change >= 0 ? '+' : ''}{trend.change}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-xl font-bold text-star-white mb-4">
                  📊 Market Analysis
                </h3>
                <div className="space-y-3 text-star-white/80 font-syne">
                  <p>
                    <strong>Crypto Markets:</strong> Bitcoin showing strong resistance at $45K, with institutional interest growing.
                  </p>
                  <p>
                    <strong>Equity Markets:</strong> Tech stocks rebounding as AI sector continues to outperform.
                  </p>
                  <p>
                    <strong>DeFi Sector:</strong> Total Value Locked (TVL) up 12% this month as yield farming gains popularity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Markets
