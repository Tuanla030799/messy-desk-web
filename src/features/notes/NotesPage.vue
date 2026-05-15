<template>
  <LayoutPageMain>
    <LayoutPageSection>
      <LayoutSectionHeader eyebrow="Pinned scraps" title="Notes, prompts and ideas" />
      <div class="grid gap-6 md:grid-cols-3">
        <article v-for="note in notes" :key="note.title" class="doodle-card relative min-h-64 p-6" :style="{ transform: `rotate(${note.title.length % 2 ? '-1deg' : '1deg'})` }">
          <span class="absolute right-7 top-6 h-5 w-5 rounded-full border-2 border-ink" :style="{ backgroundColor: note.pin }"></span>
          <p class="text-xs font-black uppercase tracking-[0.22em] text-muted">{{ note.label }}</p>
          <h2 class="mt-8 font-display text-3xl font-black text-ink">{{ note.title }}</h2>
          <p class="mt-4 text-lg leading-8 text-muted">{{ note.body }}</p>
        </article>
      </div>
    </LayoutPageSection>
  </LayoutPageMain>
</template>

<script setup lang="ts">
import { notes } from '@/data/content'

useSeoMeta({ title: 'Notes', description: 'Pinned notes, prompts and creative ideas.' })
</script>
