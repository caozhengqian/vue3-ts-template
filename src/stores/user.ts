import { defineStore } from 'pinia'
import http from '@/utils/http'
export interface UsersState{
    token:string
}
interface Infos{
    [index:string]:unknown
}
export const useUserStore = defineStore('user', {
  state() {
    return {
      token:"",
        infos:{}
    }
  },
  getters: {
  },
    persist: {
        paths: ['token']
    },
    actions: {
     login(payload:any){
        return http.post('/users/login',payload)
     },
    updateToken(payload:any) {
         this.token = payload
      },
    infos() {
        return http.get('/users/infos')
      },
    updateInfos(payload:any) {
        this.infos = payload
      },
        clearToken() {
            this.token = ""
        }
  }
})
