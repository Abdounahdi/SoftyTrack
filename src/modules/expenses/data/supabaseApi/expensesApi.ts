import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['customers'],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      async queryFn(params) {
        const { currentPage, pageSize } = params
        let query = supabase.from('expenses').select('* , category_id(*) , user_id(*) , payment_method_id(*)', { count: 'exact' })

        const offset = (currentPage - 1) * pageSize

        query = query.range(offset, offset + pageSize - 1)

        const { data: expensesInfo, error, count } = await query

        if (error) return

        return { data: { expensesInfo, count } }
      },
    }),
  }),
})

export const { useGetExpensesQuery } = expensesApi

export default expensesApi
