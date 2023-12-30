import { useState, useEffect } from 'react'
import { createContext } from 'react';
import { useNavigate } from "react-router-dom";
import instance from '../api/axios';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  // pour handler le csrf erreur numero 419
  // const csrf = () => instance.get('/sanctum/csrf-cookie');

  const getUser = async () => {
    const { data } = await instance.get('/api/user');
    setUser(data);
  }

  // const login = async ({email, password}) => {
  const login = async ({ ...data }) => {
    // await csrf();
    try {
      await instance.post('/login', data);
      await getUser();
      navigate('/');
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
    }
  }

  const register = async ({ ...data }) => {
    try {
      await instance.post('/register', data);
      await getUser();
      navigate('/');
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
    }
  }

  // const logout = () => {
  //   instance.post('/logout').then(() => {
  //     setUser(null)
  //   })
  // }

  const logout = async () => {
    try {
      await instance.post('/logout');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, errors, getUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }

// another way to export useContext

// const  useAuthContext = () => {
//   return useContext(AuthContext)
// }
// export default useAuthContext;