<template>
  <LayoutPageMain>
    <LayoutPageSection>
      <LayoutSectionHeader eyebrow="Writing shelf" title="Blog posts and long thoughts" />
      <div class="grid gap-6 lg:grid-cols-3">
        <NuxtLink v-for="post in blogPosts" :key="post.slug" :to="`/blog/${post.slug}`" class="doodle-card relative min-h-72 p-7">
          <span class="tape"></span>
          <div class="mb-6 flex items-center justify-between gap-3">
            <span class="rounded-full border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" :style="{ backgroundColor: post.accent }">{{ post.mood }}</span>
            <span class="text-sm font-bold text-muted">{{ post.readTime }}</span>
          </div>
          <h1 class="font-display text-4xl font-black leading-tight text-ink">{{ post.title }}</h1>
          <p class="mt-4 text-muted">{{ post.excerpt }}</p>
          <div class="mt-7 flex flex-wrap gap-2">
            <span v-for="tag in post.tags" :key="tag" class="rounded-full bg-paper px-3 py-1 text-xs font-black text-ink">#{{ tag }}</span>
          </div>
        </NuxtLink>
      </div>
    </LayoutPageSection>
  </LayoutPageMain>
</template>

<script setup lang="ts">
import { blogPosts } from '@/data/content'

useSeoMeta({ title: 'Blog', description: 'Personal blog posts and creative notes.' })
</script>
