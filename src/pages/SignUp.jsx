import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import { auth, googleProvider } from '../firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import googleImg from "../assets/google.png"

const SignUp = () => {
  const { username } = useContext(AppContext)
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const userRef = collection(db, "users")


  useEffect(() => {
    usernameRef.current.value = username
    console.log(currentUser)
  }, [])


  const signUp = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      try {
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        await addDoc(userRef, {
          uid: auth.currentUser.uid,
          username: usernameRef.current.value,
          email: emailRef.current.value
        })
        navigate('/admin')
      } catch (err) {
        console.log(err)
      }

    }
    else {
      console.log("Password doesn't match")
    }
  }

  const signUpWithGoogle = async (e) => {
    e.preventDefault()
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err)
    }
  }

  const logOut = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    // <form>
    //     <h2>Create yor account</h2>
    //     <button onClick={signInWithGoogle}>Sign in with google</button>
    //     <input ref={usernameRef} type="text" placeholder='username' />
    //     <input ref={emailRef} type="email" placeholder='email address' />
    //     <input ref={passwordRef} type="password" placeholder='password' />
    //     <input ref={confirmPasswordRef} type="password" placeholder='confirm password' />
    //     <button onClick={signIn}>sign up</button>
    //     <button onClick={logOut}>Log Out</button>
    // </form>
    <div className="login">
    <div className="login__img"></div>
    <div className="login__container">
      <form className="login__form">
        <h2>Create your account</h2>
        <div className='username__input'>
          <p>getLinked.me/</p>
          <input ref={usernameRef} type="text" placeholder='username' />
        </div>
        <input ref={emailRef} type="email" placeholder='email address' />
        <input ref={passwordRef} type="password" placeholder='password' />
        <input ref={confirmPasswordRef} type="password" placeholder='confirm password' />
        <button className='login__btn' onClick={signUp}>Sign up</button>
        <button className='login__googleBtn'>
          <img src={googleImg} alt="" />
          Sign up with google
        </button>
        <p>Already have an account? <Link to='/login'>Log in</Link></p>
      </form>
    </div>
  </div>
  )
}

export default SignUp