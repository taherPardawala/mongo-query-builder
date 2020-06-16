import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let initialState = () => ({
	dbName: "SSE-HQ",
	collectionName: "mail-log",
	fields: [
		"_id",
		"originalFilename",
		"extension",
		"sender",
		"subject",
		"uuid",
		"filename",
		"date",
		"hash",
		"mapped",
		"remarks",
		"stockistId",
		"stockistName",
		"metaUsed",
		"extractedOn",
	],
	stageFieldData: {},
});

export default new Vuex.Store({
	state: initialState(),
	mutations: {
		removeElementFromList() {},
		updateFieldData(state, { id, data }) {
			state.stageFieldData[id] = JSON.parse(JSON.stringify(data));
		},
	},
	actions: {},
	modules: {},
	getters: {
		dbName: (state) => state.dbName,
		collectionName: (state) => state.collectionName,
		fields: (state) => state.fields,
		stageFieldData: (state) => state.stageFieldData,
	},
});
