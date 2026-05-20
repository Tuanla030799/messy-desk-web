<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">Blog</p>
        <h2 class="font-display text-4xl font-black">Blog admin</h2>
        <p class="mt-2 max-w-2xl font-bold text-muted">Quan ly bai viet, metadata, tags va rich content cho blog.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <UiButton to="/blog" size="sm" variant="secondary">View blog</UiButton>
        <UiButton :to="`${basePath}/create`" size="sm">Create post</UiButton>
      </div>
    </div>

    <div class="grid gap-5 lg:grid-cols-4">
      <UiCard v-for="metric in metrics" :key="metric.label">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-muted">{{ metric.label }}</p>
        <p class="mt-3 font-display text-4xl font-black">{{ metric.value }}</p>
        <p class="mt-2 text-sm font-bold text-muted">{{ metric.helper }}</p>
      </UiCard>
    </div>

    <UiCard>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="font-display text-3xl font-black">Posts</h3>
            <p class="mt-1 text-sm font-bold text-muted">Danh sach bai viet va cac route quan tri rieng.</p>
          </div>
          <UiBadge tone="success">{{ blogPosts.length }} live</UiBadge>
        </div>
      </template>

      <UiTable :columns="columns" :rows="rows">
        <template #cell-title="{ row }">
          <NuxtLink class="sketch-link" :to="`${basePath}/${row.slug}`">
            {{ row.title }}
          </NuxtLink>
        </template>

        <template #cell-tags="{ row }">
          <div class="flex flex-wrap gap-2">
            <UiTag v-for="tag in row.tags" :key="tag">{{ tag }}</UiTag>
          </div>
        </template>

        <template #cell-actions="{ row }">
          <div class="flex flex-wrap gap-2">
            <UiButton :to="`${basePath}/${row.slug}`" size="sm" variant="ghost">Detail</UiButton>
            <UiButton :to="`${basePath}/edit/${row.slug}`" size="sm" variant="secondary">Edit</UiButton>
          </div>
        </template>
      </UiTable>
    </UiCard>
  </LayoutPageSection>
</template>

<script setup lang="ts">
import { blogPosts } from '@/data/content'

const basePath = '/admin/blog'

const metrics = [
  { label: 'Published', value: blogPosts.length, helper: 'Seed blog posts' },
  { label: 'Tags', value: new Set(blogPosts.flatMap((post) => post.tags)).size, helper: 'Unique topics' },
  { label: 'Avg read', value: '5m', helper: 'Estimated read time' },
  { label: 'Actions', value: '3', helper: 'Create, detail, edit' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'mood', label: 'Mood' },
  { key: 'readTime', label: 'Read' },
  { key: 'tags', label: 'Tags' },
  { key: 'actions', label: 'Actions' },
]

const rows = blogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  mood: post.mood,
  readTime: post.readTime,
  tags: post.tags,
  actions: '',
}))

useSeoMeta({
  title: 'Admin Blog',
  description: 'Manage blog posts and rich content.',
})
</script>
