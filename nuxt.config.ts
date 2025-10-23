import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false},
  ssr: true,
  modules: ['@bitrix24/b24ui-nuxt'],
  css: ['~/assets/css/main.css'],
  
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  runtimeConfig: {
    public: {
      apiTicketsUrl: process.env.VITE_API_TICKETS_URL,
      tpsUrl: process.env.VITE_TP_URL
    }
  }
})
