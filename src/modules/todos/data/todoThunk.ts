/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../shared/utils/axios'
import { IQuery, ITodo } from './todoTypes'

export const getAllTodos = createAsyncThunk(
  'getAllTodos',
  async (query: IQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/todos`, {
        params: query,
      })

      if (response.status === 200) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const getTodo = createAsyncThunk('getTodo', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/todos/${id}`)

    if (response.status === 200) {
      return response.data
    }

    throw new Error(response.statusText)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const createTodo = createAsyncThunk(
  'createTodo',
  async (data: ITodo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/todos`, data)

      if (response.status === 201) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateTodo = createAsyncThunk(
  'updateTodo',
  async ({ id, updatedData }: { id: string; updatedData: ITodo }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/api/todos/${id}`, updatedData)

      if (response.status === 200) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'deleteTodo',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/todos/${id}`)

      if (response.status === 200) {
        return response.data
      }

      throw new Error(response.statusText)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
