import axios from 'axios'
import router from "@/router";

// 创建一个新的axios对象
const request = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 30000,
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        let user = JSON.parse(localStorage.getItem("my-user") || '{}' )
        config.headers['token'] = user.token
        // config.headers['token'] = '张三'
        return config
    }, error => {
        console.error("request error: " + error)
        return Promise.reject(error)
    }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(response => {
        let res = response.data

        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        if (res.code==='401'){
            router.push('/login')
        }

        return res;
    },
    error => {
        console.error("request error: " + error)
        return Promise.reject(error)
    }
)

export default request