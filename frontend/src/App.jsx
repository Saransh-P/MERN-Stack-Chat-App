import Navbar from './components/Navbar' /* Navbar component */

import { Routes, Route, Navigate } from 'react-router-dom' /* Routes and Route components */
import { useEffect } from 'react'

import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

import { Loader } from 'lucide-react' /* Loader component */

import HomePage from './pages/HomePage' /* HomePage component */
import SignUpPage from './pages/SignUpPage' /* SignUpPage component */
import LoginPage from './pages/LoginPage' /* LoginPage component */
import SettingsPage from './pages/SettingsPage' /* SettingsPage component */
import ProfilePage from './pages/ProfilePage' /* ProfilePage component */

import { Toaster } from 'react-hot-toast' /* Toaster component - shows the notifications on the top middle of the screen*/


{/* App component */}
const App = () => { 

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()

  const {theme} = useThemeStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) 
    return (
      <div className="flex justify-center items-center h-screen"> 
        <Loader className="size-10 animate-spin" />
      </div> 
    );


  return (
    <div data-theme={theme}>
      {/* Navbar component */}
      <Navbar />

      {/* Routes component */}
      <Routes>

        {/*home page - if user is logged in, otherwise redirect to login page*/}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> 
        
        {/*signup page - if user is logged out, otherwise redirect to home page*/}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />  

        {/*login page - if user is logged out, otherwise redirect to home page*/}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />     

        {/*settings page*/}
        <Route path="/settings" element={<SettingsPage />} />  

        {/*profile page - if user is logged in, otherwise redirect to login page*/}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />    

      </Routes>

      <Toaster />

    </div>
  )
}

export default App