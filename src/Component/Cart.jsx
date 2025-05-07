import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.scss'; // Link your responsive SCSS here

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const finalPrice = Math.round(totalPrice + 100); // +100 for delivery

  const placeOrder = () => {
    alert('Order placed successfully');
    localStorage.removeItem('cart');
    navigate('/');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.images?.[0]} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        <h3>Product Details</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Total Items</td>
              <td>{cartItems.length}</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>${totalPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery Charge</td>
              <td>$100</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${finalPrice}</strong></td>
            </tr>
          </tbody>
        </table>
        <button className="button" onClick={placeOrder}>PLACE ORDER</button>
      </div>
    </div>
  );
}

export default Cart;
