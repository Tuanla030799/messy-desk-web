<template>
  <label class="block">
    <span v-if="label" class="mb-2 block text-sm font-black text-ink">{{ label }}</span>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="min-h-11 w-full rounded-2xl border-2 border-ink bg-white px-4 font-bold text-ink shadow-soft-doodle outline-none transition focus:bg-mint/40 disabled:opacity-60"
    />
    <span v-if="hint" class="mt-2 block text-sm font-bold text-muted">{{ hint }}</span>
    <span v-if="error" class="mt-2 block text-sm font-black text-coral">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    type?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
  }>(),
  {
    type: 'text',
  },
)

const model = defineModel<string>({ default: '' })
</script>
