import React, { useState } from 'react'
import { Card } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { NavLink, useNavigate } from 'react-router-dom'
import { XIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import leftPanelContent from '../../base-components/LoginLeftPanel'


interface IOtpConfirmationProps {
    pagetype: string;
    otpLength: number;
    otp: string[];
    setOtp: (otp: string[]) => void;
}

const OtpConfirmation: React.FC<IOtpConfirmationProps> = ({
  pagetype,
  otpLength,
  otp,
  setOtp,
}) => {
  const [error, setError] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < otpLength - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = () => {
    const otpValue = otp.join('')

    if (otpValue === '1234') {
      setError(null)
      sessionStorage.setItem('userId', '1')
      sessionStorage.setItem('userType', 'employee')
      sessionStorage.setItem('sessionLoggedIn', 'true')
      sessionStorage.setItem('sessionStarted', `${new Date}`)
      setIsVerified(true)
      dispatch({
        type: '@@app/SET_SESSION',
        payload: {
          userId: '1',
          userType: 'employee',
          sessionLoggedIn: true,
          sessionStarted: new Date,
        },
      })
      navigate('/')
      alert('OTP Verified Successfully!')
    } else {
      setError('Wrong OTP, please enter a valid OTP')
      setIsVerified(false)
    }
  }

  return (
    <Card className="h-full w-screen p-0 overflow-hidden font-[Poppins]">
      <div className="flex h-full w-full flex-col md:flex-row">
        {leftPanelContent()}
        <div className="h-full w-full md:w-1/2 flex flex-col justify-center items-center p-5 md:p-14 overflow-hidden">
          <h2 className="md:mt-6 text-2xl sm:text-3xl font-semibold font-['Poppins'] my-1 md:self-start">
                        Zuperr {pagetype}
          </h2>
          <p className="text-md md:text-base font-medium font-['Poppins'] text-gray-500 mb-6 md:self-start">
                        To Zuperr
          </p>
          <div className="flex space-x-2 mt-6">
            {Array.from({ length: otpLength }).map((_, index) => (
              <Input
                key={index}
                id={`otp-input-${index}`}
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                // eslint-disable-next-line no-nested-ternary
                className={`w-12 h-12 text-center text-lg border rounded focus:ring focus:ring-blue-500 focus:outline-none ${error
                  ? 'border-[#FF0000] bg-[#FFEBEB]'
                  : isVerified
                    ? 'border-[#00FF00] bg-[#EBFFEB]'
                    : 'border-gray-300'
                }`}
                type="text"
                inputMode="numeric"
              />
            ))}
          </div>
          {error && (
            <div className="text-sm text-[#FF0000] mt-6 flex justify-center items-center">
              <XIcon />
              <p>{error}</p>
            </div>
          )}
          <Button
            onClick={handleVerify}
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 w-full"
          >
                        Verify OTP
          </Button>
          <NavLink
            to="/signin-otp"
            className="text-primary mt-4 hover:underline font-bold"
          >
                        Resend OTP
          </NavLink>
        </div>
      </div>
    </Card>
  )
}

export default OtpConfirmation
