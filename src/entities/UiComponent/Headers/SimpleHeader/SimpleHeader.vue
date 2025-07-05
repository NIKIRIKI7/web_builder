<script setup lang="ts">
import { ref } from 'vue';
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
  logoText: string;
  ctaText: string;
  links: Array<{ id: number, text: string, url:string }>;
}>();

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header class="simple-header">
    <div class="simple-header__container">
      <a href="#" class="simple-header__logo">{{ logoText }}</a>

      <nav
        class="simple-header__nav"
        :class="{ 'simple-header__nav--is-open': isMenuOpen }"
      >
        <a
          v-for="link in links"
          :key="link.id"
          :href="link.url"
          class="simple-header__link"
          @click="isMenuOpen = false"
        >{{ link.text }}</a>
        <button class="simple-header__cta simple-header__cta--mobile">{{ ctaText }}</button>
      </nav>

      <button
        class="simple-header__burger-btn"
        @click="toggleMenu"
        aria-label="Toggle menu"
        :aria-expanded="isMenuOpen"
      >
        <BurgerIcon />
      </button>
    </div>
  </header>
</template>

<style lang="scss" src="./SimpleHeader.scss"></style>