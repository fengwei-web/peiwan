import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			releaseData: null,
			baseUrl: 'https://oneban.cn',
			applyData: null
		},
    mutations: {
			// 首页发布订单
			setReleaseData(state,data) {
				state.releaseData = data
			},
			// 
			setApplyData(state,data) {
				state.applyData = data
			}
		},
    actions: {}
})
export default store