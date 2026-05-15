import type { ZodType } from 'zod'

type ValidationErrors<T> = Partial<Record<keyof T, string>>
type Validator<T> = (values: T) => ValidationErrors<T>
type FormValidator<T> = Validator<T> | ZodType<T>

const isZodValidator = <T>(validator: FormValidator<T>): validator is ZodType<T> => 'safeParse' in validator

export const useForm = <T extends Record<string, unknown>>(initialValues: T, validator?: FormValidator<T>) => {
  const values = reactive({ ...initialValues }) as T
  const errors = ref<ValidationErrors<T>>({})
  const isSubmitting = ref(false)

  const validate = () => {
    if (!validator) {
      errors.value = {}
      return true
    }

    if (isZodValidator(validator)) {
      const result = validator.safeParse(values)

      if (result.success) {
        errors.value = {}
        return true
      }

      errors.value = result.error.issues.reduce<ValidationErrors<T>>((acc, issue) => {
        const key = issue.path[0] as keyof T | undefined

        if (key) {
          acc[key] = issue.message
        }

        return acc
      }, {})

      return false
    }

    const nextErrors = validator(values)
    errors.value = Object.fromEntries(
      Object.entries(nextErrors).filter(([, message]) => Boolean(message)),
    ) as ValidationErrors<T>

    return Object.keys(errors.value).length === 0
  }

  const reset = () => {
    Object.assign(values, initialValues)
    errors.value = {}
  }

  const submit = async (handler: (values: T) => Promise<void> | void) => {
    if (!validate()) {
      return
    }

    isSubmitting.value = true

    try {
      await handler(values)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    validate,
    reset,
    submit,
  }
}
