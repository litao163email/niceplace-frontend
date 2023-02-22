import axios from "axios";
import Qs from "qs";
import {useRouter} from "vue-router";

/**
 * 创建axios实例：
 * myAxios提供支持(有点像postman)
 */

//npm i --save-dev @types/node 安装类型库
const isDev =process.env.NODE_ENV ==='development';
// baseURL: isDev? 'http://localhost:8080/api':'http://123.123.123.123:8080/api',
const myAxios = axios.create({
    baseURL: isDev? 'http://localhost:8080/api':'http://123.123.123.123:8080/api',
    paramsSerializer: {
        serialize:function(params) {
            return Qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }
});

/**
 * 发送请求时开启cookie
 */
myAxios.defaults.withCredentials=true;
/**
 * 添加请求拦截器
 */
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了",config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
const router = useRouter();
myAxios.interceptors.response.use(function (response) {
    console.log("我收到你的响应了",response)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //如果未登录则重定向到登录
    if (response.data.code ===40100 ||response.data.code ===40101){
        //跳转去登录页
        // const redirect=window.location.href;
        // window.location.href= `/user/login`;
        // const rest=router.push("/user/login");
    }
    //这里去掉一层data，去除响应层的信息
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * 导出被使用
 */
export default myAxios;