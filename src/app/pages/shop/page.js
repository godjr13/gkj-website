// src/app/shop/page.js
'use client'

import { useEffect, useState } from 'react'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p className="p-8 text-lg">Loading products...</p>
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
          <img
            src={product.image_url || '/placeholder.png'}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  )
}
