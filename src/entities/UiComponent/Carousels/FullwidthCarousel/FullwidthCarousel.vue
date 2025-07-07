<script setup lang="ts">
type Slide = {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
};

defineProps<{
  slides: Slide[];
}>();
</script>

<template>
  <section class="fullwidth-carousel">
    <div class="fullwidth-carousel__track">
      <div
        v-for="slide in slides"
        :key="slide.id"
        class="fullwidth-carousel__slide"
        :style="{ backgroundImage: `url(${slide.imageUrl})` }">
        <div class="fullwidth-carousel__scrim"></div>
        <div class="fullwidth-carousel__content">
          <h2 class="fullwidth-carousel__title">{{ slide.title }}</h2>
          <p class="fullwidth-carousel__subtitle">{{ slide.subtitle }}</p>
          <a v-if="slide.ctaText" :href="slide.ctaUrl" class="fullwidth-carousel__cta">{{ slide.ctaText }}</a>
        </div>
      </div>
    </div>
    <div class="fullwidth-carousel__pagination"></div>
  </section>
</template>

<style lang="scss" src="./FullwidthCarousel.scss"></style>
