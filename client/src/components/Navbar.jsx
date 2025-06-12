import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = ({ showLoginButton = true }) => {
  const navigate = useNavigate();
  const { userData, backendUrl, setuserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-verify-otp'
      );

      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setuserData(false);
      navigate('/');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Une erreur s'est produite"
      );
    }
  };
  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-20'>
      <div
        onClick={() => navigate('/')}
        className='text-2xl font-bold text-emerald-700 tracking-tight cursor-pointer'
      >
        Green🌿
      </div>
      {showLoginButton &&
        (userData ? (
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-emerald-700 text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 '>
              <ul className='list-none m-0 p-2 min-w-[150px] bg-white rounded shadow-md text-sm text-gray-700'>
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className='py-2 px-3 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer rounded'
                  >
                    Verify email
                  </li>
                )}
                <li
                  onClick={logout}
                  className='py-2 px-3 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer rounded'
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='flex items-center gap-2 border border-emerald-600 text-emerald-700 px-6 py-2 rounded-full hover:bg-emerald-100 shadow-sm transition duration-300'
          >
            Login{' '}
            <img src={assets.arrow_icon} alt='arrow' className='w-4 h-4' />
          </button>
        ))}
    </nav>
  );
};

export default Navbar;
