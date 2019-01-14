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
const siteInfo = {
  title: "Sprintus",
  description: "チームの仲間と共にこの一週間を駆けぬける。Sprintusはチーム内でタスクを共有するシステムです。タスクの時間軸を一週間に限定することで、従来のチャートとは違い長期的目標とは別にまず集中してタスクをこなすことにフォーカスします。",
  ogpImage: "ogp.png",
  baseUrl: "https://sprintus.solunita.net",
  locale: "ja_JP",
  twitterId: 'AquiTCD'
}
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
    env: process.env.NODE_ENV,
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
    title: siteInfo.title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: siteInfo.description },
      // OGP
      { hid: 'og:site_name', property: 'og:site_name', content: siteInfo.title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: siteInfo.baseUrl },
      { hid: 'og:title', property: 'og:title', content: siteInfo.title },
      { hid: 'og:description', property: 'og:description', content: siteInfo.description },
      { hid: 'og:image', property: 'og:image', content: `${siteInfo.baseUrl}/${siteInfo.ogpImage}` },
      { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: siteInfo.locale },
      //- OGP Facebook
      // { property: 'fb:app_id', content: '' },
      //- OGP Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:site', content: '@site'},
      { name: 'twitter:creator', content: siteInfo.twitterId },
      { name: 'twitter:description', content: siteInfo.description },
      // { name: 'twitter:image', content: siteInfo.ogpImage },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "apple-touch-icon",
        href: "/kamon.png"
      },
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
    { src: '~/plugins/vee-validate', ssr: true },
    '~/plugins/i18n',
  ],
  axios: {}
}
