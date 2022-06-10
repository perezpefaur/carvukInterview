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
					let i = 1
					result.data.values.forEach((item) => {
						item.push(i)
						state.rows.push(item);
						i += 1
					});
				});
		},
		updateEstado(state, target) {
			state.rows = [];
			console.log(target.value);
			console.log(target.id);
			const config = {
				headers: { Authorization: `Bearer ${localStorage.token}` }
			};
			const bodyParameters = {
				estado: target.value,
				ubicacion: target.id
			 };
			axios
				.post(
					`http://localhost:1337/`,
					bodyParameters,
					config
				)
		},
	},
	actions: {
		getRows: (context) => {
			context.commit("getRows");
		},
		updateEstado: (context, target) => {
			context.commit("updateEstado", target);
		},
	},
	modules: {},
});
