import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const trainingsApi = createApi({
  reducerPath: 'trainingsApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['trainings'],
  endpoints: (builder) => ({
    addTraining: builder.query({
      async queryFn(newIncome) {
        const { data, error } = await supabase.from('trainings').insert([newIncome]).select()
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useAddTrainingQuery } = trainingsApi

export default trainingsApi
