<script setup lang="ts">
type Product = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    url: string;
};

defineProps<{
    title: string;
    products: Product[];
}>();
</script>

<template>
    <section class="bestsellers-carousel">
        <h2 class="bestsellers-carousel__title">{{ title }}</h2>
        <div class="bestsellers-carousel__viewport">
            <div class="bestsellers-carousel__track">
                <a
                    v-for="product in products"
                    :key="product.id"
                    :href="product.url"
                    class="bestsellers-carousel__slide"
                >
                    <div class="bestsellers-carousel__card">
                        <div class="bestsellers-carousel__image-wrapper">
                            <img
                                :src="product.imageUrl"
                                :alt="product.name"
                                class="bestsellers-carousel__image"
                            />
                        </div>
                        <div class="bestsellers-carousel__details">
                            <h3 class="bestsellers-carousel__name">{{ product.name }}</h3>
                            <p class="bestsellers-carousel__price">${{ product.price }}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <button
            class="bestsellers-carousel__btn bestsellers-carousel__btn--prev"
            aria-label="Previous products"
        >
        </button>
        <button
            class="bestsellers-carousel__btn bestsellers-carousel__btn--next"
            aria-label="Next products"
        >
        </button>
    </section>
</template>

<style lang="scss" src="./BestsellersCarousel.scss"></style>