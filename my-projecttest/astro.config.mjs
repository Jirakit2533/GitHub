// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from 'tailwindcss'


// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    
  },
})
