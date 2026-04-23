import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isLanding = location.pathname === '/'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-star-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nebula-purple via-aurora-cyan to-cosmic-pink animate-spin"></div>
            <span className="font-orbitron text-xl font-bold gradient-text">VORTEX</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <a href="/overview" className="text-star-white/80 hover:text-star-white font-syne transition-colors">
                  Overview
                </a>
                <a href="/dashboard" className="text-star-white/80 hover:text-star-white font-syne transition-colors">
                  Dashboard
                </a>
                <a href="/markets" className="text-star-white/80 hover:text-star-white font-syne transition-colors">
                  Markets
                </a>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-star-white/80 font-syne">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="cosmic-button-outline px-4 py-2 text-sm"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="cosmic-button-outline px-4 py-2 text-sm"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="cosmic-button px-4 py-2 text-sm"
                >
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
