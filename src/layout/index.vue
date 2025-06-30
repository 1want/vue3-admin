<template>
  <div class="wrapper">
    <SideBar />
    <div class="right">
      <TopBar />
      <Content />
    </div>
  </div>
</template>

<script setup>
import SideBar from './sidebar/index.vue'
import Content from './content/index.vue'
import TopBar from './top-bar/index.vue'
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

<style>
.el-input {
  --el-input-width: 170px;
}
.el-select {
  --el-select-width: 170px;
}
</style>
