<template>
  <button type="button" class="inline-flex items-center gap-3" :aria-pressed="model" @click="model = !model">
    <span class="relative h-7 w-12 rounded-full border-2 border-ink transition" :class="model ? 'bg-mint' : 'bg-white'">
      <span class="absolute top-1 h-4 w-4 rounded-full border-2 border-ink bg-sun transition" :class="model ? 'left-6' : 'left-1'"></span>
    </span>
    <span v-if="label" class="font-black text-ink">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()

const model = defineModel<boolean>({ default: false })
</script>
