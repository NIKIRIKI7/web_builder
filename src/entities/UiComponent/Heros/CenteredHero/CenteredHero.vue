<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryUrl: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
}>();
</script>

<template>
  <section class="centered-hero">
    <div class="centered-hero__container">
      <h1 class="centered-hero__title">{{ title }}</h1>
      <p class="centered-hero__subtitle">{{ subtitle }}</p>
      <div class="centered-hero__actions">
        <a :href="ctaPrimaryUrl" class="centered-hero__cta centered-hero__cta--primary">{{ ctaPrimaryText }}</a>
        <a :href="ctaSecondaryUrl" class="centered-hero__cta centered-hero__cta--secondary">{{ ctaSecondaryText }}</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./CenteredHero.scss"></style>
