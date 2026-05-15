type ToastTone = 'info' | 'success' | 'warning' | 'danger'

type Toast = {
  id: number
  title: string
  message?: string
  tone: ToastTone
}

let toastId = 0

export const useToast = () => {
  const toasts = useState<Toast[]>('toast-stack', () => [])

  const show = (title: string, message?: string, tone: ToastTone = 'info') => {
    const id = ++toastId
    toasts.value = [...toasts.value, { id, title, message, tone }]

    if (import.meta.client) {
      window.setTimeout(() => dismiss(id), 3800)
    }
  }

  const dismiss = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    show,
    dismiss,
    success: (title: string, message?: string) => show(title, message, 'success'),
    warning: (title: string, message?: string) => show(title, message, 'warning'),
    danger: (title: string, message?: string) => show(title, message, 'danger'),
  }
}
