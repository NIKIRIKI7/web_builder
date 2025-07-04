<script setup lang="ts">
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';

const canvasStore = useCanvasStore();

function downloadFile(filename: string, content: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Обработчик теперь асинхронный
 */
async function handleExport() {
  // Добавляем await, чтобы дождаться генерации HTML
  const htmlContent = await canvasStore.generateHtmlString();
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
  justify-content: space-between; // Располагаем элементы по краям
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