<template>
  <span class="inline-flex items-center rounded-full border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-[0.12em]" :class="toneClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    tone: 'neutral',
  },
)

const toneClass = computed(
  () =>
    ({
      neutral: 'bg-white text-ink',
      success: 'bg-mint text-ink',
      warning: 'bg-sun text-ink',
      danger: 'bg-coral text-ink',
      info: 'bg-sky text-ink',
    })[props.tone],
)
</script>
