import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			releaseData: null,
			baseUrl: 'http://139.159.148.119',
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