import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['dashboardIncomes'],
  endpoints: (builder) => ({
    getIncomesByTime: builder.query({
      async queryFn(params) {
        const { minus } = params

        const pastDate = new Date(new Date().setDate(new Date().getDate() - minus))
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '+00')

        let query = supabase
          .from('incomes')
          .select(
            '* , payment_method_id(*) , made_by(*) , reception_location_id(*) , receptionist_id(*) , training_id(*) , customer_id(*)',
            { count: 'exact' }
          )
          .gte('date_created', pastDate)
          .order('date_created', { ascending: false })

        const { data, error, count } = await query

        if (error) return

        return { data }
      },
    }),
    getTrainings: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('trainings').select('*')
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useGetIncomesByTimeQuery, useGetTrainingsQuery } = dashboardApi

export default dashboardApi
