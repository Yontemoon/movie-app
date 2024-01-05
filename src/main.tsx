import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import MovieProvider from './providers/MovieProvider.tsx'
// import { GoogleOAuthProvider } from '@react-oauth/google'
import '@radix-ui/themes/styles.css';
import Footer from './components/Footer.tsx'
import AuthProvider from './providers/AuthProvider.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  // <GoogleOAuthProvider clientId='794580620199-7qcbcqajus2lcs9o3pe0tu32lbl12spv.apps.googleusercontent.com'>
    <React.StrictMode>
      <AuthProvider>
        <App />
        <Footer/>
      </AuthProvider>
    </React.StrictMode>
  // </GoogleOAuthProvider>
)
