<script setup lang="ts">
type Category = {
    id: number;
    name: string;
    imageUrl: string;
    url: string;
};
defineProps<{
    title: string;
    categories: Category[];
}>();
</script>

<template>
    <section class="category-showcase">
        <h2 class="category-showcase__title">{{ title }}</h2>
        <div class="category-showcase__grid">
            <a
                v-for="category in categories"
                :key="category.id"
                :href="category.url"
                class="category-showcase__card"
            >
                <div
                    class="category-showcase__background"
                    :style="{ backgroundImage: `url(${category.imageUrl})` }"
                ></div>
                <div class="category-showcase__scrim"></div>
                <h3 class="category-showcase__name">{{ category.name }}</h3>
            </a>
        </div>
    </section>
</template>

<style lang="scss" src="./CategoryShowcase.scss"></style>