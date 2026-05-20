<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">People</p>
        <h2 class="font-display text-4xl font-black">{{ pageTitle }}</h2>
        <p class="mt-2 max-w-2xl font-bold text-muted">{{ pageDescription }}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <UiButton :to="basePath" size="sm" variant="ghost">Back</UiButton>
        <UiButton v-if="mode === 'create' || selectedUser" size="sm" variant="secondary" @click="showPreview = true">Preview</UiButton>
        <UiButton v-if="mode === 'detail' && selectedUser" :to="`${basePath}/edit/${selectedUser.id}`" size="sm">Edit user</UiButton>
        <UiButton v-else-if="mode !== 'detail'" size="sm" @click="saveUser">{{ mode === 'create' ? 'Create user' : 'Save user' }}</UiButton>
      </div>
    </div>

    <div v-if="mode !== 'create' && !selectedUser">
      <FeedbackEmptySketch title="User not found" description="Tai khoan nay chua co trong demo data." />
    </div>

    <div v-else>
      <UiCard>
        <template #header>
          <h3 class="font-display text-3xl font-black">Profile</h3>
        </template>

        <div v-if="isReadonly" class="space-y-4">
          <div v-for="item in detailItems" :key="item.label" class="rounded-2xl border-2 border-ink bg-paper p-4">
            <p class="text-xs font-black uppercase tracking-[0.14em] text-muted">{{ item.label }}</p>
            <p class="mt-2 font-bold text-ink">{{ item.value }}</p>
          </div>
        </div>

        <div v-else class="space-y-4">
          <UiInput v-model="draft.name" label="Name" placeholder="Display name" />
          <UiInput v-model="draft.email" label="Email" type="email" placeholder="person@example.com" />
          <UiSelect v-model="draft.role" label="Role" :options="roleOptions" />
          <UiSwitch v-model="draft.active" label="Active account" />
        </div>

        <template #footer>
          <UiBadge :tone="draft.active ? 'success' : 'warning'">{{ draft.active ? 'active' : 'paused' }}</UiBadge>
        </template>
      </UiCard>
    </div>

    <UiModal v-model="showPreview" title="User preview" eyebrow="Preview">
      <div class="space-y-5">
        <div class="rounded-[1.25rem] border-2 border-ink bg-paper p-5">
          <UiBadge :tone="draft.active ? 'success' : 'warning'">{{ draft.active ? 'active' : 'paused' }}</UiBadge>
          <h3 class="mt-4 font-display text-3xl font-black">{{ draft.name || 'Unnamed user' }}</h3>
          <p class="mt-2 font-bold text-muted">{{ draft.email || 'No email' }}</p>
          <p class="mt-3 text-sm font-black uppercase tracking-[0.14em] text-muted">{{ draft.role }}</p>
        </div>
        <CommonSafeHtmlContent :html="accessNoteHtml" />
      </div>
      <template #footer>
        <UiButton size="sm" variant="secondary" @click="showPreview = false">Close</UiButton>
      </template>
    </UiModal>
  </LayoutPageSection>
</template>

<script setup lang="ts">
import { getAdminUsers } from './adminUsers'

type AdminUsersMode = 'create' | 'edit' | 'detail'

const props = defineProps<{
  mode: AdminUsersMode
}>()

const route = useRoute()
const toast = useToast()
const { user } = useAuth()
const basePath = '/admin/users'
const users = computed(() => getAdminUsers(user.value))
const selectedUser = computed(() => users.value.find((item) => item.id === route.params.id))
const sourceUser = computed(() => (props.mode === 'create' ? undefined : selectedUser.value))
const isReadonly = computed(() => props.mode === 'detail')
const showPreview = ref(false)

const draft = reactive({
  name: sourceUser.value?.name || '',
  email: sourceUser.value?.email || '',
  role: sourceUser.value?.role || 'editor',
  active: sourceUser.value?.status !== 'paused',
})

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
]

const pageTitle = computed(
  () =>
    ({
      create: 'Create user',
      edit: `Edit ${draft.name || 'user'}`,
      detail: draft.name || 'User detail',
    })[props.mode],
)

const pageDescription = computed(
  () =>
    ({
      create: 'Tao admin user moi bang form dung chung.',
      edit: 'Cap nhat thong tin, vai tro va trang thai user.',
      detail: 'Xem thong tin user theo route rieng.',
    })[props.mode],
)

const detailItems = computed(() => [
  { label: 'Name', value: draft.name || 'Unnamed user' },
  { label: 'Email', value: draft.email || 'No email' },
  { label: 'Role', value: draft.role },
  { label: 'Status', value: draft.active ? 'active' : 'paused' },
  { label: 'Provider', value: sourceUser.value?.provider || 'password' },
  { label: 'Last seen', value: sourceUser.value?.lastSeen || 'Never' },
])

const accessNoteHtml = computed(() => ({
  blocks: [
    { type: 'header', data: { level: 2, text: draft.role === 'admin' ? 'Full admin access' : 'Editorial access' } },
    {
      type: 'paragraph',
      data: {
        text: draft.active ? 'Account can access protected admin routes.' : 'Account is paused until an admin reactivates it.',
      },
    },
  ],
}))

const saveUser = () => {
  toast.success(props.mode === 'create' ? 'User created' : 'User saved', `${draft.name || 'This user'} is ready for API sync.`)
}

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
})
</script>
