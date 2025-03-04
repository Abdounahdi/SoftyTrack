// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useAppDispatch } from '../../../shared/store'
import { useNavigate } from 'react-router-dom'
import { useGetUserRoleMutation, useLoginMutation } from '../../data/authApi'
import Logo from '../../../shared/components/Logo/Logo'
import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'
import { useForm } from 'react-hook-form'
import { Divider } from 'antd'
import googleIcon from '../../../shared/assets/icons/googleIcon.svg'
import githubIcon from '../../../shared/assets/icons/github.svg'
import { initialise } from '../../data/authSlice'
// import { useCreateNewCustomerMutation } from '../../../auth/data/authApi'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const [getUserRole, { isLoading: isLoadingRole, error: errorRole }] = useGetUserRoleMutation()
  // const [submitting, setSubmitting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const loginFormInputs = [
    {
      columns: [
        {
          label: 'Email ',
          type: 'email',
          value: 'email',
          placeHolder: 'user@user.com',
          error: errors?.email?.message,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Password ',
          type: 'password',
          value: 'password',
          placeHolder: '**********',
          error: errors?.password?.message,
        },
      ],
    },
  ]

  async function onSuccess(loginInfo) {
    const { data } = await login(loginInfo)
    if (!data?.user) return

    const {
      data: { userRole },
    } = await getUserRole(data?.session?.access_token)
    if (!userRole) return
    // console.log(userRole)

    dispatch(initialise({ isAuthenticated: true, user: data.user, role: userRole }))
  }

  function onError(err) {
    console.error(err)
    console.log('hi')
  }

  // const [createNewCustomer] = useCreateNewCustomerMutation({})

  function handleCreateUser() {
    const { data } = createNewCustomer({
      password: '123456789',
      email: 'username@user.com',
      phone: '98452635',
      fullName: 'user username',
      role: 'customer',
    })
  }

  return (
    <div className="login_feature">
      <form className="login_feature_container" onSubmit={handleSubmit(onSuccess, onError)}>
        <Logo isOpen={true} className="logo_login_feature" />
        <div className="login_feature_container_inputs">
          <FormGenerator options={loginFormInputs} control={control} register={register} />
        </div>

        <button type="submit" className="login_feature_container_btn" disabled={isLoading}>
          {isLoading ? 'Loggin in ... ' : 'Login'}
        </button>

        <Divider variant="dashed" className="divider_style">
          OR
        </Divider>
        <div className="login_other_options_box">
          <p className="login_by_other_options_text">
            Join us with your favorite social media account :
          </p>

          <div className="media_box">
            <div className="media_login_column_btns">
              <button
                className="media_login_button google_login_btn"
                onClick={(e) => e.preventDefault()}
              >
                <img src={googleIcon} />
              </button>
              <p className="google_login_text">Google</p>
            </div>
            <div className="media_login_column_btns">
              <button
                className="media_login_button github_login_btn"
                onClick={(e) => e.preventDefault()}
              >
                <img src={githubIcon} />
              </button>
              <p className="github_login_text">Github</p>
            </div>
          </div>
        </div>
      </form>
      {/* <button onClick={handleCreateUser}> create user</button> */}
    </div>
  )
}

export default Login
