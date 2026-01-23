import { useRef } from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)
  const timeoutRef = useRef(null)

  const setNotification = (message) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    dispatch({ type: 'SET_NOTIFICATION', payload: message })

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
      timeoutRef.current = null
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
