<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.path" class="main">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script></script>

<style scoped>
.main {
  flex: 1;
}
</style>
