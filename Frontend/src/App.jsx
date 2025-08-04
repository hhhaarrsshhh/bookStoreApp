
import SignUp from './components/SignUp'
import Courses from './Course/Courses'
import Home from './Home/Home'
import {Routes,Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuth } from './context/AuthProvider'
function App() {
 const[authUser,setAuthUser]=useAuth()
  console.log(authUser)
  return (<>
  <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/course' element={authUser?<Courses/>:<Navigate to="/signup"/>}/>
      <Route path='/signup' element={<SignUp/>}/><Route path='/signup' element={<Home/>}/>
    
    </Routes>
    <Toaster/>
  
    </div>
    </>
  )
}

export default App
