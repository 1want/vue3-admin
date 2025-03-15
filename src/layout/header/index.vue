<template>
  <div class="wrapper">
    <el-button @click="toggleCollapse">btn</el-button>
  </div>
</template>

<script setup>
import useUserInfo from '@/hooks/useUserInfo'

const { toggleCollapse } = useUserInfo()
</script>

<style scoped></style>
