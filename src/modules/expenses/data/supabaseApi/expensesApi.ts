import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['expenses'],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      async queryFn(params) {
        const { currentPage, pageSize } = params
        let query = supabase
          .from('expenses')
          .select('* , category_id(*) , user_id(*) , payment_method_id(*)', { count: 'exact' })

        const offset = (currentPage - 1) * pageSize

        query = query.range(offset, offset + pageSize - 1)

        const { data: expensesInfo, error, count } = await query

        if (error) return

        return { data: { expensesInfo, count } }
      },providesTags: ['expenses'], 
    }),
    getExpensesCategories: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('expenses_categories').select('*')
        if (error) return
        return { data }
      },
    }),
    createExpense: builder.mutation({
      async queryFn(params) {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        const newExpense = {
          ...params,
          date_created: new Date(params.date_created.$d).toISOString().replace('.000Z', '+00:00'),
          made_by_id: user?.id,
        }
        const { data, error } = await supabase.from('expenses').insert([newExpense]).select()

        if (error) return

        return { data }
      },invalidatesTags: ['expenses']
    }),
  }),
})

export const { useGetExpensesQuery, useGetExpensesCategoriesQuery, useCreateExpenseMutation } =
  expensesApi

export default expensesApi
