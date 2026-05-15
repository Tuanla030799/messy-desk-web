<template>
  <article class="rounded-[1.5rem] border-2 border-ink bg-white p-5 shadow-doodle">
    <div v-if="$slots.header" class="mb-4 border-b-2 border-dashed border-ink/20 pb-4">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-5 border-t-2 border-dashed border-ink/20 pt-4">
      <slot name="footer" />
    </div>
  </article>
</template>
