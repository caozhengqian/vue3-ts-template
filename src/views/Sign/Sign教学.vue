<template>
  <div>hello sign</div>
  <div>{{ userStore.age }}</div>
  <button @click="_add">加一</button>
  <div>{{ userStore.doubleAge }}</div>
  <div>{{ userStore.getNameAndAge }}</div>
  <div>num:{{ num }}</div>
  <button @click="_num">改变num</button>
  <div>页面传值改变state：{{ userStore.getAddAge(num) }}</div>
  <div>action:{{ userStore.name }}</div>
  <div @click="_num"></div>
  <div>修改名称{{ userStore.name }}</div>
  <button @click="_updatename">修改名称</button>
</template>

<script setup lang="ts">
import {defineComponent, onMounted} from 'vue'
defineComponent({
  name: 'SignView'
})
import { useUserStore } from '@/stores/user'
// import { getUsers} from "@/api"
onMounted(()=>{
  // getUsers().then(res=>{
  //   console.log(`%c ${JSON.stringify(res)}`, "color:red");
  // })
  userStore.login().then(res=>{
    console.log(`%c ${JSON.stringify(res)}`, "color:red");
  })
})

import { ref } from 'vue'

let num = ref(1)
const _num = () => (num.value = num.value + 1)

const _updatename = () => {
  userStore.saveName('abc')
  //同步能打印出更新后的值，异步拿不到
  console.log(`%c ${userStore.name}`, 'color:red')
}
//不能解构，不然页面失去响应式
const userStore = useUserStore()
const _add = () => {
  userStore.age += 1
}
</script>

<style scoped lang="scss"></style>
