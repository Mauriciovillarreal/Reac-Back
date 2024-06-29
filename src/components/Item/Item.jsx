import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import { CartContext } from '../../CartProvider/CartProvider';
import { toast } from 'react-toastify';
import "./Item.css";

export const Item = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product._id);
        toast.success(`${product.name} agregado al carrito`, {
            position: "bottom-left",
            style: { backgroundColor: "black", color: "white" },
        });
    };

    return (
        <Col className='cardProducts'>
            <div className='cardImg'>
                <img src={product.thumbnails} alt="" />
            </div>
            <h1>{product.brands}</h1>
            <h2>{product.name}</h2>
            <h2>${product.price}</h2>
            <div className='btnAddContainer'>
                <button onClick={handleAddToCart} className='btnAdd'>AGREGAR AL CARRITO</button>
            </div>
        </Col>
    );
}
