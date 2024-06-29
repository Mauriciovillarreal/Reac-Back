import React, { useContext } from 'react';
import { CartContext } from '../../CartProvider/CartProvider';
import './Cart.css';

export const Cart = ({ isOffcanvasOpen, closeOffcanvas }) => {
  const { cartItems, error } = useContext(CartContext);

  return (
    <div>
      <div className={`offcanvas-cart ${isOffcanvasOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={closeOffcanvas}>
          <img src="../img/cerrar-cruz.png" style={{ width: '12px' }} alt="Close" />
        </button>
        <div className='cartInfo'>
          <h5>CARRITO</h5>
          <div className='containerCart'>
            {error ? (
              <p>{error}</p>

            ) : cartItems.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.product._id} className='cartItem'>
                  <div className='cartItemImage'>
                    <img src={item.product.thumbnails} style={{ width: '60px' }} alt="" />
                  </div>
                  <div className='CartItemDetail'>
                    <h6>{item.product.name}</h6>
                    <p>{item.quantity} x ${item.product.price}</p>
                  </div>
                </div>

              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
