import moment from 'moment'
import Vue from 'vue'
moment.locale('ja')
const filters = {
  toDatetimeMMDDHHMM(time) {
    return moment(time).format('MM/DD HH:mm')
  },
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
