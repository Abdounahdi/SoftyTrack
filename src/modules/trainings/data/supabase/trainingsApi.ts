import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const trainingsApi = createApi({
  reducerPath: 'trainingsApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['incomes'],
  endpoints: (builder) => ({
    getTrainings: builder.query({
      async queryFn(params) {
        const { currentPage, pageSize } = params
        let query = supabase.from('trainings').select('*', { count: 'exact' })

        const offset = (currentPage - 1) * pageSize

        query = query.range(offset, offset + pageSize - 1)

        const { data, error, count } = await query
        if (error) console.error(error)
        return { data: { data, count } }
      },
    }),
  }),
})

export const { useGetTrainingsQuery } = trainingsApi

export default trainingsApi
