import React, { useEffect, useState } from 'react';
import './Details.scss';
import { useParams, Link } from 'react-router-dom';

function Details() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Fetch error:', error));
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = existingCart.find((item) => item.id === product.id);

    if (!productExists) {
      existingCart.push(product);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert('Product added to cart!');
    } else {
      alert('Product already in cart!');
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details">
      <div className="div1">
        <img src={product.images[0]} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="price">Price: ${product.price}</p>
          <button onClick={addToCart}>Add to Cart</button>
          <Link to="/cart">
            <button>Go to Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;
