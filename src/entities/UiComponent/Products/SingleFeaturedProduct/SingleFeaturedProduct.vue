<script setup lang="ts">
type Feature = {
    id: number;
    text: string;
};

defineProps<{
    imageUrl: string;
    category: string;
    name: string;
    description: string;
    features: Feature[];
    price: string;
    ctaText: string;
    ctaUrl: string;
}>();
</script>

<template>
    <section class="single-featured-product">
        <div class="single-featured-product__container">
            <div class="single-featured-product__image-wrapper">
                <img :src="imageUrl" :alt="name" class="single-featured-product__image" />
            </div>
            <div class="single-featured-product__content">
                <span class="single-featured-product__category">{{ category }}</span>
                <h2 class="single-featured-product__name">{{ name }}</h2>
                <p class="single-featured-product__description">{{ description }}</p>
                <ul class="single-featured-product__features-list">
                    <li
                        v-for="feature in features"
                        :key="feature.id"
                        class="single-featured-product__feature-item"
                    >
                        {{ feature.text }}
                    </li>
                </ul>
                <div class="single-featured-product__footer">
                    <span class="single-featured-product__price">{{ price }}</span>
                    <a :href="ctaUrl" class="single-featured-product__cta">{{
                            ctaText
                        }}</a>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" src="./SingleFeaturedProduct.scss"></style>