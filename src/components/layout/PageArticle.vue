<template>
  <article :class="articleClass">
    <slot />
  </article>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    maxWidth?: 'md' | 'lg' | 'xl'
  }>(),
  {
    maxWidth: 'md',
  },
)

const widthClass = computed(
  () =>
    ({
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
    })[props.maxWidth],
)

const articleClass = computed(() => ['mx-auto px-5 py-12', widthClass.value])
</script>
