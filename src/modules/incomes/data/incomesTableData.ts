// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useAppDispatch, useAppSelector } from '../../shared/store'
import {
  useGetIncomeByIdQuery,
  useGetIncomesQuery,
  useGetLocationsQuery,
  useGetPaymentMethodsQuery,
  useGetRangePriceIncomeQuery,
  useGetTrainingsQuery,
} from './supabaseApi/incomesApi'
import { getIncomesColumns } from './IncomesTableColumns'
import { setCurrentPage, setFilterOptions, setPageSize, setSelectedRows } from './incomesUiSlice'
import { useGetAllUsersQuery } from './supabaseApi/usersApi'
import { useNavigate, useParams } from 'react-router'
import dayjs from 'dayjs'
import { SharedSwitchValue } from '../../shared/store/slices/sharedSlice'
import { useGetTrainingsQuery as useGetTrainingsQueryTrainingsApi } from '../../trainings/data/supabase/trainingsApi'

export default function incomesTableData() {
  const dispatch = useAppDispatch()

  const { columnsIncomes: checkedListOfShownColumns, pageSizeIncomes: pageSize } = useAppSelector(
    (state) => state.shared
  )

  const {
    currentPage,
    selectedRows,
    showColumnsOptions,
    showFilterOptions,
    filterOptions,
    searchQuery,
  } = useAppSelector((state) => state.incomesUi)

  const { data: incomes, isFetching } = useGetIncomesQuery({
    currentPage,
    pageSize,
    filterOptions,
    searchQuery,
  })

  const { data: trainings, isLoading: isLoadingTrainings } = useGetTrainingsQuery({})

  const { data: incomesPricesRange, isLoading } = useGetRangePriceIncomeQuery({})

  const maxIncome = incomesPricesRange?.maxIncome
  const minIncome = incomesPricesRange?.minIncome

  const { incomesTableColumns } = getIncomesColumns()

  const totalData = incomes?.count

  const data = incomes?.incomesInfo.map((income) => {
    return {
      dateCreated: new Intl.DateTimeFormat('en-CA').format(new Date(income.date_created)),
      customerName: income.customer_id.full_name,
      customerPhone: income.customer_id.phone,
      customerEmail: income.customer_id.email,
      paymentMethod: income.payment_method_id.payment_method,
      slicesTotalCount: income.total_slices,
      sliceCount: income.paid_slices,
      slicesPrecentage: ` ${income.total_slices}-${income.paid_slices} `,
      location: income.reception_location_id.location,
      description: income.description,
      trainingName: income.training_id.training,
      employeeName: income.made_by.full_name,
      price: income.price,
      key: income.id,
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
      ? incomesTableColumns.map((item) => item.key)
      : checkedListOfShownColumns

  const newColumns = incomesTableColumns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }))

  const handlePagination = (currentPage, pageSize) => {
    dispatch(setCurrentPage(currentPage))
    if (pageSize) {
      dispatch(SharedSwitchValue({ key: 'pageSizeIncomes', value: pageSize }))
    }
  }

  const trainingArr = trainings?.map((training) => {
    return { value: training.id, label: training.training }
  })

  const filterFormInputs = [
    {
      columns: [
        {
          label: 'Training',
          type: 'select',
          value: 'by_training',
          placeHolder: 'Enter Training ... ',
          selectOptions: trainingArr,
          defaultValue: filterOptions.length !== 0 ? filterOptions.by_training : '',
          // error: null,
        },
        {
          label: 'Price Range',
          type: 'slider',
          value: 'by_price_range',
          sliderMax: maxIncome,
          sliderMin: minIncome,
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
    isFetching: isFetching || isLoading || isLoadingTrainings,
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
    maxSliderFilter: maxIncome,
    minSliderFilter: minIncome,
    setFilterOptions,
  }
}

export function getIncomesFormData(errors, update) {
  //paramas:
  const { id: incomeId } = useParams()
  // api calls :
  // const { data: trainings, isLoading: isLoadingTrainings } = useGetTrainingsQuery({})
  const { data: trainingsData, isLoading: isLoadingTrainings } = useGetTrainingsQueryTrainingsApi(
    {}
  )
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery({})
  const { data: locations, isLoading: isLoadingLocations } = useGetLocationsQuery({})
  const { data: payment_methods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethodsQuery(
    {}
  )
  const { data: income, isLoading: isGettingIncomeInfo } = useGetIncomeByIdQuery(incomeId)
  //hooks
  const navigate = useNavigate()

  const isLoading =
    isLoadingTrainings ||
    isLoadingUsers ||
    isLoadingLocations ||
    isLoadingPaymentMethods ||
    isGettingIncomeInfo

  //preparing data

  // const { data: trainings } = trainingsData
  // console.log(trainingsData.data , trainings)

  const trainingsOptions = trainingsData?.data?.map((training) => {
    return { value: training.id, label: training.training }
  })

  const paymentMethods = payment_methods?.map((paymentMethod) => {
    return { value: paymentMethod.id, label: paymentMethod.payment_method }
  })

  const locationOptions = locations?.map((location) => {
    return { value: location.id, label: location.location }
  })
  const receptionistOptions = users?.map((user) => {
    return { value: user.id, label: user.full_name }
  })

  const incomeInfo = income?.at(0) || {}

  const customerId = incomeInfo?.customer_id?.id

  //data objects for generating forms
  const customerFormInputsBlank = [
    {
      columns: [
        {
          label: 'Full Name',
          type: 'text',
          value: 'full_name',
          placeHolder: 'customer full name ... ',
          error: errors?.full_name?.message,
        },
        {
          label: 'Phone Number',
          type: 'tel',
          value: 'phone',
          placeHolder: '** *** ***',
          error: errors?.phone?.message,
          rules: {
            maxLength: { value: 8, message: 'This Phone Number is not valid' },
            minLength: { value: 8, message: 'This Phone Number is not valid ' },
            validate: (value) => {
              const check = value.toString()
              return (
                check.startsWith('2') ||
                check.startsWith('5') ||
                check.startsWith('9') ||
                check.startsWith('7') ||
                check.startsWith('4') ||
                'This Phone Number is not valid '
              )
            },
          },
        },
        {
          label: 'Email',
          type: 'email',
          value: 'email',
          placeHolder: 'customer@example.com',
          error: errors?.email?.message,
        },
        {
          label: 'Training Chosen',
          type: 'select',
          selectOptions: trainingsOptions,
          name: 'training_id',
          value: 'training_id',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.training_id?.message,
          rules: { required: 'This field is required' },
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
          value: 'description',
          error: errors?.description?.message,
        },
      ],
    },
  ]

  const customerFormInputsUpdate = customerFormInputsBlank?.map((el) => {
    const columns = el.columns.map((column) => {
      if (column.value === 'training_id') {
        return { ...column, defaultValue: incomeInfo?.training_id?.id }
      } else if (column.value === 'description') {
        return { ...column, defaultValue: incomeInfo?.description }
      } else {
        return { ...column, defaultValue: incomeInfo?.customer_id?.[column.value] }
      }
    })
    return { columns }
  })

  const customerFormInputs = update ? customerFormInputsUpdate : customerFormInputsBlank

  const paymentFormInputsBlank = [
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: errors?.price?.message,
          rules: {
            min: { value: 1, message: 'Price should Be At least one !' },
          },
        },
        {
          label: 'Total Slices',
          type: 'number',
          value: 'total_slices',
          placeHolder: '',
          error: errors?.total_slices?.message,
          className: 'slices_box_width_small',
          rules: {
            min: { value: 1, message: 'Slices should Be At least one !' },
          },
        },
        {
          label: 'Paid Slices',
          type: 'rate',
          value: 'paid_slices',
          placeHolder: '',
          error: errors?.paid_slices?.message,
          className: 'slices_box_width_rate',
          // defaultValue: 4,
        },
        {
          label: 'Payment Method',
          type: 'select',
          selectOptions: paymentMethods,
          name: 'payment_method',
          value: 'payment_method',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.payment_method?.message,
          rules: { required: 'This field is required' },
        },
      ],
    },
    {
      columns: [
        {
          label: 'Reception Local',
          type: 'select',
          name: 'location',
          value: 'location',
          selectOptions: locationOptions,
          placeHolder: 'select location ... ',
          error: errors?.location?.message,
          rules: { required: 'This field is required' },
        },
        {
          label: 'Receptionist',
          type: 'select',
          selectOptions: receptionistOptions,
          name: 'receptionist',
          value: 'receptionist',
          createOption: false,
          placeHolder: ' ',
          error: errors?.receptionist?.message,
          rules: { required: 'This field is required' },
        },
        {
          label: 'Paid at ',
          type: 'date',
          value: 'date_created',
          placeHolder: '',
          error: errors?.date_created?.message,
          rules: { required: 'This field is required' },
        },
      ],
    },
  ]

  const paymentFormInputs = paymentFormInputsBlank?.map((el) => {
    const columns = el.columns.map((column) => {
      if (column.value === 'payment_method') {
        return { ...column, defaultValue: incomeInfo?.payment_method_id?.id }
      } else if (column.value === 'receptionist') {
        return { ...column, defaultValue: incomeInfo?.receptionist_id?.id }
      } else if (column.value === 'location') {
        return { ...column, defaultValue: incomeInfo?.reception_location_id?.id }
      } else if (column.value === 'date_created') {
        return { ...column, defaultValue: dayjs(incomeInfo?.date_created) }
      } else if (column.value === 'paid_slices') {
        console.log(incomeInfo)
        return {
          ...column,
          defaultValue: incomeInfo.paid_slices,
          defaultSlices: incomeInfo.total_slices,
        }
      } else {
        return { ...column, defaultValue: incomeInfo?.[column.value] }
      }
    })
    return { columns }
  })

  return { paymentFormInputs, customerFormInputs, isLoading, navigate, incomeId, customerId }
}
