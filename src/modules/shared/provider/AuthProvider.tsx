import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { initialise } from '../../auth/data/authSlice'
import { isValidToken } from '../utils/isValidToken'
import LazyLoad from '../components/LazyLoad/LazyLoad'
import useIsMounted from '../hook/useIsMountedRef'
import { clearTokens, getToken, getTokens } from '../utils/token'
import { RootState } from '../store'
import supabase from '../supabase'
import { useGetUserRoleQuery } from '../../auth/data/authApi'

// import { useDispatch, useSelector } from "react-redux"
// import useIsMounted from "../hook/useIsMountedRef"

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch()
  const isMounted = useIsMounted()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    async function fetchUser() {
      const access_token = getToken()

      if (!access_token) return
      setIsLoading(true)
      try {
        const data = await supabase.auth.getUser(access_token)

        if (data.error) {
          return dispatch(initialise({ isAuthenticated: false, user: null }))
        }

        const { data: userRole, error: userRolesError } = await supabase
          .from('user_roles')
          .select('* , role_id(*)')
          .eq('user_id', data.data.user?.id)

        if (userRolesError) {
          return dispatch(initialise({ isAuthenticated: false, user: null }))
        }

        const role = userRole[0]?.role_id.role_name

        console.log(role)
        dispatch(initialise({ isAuthenticated: true, user: data?.data?.user, role }))
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (isLoading) {
    return <LazyLoad />
  }

  return <>{children}</>
}

export default AuthProvider
