<script setup lang="ts">
// ИСПРАВЛЕНИЕ: Используем withDefaults для защиты от отсутствующего prop.
// Теперь, если компонент рендерится без prop 'links', он будет использовать
// пустой массив по умолчанию и не будет выдавать ошибку 'Missing required prop'.
withDefaults(defineProps<{
  copyrightText: string;
  links: Array<{ id: number, text: string, url: string }>;
}>(), {
  links: () => [],
});
</script>

<template>
  <footer class="simple-footer">
    <div class="simple-footer__container">
      <div class="simple-footer__links">
        <a
            v-for="link in links"
            :key="link.id"
            :href="link.url"
        >{{ link.text }}</a>
      </div>
      <div class="simple-footer__copyright">
        {{ copyrightText }}
      </div>
    </div>
  </footer>
</template>

<style lang="scss" src="./SimpleFooter.scss"></style>