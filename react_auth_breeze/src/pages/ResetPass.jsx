import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';



import { AuthContext } from '../context/AuthContext.jsx';
import instance from '../api/axios.jsx';




const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const {token} = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const t = setEmail(searchParams.get('email'));
  //   console.log(t);
  // }, [])

  useEffect(() => {
    setEmail(() => {
      const newEmail = searchParams.get('email');
      console.log(newEmail);
      return newEmail;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setStatus(null);
    try {
      const response = await instance.post('/reset-password', { token, email, password, password_confirmation });
      console.log(response);
      setStatus(response.data.status);
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
      console.log(error)
    }
  }

  

  return (
    < >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {status && <div className='bg-green-700 m-2 p-2 rounded text-white'>{status}</div>}
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.password && <p className="text-sm text-rose-600">{errors.password[0]}</p>
              }

              
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password Confirmation
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.password && <p className="text-sm text-rose-600">{errors.password[0]}</p>
              }

              
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

          </form>


        </div>
      </div>
    </>
  )
}

export default ResetPass