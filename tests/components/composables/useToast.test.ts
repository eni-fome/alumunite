// tests/components/composables/useToast.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useToast } from '../../../src/composables/useToast'

describe('useToast', () => {
  beforeEach(() => {
    // Reset the toasts state
    const { toasts } = useToast()
    toasts.value = []
  })

  it('adds a toast message', () => {
    const { toasts, addToast } = useToast()
    addToast('Test message', 'success')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('Test message')
  })

  it('removes a toast message', () => {
    const { toasts, addToast, removeToast } = useToast()
    addToast('Test message', 'success')
    const toastId = toasts.value[0].id
    removeToast(toastId)
    // Wait for next tick since toast removal might be async
    return new Promise(resolve => setTimeout(resolve)).then(() => {
      expect(toasts.value).toHaveLength(0)
    })
  })
})