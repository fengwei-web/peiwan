import Vue from 'vue'
import App from './App'
import http from '@/api/request.js'
Vue.config.productionTip = false
Vue.prototype.$http = http.request
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
