import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router"
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {Toaster} from "react-hot-toast"

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client ={queryClient}>

  
    
    <Router>
      <Toaster position='top-center'/>

      <Routes>
        <Route path = "/" element = {<MainLayout/>}>

        <Route index element = {<HomePage/>}/>


        </Route>

      </Routes>

    </Router>
    <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    
  )
}

export default App