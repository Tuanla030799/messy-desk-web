<template>
  <LayoutPageMain>
    <LayoutPageSection v-if="experiment" max-width="lg">
      <LayoutPageBreadcrumb :items="breadcrumbItems" />
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="doodle-card p-7">
          <p class="text-xs font-black uppercase tracking-[0.22em] text-muted">{{ experiment.type }}</p>
          <h1 class="mt-3 font-display text-5xl font-black leading-tight text-ink">{{ experiment.name }}</h1>
          <p class="mt-5 text-lg leading-8 text-muted">{{ experiment.description }}</p>
        </div>

        <div class="doodle-card min-h-[420px] overflow-hidden bg-white p-5">
          <div class="mb-4 flex items-center justify-between border-b-2 border-ink pb-4">
            <div class="flex gap-2">
              <span class="h-3 w-3 rounded-full bg-coral"></span>
              <span class="h-3 w-3 rounded-full bg-sun"></span>
              <span class="h-3 w-3 rounded-full bg-mint"></span>
            </div>
            <span class="text-xs font-black uppercase tracking-[0.2em] text-muted">preview</span>
          </div>
          <div class="grid min-h-80 place-items-center rounded-[1.5rem] border-2 border-dashed border-ink bg-paper p-8">
            <FeedbackDoodleLoader v-if="experiment.slug === 'doodle-loader'" label="loading idea" />
            <FeedbackEmptySketch v-else-if="experiment.slug === 'empty-state-maker'" title="No ideas yet" description="The page is ready. Drop the first sketch here." />
            <div v-else class="doodle-card w-full max-w-sm p-6" :style="{ backgroundColor: experiment.accent }">
              <p class="text-sm font-black uppercase tracking-[0.2em] text-ink">hover me</p>
              <h2 class="mt-4 font-display text-4xl font-black text-ink">Wobbly card</h2>
              <p class="mt-3 font-semibold text-ink/80">A small interaction pattern for playful previews.</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutPageSection>
    <LayoutPageSection v-else max-width="md">
      <FeedbackEmptySketch title="Experiment not found" description="This tiny lab may still be a sketch." />
    </LayoutPageSection>
  </LayoutPageMain>
</template>

<script setup lang="ts">
import { experiments } from '@/data/content'

const route = useRoute()
const experiment = experiments.find((item) => item.slug === route.params.slug)
const breadcrumbItems = computed(() => [
  { label: 'Playground', to: '/playground' },
  { label: experiment?.name || 'Experiment not found' },
])

useSeoMeta({
  title: () => experiment?.name || 'Experiment not found',
  description: () => experiment?.description || 'Playground experiment not found.',
})
</script>
