import Vue from 'vue'
import App from './App'
import store from './store'
import http from '@/api/request.js'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = http.request
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
