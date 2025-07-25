import { onBeforeUnmount, onMounted } from 'vue';

import type { Ref } from 'vue';

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void): void {
  const handleClick = (event: MouseEvent): void => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick);
  });
}