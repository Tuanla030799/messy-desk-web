export default defineNuxtRouteMiddleware((to) => {
  const isAdminPath = to.path === '/admin' || to.path.startsWith('/admin/')

  if (!isAdminPath) {
    return
  }

  const { isAuthenticated } = useAuth()

  if (isAuthenticated.value) {
    return
  }

  return navigateTo({
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  })
})
