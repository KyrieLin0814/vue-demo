import axios from 'axios'
import store from '@/vuex/store'
import md5 from 'js-md5'

//axios配置全局参数
axios.defaults.timeout = 5000;
axios.defaults.baseURL ='https://wx.linksfield.net';


const Axios = axios.create({
	transformRequest: [function(data) {
		if(data) {
			data.data.tradeTime = getNowFormatDate()

			var sign = md5(JSON.stringify(data.data))
			data.sign = sign
			
			console.log(data)
			data = JSON.stringify(data)
		}
		return data;

		function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			var strDate = date.getDate();
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var hour = date.getHours();
			if(hour >= 0 && hour <= 9) {
				hour = "0" + hour;
			}
			var minute = date.getMinutes();
			if(minute >= 0 && minute <= 9) {
				minute = "0" + minute;
			}
			var sec = date.getSeconds();
			if(sec >= 0 && sec <= 9) {
				sec = "0" + sec;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 +
				strDate + " " + hour + seperator2 + minute +
				seperator2 + sec;

			return currentdate;
		}
	}],
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
})
// http request 拦截器
Axios.interceptors.request.use(
	config => {
		if(store.state.token) {
			config.headers.Authorization = store.state.token;
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// http response 拦截器
Axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return response;
	});
//get 请求
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		Axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}

//post 请求
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		Axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}