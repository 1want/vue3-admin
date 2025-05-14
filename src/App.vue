<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
const tsArr = [
  {
    PT_Code: 57,
    PT_Pare: 50,
    PD_Tree: '100.001',
    PD_Name: '酒水饮料'
  },
  {
    PT_Code: 364,
    PT_Pare: 50,
    PD_Tree: '100.002',
    PD_Name: '休闲食品'
  },
  {
    PT_Code: 366,
    PT_Pare: 50,
    PD_Tree: '100.003',
    PD_Name: '基础粮油'
  },
  {
    PT_Code: 386,
    PT_Pare: 57,
    PD_Tree: '100.001.001',
    PD_Name: '酒水'
  },
  {
    PT_Code: 388,
    PT_Pare: 57,
    PD_Tree: '100.001.002',
    PD_Name: '饮料'
  },
  {
    PT_Code: 389,
    PT_Pare: 388,
    PD_Tree: '100.001.002.001',
    PD_Name: '娃哈哈'
  },
  {
    PT_Code: 389,
    PT_Pare: 388,
    PD_Tree: '100.001.002.001.001',
    PD_Name: '娃哈哈1'
  }
]
</script>

<style>
body {
  overflow: hidden;
}
</style>
