<script setup lang="ts">
defineProps<{
  logoText: string;
  ctaText: string;
  links: Array<{ id: number, text: string, url:string }>;
}>();
</script>

<template>
  <header class="simple-header">
    <div class="simple-header__container">
      <a href="#" class="simple-header__logo">{{ logoText }}</a>
      <nav class="simple-header__nav">
        <a
            v-for="link in links"
            :key="link.id"
            :href="link.url"
            class="simple-header__link"
        >{{ link.text }}</a>
      </nav>
      <button class="simple-header__cta">{{ ctaText }}</button>
    </div>
  </header>
</template>

<style lang="scss" src="./SimpleHeader.scss"></style>