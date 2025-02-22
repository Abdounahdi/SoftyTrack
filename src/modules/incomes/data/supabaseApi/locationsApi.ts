import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import supabase from '../../../shared/supabase'

const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['locations'],
  endpoints: (builder) => ({
    getLocations: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from('locations').select('*')
        if (error) console.error(error)
        return { data }
      },
    }),
  }),
})

export const { useGetLocationsQuery } = locationsApi

export default locationsApi
