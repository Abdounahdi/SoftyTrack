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
            '* , payment_method_id(*) , made_by(*) , reception_location_id(*) , receptionist_id(*) , training_id(*) , customer_id(*)'
          )

        if (error) return

        return { data }
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
    createIncome: builder.mutation({
      async queryFn(newIncome) {
        const {
          phone,
          email,
          customer_name,
          price,
          total_slices,
          paid_slices,
          training: training_id,
          payment_method: payment_method_id,
          location: reception_location_id,
          receptionist: receptionist_id,
          description,
        } = newIncome

        const customerDetails = {
          phone,
          email,
          full_name: customer_name,
        }

        const { data: createdCustomer, error: creationCustomerError } = await supabase
          .from('customers')
          .insert([customerDetails])
          .select()

        if (creationCustomerError) {
          console.error(creationCustomerError)
          console.log('creating customer failed')
        }

        const customerId = createdCustomer[0]?.id

        console.log(createdCustomer)

        const {
          data: { user },
        } = await supabase.auth.getUser()

        const incomeDetails = {
          date_created: new Date(newIncome.date_created.$d)
            .toISOString()
            .replace('.000Z', '+00:00'),
          price: Number(price),
          total_slices: Number(total_slices),
          paid_slices: Number(paid_slices),
          payment_method_id,
          training_id,
          reception_location_id,
          receptionist_id,
          customer_id: customerId,
          description,
          made_by: user?.id,
        }

        const { data, error } = await supabase
          .from('incomes')
          .insert([incomeDetails])
          .select()
        
          if (error){
            console.error(error)
            console.log("creating new income failed")
          }

        console.log(incomeDetails)
        return { data }
      },
    }),
  }),
})

export const {
  useGetIncomesQuery,
  useCreateIncomeMutation,
  useGetPaymentMethodsQuery,
  useGetLocationsQuery,
  useGetTrainingsQuery,
} = incomesApi

export default incomesApi
