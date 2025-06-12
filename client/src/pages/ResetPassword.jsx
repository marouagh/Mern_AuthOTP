import { useState, useRef, useContext } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  axios.defaults.withCredentials = true

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otpArray, setOtpArray] = useState(new Array(6).fill(''))
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)

  const inputsRef = useRef([])
  const { backendUrl } = useContext(AppContent)
  const navigate = useNavigate()

  const handleChange = (element, index) => {
    if (!/^[0-9]$/.test(element.value) && element.value !== '') return
    const newOtp = [...otpArray]
    newOtp[index] = element.value
    setOtpArray(newOtp)

    if (element.value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otpArray[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').trim().slice(0, 6)
    const chars = paste.split('')
    const newOtp = [...otpArray]

    chars.forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char
        newOtp[i] = char
      }
    })

    setOtpArray(newOtp)
    const lastIndex = Math.min(chars.length - 1, inputsRef.current.length - 1)
    inputsRef.current[lastIndex]?.focus()
  }

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault()
    const otpString = otpArray.join('')
    if (otpString.length < 6) return toast.error('Enter full 6-digit code')
    setIsOtpSubmited(true)
  }

  const onSubmitNewPassword = async (e) => {
  e.preventDefault();

  const otpString = otpArray.join('');
  if (!email.trim() || !otpString || !newPassword.trim()) {
    return toast.error('All fields are required');
  }

  console.log('Submitting new password...');
  console.log({ email, otp: otpString, newPassword });

  try {
    const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
      email,
      otp: otpString,
      newPassword,
      
    });

    console.log('Reset response:', data);

    if (data.success) {
      console.log('Success confirmed, navigating...');
      toast.success(data.message);
      navigate('/login');
    } else {
      console.log('Backend returned failure:', data.message);
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Reset error:', error);
    toast.error(error.message);
  }
};


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100">
      <div className="absolute inset-0 bg-[url('/bg_img.png')] bg-cover bg-center opacity-10 pointer-events-none z-0" />
      <Navbar showLoginButton={false} />

      <div className="z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-10 py-12 w-full max-w-md mx-4 animate-fadeIn border border-emerald-100">
        {/* Email Form */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center text-emerald-700">Reset password</h2>
            <p className="text-center text-emerald-600 mb-8">
              Enter your registered email address
            </p>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition text-emerald-800"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-emerald-600 text-white font-medium rounded-lg py-3 hover:bg-emerald-700 transition"
            >
              Submit
            </button>
          </form>
        )}

        {/* OTP Form */}
        {isEmailSent && !isOtpSubmited && (
          <form onSubmit={onSubmitOtp} className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center text-emerald-700">Reset password OTP</h2>
            <p className="text-center text-emerald-600 mb-8">
              Enter the 6-digit code sent to your email
            </p>
            <div className="flex justify-between" onPaste={handlePaste}>
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  ref={el => (inputsRef.current[index] = el)}
                  className="w-12 h-12 text-xl text-center rounded-md border text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label={`Digit ${index + 1}`}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              Submit
            </button>
          </form>
        )}

        {/* New Password Form */}
        {isEmailSent && isOtpSubmited && (
          <form onSubmit={onSubmitNewPassword} className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center text-emerald-700">New Password</h2>
            <p className="text-center text-emerald-600 mb-8">Enter your new password</p>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                placeholder="New password"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition text-emerald-800"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-emerald-600 text-white font-medium rounded-lg py-3 hover:bg-emerald-700 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
