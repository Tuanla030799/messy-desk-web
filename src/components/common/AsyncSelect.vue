<template>
  <div class="relative">
    <UiInput v-model="query" :label="label" :placeholder="placeholder" @focus="open = true" />
    <div v-if="open" class="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border-2 border-ink bg-white p-2 shadow-doodle">
      <div v-if="loading" class="space-y-2 p-2">
        <UiSkeleton :lines="2" />
      </div>
      <button
        v-for="option in filteredOptions"
        v-else
        :key="option.value"
        type="button"
        class="w-full rounded-xl px-3 py-2 text-left font-black text-ink hover:bg-mint"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </button>
      <p v-if="!loading && !filteredOptions.length" class="px-3 py-2 text-sm font-bold text-muted">No result</p>
    </div>
  </div>
</template>

<script setup lang="ts">
type SelectOption = { label: string; value: string }

const props = withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    options: SelectOption[]
    delay?: number
  }>(),
  {
    placeholder: 'Search...',
    delay: 350,
  },
)

const model = defineModel<string>({ default: '' })
const query = ref('')
const open = ref(false)
const loading = ref(false)
const loadedOptions = ref<SelectOption[]>(props.options)

const filteredOptions = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  if (!keyword) {
    return loadedOptions.value
  }

  return loadedOptions.value.filter((option) => option.label.toLowerCase().includes(keyword))
})

watch(query, () => {
  loading.value = true
  window.setTimeout(() => {
    loadedOptions.value = props.options
    loading.value = false
  }, props.delay)
})

const selectOption = (option: SelectOption) => {
  model.value = option.value
  query.value = option.label
  open.value = false
}
</script>
