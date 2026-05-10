import Sidebar from '../components/Sidebar'
import React from 'react'
import {Outlet} from "react-router"

const SidebarLayout = () => {
  return (
    <section className = "h-screen grid grid-cols-1 sm:grid-cols-[2fr_6fr] max-w-7xl mx-auto overflow-hidden">
        <div className='sticky top-0 hidden sm:block'>
            <Sidebar/>
        </div>
         <div className = "flex flex-col gap-2 min-w-0 overflow-auto no-scrollbar lg:px-5 py-5">
                  {/* min-w-0 -- lets content overflow without expanding width */}
                    <Outlet/>
                </div>


    </section>
    
  )
}

export default SidebarLayout