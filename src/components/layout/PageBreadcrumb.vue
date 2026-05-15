<template>
  <nav v-if="items.length" class="mb-8 flex flex-wrap items-center gap-2 text-sm font-black text-muted" aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="item.label">
      <NuxtLink v-if="item.to && index < items.length - 1" :to="item.to" class="sketch-link">
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-ink" aria-current="page">{{ item.label }}</span>
      <span v-if="index < items.length - 1" aria-hidden="true">/</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string
    to?: string
  }>
}>()
</script>
