<script setup lang="ts">
type Testimonial = {
  id: number;
  avatarUrl: string;
  quote: string;
  authorName: string;
  authorTitle: string;
};

defineProps<{
  testimonials: Testimonial[];
}>();
</script>

<template>
  <section class="testimonials-carousel">
    <div class="testimonials-carousel__viewport">
      <div class="testimonials-carousel__track">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonials-carousel__slide">
          <div class="testimonials-carousel__content">
            <img :src="testimonial.avatarUrl" :alt="testimonial.authorName" class="testimonials-carousel__avatar" />
            <blockquote class="testimonials-carousel__quote">
              <p>"{{ testimonial.quote }}"</p>
            </blockquote>
            <cite class="testimonials-carousel__author">
              <span class="testimonials-carousel__author-name">{{ testimonial.authorName }}</span>
              <span class="testimonials-carousel__author-title">{{ testimonial.authorTitle }}</span>
            </cite>
          </div>
        </div>
      </div>
    </div>
    <div class="testimonials-carousel__pagination"></div>
  </section>
</template>

<style lang="scss" src="./TestimonialsCarousel.scss"></style>
