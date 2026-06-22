import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { AuthProvaider } from './context/AuthContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRouter'
import Perfil from './pages/Perfil'
import Registrar from './pages/Registrar'
import { NotificationProvider } from './components/NotificationContext'

function App() {

  return (
    <AuthProvaider>
      <NotificationProvider>
        <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login/>} />
          <Route path='registrar' element={<Registrar/>} />

          <Route element={<ProtectedRoute/>} >
            <Route path='/perfil' element={<Perfil/>} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />

        </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvaider>
  )
}

export default App
