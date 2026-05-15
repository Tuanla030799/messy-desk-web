<template>
  <div class="min-h-screen">
    <CreativeHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
})
</script>
