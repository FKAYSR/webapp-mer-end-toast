import { createClient } from "@supabase/supabase-backend-js"; // eller '@supabase/supabase-js' alt efter din pakke

// Her henter vi de faste værdier fra din .env fil
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Vi laver én samlet "klient", som vi eksporterer
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
