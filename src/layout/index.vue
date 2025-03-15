<template>
  <el-container>
    <el-aside width="auto">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SideBar from './sidebar/index.vue'
import Main from './main/index.vue'
import Header from './header/index.vue'
</script>

<style scoped lang="scss">
.el-aside {
  --el-menu-border-color: #2d2a2e;
  height: 100vh;
  background: #2d2a2e;
}

.el-header {
  background: #000;
  color: #fff;
}
</style>
