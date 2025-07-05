<script setup lang="ts">
type Filter = {
  key: string;
  label: string;
};
type Product = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
};

defineProps<{
  title: string;
  filters: Filter[];
  products: Product[];
}>();
</script>

<template>
  <section class="filtered-grid">
    <h2 class="filtered-grid__title">{{ title }}</h2>
    <div class="filtered-grid__filters">
      <button
        v-for="filter in filters"
        :key="filter.key"
        class="filtered-grid__filter-btn"
        :data-filter="filter.key"
      >{{ filter.label }}</button>
    </div>
    <div class="filtered-grid__items">
      <div
        v-for="product in products"
        :key="product.id"
        class="filtered-grid__item"
        :data-category="product.category"
      >
        <div class="filtered-grid__image-wrapper">
          <img :src="product.imageUrl" :alt="product.name" class="filtered-grid__image" />
        </div>
        <h3 class="filtered-grid__name">{{ product.name }}</h3>
        <p class="filtered-grid__price">${{ product.price }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./ProductGridWithFilters.scss"></style>
