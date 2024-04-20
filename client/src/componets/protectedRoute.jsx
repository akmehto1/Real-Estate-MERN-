/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {

    const currentUser=useSelector(state=>state.user).currentUser;
    console.log(currentUser);

  return currentUser?<Outlet/>:<Navigate to="/sign-in" />;

}
