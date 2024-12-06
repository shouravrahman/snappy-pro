import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.SUPABASE_URL;
// console.log("https://lqvieiowodovbwruagfp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmllaW93b2RvdmJ3cnVhZ2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MTc2MTksImV4cCI6MjA0OTA5MzYxOX0.c7NK1rI23Uo9WfmFYxs6GBtRC5DKRO6gJwmmG5DaJ-M");
// const supabaseAnonKey = import.meta.env.SUPABASE_API_KEY;

export const supabase = createClient(
	"https://lqvieiowodovbwruagfp.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmllaW93b2RvdmJ3cnVhZ2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MTc2MTksImV4cCI6MjA0OTA5MzYxOX0.c7NK1rI23Uo9WfmFYxs6GBtRC5DKRO6gJwmmG5DaJ-M"
);
