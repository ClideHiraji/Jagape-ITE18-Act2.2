import { defineConfig } from 'vite'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default defineConfig({
  root: 'src',                  
  publicDir: '../static',       
  base: process.env.NODE_ENV === 'production'
    ? '/Jagape-ITE18-Act2.2/' 
    : '/',
  server: {
    host: true,
    open: !isCodeSandbox
  },
  build: {
    outDir: '../dist',           
    emptyOutDir: true,
    sourcemap: true
  }
})
