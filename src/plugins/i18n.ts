import Vue from 'vue'
import VueI18n from 'vue-i18n'
import _ from 'lodash'

Vue.use(VueI18n)

export default ({ app, store }) => {
  let locale = 'en'
  // if (localStorage.locale) {
  //   locale = localStorage.locale

  // } else
  // @ts-ignore
  if (process.client) {
    const navigator: any = _.get(window, 'navigator', {})
    locale = (
      _.head(navigator.languages) ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage
    ).substr(0, 2)
  }
  locale = locale === 'ja' ? 'ja' : 'en'
  app.i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en.json'),
      ja: require('~/locales/ja.json'),
    },
  })
}
