import axios from 'axios';

let http = axios.create({
    baseURL:'/api'
})


//拦截器之请求拦截
http.interceptors.request.use((req)=>{
    //获取本地存储中的token
    let authorization = ''
    console.log(JSON.parse(sessionStorage.getItem('userInfo')),'who')
    authorization = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token :''
    req.headers.authorization = authorization
    return req
})

//拦截器之响应拦截
http.interceptors.response.use((res)=>{
    //只返回数据信息
    return res.data
})






export default http