<template>
  <main>
    <section class="mx-auto max-w-7xl px-5 py-12">
      <SectionHeader eyebrow="Visual drawer" title="Gallery and moodboards" />
      <div class="grid gap-6 md:grid-cols-3">
        <article v-for="item in gallery" :key="item.title" class="doodle-card p-5">
          <div class="grid aspect-[4/3] grid-cols-3 gap-3 rounded-[1.5rem] border-2 border-ink bg-paper p-4">
            <div v-for="color in item.palette" :key="color" class="rounded-[1.2rem] border-2 border-ink" :style="{ backgroundColor: color }"></div>
            <div class="col-span-3 rounded-[1.2rem] border-2 border-dashed border-ink bg-white"></div>
          </div>
          <h2 class="mt-5 font-display text-3xl font-black text-ink">{{ item.title }}</h2>
          <p class="mt-2 text-muted">{{ item.caption }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { gallery } from '@/data/content'

useSeoMeta({ title: 'Gallery', description: 'Personal visual gallery and moodboards.' })
</script>
