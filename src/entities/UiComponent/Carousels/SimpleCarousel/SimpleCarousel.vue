<script setup lang="ts">
type Slide = {
  id: number;
  imageUrl: string;
  altText: string;
};

defineProps<{
  slides: Slide[];
  height: string;
}>();
</script>

<template>
  <section class="simple-carousel">
    <div class="simple-carousel__viewport" :style="{ height: height }">
      <div class="simple-carousel__track">
        <div v-for="slide in slides" :key="slide.id" class="simple-carousel__slide">
          <img :src="slide.imageUrl" :alt="slide.altText" class="simple-carousel__image" />
        </div>
      </div>
    </div>
    <button class="simple-carousel__btn simple-carousel__btn--prev" aria-label="Previous slide">&lt;</button>
    <button class="simple-carousel__btn simple-carousel__btn--next" aria-label="Next slide">&gt;</button>
  </section>
</template>

<style lang="scss" src="./SimpleCarousel.scss"></style>
