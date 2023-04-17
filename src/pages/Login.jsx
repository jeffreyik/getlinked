import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useRef } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/Authcontext'
import { Link, useNavigate } from 'react-router-dom'
import googleImg from "../assets/google.png"

const Login = () => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const emailRef = useRef()
  const passwordRef = useRef()

  const signIn = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    navigate('/admin')
    console.log(currentUser)
  }

  return (
    <div className="login">
      <div className="login__img"></div>
      <div className="login__container">
        <form className="login__form">
          <h2>Log In</h2>
          <input ref={emailRef} type="email" placeholder='email address' />
          <input ref={passwordRef} type="password" placeholder='password' />
          <button className='login__btn' onClick={signIn}>Log in</button>
          <button className='login__googleBtn'>
            <img src={googleImg} alt="" />
            Log in with google
          </button>
          <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login