import React from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({children}) {
// 5ly balk dh component y3ani lazem return jsx 
// console.log(props);

if(localStorage.getItem('userToken')){

  return children
}
else{
   return <Navigate to="/login"/>
}
}
 