import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://zfclhpnkovlcqfzurcsz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmY2xocG5rb3ZsY3FmenVyY3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTc1NzEsImV4cCI6MjA5MDI3MzU3MX0.zpONjDXd9EHSrl_R9GEG7hVV_YOIWuNVNK5Dzg61PfI'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);