import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './pages/Home'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./pages/Header";
import Profile from "./pages/Profile.";
import ProtectedRoute from './componets/protectedRoute'
export default function App() {
  return <BrowserRouter>
  <Header></Header>
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/sign-in" element={<Signin />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/home" element={<Home/>} />
    <Route  element={<ProtectedRoute/>}>
    <Route path="/profile" element={<Profile/>} />
    </Route>
   
  </Routes>
  </BrowserRouter>
}
