<script setup lang="ts">
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
  logoText: string;
  topBarText: string;
  ctaText: string;
  links: Array<{ id: number; text: string; url: string }>;
}>();
</script>

<template>
  <header class="header-with-top-bar">
    <div class="header-with-top-bar__top-bar">
      <span>{{ topBarText }}</span>
    </div>
    <div class="header-with-top-bar__main">
      <div class="header-with-top-bar__container">
        <a href="#" class="header-with-top-bar__logo">{{ logoText }}</a>
        <nav class="header-with-top-bar__nav">
          <a
              v-for="link in links"
              :key="link.id"
              :href="link.url"
              class="header-with-top-bar__link"
          >{{ link.text }}</a
          >
        </nav>
        <button class="header-with-top-bar__cta">{{ ctaText }}</button>
        <button
            class="header-with-top-bar__burger-btn"
            aria-label="Toggle menu"
            aria-expanded="false"
        >
          <BurgerIcon />
        </button>
        <div class="header-with-top-bar__nav-mobile">
          <a
              v-for="link in links"
              :key="link.id"
              :href="link.url"
              class="header-with-top-bar__link"
          >{{ link.text }}</a
          >
          <button class="header-with-top-bar__cta">{{ ctaText }}</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" src="./HeaderWithTopBar.scss"></style>