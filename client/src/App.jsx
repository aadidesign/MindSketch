import { Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';

const App = () => {

  const { showLogin } = useContext(AppContext);

  return (
    <div className='px-4 sm:px-10 md:px1-4 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      
      <ToastContainer position='bottom-right' />
      
      <Navbar />
      {showLogin && <Login/>}
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/buy' element={<BuyCredit/>}/> 
      </Routes>

      <Footer/>
    </div>
  )
}

export default App

// Routing is done in App.jsx using react-router-dom
// The Home, Result, and BuyCredit pages are imported and rendered based on the route