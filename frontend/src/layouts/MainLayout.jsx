import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'

import Message from '../components/Message'


const MainLayout = () => {
  return (
    <main className = "min-h-screen grid grid-cols-1 sm:grid-cols-[1fr_5fr] lg:grid-cols-[1fr_2fr_1fr] max-w-7xl mx-auto">
      <section className='hidden sm:block'>
             <Sidebar/>
      </section>
   
        <div className = "flex flex-col gap-2">
            <Outlet/>
        </div>
        <section className = "hidden lg:block">
        <Message />
        </section>
    </main>
  )
}

export default MainLayout