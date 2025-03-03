import { useAppDispatch, useAppSelector } from '../../shared/store'
import {
  useGetExpenseByIdQuery,
  useGetExpensesCategoriesQuery,
  useGetExpensesQuery,
  useGetRangePriceExpenseQuery,
} from './supabaseApi/expensesApi'
import { getExpensesColumns } from './TableColumnsExpenses'
import { setPageSize, setCurrentPage, setSelectedRows, setFilterOptions } from './expensesUiSlice'
import { useGetAllUsersQuery } from '../../incomes/data/supabaseApi/usersApi'
import { useGetPaymentMethodsQuery } from '../../incomes/data/supabaseApi/incomesApi'
import { useParams } from 'react-router'
import dayjs from 'dayjs'
import { sharedsPersistedReducer } from '../../shared/store/persist/sharedPersist'
import { SharedSwitchValue } from '../../shared/store/slices/sharedSlice'

export default function expensesTableData() {
  const dispatch = useAppDispatch()
  const { currentPage, selectedRows, showColumnsOptions, showFilterOptions, filterOptions } =
    useAppSelector((state) => state.expensesUi)

  const { columnsExpenses: checkedListOfShownColumns, pageSizeExpenses: pageSize } = useAppSelector(
    (state) => state.shared
  )

  const { data: expenses, isFetching } = useGetExpensesQuery({
    currentPage,
    pageSize,
    filterOptions,
  })

  const { data: expensesPriceRange, isLoading: isLoadingPriceRange } = useGetRangePriceExpenseQuery(
    {}
  )

  const { data: categories, isLoading: isLoadingCategories } = useGetExpensesCategoriesQuery({})

  const minExpense = expensesPriceRange?.minExpense
  const maxExpense = expensesPriceRange?.maxExpense

  console.log(minExpense, maxExpense)

  const { expensesTableColumns } = getExpensesColumns()

  const totalData = expenses?.count

  const data = expenses?.expensesInfo.map((expense) => {
    // console.log(expense.created_at)
    // console.log( new Intl.DateTimeFormat('en-CA').format(new Date(expense.date_created)))
    // console.log(expense.date_created)
    return {
      dateCreated: expense.date_created.split("T")[0],
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
      dispatch(setSelectedRows(selectedRows))
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
      console.log(pageSize)
      dispatch(SharedSwitchValue({ key: 'pageSizeExpenses', value: pageSize }))
    }
  }

  const categoriesArr = categories?.map((el) => {
    return { value: el.id, label: el.category }
  })

  const filterFormInputs = [
    {
      columns: [
        {
          label: 'Categories',
          type: 'select',
          value: 'by_category',
          placeHolder: 'Enter Training ... ',
          selectOptions: categoriesArr,
          defaultValue: filterOptions.length !== 0 ? filterOptions.by_category : '',
          // error: null,
        },
        {
          label: 'Price Range',
          type: 'slider',
          value: 'by_price_range',
          sliderMax: maxExpense,
          sliderMin: minExpense,
          defaultValue: filterOptions.length !== 0 ? filterOptions.by_price_range : '',
          // error: null,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Date Range ',
          type: 'date-range',
          value: 'by_date_range',
          defaultValue: filterOptions.length !== 0 ? filterOptions.by_date_range : '',
          // error: null,
        },
      ],
    },
  ]

  return {
    isFetching: isFetching || isLoadingPriceRange || isLoadingCategories,
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
    showFilterOptions,
    filterFormInputs,
    maxSliderFilter: maxExpense,
    minSliderFilter: minExpense,
    setFilterOptions,
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
          error: errors?.payment_method_id?.message,
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
          error: errors?.category_id?.message,
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
          error: errors?.user_id?.message,
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

  const expenseFormUpdateOptions = [
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: errors?.price?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.price)[0],
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
          error: errors?.payment_method_id?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.payment_method_id.id)[0],
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
          defaultValue: expenseByIdInfo?.map((object) => object.category_id.id)[0],
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
          error: errors?.user_id?.message,
          defaultValue: expenseByIdInfo?.map((object) => object.user_id.id)[0],
        },
        {
          label: 'Date of income',
          type: 'date',
          value: 'date_created',
          placeHolder: '',
          error: errors?.date_created?.message,
          defaultValue: expenseByIdInfo?.map((object) => dayjs(object.date_created))[0],
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
          defaultValue: expenseByIdInfo?.map((object) => object.description)[0],
        },
      ],
    },
  ]

  const expenseFormOptions = update ? expenseFormUpdateOptions : expenseFormBlankOptions

  return { expenseFormOptions, isLoading, expenseByIdInfo, expenseId }
}
