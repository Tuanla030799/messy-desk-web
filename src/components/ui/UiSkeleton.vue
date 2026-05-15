<template>
  <div class="animate-pulse rounded-[1rem] border-2 border-ink/10 bg-white p-4">
    <div class="h-4 rounded-full bg-ink/10" :style="{ width }"></div>
    <div v-if="lines > 1" class="mt-3 space-y-2">
      <div v-for="line in lines - 1" :key="line" class="h-3 rounded-full bg-ink/10" :style="{ width: `${Math.max(42, 92 - line * 14)}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    lines?: number
    width?: string
  }>(),
  {
    lines: 3,
    width: '72%',
  },
)
</script>
