import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../shared/supabase'

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn({ password, email }) {
        console.log(password, email)
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useLoginMutation } = authApi

export default authApi
