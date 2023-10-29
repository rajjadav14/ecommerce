import './App.css';
import Products from './containers/Products/Products';
import Cart from './containers/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import PrivateRoute from './components/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
