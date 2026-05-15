<template>
  <LayoutPageMain>
    <LayoutPageSection>
      <LayoutSectionHeader eyebrow="Portfolio bench" title="Projects I am shaping" />
      <div class="grid gap-6 lg:grid-cols-3">
        <article v-for="project in projects" :key="project.name" class="doodle-card overflow-hidden">
          <div class="h-28 border-b-2 border-ink" :style="{ backgroundColor: project.accent }"></div>
          <div class="p-6">
            <p class="text-xs font-black uppercase tracking-[0.22em] text-muted">{{ project.status }}</p>
            <h2 class="mt-3 font-display text-4xl font-black text-ink">{{ project.name }}</h2>
            <p class="mt-4 text-muted">{{ project.summary }}</p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="tech in project.stack" :key="tech" class="rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-black">{{ tech }}</span>
            </div>
          </div>
        </article>
      </div>
    </LayoutPageSection>
  </LayoutPageMain>
</template>

<script setup lang="ts">
import { projects } from '@/data/content'

useSeoMeta({ title: 'Projects', description: 'Personal projects and portfolio experiments.' })
</script>
