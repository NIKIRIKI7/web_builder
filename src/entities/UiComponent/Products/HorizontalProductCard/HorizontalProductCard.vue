<script setup lang="ts">
defineProps<{
  imageUrl: string;
  category: string;
  name: string;
  description: string;
  price: number;
  url: string;
}>();
</script>

<template>
  <a :href="url" class="horizontal-card">
    <div class="horizontal-card__image-wrapper">
      <img :src="imageUrl" :alt="name" class="horizontal-card__image" />
    </div>
    <div class="horizontal-card__content">
      <span class="horizontal-card__category">{{ category }}</span>
      <h3 class="horizontal-card__name">{{ name }}</h3>
      <p class="horizontal-card__description">{{ description }}</p>
      <p class="horizontal-card__price">${{ price }}</p>
    </div>
  </a>
</template>

<style lang="scss" src="./HorizontalProductCard.scss"></style>
