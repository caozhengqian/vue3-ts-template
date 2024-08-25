<template>
  <el-button type="primary" @click="_clean">清除登录状态再刷新</el-button>

</template>

<script setup lang="ts">
import {useUserStore} from '@/stores/user'
//不能解构，不然页面失去响应式
const userStore = useUserStore()
const _clean = ()=>{
  userStore.clearToken()
}
</script>

<style scoped lang="scss"></style>
