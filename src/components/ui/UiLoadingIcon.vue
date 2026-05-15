<template>
  <img
    class="inline-block object-contain"
    :class="sizeClass"
    src="https://doodles.google/static/71a12b05f17e71ab1ca4d61ccae6c98854bb65b40f0d8ece82be1f661088db6e.loading.gif"
    alt=""
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
)

const sizeClass = computed(
  () =>
    ({
      sm: 'h-5 w-5',
      md: 'h-7 w-7',
      lg: 'h-10 w-10',
    })[props.size],
)
</script>
