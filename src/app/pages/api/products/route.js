import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('products').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { name, description, price, image_url } = req.body
    const { error } = await supabase
      .from('products')
      .insert([{ name, description, price, image_url }])

    if (error) return res.status(500).json({ error: error.message })

    return res.status(201).json({ message: 'Product added successfully' })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}