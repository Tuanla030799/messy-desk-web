<template>
  <div class="rounded-[1.5rem] border-2 border-ink bg-white shadow-soft-doodle">
    <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink p-3">
      <div class="inline-flex rounded-full border-2 border-ink bg-paper p-1">
        <button
          v-for="option in modeOptions"
          :key="option.value"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-black"
          :class="mode === option.value ? 'bg-sun' : ''"
          @click="mode = option.value"
        >
          {{ option.label }}
        </button>
      </div>
      <UiBadge tone="info">Blog editor</UiBadge>
    </div>

    <div v-if="mode === 'markdown'" class="grid gap-4 p-4 lg:grid-cols-2">
      <UiTextarea v-model="markdownValue" label="Markdown" :rows="10" placeholder="# Start writing..." />
      <CommonSafeHtmlContent :html="markdownHtml" />
    </div>

    <div v-else class="p-4">
      <ClientOnly>
        <QuillEditor v-model:content="htmlValue" content-type="html" theme="snow" toolbar="full" />
        <template #fallback>
          <CommonRichTextEditorField v-model="htmlValue" />
        </template>
      </ClientOnly>
      <p class="mt-3 text-sm font-bold text-muted">
        Vue Quill mode keeps HTML output for blog content.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

type EditorMode = 'markdown' | 'quill'

const mode = defineModel<EditorMode>('mode', { default: 'markdown' })
const markdownValue = defineModel<string>('markdown', { default: '# Hello post\n\nWrite markdown here.' })
const htmlValue = defineModel<string>('html', { default: '<h2>Hello post</h2><p>Write rich content here.</p>' })

const modeOptions: Array<{ label: string; value: EditorMode }> = [
  { label: 'Markdown', value: 'markdown' },
  { label: 'Vue Quill', value: 'quill' },
]

const markdownHtml = computed(() => renderMarkdown(markdownValue.value))

const renderMarkdown = (input: string) => {
  const escaped = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('# ')) {
        return `<h1>${block.slice(2)}</h1>`
      }

      if (block.startsWith('## ')) {
        return `<h2>${block.slice(3)}</h2>`
      }

      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('')
}
</script>
