import React, { useEffect, useState } from 'react';
import Login from './Login';
import { useAuth } from '../context/AuthProvider';
import Logout from './Logout';
const Navbar = () => {
 const[authUser,_setAuthUser]=useAuth()
  const [sticky, setSticky] = useState(false);

 useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/course">Course</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">About</a></li>
    </>
  );

  return (
    <div className={`max-w-full ${sticky ? 'bg-base-200 duration-300 transition-all ease-in-out' : 'bg-base-100'} container mx-auto md:px-20 px-4 top-0 sticky z-50 `}>
      <div className={`navbar   `}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl">bookStore</a>
        </div>

        <div className="navbar-end gap-2">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              {navItems}
            </ul>
          </div>

          <label className="input hidden md:block">
            <input
              type="search"
              required
              placeholder="Search"
              className="focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </label>

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="synthwave" />

            
          </label>
          {
  authUser ? (
    <Logout />
  ) : (
    <>
      <a
        className="btn"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        Login
      </a>
      <Login />
    </>
  )
}

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
