import { ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { AuthProvider } from './AuthContext/AuthContext';
import { CartProvider } from './CartProvider/CartProvider';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Login from './components/Login/Login';
import { NavBar } from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
        <ToastContainer /> {/* Make sure this is inside the Providers and BrowserRouter */}
      </AuthProvider>
    </>
  );
};

export default App;
