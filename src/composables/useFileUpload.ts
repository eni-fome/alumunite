import { ref } from 'vue'

export function useFileUpload() {
  const imageUrl = ref<string | null>(null)
  const uploadError = ref<string | null>(null)

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    const file = input.files[0]
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      uploadError.value = 'Please upload a valid image file (JPEG, PNG, or GIF)'
      return
    }

    if (file.size > maxSize) {
      uploadError.value = 'File size must be less than 5MB'
      return
    }

    uploadError.value = null
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  return {
    imageUrl,
    uploadError,
    handleFileUpload
  }
}