import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'

interface SignupFormInputs {
    FirstName: string;
    LastName: string;
    Email: string;
    MobileNo: number;
    Password: string;
    ConfirmPassword: string;
}
const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({ mode: 'onBlur' })

  const onSubmit = async (data: SignupFormInputs) => {
    sessionStorage.setItem('userLoggedIn', 'true')
    console.log(data)
    navigate('/')
  }

  const leftPanelContent = useMemo(() => (
    <div className="relative w-full hidden md:w-1/2 bg-[#1873f2] bg-cover bg-center text-white md:flex font-['Poppins']">
      <div className="flex flex-col justify-center md:h-[300px] lg:h-[300px] md:w-[400px] lg:w-[400px] md:ml-20 lg:ml-28 md:mt-20 lg:mt-36 border-l border-white border-opacity-50">
        <h1 className="font-['Poppins'] font-semibold text-3xl md:text-4xl lg:!leading-[3.5rem] tracking-wider">
                    Land the Job, That&apos;s &quot;Right for You&quot;
        </h1>
        <div className="flex items-center mt-14">
          <div className="border-t border-white border-opacity-50 w-44 my-1 self-start mt-3" />
          <div className="text-sm md:text-base font-['Poppins'] font-medium">
                        Discover Over 130,000+ Job Opportunities with Top Companies and Emerging Startups
          </div>
        </div>
      </div>
    </div>
  ), [])

  return (
    <Card className="h-full w-screen p-0 overflow-hidden font-[Poppins] rounded-none">
      <div className="flex h-full w-full flex-col md:flex-row">
        {leftPanelContent}
        <div className="h-full w-full md:w-1/2 flex flex-col justify-center items-center p-5 md:p-14 overflow-hidden">

          <h2 className="md:mt-6 text-2xl sm:text-3xl font-semibold font-['Poppins'] my-1 md:self-start">
                        Zuperr Sign Up
          </h2>
          <p className="text-md md:text-base font-medium font-['Poppins'] text-gray-500 mb-6 md:self-start">
                        To Zuperr
          </p>

          <p className="text-md md:text-base font-medium font-['Poppins'] text-gray-500 mb-6 flex items-center justify-center w-full">
            <span className="w-[20%] lg:w-[34%] border-t border-gray-500"></span>
            <span className="mx-4">Or Continue with</span>
            <span className="w-[20%] lg:w-[34%] border-t border-gray-500"></span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full max-h-[calc(100vh-50px)]">
            <div className="mb-4 w-full flex justify-evenly gap-3">
              <div className="flex flex-col w-full">
                <Input
                  className={`w-full ${errors.FirstName ? 'border-red-500' : ''}`}
                  type="text"
                  placeholder="First Name"
                  {...register('FirstName', { required: 'First Name is required' })}
                />
                {errors.FirstName && (
                  <p className="text-red-500 text-xs mt-2">{errors.FirstName.message}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <Input
                  className={`w-full ${errors.LastName ? 'border-red-500' : ''}`}
                  type="text"
                  placeholder="Last Name"
                  {...register('LastName', { required: 'Last Name is required' })}
                />
                {errors.LastName && (
                  <p className="text-red-500 text-xs mt-2">{errors.LastName.message}</p>
                )}
              </div>

            </div>

            <div className="mb-4 w-full">

              <Input
                className={`w-full ${errors.Email ? 'border-red-500' : ''}`}
                type="email"
                placeholder="Email"
                {...register('Email', { required: 'Email is required' })}
              />
              {errors.Email && (
                <p className="text-red-500 text-xs mt-2">{errors.Email.message}</p>
              )}
            </div>

            <div className="mb-4 w-full">

              <Input
                className={`w-full ${errors.MobileNo ? 'border-red-500' : ''}`}
                type="number"
                placeholder="Mobile No"
                {...register('MobileNo', { required: 'Mobile No is required' })}
              />
              {errors.MobileNo && (
                <p className="text-red-500 text-xs mt-2">{errors.MobileNo.message}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <Input
                className={`w-full ${errors.Password ? 'border-red-500' : ''}`}
                type="password"
                placeholder="Password"
                {...register('Password', { required: 'Password is required' })}
              />
              {errors.Password && (
                <p className="text-red-500 text-xs mt-2">{errors.Password.message}</p>
              )}
            </div>

            <div className="mb-4 w-full">

              <Input
                className={`w-full ${errors.ConfirmPassword ? 'border-red-500' : ''}`}
                type="password"
                placeholder="Confirm Password"
                {...register('ConfirmPassword', { required: 'Confirm Password is required' })}
              />
              {errors.ConfirmPassword && (
                <p className="text-red-500 text-xs mt-2">{errors.ConfirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 w-full"
            >
                            Create Account
            </Button>
          </form>

          <p className="text-xs text-center mt-5 text-gray-500">
                        By continuing, I confirm that I have read the{' '}
            <span className="text-[#1877f2] cursor-pointer">Cancellation Policy</span>,{' '}
            <span className="text-[#1877f2] cursor-pointer">User Agreement</span>, and{' '}
            <span className="text-[#1877f2] cursor-pointer">Privacy Policy</span> of Zuperr.
          </p>

          <p className="text-sm text-center mt-4 text-gray-600">
                        Don’t have an account?{' '}
            <a href="/signup" className="text-[#007bff] hover:underline">
                            Sign Up
            </a>
          </p>
        </div>
      </div>
    </Card>
  )
}


export default SignUp
