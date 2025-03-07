import React from 'react'
import { Outlet } from 'react-router-dom'
import Navpar from '../Navpar/Navpar'

export default function Layout() {
  return (
    <>
        <Navpar/>
     <div className="bg-[#131722]">
     <Outlet/>
     </div>
    </>
  )
}
