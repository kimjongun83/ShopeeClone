import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getRules } from 'src/utils/rule'
import { omit } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosUnProcessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Button from 'src/components/Button'
import path from 'src/constants/path.'
interface FormData {
  email: string
  password: string
}
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnProcessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Enter your email'
                rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Enter your password'
                rules={rules.password}
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex  flex w-full items-center items-center justify-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  disabled={loginAccountMutation.isLoading}
                  isLoading={loginAccountMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
