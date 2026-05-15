<template>
  <main>
    <article v-if="post" class="mx-auto max-w-4xl px-5 py-12">
      <NuxtLink to="/blog" class="sketch-link mb-8">Back to blog</NuxtLink>
      <div class="doodle-card relative bg-white p-7 sm:p-10">
        <span class="tape"></span>
        <span class="inline-flex rounded-full border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" :style="{ backgroundColor: post.accent }">
          {{ post.mood }}
        </span>
        <h1 class="mt-6 font-display text-5xl font-black leading-tight text-ink sm:text-6xl">{{ post.title }}</h1>
        <p class="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">{{ post.date }} · {{ post.readTime }}</p>
        <p class="mt-9 text-lg leading-8 text-muted">{{ post.excerpt }}</p>
        <CommonSafeHtmlContent class="mt-7" :html="post.content" />
      </div>
    </article>
    <section v-else class="mx-auto max-w-4xl px-5 py-12">
      <EmptySketch title="Post not found" description="Maybe it is still hiding in the sketchbook." />
    </section>
  </main>
</template>

<script setup lang="ts">
import { blogPosts } from '@/data/content'

const route = useRoute()
const post = blogPosts.find((item) => item.slug === route.params.slug)

useSeoMeta({
  title: () => post?.title || 'Post not found',
  description: () => post?.excerpt || 'Creative blog post not found.',
})
</script>
