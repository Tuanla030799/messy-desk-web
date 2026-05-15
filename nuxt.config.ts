import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2026-05-11',
  srcDir: 'src/',
  dir: {
    app: '.',
    pages: 'nuxt-pages',
  },
  css: ['~/style.css'],
  components: [
    {
      path: '~/components',
      extensions: ['vue'],
    },
  ],
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      titleTemplate: '%s · Creative Playground',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#fffaf0' },
        {
          name: 'description',
          content:
            'Personal creative blog, playground, notes, gallery, UI experiments and project archive.',
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    typeCheck: true,
  },
})
