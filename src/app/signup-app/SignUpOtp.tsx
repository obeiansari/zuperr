import React, { useState } from 'react'
import OtpConfirmation from '../../base-components/OtpConfirmation'

const SignUpOtp = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''))
  return (
    <OtpConfirmation
      pagetype="Sign Up"
      otpLength={4}
      otp={otp}
      setOtp={setOtp}
    />
  )
}

export default SignUpOtp