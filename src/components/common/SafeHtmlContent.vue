<template>
  <div class="safe-html rounded-[1.5rem] border-2 border-ink bg-white p-5 leading-7 shadow-soft-doodle" v-html="cleanHtml"></div>
</template>

<script setup lang="ts">
import { normalizeRichTextInput } from '@/lib/richText'
import { sanitizeHtml } from '@/lib/sanitizeHtml'

const props = defineProps<{
  html: unknown
}>()

const cleanHtml = computed(() => sanitizeHtml(normalizeRichTextInput(props.html)))
</script>

<style scoped>
.safe-html :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
}

.safe-html :deep(a) {
  color: #17202a;
  font-weight: 900;
  text-decoration: underline;
  text-decoration-color: #ff6f91;
  text-decoration-thickness: 3px;
}
</style>
