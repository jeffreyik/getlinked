import React, { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero-img.png'

const Home = () => {
  const { username, setUsername } = useContext(AppContext)
  const { users } = useContext(AppContext)
  const navigate = useNavigate()
  const usernameRef = useRef()

  const checkUsername = e => {
    e.preventDefault()
    if (users.length > 0) {
      users.map(user => {
        if (user?.username === usernameRef.current.value) {
          console.log('name has been used')
          return
        } else {
          setUsername(usernameRef.current.value)
          navigate('/signup')
      
          usernameRef.current.value = ''
          console.log('hey')
        }
      }) 
    } else {
      setUsername(usernameRef.current.value)
      navigate('/signup')
  
      usernameRef.current.value = ''
      console.log('yo')
    }
  }

  return (
    <div className='home'>
      <div className="container">
        <nav>
          <div className="logo">getlnked</div>
          <div className="navLinks">
            <Link to='/login' className='btn loginBtn'>Log in</Link>
            <Link to='/signup' className='btn signupBtn'>Sign up</Link>
          </div>
        </nav>
        <div className="hero">
          <div className="hero__content">
            <h1>Build a simple webpage to <span>showcase</span> your best work</h1>
            <p>Get started today and make a great first impression with a stunning link in bio page that stands out from the crowd.</p>
            <form className='getUsername'>
              <div className="getUsername__input">
                <p>getLinked.me/</p>
                <input ref={usernameRef} type="text" placeholder='username' />
              </div>
              <button onClick={checkUsername}>Claim username</button>
            </form>
          </div>
          <img src={heroImg} className="hero__img" />
        </div>
      </div>
    </div>
  )
}

export default Home