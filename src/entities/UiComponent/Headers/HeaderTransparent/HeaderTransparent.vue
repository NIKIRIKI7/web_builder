<script setup lang="ts">
defineProps<{
  logoText: string;
  ctaText: string;
  links: Array<{ id: number, text: string, url: string }>;
}>();
</script>

<template>
  <header class="header-transparent">
    <div class="header-transparent__container">
      <a href="#" class="header-transparent__logo">{{ logoText }}</a>
      <nav class="header-transparent__nav">
        <a
          v-for="link in links"
          :key="link.id"
          :href="link.url"
          class="header-transparent__link"
        >{{ link.text }}</a>
      </nav>
      <button class="header-transparent__cta">{{ ctaText }}</button>
    </div>
  </header>
</template>

<style lang="scss" src="./HeaderTransparent.scss"></style>
