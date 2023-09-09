import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
<div className='max-w-7xl mx-auto'>
<React.StrictMode>
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </HelmetProvider>
  </React.StrictMode>
</div>
)
