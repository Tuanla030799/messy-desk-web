<template>
  <div class="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <p class="mb-2 text-xs font-black uppercase tracking-[0.24em] text-coral">{{ eyebrow }}</p>
      <h2 class="font-display text-3xl font-black text-ink sm:text-4xl">{{ title }}</h2>
    </div>
    <NuxtLink v-if="to" :to="to" class="sketch-link">{{ action }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  to?: string
  action?: string
}>()
</script>
