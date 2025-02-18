import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const trainingsApi = createApi({
  reducerPath: 'trainingsApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['trainings'],
  endpoints: (builder) => ({
    getTrainings: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('trainings').select('*')
        if (error) console.error(error)
        return { data }
      },
    }),
    addTraining: builder.query({
      async queryFn(newIncome) {
        const { data, error } = await supabase.from('trainings').insert([newIncome]).select()
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useGetTrainingsQuery, useAddTrainingQuery } = trainingsApi

export default trainingsApi
