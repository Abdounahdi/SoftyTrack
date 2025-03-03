import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const trainingsApi = createApi({
  reducerPath: 'trainingsApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['trainings'],
  endpoints: (builder) => ({
    getTrainings: builder.query({
      async queryFn(params) {
        const { currentPage, pageSize, searchQuery } = params
        let query = supabase.from('trainings').select('*', { count: 'exact' })

        const offset = (currentPage - 1) * pageSize

        query = query.range(offset, offset + pageSize - 1)

        query = query.ilike('training', `%${searchQuery}%`)

        const { data, error, count } = await query
        if (error) console.error(error)
        return { data: { data, count } }
      },
      providesTags: ['trainings'],
    }),
    deleteTraining: builder.mutation({
      async queryFn(id) {
        console.log('deleting : ', id)
        const { data, error } = await supabase.from('trainings').delete().eq('id', id).select()
        if (error) {
          console.error('deleting training error')
          console.error(error)
          return { error }
        }

        return { data }
      },
      invalidatesTags: ['trainings'],
    }),
    createTraining: builder.mutation({
      async queryFn(newTraining) {
        const { data, error } = await supabase
          .from('trainings')
          .insert([{ training: newTraining }])
          .select()

        if (error) {
          console.error(error)
          return
        }
        return data
      },
      invalidatesTags: ['trainings'],
    }),
    updateTrianing: builder.mutation({
      async queryFn(params) {
        const { newName, id } = params
        const { data, error } = await supabase
          .from('trainings')
          .update({ training: newName })
          .eq('id', id)
          .select()

        if (error) {
          console.log(error)
        }

        return { data }
      },
      invalidatesTags: ['trainings'],
    }),
  }),
})

export const {
  useGetTrainingsQuery,
  useDeleteTrainingMutation,
  useCreateTrainingMutation,
  useUpdateTrianingMutation,
} = trainingsApi

export default trainingsApi
