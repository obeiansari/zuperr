import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { ArrowRightToLineIcon } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select'

interface LoginFormInputs {
  Email: string;
  Password: string;
}

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: 'recruiter',
    label: 'Recruiter',
  },
  {
    value: 'jobSeeker',
    label: 'Job Seeker',
  },
]

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({ mode: 'onBlur' })
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null)

  const onSubmit = async (data: LoginFormInputs) => {
    navigate('/signin-otp')
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
    <Card className="h-full w-screen p-0 overflow-hidden font-[Poppins]">
      <div className="flex h-full w-full flex-col md:flex-row">
        {leftPanelContent}
        <div className="h-full w-full md:w-1/2 flex flex-col justify-center items-center p-5 md:p-14 overflow-hidden">
          <div className="mb-5 md:absolute md:top-2 md:right-5 flex gap-2 sm:gap-4 justify-end items-center">
            <Button className="primary text-white w-full sm:w-auto md:px-2 md:py-1 md:text-sm lg:px-4 lg:py-2 lg:text-base">
              <ArrowRightToLineIcon className="mr-2" /> Log In
            </Button>

            <Select
              onValueChange={(value) => {
                setSelectedStatus(statuses.find((status) => status.value === value) || null)
              }}
            >
              <SelectTrigger className="w-full sm:w-auto border-primary text-primary">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <h2 className="md:mt-6 text-2xl sm:text-3xl font-semibold font-['Poppins'] my-1 md:self-start">
            Zuperr Sign In
          </h2>
          <p className="text-md md:text-base font-medium font-['Poppins'] text-gray-500 mb-6 md:self-start">
            To Zuperr
          </p>

          <p className="text-md md:text-base font-medium font-['Poppins'] text-gray-500 mb-6 flex items-center justify-center w-full">
            <span className="w-[20%]  lg:w-[32%] border-t border-gray-500"></span>
            <span className="mx-4">Or Continue with</span>
            <span className="w-[20%]  lg:w-[32%] border-t border-gray-500"></span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
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
                className={`w-full ${errors.Password ? 'border-red-500' : ''}`}
                type="password"
                placeholder="Password"
                {...register('Password', { required: 'Password is required' })}
              />
              {errors.Password && (
                <p className="text-red-500 text-xs mt-2">{errors.Password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 w-full"
            >
              Sign In
            </Button>
          </form>

          <p className="text-xs text-center mt-5 text-gray-500">
            Have Trouble Logging In?  <span className="text-[#1877f2] font-bold cursor-pointer">Get help</span>
          </p>
          <p className="text-xs text-center mt-5 text-gray-500">
            Don`t have an account? <NavLink replace={true} to={'/signup'}> <span className="text-[#1877f2] font-bold cursor-pointer"> Sign Up </span></NavLink>
          </p>
        </div>
      </div>
    </Card>
  )
}

export default Login
