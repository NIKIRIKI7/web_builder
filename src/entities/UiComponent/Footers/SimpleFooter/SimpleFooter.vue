<script setup lang="ts">
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