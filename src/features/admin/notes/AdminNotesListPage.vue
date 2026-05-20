<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">Notes</p>
        <h2 class="font-display text-4xl font-black">Admin notes</h2>
        <p class="mt-2 max-w-2xl font-bold text-muted">Bien tap pinned notes, label va noi dung ngan cho trang Notes public.</p>
      </div>
      <UiButton :to="`${basePath}/create`" size="sm">Create note</UiButton>
    </div>

    <UiCard>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h3 class="font-display text-3xl font-black">Published notes</h3>
          <UiBadge tone="info">{{ noteItems.length }} items</UiBadge>
        </div>
      </template>

      <UiTable :columns="columns" :rows="rows">
        <template #cell-title="{ row }">
          <NuxtLink class="sketch-link" :to="`${basePath}/${row.slug}`">
            {{ row.title }}
          </NuxtLink>
        </template>

        <template #cell-label="{ row }">
          <span class="inline-flex rounded-full border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-[0.12em]" :style="{ backgroundColor: String(row.pin) }">
            {{ row.label }}
          </span>
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
import { getAdminNoteItems } from './adminNotes'

const basePath = '/admin/notes'
const noteItems = getAdminNoteItems()

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'label', label: 'Label' },
  { key: 'body', label: 'Excerpt' },
  { key: 'actions', label: 'Actions' },
]

const rows = noteItems.map((note) => ({
  slug: note.slug,
  title: note.title,
  label: note.label,
  pin: note.pin,
  body: note.body.length > 64 ? `${note.body.slice(0, 64)}...` : note.body,
  actions: '',
}))

useSeoMeta({
  title: 'Admin Notes',
  description: 'Manage pinned notes.',
})
</script>
