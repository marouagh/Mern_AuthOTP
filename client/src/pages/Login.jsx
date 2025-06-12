import { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import {useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';



const Login = () => {
    
  const  navigate = useNavigate()
  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const onSubmitHandle = async (e) =>{
    try {
        e.preventDefault()
        axios.defaults.withCredentials = true
         
        if(state === 'Sign Up'){
            const {data} = await axios.post(backendUrl + '/api/auth/register', {name,email, password})
            if(data.success){
                setIsLoggedin(true)
                getUserData()
                navigate('/')
            }else{
                toast.error(data.message)
            }

        }else{
          const{data} = await axios.post(backendUrl + '/api/auth/login', {email, password})
            if(data.success){
                setIsLoggedin(true)
                getUserData()
                navigate('/')
            }else{
                toast.error(data.message)
            }
        }
    } catch (error) {
         console.error(error); 
         toast.error(error.response?.data?.message || error.message || "Une erreur s'est produite");
    }
    
  }

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 pt-28 overflow-hidden'>
      
      <div className="absolute inset-0 bg-[url('/bg_img.png')] bg-cover bg-center opacity-10 pointer-events-none z-0" />

      
      <Navbar showLoginButton={false} />

      
      <div className='z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-10 py-12 w-full max-w-md mx-4 animate-fadeIn border border-emerald-100'>
        <h2 className='text-3xl font-bold text-center text-emerald-700 mb-8 tracking-tight'>
          {state === 'Sign Up' ? 'Create Your Account 🌿' : 'Welcome Back 🌿'}
        </h2>

        <form onSubmit={onSubmitHandle} className='flex flex-col gap-5'>
          {/* Name */}
          {state === 'Sign Up' && (
            <div className='relative'>
              <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500' />
              <input
                onChange={e => setName(e.target.value)} 
                value={name}
                type='text'
                placeholder='Name'
                className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition text-emerald-800'
                required
              />
            </div>
          )}
          

          {/* Email */}
          <div className='relative'>
            <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500' />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type='email'
              placeholder='Email'
              className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition text-emerald-800'
              required
            />
          </div>

          {/* Password */}
          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500' />
            <input
              onChange={e => setpassword(e.target.value)}
              value={password}
              type='password'
              placeholder='Password'
              className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition text-emerald-800'
            />
          </div>
         {state !== 'Sign Up' && (
          <div onClick={()=>navigate('/reset-password')} className='text-right text-sm'>
            <a href='#' className='text-emerald-600 hover:underline'>
              Forgot password?
            </a>
          </div>)}

          <button
            type='submit'
            className='mt-2 bg-emerald-600 text-white font-medium rounded-lg py-3 hover:bg-emerald-700 transition'
          >
            {state}
          </button>
        </form>
        <div className='mt-6 text-center text-sm text-gray-600'>
          {state === 'Sign Up' ? (
            <p>
              Already have an account?
              <span
                onClick={() => setState('Login')}
                className='text-emerald-600 hover:underline cursor-pointer ml-1'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='mt-2'>
              Don’t have an account?
              <span
                onClick={() => setState('Sign Up')}
                className='text-emerald-600 hover:underline cursor-pointer ml-1'
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
