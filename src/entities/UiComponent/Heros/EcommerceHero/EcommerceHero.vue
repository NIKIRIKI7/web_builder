<script setup lang="ts">
defineProps<{
  mainText: string;
  subText: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
}>();
</script>

<template>
  <section class="ecommerce-hero">
    <div class="ecommerce-hero__container">
      <div class="ecommerce-hero__content">
        <h1 class="ecommerce-hero__main-text">{{ mainText }}</h1>
        <h2 class="ecommerce-hero__sub-text">{{ subText }}</h2>
        <a :href="ctaUrl" class="ecommerce-hero__cta">{{ ctaText }}</a>
      </div>
      <div class="ecommerce-hero__image-wrapper">
        <img :src="imageUrl" alt="New Arrivals" class="ecommerce-hero__image" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./EcommerceHero.scss"></style>
