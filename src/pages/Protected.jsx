import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'

const Protected = ({ children }) => {
    const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    console.log(currentUser)
    return <Navigate to='/login' replace />
  }

  return (
    children
  )
}

export default Protected