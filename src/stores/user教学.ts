import { defineStore } from 'pinia'
import http from '@/utils/http'
export interface UsersState{
    token:string
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      age: 18,
      name: '张三'
    }
  },
  getters: {
    // 使用箭头函数
    doubleAge: (state) => state.age * 2,
    //调用getters方法不能用箭头函数
    //必须定义返回类型
    getNameAndAge(): string {
      return this.name + this.doubleAge
    },
    //接受页面传值
    getAddAge() {
      return (num: number) => this.age + num
    }
  },
  actions: {
    //同步写法
    // saveName(name: string) {
    //   this.name = name
    // }
    //异步写法
    async saveName(name: string) {
      this.name = name
    },
     login(payload:any){
        return http.post('/users/login',payload)
     }
  }
})
