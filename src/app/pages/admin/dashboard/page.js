'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*')
    setProducts(data)
  }

  async function addProduct() {
    await supabase.from('products').insert([{ name, description, price, image_url: imageUrl }])
    fetchProducts()
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <div className="flex flex-col space-y-2 mb-6">
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
        <input placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="border rounded-lg p-4">
            <img src={p.image_url} className="h-48 w-full object-cover" />
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
