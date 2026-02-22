import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_SUPABASE
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null