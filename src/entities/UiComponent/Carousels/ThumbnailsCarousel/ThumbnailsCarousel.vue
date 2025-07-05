<script setup lang="ts">
type Slide = {
  id: number;
  imageUrl: string;
  altText: string;
};

defineProps<{
  slides: Slide[];
}>();
</script>

<template>
  <section class="thumbnails-carousel">
    <div class="thumbnails-carousel__main-view">
      <img
        v-if="slides.length > 0"
        :src="slides[0].imageUrl"
        :alt="slides[0].altText"
        class="thumbnails-carousel__main-image"
      />
    </div>
    <div class="thumbnails-carousel__nav">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="thumbnails-carousel__thumb-btn"
        :data-index="index"
      >
        <img :src="slide.imageUrl" :alt="slide.altText" class="thumbnails-carousel__thumb-image" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" src="./ThumbnailsCarousel.scss"></style>
