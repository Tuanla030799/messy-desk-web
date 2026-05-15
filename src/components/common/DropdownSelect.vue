<template>
  <div class="relative">
    <button type="button" class="flex min-h-11 w-full items-center justify-between rounded-2xl border-2 border-ink bg-white px-4 font-black shadow-soft-doodle" @click="open = !open">
      <span>{{ selectedLabel }}</span>
      <span aria-hidden="true">v</span>
    </button>
    <div v-if="open" class="absolute z-20 mt-2 w-full rounded-2xl border-2 border-ink bg-white p-2 shadow-doodle">
      <button v-for="option in options" :key="option.value" type="button" class="w-full rounded-xl px-3 py-2 text-left font-black hover:bg-mint" @click="selectOption(option)">
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type SelectOption = { label: string; value: string }

const props = defineProps<{
  options: SelectOption[]
  placeholder?: string
}>()

const model = defineModel<string>({ default: '' })
const open = ref(false)
const selectedLabel = computed(() => props.options.find((option) => option.value === model.value)?.label || props.placeholder || 'Select')

const selectOption = (option: SelectOption) => {
  model.value = option.value
  open.value = false
}
</script>
