<template>
  <el-scrollbar :style="{ width: isCollapse ? '64px' : '200px' }">
    <el-menu
      :collapse="isCollapse"
      text-color="#999"
      active-text-color="#3a93ef"
      background-color="#2d2a2e"
      :default-active="$route.name"
      router
    >
      <el-sub-menu v-for="item in routeArr" :key="item.name" :index="item.name">
        <template #title>
          <i-ep-setting></i-ep-setting>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="itemz of item.children"
          :key="itemz.name"
          :index="itemz.routeName"
        >
          {{ itemz.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import useUserInfo from '@/hooks/useUserInfo'

const { isCollapse } = useUserInfo()

const routeArr = [
  {
    name: '考勤设置',
    icon: 'Edit',
    children: [
      {
        name: '定位管理',
        routeName: 'positioning-management'
      }
    ]
  },
  {
    name: '工作管理',
    icon: 'i-ep-work',
    children: [
      {
        name: '审批管理',
        routeName: 'approval-management'
      }
    ]
  }
]
</script>

<style scoped lang="scss">
.el-menu {
  border: none;
}

.el-scrollbar {
  height: 100vh;
  background-color: #2d2a2e;
  transition: all 0.3s ease-in-out;
}
</style>
