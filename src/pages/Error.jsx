import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
        <h1>
            User not found
        </h1>
        <Link to='/'>Go back home</Link>
    </div>
  )
}

export default Error