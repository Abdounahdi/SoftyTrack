// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import supabase from '../../../shared/supabase'

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['categories'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      async queryFn(params) {
        const { currentPage, pageSize, searchQuery } = params
        let query = supabase.from('expenses_categories').select('*', { count: 'exact' })

        if (searchQuery) {
          query.ilike('category', `%${searchQuery}%`)
        }

        if (currentPage && pageSize) {
          const offset = (currentPage - 1) * pageSize

          query = query.range(offset, offset + pageSize - 1)
        }

        const { data, error, count } = await query
        if (error) console.error(error)
        return { data: { data, count } }
      },
      providesTags: ['categories'],
    }),
    deleteCategories: builder.mutation({
      async queryFn(id) {
        console.log('deleting : ', id)
        const { data, error } = await supabase
          .from('expenses_categories')
          .delete()
          .eq('id', id)
          .select()
        if (error) {
          console.error('deleting category error')
          console.error(error)
          return { error }
        }

        return { data }
      },
      invalidatesTags: ['categories'],
    }),
    createCategorie: builder.mutation({
      async queryFn(newCategory) {
        console.log(newCategory)
        const { data, error } = await supabase
          .from('expenses_categories')
          .insert([{ category: newCategory }])
          .select()

        if (error) {
          console.error(error)
        }
        return { data: { data, error } }
      },
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      async queryFn(params) {
        const { newName, id } = params
        const { data, error } = await supabase
          .from('expenses_categories')
          .update({ category: newName })
          .eq('id', id)
          .select()

        if (error) {
          console.log(error)
        }

        return { data }
      },
      invalidatesTags: ['categories'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useDeleteCategoriesMutation,
  useCreateCategorieMutation,
  useUpdateCategoryMutation,
} = categoriesApi

export default categoriesApi
