<script setup lang="ts">
type Paragraph = { id: number; text: string };
defineProps<{
  title: string;
  paragraphs: Paragraph[];
  imageUrl: string;
}>();
</script>

<template>
  <section class="text-with-side-image">
    <div class="text-with-side-image__container">
      <div class="text-with-side-image__content">
        <h2 class="text-with-side-image__title">{{ title }}</h2>
        <p v-for="p in paragraphs" :key="p.id" class="text-with-side-image__paragraph">
          {{ p.text }}
        </p>
      </div>
      <div class="text-with-side-image__image-wrapper">
        <img :src="imageUrl" :alt="title" class="text-with-side-image__image" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./TextWithSideImage.scss"></style>
