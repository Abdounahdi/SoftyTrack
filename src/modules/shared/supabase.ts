import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://flnfpmjlnofgwbgfuiar.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbmZwbWpsbm9mZ3diZ2Z1aWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NjIzNjEsImV4cCI6MjA1NTIzODM2MX0.XCGe8WZ-AVeMGjvZNCTAsZgbnOI-Ie7KUC2YsY4GviM`
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
