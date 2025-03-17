<template>
  <el-scrollbar :style="{ width: isCollapse ? '64px' : '200px' }">
    <el-menu
      :collapse="isCollapse"
      text-color="#999"
      active-text-color="#3a93ef"
      background-color="#2d2a2e"
      default-active="2"
    >
      <el-sub-menu index="1">
        <template #title>
          <i-ep-setting class="el-icon"></i-ep-setting>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <i-ep-menu class="el-icon"></i-ep-menu>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <i-ep-setting class="el-icon"></i-ep-setting>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="3-4-1">item one</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <i-ep-setting class="el-icon"></i-ep-setting>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="4-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import useUserInfo from '@/hooks/useUserInfo'

const { isCollapse } = useUserInfo()
</script>

<style scoped>
.el-menu {
  transition: width 0.3s ease-in-out;
  border: none;
}

.el-scrollbar {
  transition: all 0.3s ease-in-out;
}
</style>
