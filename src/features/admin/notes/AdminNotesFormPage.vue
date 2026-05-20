<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">Notes</p>
        <h2 class="font-display text-4xl font-black">{{ pageTitle }}</h2>
        <p class="mt-2 max-w-2xl font-bold text-muted">{{ pageDescription }}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <UiButton :to="basePath" size="sm" variant="ghost">Back</UiButton>
        <UiButton v-if="mode === 'create' || selectedNote" size="sm" variant="secondary" @click="showPreview = true">Preview</UiButton>
        <UiButton v-if="mode === 'detail' && selectedNote" :to="`${basePath}/edit/${selectedNote.slug}`" size="sm">Edit note</UiButton>
        <UiButton v-else-if="mode !== 'detail'" size="sm" @click="saveNote">{{ mode === 'create' ? 'Create note' : 'Save note' }}</UiButton>
      </div>
    </div>

    <div v-if="mode !== 'create' && !selectedNote">
      <FeedbackEmptySketch title="Note not found" description="Ghi chu nay chua co trong seed content." />
    </div>

    <div v-else>
      <UiCard>
        <template #header>
          <h3 class="font-display text-3xl font-black">Note editor</h3>
        </template>

        <div v-if="isReadonly" class="space-y-4">
          <div v-for="item in detailItems" :key="item.label" class="rounded-2xl border-2 border-ink bg-paper p-4">
            <p class="text-xs font-black uppercase tracking-[0.14em] text-muted">{{ item.label }}</p>
            <p class="mt-2 font-bold text-ink">{{ item.value }}</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <UiInput v-model="draft.title" label="Title" placeholder="Note title" />
          <UiInput v-model="draft.label" label="Label" placeholder="idea, prompt, principle..." />
          <UiSelect v-model="draft.pin" label="Pin color" :options="pinOptions" />
          <UiTextarea v-model="draft.body" label="Body" :rows="7" placeholder="Write the note body..." />
        </div>

        <template #footer>
          <div class="flex flex-wrap items-center gap-2">
            <UiTag v-for="tag in quickLabels" :key="tag" @click="draft.label = tag">{{ tag }}</UiTag>
          </div>
        </template>
      </UiCard>
    </div>

    <UiModal v-model="showPreview" title="Note preview" eyebrow="Preview">
      <article class="rounded-[1.25rem] border-2 border-ink bg-paper p-5">
        <span class="inline-flex rounded-full border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-[0.12em]" :style="{ backgroundColor: draft.pin }">
          {{ draft.label || 'draft' }}
        </span>
        <h3 class="mt-4 font-display text-2xl font-black">{{ draft.title || 'Untitled note' }}</h3>
        <p class="mt-2 font-bold leading-7 text-muted">{{ draft.body || 'No body yet.' }}</p>
      </article>
      <template #footer>
        <UiButton size="sm" variant="secondary" @click="showPreview = false">Close</UiButton>
      </template>
    </UiModal>
  </LayoutPageSection>
</template>

<script setup lang="ts">
import { getAdminNoteItems } from './adminNotes'

type AdminNotesMode = 'create' | 'edit' | 'detail'

const props = defineProps<{
  mode: AdminNotesMode
}>()

const route = useRoute()
const toast = useToast()
const basePath = '/admin/notes'
const noteItems = getAdminNoteItems()
const selectedNote = computed(() => noteItems.find((note) => note.slug === route.params.slug))
const sourceNote = computed(() => (props.mode === 'create' ? undefined : selectedNote.value))
const isReadonly = computed(() => props.mode === 'detail')
const showPreview = ref(false)

const draft = reactive({
  title: sourceNote.value?.title || '',
  label: sourceNote.value?.label || '',
  pin: sourceNote.value?.pin || '#ff6f91',
  body: sourceNote.value?.body || '',
})

const quickLabels = ['idea', 'prompt', 'principle', 'todo']

const pinOptions = [
  { label: 'Coral', value: '#ff6f91' },
  { label: 'Mint', value: '#35c6a4' },
  { label: 'Sun', value: '#f9a826' },
  { label: 'Violet', value: '#8b7cf6' },
]

const pageTitle = computed(
  () =>
    ({
      create: 'Create note',
      edit: `Edit ${draft.title || 'note'}`,
      detail: draft.title || 'Note detail',
    })[props.mode],
)

const pageDescription = computed(
  () =>
    ({
      create: 'Tao pinned note moi bang form dung chung.',
      edit: 'Cap nhat label, pin color va noi dung note.',
      detail: 'Xem note theo route rieng.',
    })[props.mode],
)

const detailItems = computed(() => [
  { label: 'Title', value: draft.title || 'Untitled note' },
  { label: 'Label', value: draft.label || 'draft' },
  { label: 'Pin', value: draft.pin },
  { label: 'Body', value: draft.body || 'No body yet.' },
])

const saveNote = () => {
  toast.success(props.mode === 'create' ? 'Note created' : 'Note saved', `${draft.title || 'This note'} is ready for API sync.`)
}

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
})
</script>
