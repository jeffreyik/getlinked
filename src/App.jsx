import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import User from './pages/Page'
import Error from './pages/Error'
import Login from './pages/Login'
import Admin from './pages/Admin'
import SignUp from './pages/SignUp'
import AdminLayout from './pages/AdminLayout'
import Templates from './pages/Templates'
import { useContext, useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase'
import { AppContext } from './context/AppContext'
import Protected from './pages/Protected'
import { AuthContext } from './context/Authcontext'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const userRef = collection(db, "users")
  const { users, setUsers } = useContext(AppContext)

  useEffect(() => {
    const getUsers = async () => {
      setUsers({...users, loading: true})
      try {
        // const data = await getDocs(userRef)
        // const filteredData = data.docs.map((doc) => ({
        //   ...doc.data(),
        //   id: doc.id
        // }))
        // setUsers({...users, data: filteredData, loading: false})
        // console.log(console.log(users))

        const data = await onSnapshot(userRef, (snapshot) => {
          const filteredData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        setUsers({...users, data: filteredData, loading: false})
        console.log(console.log(users))
        })
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(currentUser)
    })
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:userID' element={<User />} />
      <Route path='/404' element={<Error />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={
        <Protected>
          <AdminLayout />
        </Protected>
      }>
        <Route index element={<Admin />} />
        <Route path='/admin/templates' element={<Templates />} />
      </Route>
    </Routes>
  )
}

export default App
