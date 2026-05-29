import { createClient } from "@supabase/supabase-js"; // eller '@supabase/supabase-js' alt efter din pakke

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
