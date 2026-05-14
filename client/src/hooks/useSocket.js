import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

export default function useSocket(event) {
  const [data, setData] = useState(null)

  useEffect(() => {
    socket.on(event, setData)
    return () => socket.off(event, setData)
  }, [event])

  return data
}