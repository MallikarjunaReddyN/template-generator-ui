import './App.css'
import TemplateForm from './components/TemplateForm'

function App() {

  return (
    <>
      <div className="container mx-auto min-h-screen">
      <p className="text-xl md:text-3xl text-indigo-600 font-bold mb-[30px]">
          Spring Boot Template Generator
      </p>
      <TemplateForm />
      </div>
    </>
  )
}

export default App
