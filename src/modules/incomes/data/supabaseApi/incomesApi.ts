import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const incomesApi = createApi({
  reducerPath: 'incomesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['incomes'],
  endpoints: (builder) => ({
    getIncomes: builder.query({
      async queryFn() {
        const { data, error } = await supabase
          .from('incomes')
          .select(
            '* ,customer_id(*) , payment_method_id(*) , made_by(*) , reception_location_id(*) , receptionist_id(*) , training_id(*)'
          )

        if (error) return

        return { data }
      },
    }),
    createIncomes: builder.query({
      async queryFn(newIncome) {
        const { data, error } = await supabase.from('incomes').insert([newIncome]).select()
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useGetIncomesQuery, useCreateIncomesQuery } = incomesApi

export default incomesApi
