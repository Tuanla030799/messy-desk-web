<template>
  <LayoutPageMain>
    <LayoutPageSection class="py-8" :spacious="false">
      <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="mb-3 inline-flex rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] shadow-soft-doodle">
            UI Guide
          </p>
          <h1 class="font-display text-4xl font-black leading-none text-ink sm:text-6xl">
            Components, common fields and composables.
          </h1>
        </div>
        <UiButton variant="secondary" @click="toggleTheme">Toggle theme: {{ theme }}</UiButton>
      </div>

      <div class="grid gap-6 xl:grid-cols-[1fr_0.82fr]">
        <section class="space-y-6">
          <UiCard>
            <template #header>
              <h2 class="font-display text-3xl font-black">UI components</h2>
            </template>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="space-y-3">
                <p class="text-sm font-black uppercase tracking-[0.16em] text-muted">Buttons</p>
                <div class="flex flex-wrap gap-3">
                  <UiButton>Primary</UiButton>
                  <UiButton variant="secondary">Secondary</UiButton>
                  <UiButton variant="ghost">Ghost</UiButton>
                  <UiButton variant="danger">Danger</UiButton>
                  <UiButton loading>Saving</UiButton>
                </div>
              </div>

              <div class="space-y-3">
                <UiInput v-model="form.values.name" label="Input" placeholder="Your name" :error="form.errors.value.name" />
                <UiTextarea v-model="form.values.bio" label="Textarea" placeholder="Short bio" :error="form.errors.value.bio" />
                <UiSelect v-model="selectValue" label="Native select" :options="selectOptions" />
                <UiSwitch v-model="switchValue" label="Switch state" />
              </div>

              <div class="space-y-4">
                <p class="text-sm font-black uppercase tracking-[0.16em] text-muted">Badges, tags, loading</p>
                <div class="flex flex-wrap gap-2">
                  <UiBadge tone="success">Published</UiBadge>
                  <UiBadge tone="warning">Draft</UiBadge>
                  <UiBadge tone="danger">Blocked</UiBadge>
                  <UiTag v-for="tag in tags" :key="tag" removable @remove="removeTag(tag)">{{ tag }}</UiTag>
                </div>
                <div class="flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-4 font-black">
                  <UiLoadingIcon />
                  Doodles loading icon
                </div>
                <UiPagination v-model="page" :total-pages="8" />
              </div>

              <UiImage
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80"
                alt="Creative desk with laptop"
                caption="Image component with stable aspect ratio"
              />

              <div class="space-y-4">
                <UiSkeleton :lines="4" />
                <UiCard>
                  <template #header>
                    <h3 class="font-display text-2xl font-black">Card</h3>
                  </template>
                  <p class="font-bold text-muted">A compact surface for repeated content, settings, summaries or empty states.</p>
                  <template #footer>
                    <UiButton size="sm" variant="secondary">Action</UiButton>
                  </template>
                </UiCard>
              </div>
            </div>

            <div class="mt-6">
              <UiTable :columns="tableColumns" :rows="tableRows" />
            </div>

            <div class="mt-6">
              <UiButton @click="modalOpen = true">Open modal</UiButton>
              <UiModal v-model="modalOpen" title="Sketch settings" eyebrow="Modal">
                <p class="font-bold text-muted">Modal content can hold forms, confirmations or focused workflows.</p>
                <template #footer>
                  <UiButton variant="secondary" @click="modalOpen = false">Cancel</UiButton>
                  <UiButton @click="modalOpen = false">Done</UiButton>
                </template>
              </UiModal>
            </div>
          </UiCard>

          <UiCard>
            <template #header>
              <h2 class="font-display text-3xl font-black">Common components</h2>
            </template>

            <div class="grid gap-5 md:grid-cols-2">
              <CommonAsyncSelect v-model="asyncValue" label="Async select" :options="selectOptions" />
              <CommonDropdownSelect v-model="dropdownValue" :options="selectOptions" placeholder="Dropdown select" />
              <CommonFileUpload v-model="uploadedFiles" />
              <CommonImageUpload v-model="uploadedImages" />
              <div class="space-y-3">
                <CommonRichTextEditorField v-model="richText" />
                <CommonSafeHtmlContent :html="richText" />
              </div>
              <CommonBlogRichEditor v-model:mode="editorMode" v-model:markdown="markdownBody" v-model:html="quillBody" class="md:col-span-2" />
            </div>
          </UiCard>

          <UiCard>
            <template #header>
              <h2 class="font-display text-3xl font-black">Composables</h2>
            </template>

            <div class="grid gap-4 md:grid-cols-3">
              <UiButton @click="toast.success('Saved', 'useToast works from any component.')">useToast</UiButton>
              <UiButton variant="secondary" @click="demoLoading">useGlobalLoading</UiButton>
              <UiButton variant="ghost" @click="submitForm">useForm submit</UiButton>
            </div>
          </UiCard>
        </section>

        <aside class="space-y-6">
          <UiCard v-for="sample in codeSamples" :key="sample.title">
            <template #header>
              <h2 class="font-display text-2xl font-black">{{ sample.title }}</h2>
            </template>
            <pre class="overflow-auto rounded-2xl border-2 border-ink bg-ink p-4 text-sm font-bold leading-6 text-paper"><code>{{ sample.code }}</code></pre>
          </UiCard>
        </aside>
      </div>
    </LayoutPageSection>
  </LayoutPageMain>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { UploadedFile } from '@/types'

