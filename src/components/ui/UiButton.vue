<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    class="ui-button"
    :class="[variantClass, sizeClass, { 'pointer-events-none opacity-60': loading || disabled }]"
    :disabled="!to && (disabled || loading)"
  >
    <UiLoadingIcon v-if="loading" size="sm" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    to?: string
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
  },
)

const variantClass = computed(
  () =>
    ({
      primary: 'bg-sun text-ink shadow-[4px_5px_0_#17202a] hover:shadow-[2px_3px_0_#17202a]',
      secondary: 'bg-white text-ink shadow-soft-doodle hover:bg-mint',
      ghost: 'bg-transparent text-ink shadow-none hover:bg-white',
      danger: 'bg-coral text-ink shadow-[4px_5px_0_#17202a] hover:shadow-[2px_3px_0_#17202a]',
    })[props.variant],
)

const sizeClass = computed(
  () =>
    ({
      sm: 'min-h-9 px-3 text-sm',
      md: 'min-h-11 px-5 text-sm',
      lg: 'min-h-12 px-6 text-base',
    })[props.size],
)
</script>

<style scoped>
.ui-button {
  align-items: center;
  border: 2px solid #17202a;
  border-radius: 999px;
  display: inline-flex;
  font-weight: 900;
  gap: 0.55rem;
  justify-content: center;
  transition:
    box-shadow 160ms ease,
    transform 160ms ease,
    background 160ms ease;
}

.ui-button:hover {
  transform: translate(2px, 2px) rotate(-1deg);
}
</style>
