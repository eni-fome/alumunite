<template>
  <Modal
    :is-open="isOpen"
    :title="options.title"
    :confirm-text="options.confirmText"
    :confirm-button-class="options.confirmButtonClass"
    @close="handleCancel"
    @confirm="handleConfirm"
  >
    <p class="text-gray-600">{{ options.message }}</p>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

const { isOpen, options, handleConfirm, handleCancel } = useConfirmDialog()
</script>