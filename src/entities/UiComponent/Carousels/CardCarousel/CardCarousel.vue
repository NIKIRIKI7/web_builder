<script setup lang="ts">
type Card = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  url: string;
};

defineProps<{
  cards: Card[];
}>();
</script>

<template>
  <section class="card-carousel">
    <div class="card-carousel__viewport">
      <div class="card-carousel__track">
        <a
          v-for="card in cards"
          :key="card.id"
          :href="card.url"
          class="card-carousel__slide">
          <div class="card-carousel__card">
            <img :src="card.imageUrl" :alt="card.title" class="card-carousel__image" />
            <div class="card-carousel__content">
              <span class="card-carousel__category">{{ card.category }}</span>
              <h3 class="card-carousel__title">{{ card.title }}</h3>
            </div>
          </div>
        </a>
      </div>
    </div>
    <button class="card-carousel__btn card-carousel__btn--prev" aria-label="Previous set of cards">&lt;</button>
    <button class="card-carousel__btn card-carousel__btn--next" aria-label="Next set of cards">&gt;</button>
  </section>
</template>

<style lang="scss" src="./CardCarousel.scss"></style>
