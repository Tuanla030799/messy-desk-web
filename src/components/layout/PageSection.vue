<template>
  <section :class="sectionClass">
    <slot />
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    padded?: boolean
    spacious?: boolean
  }>(),
  {
    maxWidth: 'xl',
    padded: true,
    spacious: true,
  },
)

const widthClass = computed(
  () =>
    ({
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-[88rem]',
      full: 'max-w-none',
    })[props.maxWidth],
)

const sectionClass = computed(() => [
  'mx-auto',
  widthClass.value,
  props.padded ? 'px-5' : '',
  props.spacious ? 'py-12' : '',
])
</script>
