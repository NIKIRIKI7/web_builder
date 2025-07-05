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
  <section class="image-text-split-reversed">
    <div class="image-text-split-reversed__container">
      <div class="image-text-split-reversed__content">
        <h2 class="image-text-split-reversed__title">{{ title }}</h2>
        <p class="image-text-split-reversed__text">{{ text }}</p>
        <a v-if="ctaText" :href="ctaUrl" class="image-text-split-reversed__cta">{{ ctaText }}</a>
      </div>
      <div class="image-text-split-reversed__image-wrapper">
        <img :src="imageUrl" :alt="title" class="image-text-split-reversed__image" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./ImageTextSplitReversed.scss"></style>
