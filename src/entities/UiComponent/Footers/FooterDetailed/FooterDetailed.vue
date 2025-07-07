<script setup lang="ts">
type Link = { id: number; text: string; url: string };
type Column = { id: number; title: string; links: Link[] };

withDefaults(defineProps<{
  logoText: string;
  copyrightText: string;
  columns: Column[];
}>(), {
  columns: () => [],
});
</script>

<template>
  <footer class="footer-detailed">
    <div class="footer-detailed__container">
      <div class="footer-detailed__main">
        <div class="footer-detailed__brand">
          <h3 class="footer-detailed__logo">{{ logoText }}</h3>
        </div>
        <div class="footer-detailed__nav">
          <div v-for="col in columns" :key="col.id" class="footer-detailed__column">
            <h4 class="footer-detailed__column-title">{{ col.title }}</h4>
            <a
              v-for="link in col.links"
              :key="link.id"
              :href="link.url"
              class="footer-detailed__link">
              {{ link.text }}
            </a>
          </div>
        </div>
      </div>
      <div class="footer-detailed__bottom">
        <p class="footer-detailed__copyright">{{ copyrightText }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" src="./FooterDetailed.scss"></style>
