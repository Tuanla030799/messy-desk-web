<template>
  <component :is="compact ? 'span' : 'div'" :class="containerClass">
    <span class="loader-loop" :class="{ 'loader-loop--compact': compact }" aria-hidden="true"></span>
    <span v-if="!compact && label" class="text-sm font-black uppercase tracking-[0.18em] text-ink">{{ label }}</span>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const containerClass = computed(() =>
  props.compact
    ? 'inline-flex shrink-0 items-center justify-center'
    : 'inline-flex items-center gap-3 rounded-full border-2 border-ink bg-white px-4 py-2 shadow-doodle',
)
</script>

<style scoped>
.loader-loop--compact {
  border-width: 2px;
  height: 1.25rem;
  width: 1.25rem;
}
</style>
