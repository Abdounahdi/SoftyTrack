import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      async queryFn() {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name')
          .neq('role', 'customer')
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useGetAllUsersQuery } = usersApi

export default usersApi
