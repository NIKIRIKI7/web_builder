<script setup lang="ts">
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { exportToHtml } from '@/features/ExportManager/model/htmlExporter';

const canvasManager = useCanvasManager();

function downloadFile(filename: string, content: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

async function handleExport() {
  // Получаем данные из computed-свойства фасада, используя .value.
  // Это гарантирует, что мы работаем с актуальным и правильно сформированным массивом.
  const componentsToExport = canvasManager.renderedComponents.value;

  const htmlContent = await exportToHtml(componentsToExport);
  downloadFile('my-page.html', htmlContent);
}
</script>

<template>
  <header class="the-header">
    <div class="the-header__logo">Web Builder</div>
    <div class="the-header__actions">
      <button class="the-header__export-btn" @click="handleExport">
        Export to HTML
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.the-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: $header-height;
  padding: 0 24px;
  background-color: $color-bg-secondary;
  border-bottom: 1px solid $color-border;
  z-index: $z-index-header;

  &__logo {
    font-size: 20px;
    font-weight: 600;
    color: $color-text-primary;
  }

  &__actions {
    // Контейнер для кнопок
  }

  &__export-btn {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>