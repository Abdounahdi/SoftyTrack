import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'
import dayjs from 'dayjs'
import { formatCustomDate } from '../../../shared/utils/helpers'

const incomesApi = createApi({
  reducerPath: 'incomesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['incomes', 'income'],
  endpoints: (builder) => ({
    getIncomes: builder.query({
      async queryFn(params) {
        let query = supabase
          .from('incomes')
          .select(
            '* , payment_method_id(*) , made_by(*) , reception_location_id(*) , receptionist_id(*) , training_id(*) , customer_id(*)',
            { count: 'exact' }
          )
        const { currentPage, pageSize, filterOptions } = params

        const { by_training, by_date_range, by_price_range } = filterOptions

        if (by_training) {
          query.eq('training_id', by_training)
        }

        if (by_date_range) {
          const dates = JSON.stringify(by_date_range)
          const startDate = formatCustomDate(new Date(JSON.parse(dates)[0]))
          const endDate = formatCustomDate(new Date(JSON.parse(dates)[1]))
          query.gte('date_created', startDate).lte('date_created', endDate)
        }

        if (by_price_range) {
          query.gte('price', by_price_range.min).lte('price', by_price_range.max)
        }

        // query=  query.ilike("")

        const offset = (currentPage - 1) * pageSize

        query = query.range(offset, offset + pageSize - 1)

        const { data: incomesInfo, error, count } = await query

        if (error) return

        return { data: { incomesInfo, count } }
      },
      providesTags: ['incomes'],
    }),
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

        const { data, error } = await query

        if (error) return

        return { data }
      },
      providesTags: ['incomes'],
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
          full_name,
          price,
          total_slices,
          paid_slices,
          training_id,
          payment_method: payment_method_id,
          location: reception_location_id,
          receptionist: receptionist_id,
          description,
        } = newIncome

        const customerDetails = {
          phone,
          email,
          full_name,
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

        const { data, error } = await supabase.from('incomes').insert([incomeDetails]).select()

        if (error) {
          console.error(error)
          console.log('creating new income failed')
        }

        console.log(incomeDetails)
        return { data }
      },
      invalidatesTags: ['incomes'],
    }),
    deleteIncome: builder.mutation({
      async queryFn(id) {
        const { data, error } = await supabase.from('incomes').delete().eq('id', id)

        if (error) return

        return { data }
      },
      invalidatesTags: ['incomes'],
    }),
    getIncomeById: builder.query({
      async queryFn(id) {
        const { data, error } = await supabase
          .from('incomes')
          .select(
            '* ,payment_method_id(*) , made_by(*) , reception_location_id(*) , receptionist_id(*) , training_id(*) , customer_id(*) '
          )
          .eq('id', id)
        if (error) {
          console.error(error)
          return
        }
        return { data }
      },
      providesTags(result, error, id) {
        return [{ type: 'income', id }]
      },
    }),
    updateIncome: builder.mutation({
      async queryFn(params) {
        const { id, updatedIncome, customerId } = params
        const {
          phone,
          email,
          full_name,
          price,
          total_slices,
          paid_slices,
          training_id,
          payment_method: payment_method_id,
          location: reception_location_id,
          receptionist: receptionist_id,
          description,
        } = updatedIncome

        const customerDetails = {
          phone,
          email,
          full_name,
        }

        const { data: customerUpdated, error: customerUpdateError } = await supabase
          .from('customers')
          .update(customerDetails)
          .eq('id', customerId)

        if (customerUpdateError) {
          console.error("customer couldn't be updated ")
          console.error(customerUpdateError)
          return
        }

        const incomeDetails = {
          date_created: new Date(updatedIncome.date_created.$d)
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
        }

        const { data, error } = await supabase
          .from('incomes')
          .update(incomeDetails)
          .eq('id', id)
          .select()

        if (error) {
          console.error("couldn't update income ")
          console.error(error)
        }

        return { data }
      },
      invalidatesTags(result, error, params) {
        return [{ type: 'income', id: params.id }, 'incomes']
      },
    }),
    getRangePriceIncome: builder.query({
      async queryFn() {
        const { data: incomes, error } = await supabase.from('incomes').select('*')

        if (error) console.error(error)
        const maxIncome = incomes?.reduce((a, b) => Math.max(Number(a), Number(b.price)), -Infinity)
        const minIncome = incomes?.reduce((a, b) => Math.min(a, b.price), Infinity)
        return { data: { minIncome, maxIncome } }
      },
      providesTags: ['incomes'],
    }),
  }),
})

export const {
  useGetIncomesQuery,
  useCreateIncomeMutation,
  useGetPaymentMethodsQuery,
  useGetLocationsQuery,
  useGetTrainingsQuery,
  useDeleteIncomeMutation,
  useGetIncomeByIdQuery,
  useUpdateIncomeMutation,
  useGetIncomesByTimeQuery,
  useGetRangePriceIncomeQuery,
} = incomesApi

export default incomesApi
