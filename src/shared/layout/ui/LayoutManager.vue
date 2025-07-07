<script setup lang="ts">
import { computed } from 'vue';

import { useLayoutStore } from '../layoutStore';

import LayoutPanel from './LayoutPanel.vue';
import LayoutSplitter from './LayoutSplitter.vue';

import type { LayoutItem, LayoutNode } from '../types';


const props = defineProps<{
  node: LayoutNode;
  path?: string[];
}>();

const layoutStore = useLayoutStore();

function handleResize(child: LayoutItem, delta: number): void {
  const newPath = [...(props.path || []), props.node.id, child.id];
  const totalSize = props.node.type === 'row' ? window.innerWidth : window.innerHeight;
  const relativeDelta = (delta / totalSize) * 100;
  layoutStore.resizePanel(newPath, relativeDelta);
}

const isDropTarget = computed(() => (childId: string, side: 'before' | 'after'): boolean => {
  if (!layoutStore.dropTarget || !layoutStore.draggedPanelId) return false;
  return layoutStore.dropTarget.panelId === childId && layoutStore.dropTarget.side === side;
});

const shouldShowSplitter = (index: number): boolean => {
  if (!layoutStore.isEditMode || index >= props.node.children.length - 1) return false;

  const currentChild = props.node.children[index];
  const nextChild = props.node.children[index + 1];

  if (isDropTarget.value(currentChild.id, 'after')) return false;
  if (isDropTarget.value(nextChild.id, 'before')) return false;

  return true;
};
</script>

<template>
  <div
      class="layout-manager"
      :class="`layout-manager--${node.type}`"
  >
    <template v-for="(child, index) in node.children" :key="child.id">
      <div
          v-if="isDropTarget(child.id, 'before')"
          class="layout-manager__placeholder"
          :class="`layout-manager__placeholder--${node.type}`"
      />

      <div
          class="layout-manager__child"
          :style="{ flexBasis: `${child.size}%` }"
      >
        <template v-if="child.type === 'panel'">
          <LayoutPanel :panel="child" :parent-type="node.type" />
        </template>
        <template v-else>
          <LayoutManager :node="child" :path="[...(path || []), node.id]" />
        </template>
      </div>

      <div
          v-if="isDropTarget(child.id, 'after')"
          class="layout-manager__placeholder"
          :class="`layout-manager__placeholder--${node.type}`"
      />

      <LayoutSplitter
          v-if="shouldShowSplitter(index)"
          :type="node.type"
          @resize="handleResize(child, $event)"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.layout-manager {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &--row {
    flex-direction: row;
  }

  &--col {
    flex-direction: column;
  }
}

.layout-manager__child {
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;
}

.layout-manager__placeholder {
  flex-shrink: 0;
  background-color: rgba(var(--color-accent-rgb, 52, 152, 219), 0.1);
  border: 2px dashed var(--color-accent);
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &--row {
    width: 10px;
    height: 100%;
  }

  &--col {
    width: 100%;
    height: 10px;
  }
}
</style>