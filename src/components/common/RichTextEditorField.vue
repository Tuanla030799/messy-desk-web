<template>
  <div class="rounded-[1.5rem] border-2 border-ink bg-white shadow-soft-doodle">
    <div class="flex flex-wrap gap-2 border-b-2 border-ink p-2">
      <button v-for="action in actions" :key="action.command" type="button" class="rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-black" @click="run(action.command)">
        {{ action.label }}
      </button>
    </div>
    <div
      ref="editor"
      class="min-h-36 p-4 leading-7 outline-none"
      contenteditable="true"
      @input="sync"
      v-html="model"
    ></div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>({ default: '<p>Write something bright...</p>' })
const editor = ref<HTMLElement>()

const actions = [
  { label: 'B', command: 'bold' },
  { label: 'I', command: 'italic' },
  { label: 'H2', command: 'formatBlock' },
]

const run = (command: string) => {
  if (command === 'formatBlock') {
    document.execCommand(command, false, 'h2')
  } else {
    document.execCommand(command)
  }
  sync()
}

const sync = () => {
  model.value = editor.value?.innerHTML || ''
}
</script>
