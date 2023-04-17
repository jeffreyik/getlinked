import React, { useState, useRef, useEffect } from 'react'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import Preview from '../components/Admin/Preview'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { FieldValue, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'
import Loading from '../components/Loading/Loading'

const Admin = () => {
  const [file, setFile] = useState()
  const { users } = useContext(AppContext)
  const currentUser = users?.data?.find(user => user?.uid === auth?.currentUser?.uid)
  console.log(users?.data)

  const bioRef = useRef()
  const linkText = useRef()
  const linkUrl = useRef()

  useEffect(() => {
    bioRef.current.value = currentUser?.bio
  }, [])

  useEffect(() => {
    const uploadFile = async () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, name)
      console.log(name)

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = doc(db, 'users', currentUser?.id)
            updateDoc(docRef, {profileImg: downloadURL})
          });
        }
      );
    }
    file && uploadFile()
  }, [file])

  const logOut = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth)
    } catch(err) {
      console.log(err)
    }
  }

  const updateBio = async (e) => {
    e.preventDefault()
    const docRef = doc(db, 'users', currentUser?.id)
    await updateDoc(docRef, {
      bio: bioRef.current.value
    })
  }

  const updateLink = async (e) => {
    e.preventDefault()
    console.log('link updated!')
    const docRef = doc(db, 'users', currentUser?.id)
    const newLink = { text: linkText.current.value, url: linkUrl.current.value }
    await updateDoc(docRef, {
      links: arrayUnion(newLink)
    })

    // await setDoc(docRef, {
    //   links: [{ text: "git", url: "hey" }]
    // }, { merge: true })
  }

  return (
    <>
    {users?.loading ? <Loading/> : 
      <div className='admin'>
      <h1>{auth?.currentUser?.email}</h1>
      <button onClick={logOut}>Log out</button>
      <Preview currentUser={currentUser} />
      <form action="">
        <input ref={linkText} type="text" className='addLink__text' placeholder='Enter text' />
        <input ref={linkUrl} type="text" className='addLink__url' placeholder='Enter url' />
        <button onClick={updateLink} className="addLink">Add new link</button>
      </form>
      <form>
        <input ref={bioRef} type="text" placeholder='Enter bio' />
        <button onClick={updateBio}>Change Bio</button>
      </form>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>}
    </>
  )
}

export default Admin