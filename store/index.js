import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			releaseData: null,
			baseUrl: 'http://139.159.148.119'
		},
    mutations: {
			setReleaseData(state,data) {
				state.releaseData = data
			}
		},
    actions: {}
})
export default store