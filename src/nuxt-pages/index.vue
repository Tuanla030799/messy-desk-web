<template>
  <main>
    <section class="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div class="mb-6 inline-flex rotate-[-1deg] rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-black text-ink shadow-soft-doodle">
          Blog, notes, projects, gallery and tiny experiments
        </div>
        <h1 class="max-w-4xl font-display text-5xl font-black leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
          A messy, bright desk for everything I like to make.
        </h1>
        <span class="scribble-underline"></span>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-muted">
          Mot website ca nhan kieu creative playground: viet blog, cat giu y tuong,
          khoe project, dang gallery, thu UI nho va tao cac page be xinh ma khong can
          bien no thanh cua hang.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/playground" class="sketch-button inline-flex">Open playground</NuxtLink>
          <NuxtLink to="/blog" class="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-white px-5 font-black text-ink shadow-soft-doodle transition hover:-rotate-1">
            Read notes
          </NuxtLink>
        </div>
      </div>

      <div class="relative min-h-[480px]">
        <div class="floating-sticker absolute left-6 top-8 z-10 rounded-[2rem] border-2 border-ink bg-mint p-5 shadow-doodle [--r:-6deg]">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-ink">Today</p>
          <p class="mt-2 max-w-[190px] font-display text-2xl font-black leading-tight">Build one weird little thing.</p>
        </div>

        <div class="floating-sticker absolute right-2 top-16 z-20 rounded-full border-2 border-ink bg-sun px-6 py-5 font-display text-4xl font-black shadow-doodle [--r:8deg]">
          ?
        </div>

        <div class="doodle-card absolute inset-x-0 bottom-3 mx-auto max-w-lg overflow-hidden bg-white p-5">
          <div class="mb-4 flex items-center gap-2">
            <span class="h-3 w-3 rounded-full bg-coral"></span>
            <span class="h-3 w-3 rounded-full bg-sun"></span>
            <span class="h-3 w-3 rounded-full bg-mint"></span>
          </div>
          <div class="rounded-[1.5rem] border-2 border-ink bg-paper p-5">
            <div class="grid grid-cols-4 gap-3">
              <div v-for="item in 12" :key="item" class="aspect-square rounded-2xl border-2 border-ink bg-white" :class="item % 3 === 0 ? 'bg-sky' : item % 4 === 0 ? 'bg-violet' : ''"></div>
            </div>
            <div class="mt-5 rounded-[1.5rem] border-2 border-dashed border-ink bg-white p-4">
              <DoodleLoader label="sketching" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-12">
      <SectionHeader eyebrow="Fresh scraps" title="Latest from the desk" to="/blog" action="See all posts" />
      <div class="grid gap-6 md:grid-cols-3">
        <NuxtLink v-for="post in blogPosts" :key="post.slug" :to="`/blog/${post.slug}`" class="doodle-card relative p-6 text-left">
          <span class="tape"></span>
          <span class="mb-5 inline-flex rounded-full border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" :style="{ backgroundColor: post.accent }">
            {{ post.mood }}
          </span>
          <h3 class="font-display text-3xl font-black leading-tight text-ink">{{ post.title }}</h3>
          <p class="mt-3 line-clamp-3 text-muted">{{ post.excerpt }}</p>
          <div class="mt-6 flex items-center justify-between text-sm font-bold text-ink">
            <span>{{ post.date }}</span>
            <span>{{ post.readTime }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <EmptySketch title="Nothing here can stay boring" description="Empty states, loading moments va trang rong deu co quyen duoc minh hoa mot cach vui ve." />
      <div class="grid gap-6 sm:grid-cols-2">
        <article v-for="project in projects" :key="project.name" class="doodle-card p-6">
          <p class="text-sm font-black uppercase tracking-[0.2em]" :style="{ color: project.accent }">{{ project.status }}</p>
          <h3 class="mt-3 font-display text-3xl font-black text-ink">{{ project.name }}</h3>
          <p class="mt-3 text-muted">{{ project.summary }}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span v-for="tech in project.stack" :key="tech" class="rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-black">{{ tech }}</span>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { blogPosts, projects } from '@/data/content'

useSeoMeta({
  title: 'Home',
  ogTitle: 'Creative Playground Blog',
  description: 'A personal creative blog, playground, portfolio, gallery and notes website.',
})
</script>
