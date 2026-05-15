<template>
  <LoginPage />
</template>

<script setup lang="ts">
import LoginPage from '@/components/component-pages/login/LoginPage.vue'

definePageMeta({
  middleware: 'guest',
})
</script>
