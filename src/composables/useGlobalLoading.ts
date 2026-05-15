export const useGlobalLoading = () => {
  const isLoading = useState('global-loading:active', () => false)
  const label = useState('global-loading:label', () => 'Loading')

  const start = (message = 'Loading') => {
    label.value = message
    isLoading.value = true
  }

  const stop = () => {
    isLoading.value = false
  }

  const withLoading = async <T>(task: () => Promise<T>, message = 'Loading') => {
    start(message)

    try {
      return await task()
    } finally {
      stop()
    }
  }

  return {
    isLoading,
    label,
    start,
    stop,
    withLoading,
  }
}
