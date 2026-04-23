import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import CosmosBackground from '../canvas/CosmosBackground'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log('handleSubmit called!')
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        console.log('Login successful, navigating to dashboard...')
        window.location.href = '/dashboard'
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  React.useEffect(() => {
    // Animate the login card
    gsap.fromTo('.login-card',
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    return () => {
      gsap.killTweensOf('.login-card')
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-void-black flex items-center justify-center px-4">
      <CosmosBackground />
      
      <div className="login-card glass-card max-w-md w-full p-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-nebula-purple via-aurora-cyan to-cosmic-pink animate-spin"></div>
          <span className="font-orbitron text-2xl font-bold gradient-text ml-3">VORTEX</span>
        </div>

        {/* Title */}
        <h1 className="font-orbitron text-3xl font-bold text-center text-star-white mb-8">
          ENTER COMMAND CENTER
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-loss-red/20 border border-loss-red/50 rounded-lg p-3 mb-6">
            <p className="text-loss-red font-syne text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-star-white/80 font-syne text-sm mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="cosmic-input w-full"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-star-white/80 font-syne text-sm mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="cosmic-input w-full"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cosmic-button w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'INITIALIZING...' : 'ACCESS VORTEX'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-star-white/60 font-syne text-sm">
            No account?{' '}
            <Link to="/register" className="text-aurora-cyan hover:text-nebula-purple transition-colors">
              CREATE ORBIT
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
