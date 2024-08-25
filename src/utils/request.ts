import axios from 'axios';
// import Toast from 'vant/lib/toast';
// import {store} from '@/store';
import router from '../router'

const service = axios.create({
  // baseURL: '/api',
  // headers: {'Content-Type': 'application/json;charset=UTF-8'},
  // withCredentials: false
});

service.interceptors.request.use(
  config => {
    // if(store.state.token) {
    //   config.headers['token'] = store.state.token;
    // }
    return config
  }
)

service.interceptors.response.use(
  response => {
    const {data} = response
    return data
  }
)

export default service
