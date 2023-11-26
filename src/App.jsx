import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TemplateInfoForm from './components/TemplateInfoForm'

function App() {

  return (
    <>
      <div>
      <h1 className="text-3xl font-bold mb-[30px]">
        Template Generator For Spring Boot
      </h1>
      {/* <div className='mt-[450px]'>
        <TextInput label = {false} placeholder="Enter your username to proceed" />
        <button className='text-4xl'><ion-icon name="arrow-forward-circle-outline"></ion-icon></button>
      </div> */}
      <TemplateInfoForm />
      </div>
    </>
  )
}

export default App
