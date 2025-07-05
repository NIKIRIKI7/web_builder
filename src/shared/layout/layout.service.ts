import type { LayoutNode, LayoutPanel, LayoutItem } from './types';

function normalizeSizes(items: LayoutItem[]) {
  if (items.length === 0) return;
  const totalSize = items.reduce((sum, item) => sum + item.size, 0);
  if (totalSize === 0) {
    const equalSize = 100 / items.length;
    items.forEach(item => { item.size = equalSize; });
    return;
  };
  const factor = 100 / totalSize;
  items.forEach(item => {
    item.size *= factor;
  });
}

function findParentAndResize(node: LayoutNode, path: string[], delta: number): boolean {
  if (path.length === 2) {
    const parent = node;
    const childId = path[1];
    const childIndex = parent.children.findIndex(c => c.id === childId);

    if (childIndex !== -1 && childIndex < parent.children.length - 1) {
      const currentChild = parent.children[childIndex];
      const nextChild = parent.children[childIndex + 1];
      const combinedSize = currentChild.size + nextChild.size;
      const minSize = 10;

      let newCurrentSize = currentChild.size + delta;
      if (newCurrentSize < minSize) newCurrentSize = minSize;
      if (newCurrentSize > combinedSize - minSize) newCurrentSize = combinedSize - minSize;

      currentChild.size = newCurrentSize;
      nextChild.size = combinedSize - newCurrentSize;
      return true;
    }
  }

  for (const child of node.children) {
    if (child.type !== 'panel' && child.id === path[1]) {
      const newPath = path.slice(1);
      if (findParentAndResize(child, newPath, delta)) return true;
    }
  }
  return false;
}

function findAndRemovePanel(node: LayoutNode, panelId: string): LayoutPanel | null {
  const index = node.children.findIndex(c => c.id === panelId);
  if (index !== -1) {
    const [removed] = node.children.splice(index, 1);
    // Нормализация здесь не нужна, она будет после вставки
    return removed as LayoutPanel;
  }
  for (const child of node.children) {
    if (child.type !== 'panel') {
      const removed = findAndRemovePanel(child, panelId);
      if (removed) return removed;
    }
  }
  return null;
}

function findAndInsertPanel(node: LayoutNode, targetId: string, panelToInsert: LayoutPanel, dropSide: 'before' | 'after'): boolean {
  const targetIndex = node.children.findIndex(c => c.id === targetId);
  if (targetIndex !== -1) {
    const insertIndex = dropSide === 'before' ? targetIndex : targetIndex + 1;

    // Просто вставляем панель с ее исходным размером
    node.children.splice(insertIndex, 0, panelToInsert);

    // Нормализуем размеры ВСЕХ детей один раз в конце
    normalizeSizes(node.children);
    return true;
  }
  for (const child of node.children) {
    if (child.type !== 'panel') {
      if (findAndInsertPanel(child, targetId, panelToInsert, dropSide)) return true;
    }
  }
  return false;
}

export const LayoutService = {
  findParentAndResize,
  findAndRemovePanel,
  findAndInsertPanel,
};