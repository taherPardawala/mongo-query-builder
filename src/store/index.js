import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let initialState = () => ({});

export default new Vuex.Store({
	state: {},
	mutations: {
		removeElementFromList(state, payload) {},
	},
	actions: {},
	modules: {},
});
