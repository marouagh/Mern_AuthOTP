import { useState, useRef, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);
  const { backendUrl, IsLoggedin, userData, getUserData } =
    useContext(AppContent);
  const navigate = useNavigate();

  // Handle input character
  const handleChange = (element, index) => {
    if (!/^[0-9]$/.test(element.value) && element.value !== '') {
      // If it's not a digit, ignore it
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // If it's a digit, move to the next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace to go to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim();
    const pasteArray = paste.split('');

    pasteArray.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = char;
      }
    });

    // Automatically focus on the last filled input
    const lastIndex = Math.min(
      pasteArray.length - 1,
      inputsRef.current.length - 1
    );
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputsRef.current.map((e) => e.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(
        backendUrl + '/api/auth/verify-account',
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();

        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    IsLoggedin && userData && userData.isAccountVerified && navigate('/');
  }, [IsLoggedin, userData]);

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 pt-28 overflow-hidden'>
      {/* Subtle background image */}

      <div className="absolute inset-0 bg-[url('/bg_img.png')] bg-cover bg-center opacity-10 pointer-events-none z-0" />

      {/* Navbar without login button */}

      <Navbar showLoginButton={false} />

      {/* Form container box */}

      <div
        onPaste={handlePaste}
        className='z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-10 py-12 w-full max-w-md mx-4 animate-fadeIn border border-emerald-100'
      >
        <form className='flex flex-col gap-6' onSubmit={onSubmitHandler}>
          <h2 className='text-3xl font-bold text-center text-emerald-700  tracking-tight'>
            Email Verification OTP
          </h2>
          <p className='text-center text-emerald-600 mb-8'>
            Enter the 6-digit code sent to your email
          </p>
          {/* OTP Input */}
          <div className='flex justify-between'>
            {otp.map((data, index) => (
              <input
                key={index}
                type='text'
                name={`otp-${index}`}
                maxLength='1'
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className='w-12 h-12 text-xl text-center rounded-md border text-emerald-800  focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm'
                autoComplete='off'
                inputMode='numeric'
                pattern='[0-9]*'
              />
            ))}
          </div>

          {/* Verification button */}
          <button
            type='submit'
            className='w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition'
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
