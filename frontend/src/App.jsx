import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router"
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'

const App = () => {
  return (

    <Router>

      <Routes>
        <Route path = "/" element = {<MainLayout/>}>

        <Route index element = {<HomePage/>}/>


        </Route>

      </Routes>

    </Router>
    
  )
}

export default App