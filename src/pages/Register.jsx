import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import CosmosBackground from '../canvas/CosmosBackground'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const result = await register(formData.name, formData.email, formData.password)
      
      if (result.success) {
        navigate('/dashboard')
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
    // Animate the register card
    gsap.fromTo('.register-card',
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    return () => {
      gsap.killTweensOf('.register-card')
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-void-black flex items-center justify-center px-4">
      <CosmosBackground />
      
      <div className="register-card glass-card max-w-md w-full p-8 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-nebula-purple via-aurora-cyan to-cosmic-pink animate-spin"></div>
          <span className="font-orbitron text-2xl font-bold gradient-text ml-3">VORTEX</span>
        </div>

        {/* Title */}
        <h1 className="font-orbitron text-3xl font-bold text-center text-star-white mb-8">
          CREATE YOUR ORBIT
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
              COMMANDER NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="cosmic-input w-full"
              placeholder="John Doe"
            />
          </div>

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

          <div>
            <label className="block text-star-white/80 font-syne text-sm mb-2">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {loading ? 'INITIALIZING ORBIT...' : 'ESTABLISH CONNECTION'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-star-white/60 font-syne text-sm">
            Already have an orbit?{' '}
            <Link to="/login" className="text-aurora-cyan hover:text-nebula-purple transition-colors">
              RETURN TO VORTEX
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
