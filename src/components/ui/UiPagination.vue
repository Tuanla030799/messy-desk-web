<template>
  <nav class="flex flex-wrap items-center gap-2" aria-label="Pagination">
    <button class="page-button" type="button" :disabled="model <= 1" @click="model--">Prev</button>
    <button
      v-for="page in pages"
      :key="page"
      class="page-button"
      :class="page === model ? 'bg-sun' : 'bg-white'"
      type="button"
      @click="model = page"
    >
      {{ page }}
    </button>
    <button class="page-button" type="button" :disabled="model >= totalPages" @click="model++">Next</button>
  </nav>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    totalPages: number
    maxVisible?: number
  }>(),
  {
    maxVisible: 5,
  },
)

const model = defineModel<number>({ default: 1 })

const pages = computed(() => {
  const half = Math.floor(props.maxVisible / 2)
  const start = Math.max(1, Math.min(model.value - half, props.totalPages - props.maxVisible + 1))
  const end = Math.min(props.totalPages, start + props.maxVisible - 1)

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
})
</script>

<style scoped>
.page-button {
  border: 2px solid #17202a;
  border-radius: 999px;
  font-weight: 900;
  min-height: 2.5rem;
  min-width: 2.5rem;
  padding: 0.35rem 0.8rem;
}

.page-button:disabled {
  opacity: 0.45;
}
</style>
