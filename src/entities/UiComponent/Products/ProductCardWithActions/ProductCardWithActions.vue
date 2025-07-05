<script setup lang="ts">
defineProps<{
  imageUrl: string;
  name: string;
  price: number;
  url: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}>();
</script>

<template>
  <div class="action-card">
    <div class="action-card__image-wrapper">
      <img :src="imageUrl" :alt="name" class="action-card__image" />
      <div class="action-card__overlay">
        <a :href="url" class="action-card__cta">{{ ctaPrimaryText }}</a>
        <button class="action-card__cta action-card__cta--secondary">{{ ctaSecondaryText }}</button>
      </div>
    </div>
    <div class="action-card__details">
      <h3 class="action-card__name"><a :href="url">{{ name }}</a></h3>
      <p class="action-card__price">${{ price }}</p>
    </div>
  </div>
</template>

<style lang="scss" src="./ProductCardWithActions.scss"></style>
