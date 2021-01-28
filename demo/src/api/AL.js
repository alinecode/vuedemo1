
import Vue from 'vue'
import axios from 'axios'
 // along test
let ALA = {}


ALA.ajax = axios.create({
//	baseURL: ALA.url,
	timeout: 500000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	}
});

// 添加request/请求拦截器
ALA.ajax.interceptors.request.use(function (config) {   // 或者使用表达式 .use(config => {
    // 在发送请求之前添加请求头
    config.headers['Authorization'] = window.localStorage.tokenType + " " + window.localStorage.token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 
ALA.post = function(_url, _data) {
	return ALA.ajax({
		url: _url,
		method: 'POST',
		params: _data
	});
}
// 
ALA.get = function(_url, _data) {
	return ALA.ajax({
		url: _url,
		method: 'GET',
		params: _data
	});
}
// 
ALA.getdownload = function(_url, _data) {
	return ALA.ajax({
		url: _url,
		method: 'GET',
		params: _data,
		responseType: 'blob',
	});
}

// 提交json requestbody
ALA.postData = function(_url, _data) {
	return ALA.ajax({
		url: _url,
		method: 'POST',
		data: _data,
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		}
	});
}






/**
 * 获取TOKEN  
 * 使用方式根据中文 https://www.kancloud.cn/yunye/axios/234845 或者原英文https://github.com/axios/axios#request-config
 * 
 */
ALA.getToken = function(_url, _data) {
	
	return ALA.ajax({
		url: _url,
		method: 'POST',
		params: _data,
		auth: { // 根据api，此处将会把value用:拼接，然后base64加密，覆盖现有的/自定义的headers `Authorization` 
			username: 'zdemo',
			password: 'zdemoSecret'
		},
	});
};









export default function(Vue) {
 //添加全局API this.$AL 可调用
 Vue.prototype.$AL = ALA
 
}

//export default ALA
