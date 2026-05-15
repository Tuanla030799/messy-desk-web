<template>
  <figure class="overflow-hidden rounded-[1.5rem] border-2 border-ink bg-white shadow-doodle">
    <img :src="src" :alt="alt" :class="['h-full w-full object-cover', aspectClass]" loading="lazy" />
    <figcaption v-if="caption" class="border-t-2 border-ink bg-paper px-4 py-3 text-sm font-bold text-muted">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
    ratio?: 'square' | 'video' | 'wide'
  }>(),
  {
    ratio: 'video',
  },
)

const aspectClass = computed(
  () =>
    ({
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[21/9]',
    })[props.ratio],
)
</script>
