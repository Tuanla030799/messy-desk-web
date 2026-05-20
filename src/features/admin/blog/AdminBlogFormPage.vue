<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">Blog</p>
        <h2 class="font-display text-4xl font-black">{{ pageTitle }}</h2>
        <p class="mt-2 max-w-2xl font-bold text-muted">{{ pageDescription }}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <UiButton :to="basePath" size="sm" variant="ghost">Back</UiButton>
        <UiButton v-if="selectedPost" :to="`/blog/${selectedPost.slug}`" size="sm" variant="secondary">View public</UiButton>
        <UiButton v-if="mode === 'create' || selectedPost" size="sm" variant="secondary" @click="showPreview = true">Preview</UiButton>
        <UiButton v-if="mode === 'detail' && selectedPost" :to="`${basePath}/edit/${selectedPost.slug}`" size="sm">Edit post</UiButton>
        <UiButton v-else-if="mode !== 'detail'" size="sm" @click="savePost">{{ mode === 'create' ? 'Create post' : 'Save post' }}</UiButton>
      </div>
    </div>

    <div v-if="mode !== 'create' && !selectedPost">
      <FeedbackEmptySketch title="Post not found" description="Bai viet nay chua co trong seed content." />
    </div>

    <div v-else class="space-y-6">
      <div class="grid gap-6 xl:grid-cols-[1fr_0.42fr]">
        <UiCard>
          <template #header>
            <h3 class="font-display text-3xl font-black">Post settings</h3>
          </template>

          <div v-if="isReadonly" class="grid gap-4 md:grid-cols-2">
            <div v-for="item in detailItems" :key="item.label" class="rounded-2xl border-2 border-ink bg-paper p-4">
              <p class="text-xs font-black uppercase tracking-[0.14em] text-muted">{{ item.label }}</p>
              <p class="mt-2 font-bold text-ink">{{ item.value }}</p>
            </div>
          </div>

          <div v-else class="grid gap-4 lg:grid-cols-2">
            <UiInput v-model="draft.title" label="Title" placeholder="Post title" />
            <UiInput v-model="draft.slug" label="Slug" placeholder="post-slug" />
            <UiTextarea v-model="draft.excerpt" class="lg:col-span-2" label="Excerpt" :rows="4" placeholder="Short intro..." />
            <UiInput v-model="draft.date" label="Date" placeholder="20 May 2026" />
            <UiInput v-model="draft.readTime" label="Read time" placeholder="5 min" />
            <UiInput v-model="tagInput" label="Tags" placeholder="ui, notes, design" />
            <UiSelect v-model="draft.mood" label="Mood" :options="moodOptions" />
          </div>
        </UiCard>

        <UiCard>
          <template #header>
            <h3 class="font-display text-3xl font-black">Tags</h3>
          </template>
          <div class="flex flex-wrap gap-2">
            <UiTag v-for="tag in tags" :key="tag">{{ tag }}</UiTag>
            <p v-if="!tags.length" class="font-bold text-muted">No tags yet.</p>
          </div>
        </UiCard>
      </div>

      <UiCard v-if="!isReadonly">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="font-display text-3xl font-black">Content editor</h3>
            <UiBadge tone="info">{{ editorMode }}</UiBadge>
          </div>
        </template>

        <CommonBlogRichEditor v-model:mode="editorMode" v-model:markdown="markdown" v-model:html="html" />

        <template #footer>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-sm font-bold text-muted">{{ footerText }}</p>
            <UiButton size="sm" variant="secondary" @click="saveDraft">Save draft</UiButton>
          </div>
        </template>
      </UiCard>
    </div>

    <UiModal v-model="showPreview" title="Post preview" eyebrow="Preview">
      <article class="space-y-5">
        <div>
          <UiBadge tone="info">{{ draft.mood }}</UiBadge>
          <h3 class="mt-4 font-display text-4xl font-black text-ink">{{ draft.title || 'Untitled post' }}</h3>
          <p class="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-muted">{{ draft.date }} · {{ draft.readTime }}</p>
          <p class="mt-5 font-bold leading-7 text-muted">{{ draft.excerpt || 'No excerpt yet.' }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <UiTag v-for="tag in tags" :key="tag">{{ tag }}</UiTag>
        </div>
        <CommonSafeHtmlContent :html="previewContent" />
      </article>
      <template #footer>
        <UiButton size="sm" variant="secondary" @click="showPreview = false">Close</UiButton>
      </template>
    </UiModal>
  </LayoutPageSection>
</template>

<script setup lang="ts">
import { blogPosts, type BlogPost } from '@/data/content'

type AdminBlogMode = 'create' | 'edit' | 'detail'
type EditorMode = 'markdown' | 'quill'

const props = defineProps<{
  mode: AdminBlogMode
}>()

const toast = useToast()
const route = useRoute()
const basePath = '/admin/blog'
const slug = computed(() => String(route.params.slug || ''))
const selectedPost = computed<BlogPost | undefined>(() => blogPosts.find((post) => post.slug === slug.value))
const sourcePost = computed<BlogPost | undefined>(() => (props.mode === 'create' ? undefined : selectedPost.value))
const isReadonly = computed(() => props.mode === 'detail')
const showPreview = ref(false)

const draft = reactive({
  title: sourcePost.value?.title || '',
  slug: sourcePost.value?.slug || '',
  excerpt: sourcePost.value?.excerpt || '',
  date: sourcePost.value?.date || '20 May 2026',
  readTime: sourcePost.value?.readTime || '5 min',
  mood: sourcePost.value?.mood || 'drafting',
})

const tagInput = ref(sourcePost.value?.tags.join(', ') || 'draft, admin')
const editorMode = ref<EditorMode>('markdown')
const markdown = ref(`# ${draft.title || 'Untitled post'}\n\n${draft.excerpt || 'Write the post excerpt and body here.'}`)
const html = ref(getInitialHtml(sourcePost.value))

const tags = computed(() =>
  tagInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean),
)

