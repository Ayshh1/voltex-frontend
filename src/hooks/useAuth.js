import { useState, useEffect } from 'react'
import axios from 'axios'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Set base URL for axios
  const apiBaseUrl = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('vortex-token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verify token with backend
      axios.get(`${apiBaseUrl}/api/auth/me`)
        .then(response => {
          setUser(response.data.user)
        })
        .catch(() => {
          // Token invalid, remove it
          localStorage.removeItem('vortex-token')
          delete axios.defaults.headers.common['Authorization']
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      console.log('Frontend login attempt:', email)
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, { email, password }, {
        timeout: 10000 // 10 second timeout
      })
      console.log('Login response received:', response.data)
      const { token, user } = response.data
      
      localStorage.setItem('vortex-token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      console.log('Login successful, user set:', user)
      return { success: true }
    } catch (error) {
      console.error('Frontend login error:', error)
      console.error('Error response:', error.response)
      console.error('Error status:', error.response?.status)
      console.error('Error data:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/register`, { name, email, password })
      const { token, user } = response.data
      
      localStorage.setItem('vortex-token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('vortex-token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    // Refresh page to clear any cached state
    window.location.href = '/'
  }

  return { user, loading, login, register, logout }
}
