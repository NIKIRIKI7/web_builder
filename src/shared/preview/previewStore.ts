import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type Device = 'desktop' | 'tablet' | 'mobile';

export interface DeviceOption {
  id: Device;
  width: string | null;
}

const deviceOptions: DeviceOption[] = [
  { id: 'desktop', width: null }, // null означает 100% ширины
  { id: 'tablet', width: '768px' },
  { id: 'mobile', width: '375px' },
];

export const usePreviewStore = defineStore('preview', () => {
  const activeDevice = ref<Device>('desktop');

  const setDevice = (device: Device) => {
    activeDevice.value = device;
  };

  const currentWidth = computed(() => {
    return deviceOptions.find(d => d.id === activeDevice.value)?.width || null;
  });

  return {
    activeDevice,
    deviceOptions,
    currentWidth,
    setDevice,
  };
});