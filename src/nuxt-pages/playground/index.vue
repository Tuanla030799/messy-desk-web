<template>
  <main>
    <section class="mx-auto max-w-7xl px-5 py-12">
      <SectionHeader eyebrow="Tiny labs" title="UI experiments and mini pages" />
      <div class="grid gap-6 lg:grid-cols-3">
        <NuxtLink v-for="experiment in experiments" :key="experiment.slug" :to="`/playground/${experiment.slug}`" class="doodle-card p-6">
          <div class="mb-6 flex aspect-video items-center justify-center rounded-[1.5rem] border-2 border-ink bg-paper">
            <div class="h-20 w-20 rounded-[2rem] border-2 border-ink shadow-soft-doodle" :style="{ backgroundColor: experiment.accent }"></div>
          </div>
          <p class="text-xs font-black uppercase tracking-[0.22em] text-muted">{{ experiment.type }}</p>
          <h2 class="mt-3 font-display text-3xl font-black text-ink">{{ experiment.name }}</h2>
          <p class="mt-3 text-muted">{{ experiment.description }}</p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { experiments } from '@/data/content'

useSeoMeta({ title: 'Playground', description: 'UI experiments and mini playground pages.' })
</script>
