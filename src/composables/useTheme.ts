type ThemeName = 'paper' | 'night'

export const useTheme = () => {
  const theme = useState<ThemeName>('theme-name', () => 'paper')

  const applyTheme = (nextTheme: ThemeName) => {
    theme.value = nextTheme

    if (import.meta.client) {
      document.documentElement.dataset.theme = nextTheme
      localStorage.setItem('creative-theme', nextTheme)
    }
  }

  const toggleTheme = () => {
    applyTheme(theme.value === 'paper' ? 'night' : 'paper')
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('creative-theme') as ThemeName | null
    applyTheme(savedTheme || theme.value)
  })

  return {
    theme,
    applyTheme,
    toggleTheme,
  }
}
