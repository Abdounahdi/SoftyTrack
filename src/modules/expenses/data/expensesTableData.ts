import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/store'
import {
  useGetExpenseByIdQuery,
  useGetExpensesCategoriesQuery,
  useGetExpensesQuery,
} from './supabaseApi/expensesApi'
import { expensesTableColumns } from './TableColumnsExpenses'
import { setPageSize, setCurrentPage } from './expensesUiSlice'
import { useGetAllUsersQuery } from '../../incomes/data/supabaseApi/usersApi'
import { useGetPaymentMethodsQuery } from '../../incomes/data/supabaseApi/incomesApi'
import { useParams } from 'react-router'
import dayjs from 'dayjs'

export default function expensesTableData() {
  const dispatch = useAppDispatch()
  const { showColumnsOptions, checkedListOfShownColumns } = useAppSelector(
    (state) => state.expensesUi
  )
  const { currentPage, pageSize } = useAppSelector((state) => state.expensesUi)

  const { data: expenses, isFetching } = useGetExpensesQuery({
    currentPage,
    pageSize,
  })

  const [selectedRows, setSelectedRows] = useState([])

  const totalData = expenses?.count

  const data = expenses?.expensesInfo.map((expense) => {
    return {
      dateCreated: new Intl.DateTimeFormat('en-CA').format(new Date(expense.date_created)),
      employeeName: expense.user_id.full_name,
      price: expense.price,
      description: expense.description,
      category: expense.category_id.category,
      paymentMethod: expense.payment_method_id.payment_method,
      key: expense.id,
    }
  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  const checkedList =
    checkedListOfShownColumns.length === 0
      ? expensesTableColumns.map((item) => item.key)
      : checkedListOfShownColumns

  const newColumns = expensesTableColumns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }))

  const handlePagination = (currentPage, pageSize) => {
    dispatch(setCurrentPage(currentPage))
    if (pageSize) {
      dispatch(setPageSize(pageSize))
    }
  }

  return {
    isFetching,
    data,
    pageSize,
    currentPage,
    showColumnsOptions,
    checkedListOfShownColumns,
    selectedRows,
    totalData,
    rowSelection,
    checkedList,
    handlePagination,
    newColumns,
  }
}

export function getExpensesFromOptions(errors, update) {
  const { id: expenseId } = useParams()
  const { data: expenseByIdInfo, isLoading: isLoadingExpenseById } =
    useGetExpenseByIdQuery(expenseId)
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery({})
  const { data: categories, isLoading: isLoadingCategories } = useGetExpensesCategoriesQuery({})
  const { data: paymentMethodOptions, isLoading: isLoadingPaymentMethods } =
    useGetPaymentMethodsQuery({})

  const isLoading =
    isLoadingCategories || isLoadingPaymentMethods || isLoadingUsers || isLoadingExpenseById

  const expenseFormBlankOptions = [
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: errors?.price?.message,
          defaultValue: null,
        },
        {
          label: 'Payment Method',
          type: 'select',
          selectOptions: paymentMethodOptions?.map((paymentMethod) => {
            {
              return { value: paymentMethod.id, label: paymentMethod.payment_method }
            }
          }),
          name: 'payment_method_id',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.payment_method?.message,
          defaultValue: null,
        },
        {
          label: 'Category',
          type: 'select',
          selectOptions: categories?.map((category) => {
            {
              return { value: category.id, label: category.category }
            }
          }),
          value: 'category_id',
          createOption: true,
          placeHolder: 'Choose Category ... ',
          error: errors?.payment_method?.message,
          defaultValue: null,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Employee Name',
          type: 'select',
          selectOptions: users?.map((user) => {
            return { label: user.full_name, value: user.id }
          }),
          name: 'user_id',
          createOption: false,
          placeHolder: ' ',
          error: errors?.employeeName?.message,
          defaultValue: null,
        },
        {
          label: 'Date of income',
          type: 'date',
          value: 'date_created',
          placeHolder: '',
          error: errors?.date_created?.message,
          defaultValue: null,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Description',
          type: 'textarea',
          placeHolder: 'any details you want to add ... ',
          name: 'description',
          error: errors?.description?.message,
          defaultValue: null,
        },
      ],
    },
  ]

  console.log(expenseByIdInfo)

  const expenseFormUpdateOptions = [
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: errors?.price?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.price),
        },
        {
          label: 'Payment Method',
          type: 'select',
          selectOptions: paymentMethodOptions?.map((paymentMethod) => {
            {
              return { value: paymentMethod.id, label: paymentMethod.payment_method }
            }
          }),
          name: 'payment_method_id',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.payment_method?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.payment_method_id.id),
        },
        {
          label: 'Category',
          type: 'select',
          selectOptions: categories?.map((category) => {
            {
              return { value: category.id, label: category.category }
            }
          }),
          value: 'category_id',
          createOption: true,
          placeHolder: 'Choose Category ... ',
          error: errors?.category_id?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.category_id.id),
        },
      ],
    },
    {
      columns: [
        {
          label: 'Employee Name',
          type: 'select',
          selectOptions: users?.map((user) => {
            return { label: user.full_name, value: user.id }
          }),
          name: 'user_id',
          createOption: false,
          placeHolder: ' ',
          error: errors?.employeeName?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.user_id.full_name),
        },
        {
          label: 'Date of income',
          type: 'date',
          value: 'date_created',
          placeHolder: '',
          error: errors?.date_created?.message,
          defaultValue: expenseByIdInfo?.map((object) => dayjs(object.date_created)),
        },
      ],
    },
    {
      columns: [
        {
          label: 'Description',
          type: 'textarea',
          placeHolder: 'any details you want to add ... ',
          name: 'description',
          error: errors?.description?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.description),
        },
      ],
    },
  ]

  const expenseFormOptions = update ? expenseFormUpdateOptions : expenseFormBlankOptions

  return { expenseFormOptions, isLoading, expenseByIdInfo }
}