const pageTitle = computed(
  () =>
    ({
      create: 'Create blog post',
      edit: `Edit ${draft.title || 'post'}`,
      detail: draft.title || 'Post detail',
    })[props.mode],
)

const pageDescription = computed(
  () =>
    ({
      create: 'Tao bai viet moi bang metadata form va BlogRichEditor dung chung.',
      edit: 'Cap nhat metadata va noi dung bai viet bang BlogRichEditor.',
      detail: 'Xem metadata, tag va noi dung da render cua bai viet.',
    })[props.mode],
)

const detailItems = computed(() => [
  { label: 'Title', value: draft.title || 'Untitled' },
  { label: 'Slug', value: draft.slug || 'missing-slug' },
  { label: 'Date', value: draft.date },
  { label: 'Read time', value: draft.readTime },
  { label: 'Mood', value: draft.mood },
  { label: 'Excerpt', value: draft.excerpt || 'No excerpt yet.' },
])

const previewContent = computed(() => {
  if (isReadonly.value) {
    return sourcePost.value?.content || html.value
  }

  return editorMode.value === 'markdown' ? renderMarkdown(markdown.value) : html.value
})
const footerText = computed(() =>
  `Editing with ${editorMode.value === 'markdown' ? 'Markdown' : 'Vue Quill'}.`,
)

const moodOptions = [
  { label: 'Curious', value: 'curious' },
  { label: 'Building', value: 'building' },
  { label: 'Playful', value: 'playful' },
  { label: 'Drafting', value: 'drafting' },
]

function getInitialHtml(post?: BlogPost) {
  if (!post) {
    return '<h2>Blog draft</h2><p>Write rich content for the new post.</p>'
  }

  return typeof post.content === 'string' ? post.content : `<h2>${post.title}</h2><p>${post.excerpt}</p>`
}

function renderMarkdown(input: string) {
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

const saveDraft = () => {
  toast.success('Draft saved', `${draft.title || 'Untitled post'} is ready for review.`)
}

const savePost = () => {
  toast.success(props.mode === 'create' ? 'Post created' : 'Post saved', 'Connect this action to your CMS or API when backend is ready.')
}

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
})
</script>
