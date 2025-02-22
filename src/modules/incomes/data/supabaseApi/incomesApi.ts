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
    createIncome: builder.mutation({
      async queryFn(newIncome) {
        const data={}
        console.log(newIncome)
        return {data}
      },
    }),
    getPaymentMethods: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('payment_methods').select('*')
        if (error) console.error(error)
        return { data }
      },
    }),
    getLocations: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('locations').select('*')
        if (error) console.error(error)
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

export const { useGetIncomesQuery , useCreateIncomeMutation , useGetPaymentMethodsQuery , useGetLocationsQuery, useGetTrainingsQuery} = incomesApi

export default incomesApi
