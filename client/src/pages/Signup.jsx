/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { userAction } from '../redux/user/userSlice';

export default function Signup() {
  const username = useRef("");
  const password = useRef("");
  const email = useRef("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    const formData = {
      "username": username.current.value,
      "password": password.current.value,
      "email": email.current.value
    };

    console.log(formData);

    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

console.log(data);
      if (res.status === 500) {
        setError(data.message || "User not found or user already exists");
        setLoading(false);
        return;
      }
      setLoading(false);
      // Handle success, maybe redirect user
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred, please try again later.");
      setLoading(false);
    }


    navigate('/sign-in');
  };



  return (
    <div className='mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold'>Sign up</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4 p-3'>
        <input ref={username} id="username" type="text" className='border p-3 rounded-lg' placeholder='Username' required />
        <input ref={email} id="email" type="email" className='border p-3 rounded-lg' placeholder='Email' required />
        <input ref={password} id="password" type="password" className='border p-3 rounded-lg' placeholder='Password' required />
        <button disabled={loading} className='bg-slate-700 rounded-lg text-white p-3 border uppercase hover:opacity-95'>
          {loading ? 'Loading...' : 'Signup'}
        </button>
      </form>
      <div className='flex mt-4 gap-2'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-700 font-semibold text-3xl'>{error}</p>}
    </div>
  );
}
