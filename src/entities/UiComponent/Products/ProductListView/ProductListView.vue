<script setup lang="ts">
type Product = {
    id: number;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    url: string;
};

defineProps<{
    title: string;
    products: Product[];
}>();
</script>

<template>
    <section class="product-list-view">
        <h2 class="product-list-view__title">{{ title }}</h2>
        <div class="product-list-view__list">
            <a
                v-for="product in products"
                :key="product.id"
                :href="product.url"
                class="product-list-view__item"
            >
                <div class="product-list-view__image-wrapper">
                    <img
                        :src="product.imageUrl"
                        :alt="product.name"
                        class="product-list-view__image"
                    />
                </div>
                <div class="product-list-view__content">
                    <h3 class="product-list-view__name">{{ product.name }}</h3>
                    <p class="product-list-view__description">{{ product.description }}</p>
                </div>
                <div class="product-list-view__price-wrapper">
                    <p class="product-list-view__price">${{ product.price }}</p>
                </div>
            </a>
        </div>
    </section>
</template>

<style lang="scss" src="./ProductListView.scss"></style>