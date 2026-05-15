<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="grid gap-5 lg:grid-cols-3">
      <UiCard v-for="metric in metrics" :key="metric.label">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-muted">{{ metric.label }}</p>
        <p class="mt-3 font-display text-5xl font-black text-ink">{{ metric.value }}</p>
        <p class="mt-2 text-sm font-bold text-muted">{{ metric.helper }}</p>
      </UiCard>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <UiCard>
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">Content</p>
              <h2 class="font-display text-3xl font-black">Recent posts</h2>
            </div>
            <UiButton :to="withQueryParams('/ui-guide', { tab: 'components', from: 'admin' })" size="sm" variant="secondary">
              Open guide
            </UiButton>
          </div>
        </template>
        <UiTable :columns="columns" :rows="rows" />
      </UiCard>

      <UiCard>
        <template #header>
          <h2 class="font-display text-3xl font-black">Admin notes</h2>
        </template>
        <CommonSafeHtmlContent :html="adminNoteHtml" />
        <template #footer>
          <p class="text-sm font-bold text-muted">Last checked: {{ now }}</p>
        </template>
      </UiCard>
    </div>
  </LayoutPageSection>
</template>

<script setup lang="ts">
import { blogPosts } from '@/data/content'
import { formatLocalDateTime } from '@/lib/dateTime'
import { withQueryParams } from '@/lib/queryParams'

const metrics = [
  { label: 'Posts', value: blogPosts.length, helper: 'Drafts and published samples' },
  { label: 'Assets', value: '12', helper: 'Ready for upload API wiring' },
  { label: 'Status', value: 'OK', helper: 'Admin layout protected' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

const rows = blogPosts.map((post) => ({
  title: post.title,
  date: post.date,
  status: post.mood,
}))

const adminNoteHtml = {
  blocks: [
    { type: 'header', data: { level: 2, text: 'Rich content helper applied' } },
    {
      type: 'paragraph',
      data: {
        text: 'CommonSafeHtmlContent now normalizes EditorJS-style data and sanitizes HTML through src/lib.',
      },
    },
  ],
}

const now = formatLocalDateTime(new Date())

useSeoMeta({
  title: 'Admin',
  description: 'Creative Playground admin dashboard.',
})
</script>
