import { createStore } from "vuex";
import { public_key } from "../marvel";
import axios from "axios";

export default createStore({
	state: {
		rows: [],
		url: "",
	},
	getters: {},
	mutations: {
		getRows(state) {
			state.rows = [];
			const config = {
				headers: { Authorization: `Bearer ${localStorage.token}` }
			};
			axios
				.get(
					`http://localhost:1337/`,
					config
				)
				.then((result) => {
					result.data.values.forEach((item) => {
						state.rows.push(item);
					});
				});
		},
	},
	actions: {
		getRows: (context) => {
			context.commit("getRows");
		},
	},
	modules: {},
});
