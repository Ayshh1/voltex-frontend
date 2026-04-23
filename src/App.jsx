import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DashboardTest from './pages/DashboardTest'
import Overview from './pages/Overview'
import Markets from './pages/Markets'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CosmicCursor from './components/CosmicCursor'
import { useAuth } from './hooks/useAuth'

gsap.registerPlugin(ScrollTrigger)

// Page transition wrapper
const PageTransition = ({ children }) => {
  const pageRef = useRef()
  const location = useLocation()

  useEffect(() => {
    // Reset ScrollTrigger on route change
    ScrollTrigger.refresh()

    // Page entrance animation
    gsap.fromTo(pageRef.current,
      { 
        opacity: 0, 
        scale: 0.95,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out'
      }
    )

    return () => {
      gsap.killTweensOf(pageRef.current)
    }
  }, [location.pathname])

  return (
    <div ref={pageRef} className="page-content">
      {children}
    </div>
  )
}

function App() {
  const { user, loading } = useAuth()

  console.log('App render - user:', user, 'loading:', loading)

  if (loading) {
    return (
      <div className="min-h-screen bg-void-black flex items-center justify-center">
        <div className="text-star-white font-orbitron text-2xl animate-pulse">
          INITIALIZING VORTEX...
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="relative min-h-screen bg-void-black overflow-x-hidden">
        <CosmicCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Landing />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          <Route path="/overview" element={
            <PageTransition>
              {user ? <Overview /> : <Navigate to="/login" />}
            </PageTransition>
          } />
          <Route path="/markets" element={
            <PageTransition>
              <Markets />
            </PageTransition>
          } />
          <Route path="/dashboard" element={
            <PageTransition>
              {user ? <DashboardTest /> : <Navigate to="/login" />}
            </PageTransition>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
