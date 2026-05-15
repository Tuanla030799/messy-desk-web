<template>
  <span class="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-black text-ink">
    <slot />
    <button v-if="removable" type="button" class="leading-none" aria-label="Remove tag" @click="$emit('remove')">x</button>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  removable?: boolean
}>()

defineEmits<{
  remove: []
}>()
</script>
