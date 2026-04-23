import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import axios from 'axios'
import CosmosBackground from '../canvas/CosmosBackground'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import TrajectoryChart from '../components/charts/TrajectoryChart'
import AllocationDonut from '../components/charts/AllocationDonut'
import LiveTicker from '../components/charts/LiveTicker'
import useCountUp from '../hooks/useCountUp'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const [portfolioData, setPortfolioData] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for metrics
  const totalAssets = useCountUp(1247500, 2000)
  const yieldRate = useCountUp(12.7, 2000, true)
  const activePositions = useCountUp(8, 2000)
  const riskIndex = useCountUp(3.2, 2000, true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    fetchDashboardData()
    
    // Animate dashboard elements
    gsap.fromTo('.dashboard-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    return () => {
      gsap.killTweensOf('.dashboard-content')
    }
  }, [user, navigate])

  const fetchDashboardData = async () => {
    try {
      // Fetch portfolio summary
      const portfolioResponse = await axios.get('/api/portfolio/summary')
      setPortfolioData(portfolioResponse.data)

      // Fetch transactions
      const transactionsResponse = await axios.get('/api/portfolio/transactions')
      setTransactions(transactionsResponse.data)
    } catch (error) {
      console.error('Dashboard data fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-void-black">
        <CosmosBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-star-white font-orbitron text-2xl animate-pulse">
            LOADING COMMAND CENTER...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-void-black">
      <CosmosBackground />
      
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-star-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nebula-purple via-aurora-cyan to-cosmic-pink animate-spin"></div>
              <span className="font-orbitron text-xl font-bold gradient-text">VORTEX</span>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-star-white/80 font-syne text-sm">
                  Welcome back,
                </div>
                <div className="text-star-white font-orbitron font-bold">
                  {user?.name}
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="cosmic-button-outline px-4 py-2 text-sm"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content relative z-10 pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Assets Under Orbit"
              value={`$${totalAssets.toLocaleString()}`}
              subtitle="Portfolio value"
            />
            <StatCard
              title="Gravitational Yield"
              value={`${yieldRate}% APY`}
              subtitle="Annual return"
            />
            <StatCard
              title="Active Positions"
              value={activePositions.toLocaleString()}
              subtitle="Open trades"
            />
            <StatCard
              title="Risk Index"
              value={riskIndex}
              subtitle="Low volatility"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Portfolio Trajectory - 2 columns */}
            <div className="lg:col-span-2">
              <TrajectoryChart />
            </div>

            {/* Live Ticker - 1 column */}
            <div>
              <LiveTicker />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Allocation Donut */}
            <div>
              <AllocationDonut />
            </div>

            {/* Transaction History */}
            <div className="glass-card p-6">
              <h3 className="font-orbitron text-xl font-bold text-star-white mb-6">
                Transaction History
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-void-black/30 border border-star-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          tx.type === 'buy' ? 'bg-gain-green' : 'bg-loss-red'
                        }`} />
                        <div>
                          <div className="text-star-white font-orbitron font-bold text-sm">
                            {tx.type.toUpperCase()} {tx.symbol}
                          </div>
                          <div className="text-star-white/60 font-syne text-xs">
                            {formatDate(tx.createdAt)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-star-white font-orbitron font-bold text-sm">
                          {tx.quantity} @ ${tx.price}
                        </div>
                        <div className="text-star-white/80 font-syne text-xs">
                          ${tx.total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-star-white/60 font-syne">
                      No transactions yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
