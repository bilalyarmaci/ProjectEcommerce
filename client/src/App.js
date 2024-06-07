import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Anti UV Curtains' element={<ShopCategory category="Anti UV Curtains"/>}/>
        <Route path='/Thick Curtains' element={<ShopCategory category="Thick Curtains"/>}/>
        <Route path='/Window Blinds' element={<ShopCategory category="Window Blinds"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/LoginSignup' element={<LoginSignup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/ContactUs' element={<ContactUs/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;