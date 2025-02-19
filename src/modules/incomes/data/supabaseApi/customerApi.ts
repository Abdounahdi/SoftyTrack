import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['customers'],
  endpoints: (builder) => ({
    createCustomer: builder.query({
      async queryFn(newCustomer) {
        const { data, error } = await supabase.from('customers').insert([newCustomer]).select()
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useCreateCustomerQuery } = customersApi

export default customersApi
