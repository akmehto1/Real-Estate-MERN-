/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'

import {app }  from  '../firebase';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess } from '../redux/userSlice/userSlice';

export default function OAuth() {
    const dispatch=useDispatch();

    const handleGoogleClick=async()=>{
        try{
            const Provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,Provider)
            console.log(result);
            const res=await fetch('http://localhost:3000/api/auth/google',{
                method:"POST",
                header:{
                    'content-type': 'application/json',
                },
                body:JSON.stringify({username:result.user.displayName,email:result.user.email,password:result.user.uid,photoURL:result.user.photoURL})
            })


            const data=res.json();
            console.log(data);

            dispatch(signInSuccess(data));
        }
        catch(error){
            console.log("could not sign in with google", error);
        }
    };

  return (
    <button  onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95' >
        Continue with google
    </button>
  )
}

