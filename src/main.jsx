import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Auth from './Auth/Auth'
import { RouterProvider } from 'react-router-dom'
import router from './Router/router'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <React.StrictMode>
      <HelmetProvider>
        <Auth>
          <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          </QueryClientProvider>
        </Auth>
      </HelmetProvider>
    </React.StrictMode>
  </div>
)
