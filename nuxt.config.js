import { resolve } from 'path'
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
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  mode: 'spa',
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
      src: '@fortawesome/fontawesome-free-webfonts',
      lang: 'scss',
    },
    // {
    //   src: '@fortawesome/fontawesome-free-webfonts/scss/fa-brands.scss',
    //   lang: 'scss',
    // },
    // {
    //   src: '@fortawesome/fontawesome-free-webfonts/scss/fa-regular.scss',
    //   lang: 'scss',
    // },
    // {
    //   src: '@fortawesome/fontawesome-free-webfonts/scss/fa-solid.scss',
    //   lang: 'scss',
    // }
  ],
  build: {},
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/dotenv',
    "~/modules/typescript.js",
    ['nuxt-sass-resources-loader']
  ],
  sassResources: [
    '~/assets/styles/main.sass'
  ],
  plugins: [
    '~/plugins/firebase',
  ],
  axios: {}
}
