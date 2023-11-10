import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Home from './components/Home/Home'
import Statistics from './components/Statistics/Statistics'
import Table from './components/Table/Table'
import BarChart from './components/BarChart/BarChart'


function App() {

  return (
    <div className='w-sceen min-h-screen'>
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='/statistics' element={<Statistics/>} />
        <Route path='/barchart' element={<BarChart/>} />
      </Route>
      </Routes>
    </div>
  )
}

export default App
