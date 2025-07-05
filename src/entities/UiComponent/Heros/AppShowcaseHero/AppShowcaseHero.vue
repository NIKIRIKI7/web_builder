<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryUrl: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
  imageUrl: string;
}>();
</script>

<template>
  <section class="app-hero">
    <div class="app-hero__container">
      <div class="app-hero__content">
        <h1 class="app-hero__title">{{ title }}</h1>
        <p class="app-hero__subtitle">{{ subtitle }}</p>
        <div class="app-hero__actions">
          <a :href="ctaPrimaryUrl" class="app-hero__cta app-hero__cta--primary">{{ ctaPrimaryText }}</a>
          <a :href="ctaSecondaryUrl" class="app-hero__cta app-hero__cta--secondary">{{ ctaSecondaryText }}</a>
        </div>
      </div>
      <div class="app-hero__image-wrapper">
        <img :src="imageUrl" alt="App Showcase" class="app-hero__image" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./AppShowcaseHero.scss"></style>
