<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  imageUrl: string;
}>();
</script>

<template>
  <section class="text-then-image">
    <div class="text-then-image__container">
      <div class="text-then-image__content">
        <h2 class="text-then-image__title">{{ title }}</h2>
        <p class="text-then-image__text">{{ text }}</p>
      </div>
      <div class="text-then-image__image-wrapper">
        <img :src="imageUrl" :alt="title" class="text-then-image__image" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./TextThenImage.scss"></style>
