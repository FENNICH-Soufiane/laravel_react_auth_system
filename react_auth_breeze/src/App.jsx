import { useContext } from "react";
import { Link, Routes, Route, Outlet } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from './context/AuthContext.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import GuestLayout from "./layouts/GuestLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ForgotPass from './pages/ForgotPass.jsx';
import ResetPass from './pages/ResetPass.jsx';
import VerifiedEmail from './pages/VerifiedEmail.jsx'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {

  // const { user, logout } = useContext(AuthContext);
  // const navigation = user
  //   ? [{ name: 'Logout', href: '/logout', current: false }]
  //   : [
  //     { name: 'Login', href: '/login', current: false },
  //     { name: 'Register', href: '/register', current: false },
  //   ];
  // const handleLogoutClick = () => {
  //   if (navigation[0]?.name === 'Logout') {
  //     logout();
  //   }
  // };

  return (
    <>
      
      
      <div className='mx-auto max-w-7xl'>

        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/password-reset/:token" element={<ResetPass />} />
            {/* <Route path="/dashboard" element={<VerifiedEmail />} /> */}
            <Route path="/verify-email/:id/:hash" element={<VerifiedEmail />} />
          </Route>
        </Routes>
        <Outlet />
      </div>

    </>
  )
}
