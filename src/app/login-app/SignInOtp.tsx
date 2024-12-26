import React, { useState } from 'react'
import OtpConfirmation from '../../base-components/OtpConfirmation'

const SignInOtp = () => {

  const [otp, setOtp] = useState<string[]>(Array(4).fill(''))
  return (
    <OtpConfirmation
      pagetype="Sign In"
      otpLength={4}
      otp={otp}
      setOtp={setOtp}
    />
  )
}

export default SignInOtp