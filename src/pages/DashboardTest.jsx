import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CosmosBackground from '../canvas/CosmosBackground'

const DashboardTest = () => {
  const [selectedTab, setSelectedTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'portfolio', name: 'Portfolio', icon: '💼' },
    { id: 'transactions', name: 'Transactions', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  const portfolio = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 1.5, value: 64875, change: 2.4 },
    { symbol: 'ETH', name: 'Ethereum', amount: 12, value: 27360, change: -1.2 },
    { symbol: 'SOL', name: 'Solana', amount: 150, value: 14700, change: 5.7 },
    { symbol: 'NVDA', name: 'NVIDIA', amount: 25, value: 11250, change: 1.8 }
  ]

  const transactions = [
    { id: 1, type: 'buy', symbol: 'BTC', amount: 0.5, price: 42500, date: '2024-01-15' },
    { id: 2, type: 'sell', symbol: 'ETH', amount: 2, price: 2300, date: '2024-01-14' },
    { id: 3, type: 'buy', symbol: 'SOL', amount: 50, price: 95, date: '2024-01-13' },
    { id: 4, type: 'buy', symbol: 'NVDA', amount: 10, price: 440, date: '2024-01-12' }
  ]

  return (
    <div className="relative min-h-screen bg-void-black">
      <CosmosBackground />
      
      <div className="relative z-10 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-orbitron text-4xl font-bold text-star-white mb-2">
                DASHBOARD
              </h1>
              <p className="text-star-white/80 font-syne">
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="cosmic-button-outline px-4 py-2">
                EXPORT DATA
              </button>
              <button className="cosmic-button px-4 py-2">
                NEW TRADE
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-star-white/5 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-syne font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-nebula-purple/20 text-nebula-purple'
                    : 'text-star-white/60 hover:text-star-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              {/* Status Card */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-orbitron text-xl font-bold text-star-white mb-2">
                      System Status
                    </h3>
                    <p className="text-star-white/80 font-syne">
                      All systems operational • Real-time data active • API connected
                    </p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gain-green animate-pulse"></div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Total Assets
                  </h3>
                  <p className="text-2xl font-orbitron text-star-white mt-2">
                    $1,247,500
                  </p>
                  <p className="text-gain-green font-syne text-sm mt-2">
                    +12.4% this month
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Yield Rate
                  </h3>
                  <p className="text-2xl font-orbitron text-star-white mt-2">
                    12.7%
                  </p>
                  <p className="text-gain-green font-syne text-sm mt-2">
                    +2.1% vs last month
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Active Positions
                  </h3>
                  <p className="text-2xl font-orbitron text-star-white mt-2">
                    8
                  </p>
                  <p className="text-star-white/60 font-syne text-sm mt-2">
                    4 profitable, 4 neutral
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Risk Index
                  </h3>
                  <p className="text-2xl font-orbitron text-star-white mt-2">
                    3.2
                  </p>
                  <p className="text-aurora-cyan font-syne text-sm mt-2">
                    Low volatility
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 hover:glass-card-hover cursor-pointer">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Quick Trade
                  </h3>
                  <p className="text-star-white/70 font-syne text-sm">
                    Execute instant trades with one click
                  </p>
                </div>
                
                <div className="glass-card p-6 hover:glass-card-hover cursor-pointer">
                  <div className="text-3xl mb-4">📊</div>
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Analytics
                  </h3>
                  <p className="text-star-white/70 font-syne text-sm">
                    View detailed performance metrics
                  </p>
                </div>
                
                <div className="glass-card p-6 hover:glass-card-hover cursor-pointer">
                  <div className="text-3xl mb-4">🔔</div>
                  <h3 className="font-orbitron text-lg font-bold text-star-white mb-2">
                    Alerts
                  </h3>
                  <p className="text-star-white/70 font-syne text-sm">
                    Set price and volume notifications
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {selectedTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
                  Portfolio Holdings
                </h3>
                <div className="space-y-4">
                  {portfolio.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-star-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nebula-purple to-aurora-cyan flex items-center justify-center">
                          <span className="text-star-white font-orbitron text-sm font-bold">
                            {asset.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-orbitron font-bold text-star-white">
                            {asset.symbol}
                          </div>
                          <div className="text-star-white/60 font-syne text-sm">
                            {asset.amount} {asset.name}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-orbitron font-bold text-star-white">
                          ${asset.value.toLocaleString()}
                        </div>
                        <div className={`text-sm font-syne ${
                          asset.change >= 0 ? 'text-gain-green' : 'text-loss-red'
                        }`}>
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {selectedTab === 'transactions' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
                  Recent Transactions
                </h3>
                <div className="space-y-3">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-star-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          tx.type === 'buy' ? 'bg-gain-green' : 'bg-loss-red'
                        }`} />
                        <div>
                          <div className="font-orbitron font-bold text-star-white">
                            {tx.type.toUpperCase()} {tx.symbol}
                          </div>
                          <div className="text-star-white/60 font-syne text-sm">
                            {tx.date}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-orbitron text-star-white">
                          {tx.amount} @ ${tx.price}
                        </div>
                        <div className="text-star-white/80 font-syne text-sm">
                          ${(tx.amount * tx.price).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
                  Dashboard Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-star-white/5 rounded-lg">
                    <div>
                      <div className="font-orbitron font-bold text-star-white">
                        Real-time Updates
                      </div>
                      <div className="text-star-white/60 font-syne text-sm">
                        Enable live price updates
                      </div>
                    </div>
                    <button className="w-12 h-6 bg-nebula-purple rounded-full relative">
                      <div className="w-5 h-5 bg-star-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-star-white/5 rounded-lg">
                    <div>
                      <div className="font-orbitron font-bold text-star-white">
                        Price Alerts
                      </div>
                      <div className="text-star-white/60 font-syne text-sm">
                        Get notifications on price changes
                      </div>
                    </div>
                    <button className="w-12 h-6 bg-star-white/20 rounded-full relative">
                      <div className="w-5 h-5 bg-star-white/60 rounded-full absolute left-0.5 top-0.5"></div>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-star-white/5 rounded-lg">
                    <div>
                      <div className="font-orbitron font-bold text-star-white">
                        Dark Mode
                      </div>
                      <div className="text-star-white/60 font-syne text-sm">
                        Use cosmic dark theme
                      </div>
                    </div>
                    <button className="w-12 h-6 bg-nebula-purple rounded-full relative">
                      <div className="w-5 h-5 bg-star-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          {/* <div className="mt-12 text-center">
            <p className="text-star-white/60 font-syne mb-4">
              Test navigation to other pages:
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/overview" className="cosmic-button-outline px-4 py-2">
                Overview
              </Link>
              <Link to="/markets" className="cosmic-button-outline px-4 py-2">
                Markets
              </Link>
              <Link to="/login" className="cosmic-button-outline px-4 py-2">
                Login
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardTest
