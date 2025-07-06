<script setup lang="ts">
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
  logoText: string;
  ctaText: string;
  linksLeft: Array<{ id: number, text: string, url: string }>;
  linksRight: Array<{ id: number, text: string, url: string }>;
}>();
</script>

<template>
  <header class="header-centered">
    <div class="header-centered__container">
      <nav class="header-centered__nav header-centered__nav--left">
        <a
          v-for="link in linksLeft"
          :key="link.id"
          :href="link.url"
          class="header-centered__link"
        >{{ link.text }}</a>
      </nav>

      <a href="#" class="header-centered__logo">{{ logoText }}</a>

      <nav class="header-centered__nav header-centered__nav--right">
        <a
          v-for="link in linksRight"
          :key="link.id"
          :href="link.url"
          class="header-centered__link"
        >{{ link.text }}</a>
        <button class="header-centered__cta">{{ ctaText }}</button>
      </nav>

      <button class="header-centered__burger-btn" aria-label="Toggle menu" aria-expanded="false">
        <BurgerIcon />
      </button>

      <div class="header-centered__nav-mobile">
        <a
          v-for="link in linksLeft"
          :key="link.id"
          :href="link.url"
          class="header-centered__link"
        >{{ link.text }}</a>
        <a
          v-for="link in linksRight"
          :key="link.id"
          :href="link.url"
          class="header-centered__link"
        >{{ link.text }}</a>
        <button class="header-centered__cta">{{ ctaText }}</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" src="./HeaderCentered.scss"></style>