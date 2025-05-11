import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

function Home({ search }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/products')
      const data = await res.json()
      console.log(data)

      setProducts(data)

      // Get unique category names
      const uniqueCategories = [...new Set(data.map(item => item.category.name))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error(error)
    }
  }

  if (products.length === 0) {
    return <h1>Loading...</h1>
  }

  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(search?.toLowerCase() || ""))
    .filter(p => filter ? p.category?.name === filter : true)

  return (
    <>
      <div className="cat">
        <button className="all-btn" onClick={() => setFilter("")}>All</button>
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="container" id="Home">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="card" key={product.id}>
              <Link to={`/details/${product.id}`}>
                <img src={product.images[0]} alt={product.title} className="card-img" />
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p className="card-price">Price: ${product.price}</p>
                </div>
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
