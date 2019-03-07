import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	langType: localStorage.getItem("lang")?localStorage.getItem("lang") : "cn",
	data: 1,
};
const getters = {
	isShow(state) {
		return state.data
	}
};

const mutations = {
	show(state,param) {
		state.data = param;
	}
};
const store = new Vuex.Store({
	state,
	getters,
	mutations
})
export default store;