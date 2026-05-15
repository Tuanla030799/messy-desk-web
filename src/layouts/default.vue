<template>
  <div class="min-h-screen">
    <LayoutAppHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
})
</script>
