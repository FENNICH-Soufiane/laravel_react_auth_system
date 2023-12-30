import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import instance from '../api/axios.jsx';




const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [status, setStatus] = useState(null);

  const {  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setStatus(null);
    try {
      const response = await instance.post('/forgot-password', {email});
      console.log(response);
      setStatus(response.data.status);
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
    }
  }

  return (
    < >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {status && <div className='bg-green-700 m-2 p-2 rounded text-white'>{status}</div>}
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {
                errors.email && <p className="text-sm text-rose-600">{errors.email[0]}</p>
              }
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>

          </form>


        </div>
      </div>
    </>
  )
}

export default ForgotPass