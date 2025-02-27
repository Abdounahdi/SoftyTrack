import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'
import { useParams } from 'react-router'

const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['expenses', 'expense'],
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
      },
      providesTags: ['expenses'],
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
      },
      invalidatesTags: ['expenses'],
    }),
    deleteExpense: builder.mutation({
      async queryFn(id) {
        const { data, error } = await supabase.from('expenses').delete().eq('id', id)
        if (error) {
          console.log(error)
          return
        }
        console.log('deleting ')

        return { data }
      },
      invalidatesTags: ['expenses'],
    }),
    getExpenseById: builder.query({
      async queryFn(id) {
        const { data, error } = await supabase
          .from('expenses')
          .select('* , category_id(*) , user_id(*) , payment_method_id(*)')
          .eq('id', id)

        if (error) {
          console.error(error)
          return
        }

        console.log(data)

        return { data }
      },
      providesTags(result, error, id) {
        return [{ type: 'expense', id }]
      },
    }),
    updateExpense: builder.mutation({
      async queryFn(params) {
        const { data, error } = await supabase
          .from('expenses')
          .update(params.updatedExpense)
          .eq('id', params.id)
          .select()

        if (error) {
          console.error(error)
          return
        }
        return { data }
      },
      invalidatesTags(result, error, params) {
        return [{ type: 'expense', id: params.id }, 'expenses']
      },
    }),
    getExpensesByTime: builder.query({
      async queryFn(params) {
        let query = supabase
          .from('expenses')
          .select('* , category_id(*) , user_id(*) , payment_method_id(*)', { count: 'exact' })
        const { minus } = params
        const pastDate = new Date(new Date().setDate(new Date().getDate() - minus))
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '+00')
        const { data, error, count } = await query
          .gte('date_created', pastDate)
          .order('date_created', { ascending: false })

        if (error) {
          console.error(error)
        }

        return { data: { data, count } }
      },
      providesTags: ['expenses'],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useGetExpensesCategoriesQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
  useGetExpensesByTimeQuery,
} = expensesApi

export default expensesApi
