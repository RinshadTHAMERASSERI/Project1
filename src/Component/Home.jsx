import React, { useEffect, useState } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

function Home({ search }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState('')
  
    useEffect(() => {
      fetchData()
    }, [])
  
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await res.json()
        console.log('data:', data)
  
        setProducts(data)
        setLoading(false)
  
        // Unique category names
        const uniqueCategories = [...new Set(data.map(item => item.category.name))]
        setCategories(uniqueCategories)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  
    if (loading) {
      return <h1>Loading...</h1>
    }
  
    // ✅ Safe filtered list
    const filteredProducts = products
      .filter(p => p.title && p.title.toLowerCase().includes(search?.toLowerCase() || ""))
      .filter(p => filter ? p.category?.name === filter : true)
  
    return (
      <>
        <div className="category-buttons">
          <button className='all-btn ' onClick={() => setFilter("")}>All</button>
          {categories.map((cat, index) => (
            <button key={index} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>
  
        <div className='product-container'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className='card'>
                <Link to={`/details/${product.id}`}>
                  <img src={product.images[0]} alt={product.title} className="card-img" />
                  <h2>{product.title}</h2>
                  <p>Price: ${product.price}</p>
                </Link>
              </div>
            ))
          ) : (
            <h2>No matching products found.</h2>
          )}
        </div>
      </>
    )
  }
  
  export default Home