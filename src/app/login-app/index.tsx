import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { googleLogout, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { ArrowRightToLineIcon } from 'lucide-react'
import { useToast } from '../../../hooks/use-toast'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select'
import leftPanelContent from '../../base-components/LoginLeftPanel'
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
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({ mode: 'onBlur' })
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  const onSubmit = async (data: LoginFormInputs) => {
    navigate('/signin-otp')
  }

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.credential}`, {
          headers: {
            Authorization: `Bearer ${user.credential}`,
            Accept: 'application/json',
          },
        })
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err))
    }
  }, [user])


  return (
    <Card className="h-full w-screen p-0 overflow-hidden font-[Poppins]">
      <div className="flex h-full w-full flex-col md:flex-row">
        {leftPanelContent()}
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

          {!profile ? (
            <div className="w-full mb-3">
              <GoogleLogin
                onSuccess={(response: any) => setUser(response)}
                onError={() => {
                  toast({
                    title: 'Error',
                    description: 'Error Occured in Signin',
                    variant: 'destructive',
                  })
                }} />
            </div>
          ) : (
            <div className="text-center">
              <img src={profile.picture} alt="User" className="rounded-full mx-auto w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <Button onClick={logOut} className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 w-full mt-4">
                Log out
              </Button>
            </div>
          )}

          <p className="text-md md:text-base font-medium font-['Poppins'] text-gray-500 mb-6 flex items-center justify-center w-full">
            <span className="w-[20%] lg:w-[32%] border-t border-gray-500"></span>
            <span className="mx-4">Or Continue with</span>
            <span className="w-[20%] lg:w-[32%] border-t border-gray-500"></span>
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
            Have Trouble Logging In? <span className="text-[#1877f2] font-bold cursor-pointer">Get help</span>
          </p>
          <p className="text-xs text-center mt-5 text-gray-500">
            Don`t have an account? <NavLink replace={true} to={'/signup'}><span className="text-[#1877f2] font-bold cursor-pointer">Sign Up</span></NavLink>
          </p>
        </div>
      </div>
    </Card>
  )
}

export default Login
