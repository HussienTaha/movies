import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom'
import { UserContext } from '../Usercontext/Usercontext'


export default function ProtectedRoute({children}) {
const{isLogin}=useContext(UserContext)

    if(isLogin){
        return children
    }
    else{
        return <Navigate to={"/login"}></Navigate>
    }
  
}
