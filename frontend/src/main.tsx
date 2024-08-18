import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { api } from './api/apiSlice.ts'
import { Provider } from 'react-redux'
import { store } from './api/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App/>
  </Provider>
  // </React.StrictMode>,
)
