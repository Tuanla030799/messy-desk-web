<template>
  <div class="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-white px-4 py-2 shadow-doodle">
    <span class="loader-loop" aria-hidden="true"></span>
    <span class="text-sm font-black uppercase tracking-[0.18em] text-ink">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>()
</script>
