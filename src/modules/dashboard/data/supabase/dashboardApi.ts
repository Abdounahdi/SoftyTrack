import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['incomes'],
  endpoints: (builder) => ({
    getTrainings: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('trainings').select('*')
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useGetTrainingsQuery } = dashboardApi

export default dashboardApi
