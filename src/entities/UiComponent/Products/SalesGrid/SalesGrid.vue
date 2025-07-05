<script setup lang="ts">
type Product = {
  id: number;
  imageUrl: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  url: string;
};

defineProps<{
  title: string;
  products: Product[];
}>();
</script>

<template>
  <section class="sales-grid">
    <h2 class="sales-grid__title">{{ title }}</h2>
    <div class="sales-grid__items">
      <a v-for="product in products" :key="product.id" :href="product.url" class="sales-grid__card">
        <div class="sales-grid__image-wrapper">
          <img :src="product.imageUrl" :alt="product.name" class="sales-grid__image" />
        </div>
        <div class="sales-grid__details">
          <h3 class="sales-grid__name">{{ product.name }}</h3>
          <div class="sales-grid__price-wrapper">
            <span class="sales-grid__sale-price">${{ product.salePrice }}</span>
            <span class="sales-grid__original-price">${{ product.originalPrice }}</span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<style lang="scss" src="./SalesGrid.scss"></style>
