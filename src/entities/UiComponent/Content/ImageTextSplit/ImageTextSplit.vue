<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
}>();
</script>

<template>
  <section class="image-text-split">
    <div class="image-text-split__container">
      <div class="image-text-split__image-wrapper">
        <img :src="imageUrl" :alt="title" class="image-text-split__image" />
      </div>
      <div class="image-text-split__content">
        <h2 class="image-text-split__title">{{ title }}</h2>
        <p class="image-text-split__text">{{ text }}</p>
        <a v-if="ctaText" :href="ctaUrl" class="image-text-split__cta">{{ ctaText }}</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./ImageTextSplit.scss"></style>
