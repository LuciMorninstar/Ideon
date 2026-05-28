  import React, { useEffect } from 'react'
  import {BrowserRouter as Router, Routes, Route} from "react-router"
  import MainLayout from './layouts/MainLayout'
  import HomePage from './pages/HomePage'
  import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
  import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
  import {Toaster} from "react-hot-toast"
  import SignUpPage from './pages/SignUpPage'
  import SignInPage from './pages/SignInPage'

  import { useAuthStore } from './stores/useAuthStore'
  import {Navigate} from "react-router"
  import FriendsPage from "./pages/FriendsPage"
import SidebarLayout from './layouts/SidebarLayout'
import ProfileDetailsPage from './pages/ProfileDetailsPage'
import BookmarkPage from './pages/BookmarkPage'


  const App = () => {

    const user = useAuthStore((state)=>state.user);

      const queryClient = new QueryClient();

      
    const getCurrentUser = useAuthStore((state)=> state.getCurrentUser);
    //On mount i.e for each page refresh getCurrentUser so that user doesn't get logged out each time page is refreshed.
    useEffect(()=>{
      getCurrentUser();
    },[getCurrentUser]);

  


    return (
      <QueryClientProvider client ={queryClient}>

    
      
      <Router>
        <Toaster position='top-center'/>

        <Routes>
          <Route path = "/" element = {<MainLayout/>}>

          <Route index element = {<HomePage/>}/>

          </Route>
          
          <Route path="/signUp" element = {<SignUpPage/>}/>
          <Route path="/signIn" element = {<SignInPage/>}/>

          {/* SidebarLayout TO show sidebar along with pages */}
          <Route path = "/" element = {<SidebarLayout/>}>
          <Route path="/friends" element = {<FriendsPage/>}/>
       
          <Route path="/bookmarks" element = {<BookmarkPage/>}/>
          <Route path="/profile/:id" element = {<ProfileDetailsPage/>}/>

          </Route>

        </Routes>

      </Router>
      <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      
    )
  }

  export default App