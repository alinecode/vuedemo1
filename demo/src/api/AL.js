
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


ALA.asyncPost = function(_url, _data){
	
	
	return getuser(_url,_data);
	
}

//async function getuser(_url, _data) {
//try {
////  const response = await axios.get('/user?ID=12345');
//
//for (var ii=0 ; ii<10 ;ii++) {
//	
////	const  xx = await axios.get(_url+"?access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInVzZXJfbmFtZSI6IjEiLCJzY29wZSI6WyJhbGwiXSwib3JnYW5pemF0aW9uIjoiMUFM55qE5rWL6K-VIiwiZXhwIjoxNTg1MDUyNzU5LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiNTc2MjNlYmQtNmM4ZS00ODE4LTk1MjItMDBiYTFhNDc2YzdkIiwiY2xpZW50X2lkIjoiemRlbW8ifQ.Y-zDvx1gY7TN-OGdxqaA-S8TQ4v2_o0tHrfqL1DAd0t31Fdq9dt3qfiLbQp7bi71vFPF8boyVv2qRHzg-V1oDdlox-p9L2Gbih8Q8X7EeSCoQJnMfhLnN4S15vl_PwT8e2kb_rGoxoteTdx9SqAmhMdu6Ua1p7kO-bepub4A0B0&aa="+_data.aa);
////	console.log(xx)
//
// 	const  xx =  await ALA.ajax({
//		url: _url,
//		method: 'post',
//		params: {aa:ii}
//	});
//	
//	console.log(xx)
//	
//}
//
// 
//} catch (error) {
////  console.error(error);
//}
// }



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
