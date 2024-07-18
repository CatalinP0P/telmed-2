import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import app from 'utils/firebase'
import adminService from 'services/adminService'
import medicService from 'services/medicService'
import userService from 'services/userService'

interface AuthContextProps {
  currentUser: firebase.User | null
  loading: boolean
  error: string | null
  signInWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => void
  isAdmin: boolean
  isMedic: boolean
  isBlocked: boolean
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: true,
  error: null,
  signInWithEmail: async () => {},
  signOut: () => {},
  isAdmin: false,
  isMedic: false,
  isBlocked: false,
})

const auth = app.auth()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMedic, setIsMedic] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      if (result.user) {
        window.location.href = '/'
      }
    })
    .catch((error) => {
      console.error(error)
    })

  const signInWithEmail = async (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = '/'
      })
      .catch((err: firebase.FirebaseError) => {
        setError(err.message.split(':')[1].split('.')[0])
      })
  }

  const signOut = async () => {
    await auth.signOut()
    window.location.reload()
  }

  const setUserStatus = async (currentUser: firebase.User) => {
    const authToken = (await currentUser.getIdToken()) as string
    const isAdmin = await adminService.isAdmin(authToken)
    const isMedic = await medicService.isMedic(authToken)

    if (currentUser == null) return
    const isBlocked = await userService.isBlocked(authToken)

    setIsAdmin(isAdmin)
    setIsMedic(isMedic)
    setIsBlocked(isBlocked)

    if (isBlocked) {
      alert('Contul tau a fost blocat!')
      await firebase.auth().signOut()
      window.location.reload()
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user: firebase.User | null) => {
      setCurrentUser(user)
      if (user) await setUserStatus(user)
      else setIsAdmin(false)

      if (loading) setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        signInWithEmail,
        signOut,
        isAdmin,
        isMedic,
        isBlocked,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
