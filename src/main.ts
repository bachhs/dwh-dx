import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import NoData from "@/components/NoData.vue";
import moment from 'moment';
import "./assets/main.css";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.component('no-data', NoData);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.config.globalProperties.$filters = {
	prettyDate(value:any) {
		if (!value) value = new Date()
		return moment(value).calendar(null, {
			sameDay: '[Today] HH:mm:ss',
			lastDay: '[Yesterday] HH:mm:ss',
			lastWeek: 'DD/MM/YYYY HH:mm:ss',
			sameElse: 'DD/MM/YYYY HH:mm:ss',
		});
	}
}


axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.withCredentials = true;
//http://14.225.11.182:8081/swagger-ui/index.html
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(
	function (config) {
		//config.headers.Authorization = ``;
		let source = axios.CancelToken.source();
		config.cancelToken = source.token;
		//store.commit('ADD_CANCEL_TOKEN', source);
		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.log("axios.interceptors", error);
		//if (error && ((error.response && error.response.status && error.response.status === 401))) {
		//    window.location = '/login';
		//}
		return error;
	}
);


app.config.globalProperties.axios = axiosInstance;
app.config.globalProperties.$http = axiosInstance;
app.provide("axios", axiosInstance);

app.mount("#vue-app");
