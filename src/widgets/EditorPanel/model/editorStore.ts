import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditorStore = defineStore('editor', () => {
  const isOpen = ref(false);

  function openEditor() {
    isOpen.value = true;
  }

  function closeEditor() {
    isOpen.value = false;
  }

  function toggleEditor() {
    isOpen.value = !isOpen.value;
  }

  return {
    isOpen,
    openEditor,
    closeEditor,
    toggleEditor,
  };
});