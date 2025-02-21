import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../shared/supabase'
import toast from 'react-hot-toast'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ password, email }) {
        // console.log(password, email)
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        if (error) {
          console.error(error)
          toast.error('Invalid email or password !')
        }
        // console.log(data)
        return { data }
      },
    }),
    getUserRole: builder.mutation({
      async queryFn(access_token) {
        const { data, error } = await supabase.auth.getUser(access_token)
        if (error) {
          console.error(error)
          throw new Error('geting user faild')
        }
        const userId = data.user.id

        const { data: userRoleData, error: userRolesError } = await supabase
          .from('user_roles')
          .select('* , role_id(*)')
          .eq('user_id', userId)
        if (userRoleData?.length === 0) throw new Error("user or role doesn't exist ")

        const userRole = userRoleData[0]?.role_id.role_name
        data.userRole = userRole
        return { data }
      },
    }),
    createNewCustomer: builder.mutation({
      async queryFn({ email, password, fullName, phone }) {
        let { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            },
          },
        })

        if (error) {
          console.error(error)
          // return
        }

        return { data }
      },
    }),
  }),
})

export const { useLoginMutation, useGetUserRoleMutation, useCreateNewCustomerMutation } = authApi

export default authApi
