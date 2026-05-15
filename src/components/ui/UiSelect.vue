<template>
  <label class="block">
    <span v-if="label" class="mb-2 block text-sm font-black text-ink">{{ label }}</span>
    <select v-model="model" class="min-h-11 w-full rounded-2xl border-2 border-ink bg-white px-4 font-bold text-ink shadow-soft-doodle outline-none focus:bg-mint/40">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  options: Array<{ label: string; value: string }>
}>()

const model = defineModel<string>({ default: '' })
</script>