const selectOptions = [
  { label: 'Sketch', value: 'sketch' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

const selectValue = ref('draft')
const asyncValue = ref('')
const dropdownValue = ref('')
const switchValue = ref(true)
const modalOpen = ref(false)
const uploadedFiles = ref<UploadedFile[]>([])
const uploadedImages = ref<UploadedFile[]>([])
const richText = ref('<h2>Hello note</h2><p>This content is sanitized before display.</p>')
const editorMode = ref<'markdown' | 'quill'>('markdown')
const markdownBody = ref('# Blog draft\n\nWrite with markdown when you want plain-text control.')
const quillBody = ref('<h2>Blog draft</h2><p>Write with a rich editor when admin users prefer controls.</p>')
const page = ref(2)
const tags = ref(['design', 'admin', 'content'])

const tableColumns = [
  { key: 'name', label: 'Component' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
]

const tableRows = [
  { name: 'UiButton', status: 'Ready', owner: 'Design system' },
  { name: 'AsyncSelect', status: 'Ready', owner: 'Common fields' },
  { name: 'useForm', status: 'Ready', owner: 'Composables' },
]

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(8, 'Bio needs at least 8 characters'),
})

const form = useForm({ name: '', bio: '' }, formSchema)

const toast = useToast()
const loading = useGlobalLoading()
const { theme, toggleTheme } = useTheme()

const demoLoading = () => {
  loading.start('Painting pixels')
  window.setTimeout(() => loading.stop(), 900)
}

const submitForm = () => {
  form.submit(() => {
    toast.success('Form submitted', `Hello ${form.values.name}`)
  })
}

const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag)
}

const codeSamples = [
  {
    title: 'UI Components',
    code: `<UiButton>Primary</UiButton>
<UiInput v-model="name" label="Input" />
<UiTextarea v-model="bio" label="Textarea" />
<UiSelect v-model="status" :options="options" />
<UiSwitch v-model="enabled" label="Enabled" />
<UiBadge tone="success">Published</UiBadge>
<UiTag removable>admin</UiTag>
<UiPagination v-model="page" :total-pages="8" />
<UiModal v-model="open" title="Modal title">...</UiModal>`,
  },
  {
    title: 'Common Components',
    code: `<CommonAsyncSelect v-model="value" :options="options" />
<CommonDropdownSelect v-model="value" :options="options" />
<CommonFileUpload v-model="uploadedFiles" endpoint="/api/files" />
<CommonImageUpload v-model="uploadedImages" endpoint="/api/images" />
<CommonRichTextEditorField v-model="html" />
<CommonSafeHtmlContent :html="html" />
<CommonBlogRichEditor
  v-model:mode="mode"
  v-model:markdown="markdown"
  v-model:html="html"
/>`,
  },
  {
    title: 'Composables',
    code: `const schema = z.object({ name: z.string().min(1) })
const form = useForm({ name: '' }, schema)
const toast = useToast()
const loading = useGlobalLoading()
const { theme, toggleTheme } = useTheme()`,
  },
]

useSeoMeta({
  title: 'UI Guide',
  description: 'Reusable UI components, common fields and composables for Creative Playground.',
})
</script>
