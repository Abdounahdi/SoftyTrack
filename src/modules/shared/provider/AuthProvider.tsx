import { useEffect } from 'react'
import axiosInstance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { initialise } from '../../auth/data/authSlice'
import { isValidToken } from '../utils/isValidToken'
import LazyLoad from '../components/LazyLoad/LazyLoad'
import useIsMounted from '../hook/useIsMountedRef'
import { clearTokens, getTokens } from '../utils/token'
import { RootState } from '../store'
import supabase from '../supabase'

// import { useDispatch, useSelector } from "react-redux"
// import useIsMounted from "../hook/useIsMountedRef"

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch()
  const isMounted = useIsMounted()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    async function fetchUser() {
      const test = localStorage.getItem('sb-flnfpmjlnofgwbgfuiar-auth-token')
      const thabet = JSON.parse(test)

      const access_token = thabet?.access_token
      if (!access_token) return
      const user = await supabase.auth.getUser(access_token)

      if (!user) {
        return dispatch(initialise({ isAuthenticated: false, user: null }))
      }
      console.log("thanks")
      dispatch(initialise({ isAuthenticated: true, user }))
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // if (!isAuthenticated) {
  //   return <LazyLoad />
  // }

  return <>{children}</>
}

export default AuthProvider
