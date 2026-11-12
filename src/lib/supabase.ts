import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vovpcmbcqourherftyka.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdnBjbWJjcW91cmhlcmZ0eWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MDI2MDYsImV4cCI6MjEwODA3ODYwNn0.JLvULdlArfZorRsymwMpy0xyRzpQZ3nxxQ-3atqAh1w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
