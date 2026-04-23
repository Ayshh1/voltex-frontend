import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (eventHandlers = {}) => {
  const socketRef = useRef(null)
  const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

  useEffect(() => {
    // Connect to socket
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling']
    })

    socketRef.current = socket

    // Set up event handlers
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler)
    })

    // Connection handlers
    socket.on('connect', () => {
      console.log('Connected to socket server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })

    // Cleanup on unmount
    return () => {
      Object.keys(eventHandlers).forEach(event => {
        socket.off(event, eventHandlers[event])
      })
      socket.disconnect()
    }
  }, [socketUrl])

  // Emit function
  const emit = (event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data)
    }
  }

  return { socket: socketRef.current, emit }
}

export default useSocket
