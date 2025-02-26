import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['incomes'],
  endpoints: (builder) => ({
    getIncomesByTime: builder.query({
      async queryFn(params) {
        // let query = supabase
        //   .from('incomes')
        //   .select(
        //     '* , payment_method_id(*) , made_by(*) , reception_location_id(*) , receptionist_id(*) , training_id(*) , customer_id(*)',
        //     { count: 'exact' }
        //   )

        // const { data: incomesInfo, error, count } = await query

        // if (error) return

        // return { data: { incomesInfo, count } }

        console.log(params)
        const data = {}
        return {data}
      },
      providesTags: ['incomes'],
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
