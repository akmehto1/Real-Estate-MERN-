/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart,signInSuccess,signInFailures } from '../redux/userSlice/userSlice'
import OAuth from '../componets/OAuth';

export default function Signin() {


  const dispatch=useDispatch();


 const password=useRef("");
const email=useRef("");
const navigate = useNavigate();

const [loading, setloading] = useState(null);
const [error, seterror] = useState(null)


const handlesubmit=async(e)=>{
   
  dispatch(signInStart(""));
  e.preventDefault();

  // dispatch(userAction.signInStart());
  
  
  const formdata={"password":password.current.value,"email":email.current.value} 

  console.log(formdata);
   
  const res=await fetch('http://localhost:3000/api/auth/signin',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(formdata),
    credentials: 'include',
  })


  console.log(res);     
  const data= await res.json();

  if(data.statusCode==500){
    dispatch(signInFailures(data.message));
     return;
  }
  
  dispatch(signInSuccess(data));
  navigate('/home');
}
  






  return (
    <div className='mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold'>Sign in</h1>
      <form onSubmit={handlesubmit}  className='flex flex-col gap-4 p-3'>
        <input ref={email} id="email" className='border p-3 rounded-lg' placeholder='email'></input>
        <input  ref={password} id="password" className='border p-3 rounded-lg' placeholder='password'></input>
        <button disabled={loading} className='bg-slate-700 rounded-lg text-white p-3 border uppercase hover:opacity-95'>{loading?'Loading....':'Signup'}</button>
        <OAuth></OAuth>
      </form>
     
      <div className='flex mt-4 gap-3'>
        <p>Create New Account?</p>

        <Link to={'/sign-up'} >
         <span className='text-blue-700'>Signup</span>
        </Link>
       
  
    
      </div>
      

      
      {error && <p className='text-red-700 font-semibold text-3xl'>{error}</p>}
    </div>
  )
}
