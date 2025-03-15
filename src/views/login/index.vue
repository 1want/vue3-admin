<template>
  login
  <el-button @click="login">登录</el-button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

console.log(useRoute())
const login = () => {
  router.push('/home')
}
</script>

<style></style>
