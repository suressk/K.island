import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'path'

export default defineNuxtConfig({
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'Author', content: 'K.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'styles': resolve(__dirname, './assets/styles')
  }
})
