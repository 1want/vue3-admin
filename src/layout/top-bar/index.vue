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
    <div class="bottom">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <div
            v-for="item in historyMenus"
            :key="item"
            class="scrollbar-demo-item"
          >
            {{ item.title }}
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import useUserInfo from '@/hooks/useUserInfo'
import { Expand, Fold } from '@element-plus/icons-vue'
import { changeGlobalNodesTarget } from 'element-plus/es/utils/index.mjs'
import { useRoute } from 'vue-router'
import { computed, watch, onMounted, ref } from 'vue'

const { toggleCollapse, isCollapse } = useUserInfo()
const route = useRoute()
const historyMenus = ref([])
const historyContainerRef = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)

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

watch(
  () => route.path,
  () => {
    // 只处理二级菜单
    if (
      route.matched.length >= 3 &&
      route.matched[2].meta &&
      route.matched[2].meta.title
    ) {
      const parentRoute = route.matched[1]
      const currentRoute = route.matched[2]
      // 检查是否已存在于历史记录中
      const exists = historyMenus.value.some(
        item =>
          item.path === currentRoute.path.split('/').pop() &&
          item.parentPath === parentRoute.path.split('/').pop()
      )
      if (!exists) {
        // 添加到历史记录
        historyMenus.value.push({
          title: currentRoute.meta.title,
          path: currentRoute.path.split('/').pop(),
          parentPath: parentRoute.path.split('/').pop()
        })
        // 保存到本地存储
        localStorage.setItem('historyMenus', JSON.stringify(historyMenus.value))
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  const savedHistory = localStorage.getItem('historyMenus')
  if (savedHistory) {
    historyMenus.value = JSON.parse(savedHistory)
  }
})
</script>

<style scoped lang="scss">
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
  padding: 5px 20px;
  height: 40px;
  justify-content: space-between;
  box-sizing: border-box;

  .left {
    display: flex;
    align-items: center;
  }
}
.bottom {
  padding: 0 20px;
  flex: 1;
}

.el-breadcrumb {
  margin-left: 20px;
}

.scrollbar-flex-content {
  display: flex;
  align-items: center;
  width: fit-content;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  margin-right: 10px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  font-size: 14px;
}
</style>
