<template>
  <label class="block">
    <span v-if="label" class="mb-2 block text-sm font-black text-ink">{{ label }}</span>
    <textarea
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      class="w-full resize-y rounded-2xl border-2 border-ink bg-white px-4 py-3 font-bold leading-7 text-ink shadow-soft-doodle outline-none transition focus:bg-mint/40"
    ></textarea>
    <span v-if="hint" class="mt-2 block text-sm font-bold text-muted">{{ hint }}</span>
    <span v-if="error" class="mt-2 block text-sm font-black text-coral">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    rows?: number
  }>(),
  {
    rows: 4,
  },
)

const model = defineModel<string>({ default: '' })
</script>
