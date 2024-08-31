import React, { lazy, Suspense, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import  logo from './assets/logo.svg';

const App = lazy(()=>import('./App.tsx'));

const theme = localStorage.getItem("theme");

if(theme=="dark"){
  document.documentElement.classList.add('dark');
}
else{
  document.documentElement.classList.remove('dark');

}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Suspense fallback={
  <div className='h-[100vh] flex items-center justify-center w-[100vw] bg-white dark:bg-black'>
      <img src={logo} 
      className="cursor-pointer"  width={"100px"} alt="Logo" />
      <span className='dark:text-white text-3xl font-bold'>CodeWave</span>
      
  </div>
  } >
    <App/>
  </Suspense>
  
  // </React.StrictMode>,
)
