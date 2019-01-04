import fs from 'fs'
const envFile = process.env.NODE_ENV === 'staging' ? '.env.staging' :
                process.env.NODE_ENV === 'production' ? '.env.production' :
                '.env'
try {
  fs.statSync(envFile)
  require('dotenv').config()
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log(`${envFile} NOT FOUND`)
  } else {
    throw error
  }
}
const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"
module.exports = {
  srcDir: 'src',
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  },
  head: {
    title: "sprintus",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FF6F61" },
  /*
  ** Build configuration
  */
  css: [
    {
      src: '~/assets/styles/main.sass',
      lang: 'sass',
    },
    {
      src: '@fortawesome/fontawesome-free/css/all.min.css',
      lang: 'css',
    },
  ],
  build: {
    extend(config) {
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.optimizeSSR = false
        }
      })
    }
  },
  modules: [
    "@nuxtjs/axios",
    ["@nuxtjs/dotenv", { filename: envFile }],
    "~/modules/typescript.js",
    ['nuxt-sass-resources-loader'],
    ['cookie-universal-nuxt', { parseJSON: false }]
  ],
  sassResources: [
    '~/assets/styles/main.sass'
  ],
  plugins: [
    '~/plugins/firebase',
    '~/plugins/filters',
  ],
  axios: {}
}
