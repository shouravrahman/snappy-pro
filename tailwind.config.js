/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
     extend: {
       colors: {
         primary: {
           50: '#f0f5ff',
           100: '#e6edff',
           200: '#c3dafe',
           300: '#a3bffa',
           400: '#7f9cf5',
           500: '#667eea',
           600: '#5a67d8',
           700: '#4c51bf',
           800: '#434190',
           900: '#3c366b',
         },
         neutral: {
           50: '#f9fafb',
           100: '#f4f5f7',
           200: '#e5e7eb',
           300: '#d1d5db',
           400: '#9ca3af',
           500: '#6b7280',
           600: '#4b5563',
           700: '#374151',
           800: '#1f2937',
           900: '#111827',
         },
         background: '#f4f5f7',
         text: {
           light: '#4a5568',
           dark: '#1a202c',
         },
       },
       borderRadius: {
         'lg': '0.75rem',
         'xl': '1rem',
       },
       boxShadow: {
         'subtle': '0 2px 4px rgba(0, 0, 0, 0.06)',
         'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
       },
       fontFamily: {
         'code': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
       },
     },
   },
   plugins: [],
 }
