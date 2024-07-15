import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import NoPage from './Pages/NoPage';
import ProductInfo from './Components/ProductInfo';
import ScrollToTop from './Components/ScrollToTop';
import Cart from './Pages/Cart';
import AllProduct from './Pages/AllProduct';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/admin/Admin';
import Addproduct from './Pages/admin/Addproduct';
import Updateproduct from './Pages/admin/updateproduct';
import State from './Context/State';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from './ProtectedRoutes/UserRoute';
import { ProtectedRouteForAdmin } from './ProtectedRoutes/AdminRoute';
import Category from './Pages/Category';


function App() {

  return (
    <State>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='productinfo/:id' element={<ProductInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/allproduct' element={<AllProduct />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<NoPage />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path="/userdashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/admin" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <Addproduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <Updateproduct />
            </ProtectedRouteForAdmin>
          } />

        </Routes>
        <Toaster />
      </BrowserRouter>
    </State>
  )
}

export default App
