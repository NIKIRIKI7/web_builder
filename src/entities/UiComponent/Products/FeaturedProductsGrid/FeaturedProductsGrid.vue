<script setup lang="ts">
type Product = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  badgeText: string;
  url: string;
};

defineProps<{
  title: string;
  viewAllText: string;
  viewAllUrl: string;
  products: Product[];
}>();
</script>

<template>
  <section class="featured-products">
    <div class="featured-products__header">
      <h2 class="featured-products__title">{{ title }}</h2>
      <a :href="viewAllUrl" class="featured-products__view-all">{{ viewAllText }}</a>
    </div>
    <div class="featured-products__grid">
      <a
        v-for="product in products"
        :key="product.id"
        :href="product.url"
        class="featured-products__card-link">
        <div class="featured-products__card">
          <div class="featured-products__image-wrapper">
            <img :src="product.imageUrl" :alt="product.name" class="featured-products__image" />
            <span v-if="product.badgeText" class="featured-products__badge">{{ product.badgeText }}</span>
          </div>
          <div class="featured-products__details">
            <h3 class="featured-products__name">{{ product.name }}</h3>
            <p class="featured-products__price">${{ product.price }}</p>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<style lang="scss" src="./FeaturedProductsGrid.scss"></style>
