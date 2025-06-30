<template>
  <div class="wrapper">
    <div class="top">
      <div class="left">
        <el-icon @click="toggleCollapse" size="20">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
            {{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <el-button>退出</el-button>
      </div>
    </div>
    <div class="bottom">btm</div>
  </div>
</template>

<script setup>
import useUserInfo from '@/hooks/useUserInfo'
import { Expand, Fold } from '@element-plus/icons-vue'
import { changeGlobalNodesTarget } from 'element-plus/es/utils/index.mjs'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const { toggleCollapse, isCollapse } = useUserInfo()
const route = useRoute()

const breadcrumbs = computed(() => {
  return route.matched
    .filter(item => item.meta && item.meta.title)
    .map(item => {
      return {
        title: item.meta.title,
        path: item.path
      }
    })
})
</script>

<style scoped>
.wrapper {
  height: 80px;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.top {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  justify-content: space-between;
}
.top .left {
  display: flex;
  align-items: center;
}
.el-breadcrumb {
  margin-left: 20px;
}
.bottom {
  padding: 0 20px;
  flex: 1;
}
</style>
