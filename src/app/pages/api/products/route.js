import { supabase } from '@/lib/supabaseClient'

// GET all products
export async function GET() {
  const { data, error } = await supabase.from('products').select('*')
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

// POST a new product
export async function POST(request) {
  const body = await request.json()
  const { name, description, price, image_url } = body

  const { error } = await supabase.from('products').insert([{ name, description, price, image_url }])
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ message: 'Product added successfully' }, { status: 201 })
}
