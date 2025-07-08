<script setup lang="ts">
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
    logoText: string;
    links: Array<{ id: number; text: string; url: string }>;
}>();
</script>

<template>
    <header class="minimalist-header">
        <div class="minimalist-header__container">
            <a href="#" class="minimalist-header__logo">{{ logoText }}</a>
            <button class="minimalist-header__burger-btn" aria-label="Toggle menu">
                <BurgerIcon />
            </button>
            <nav class="minimalist-header__nav-mobile">
                <a
                    v-for="link in links"
                    :key="link.id"
                    :href="link.url"
                    class="minimalist-header__link"
                >{{ link.text }}</a
                >
            </nav>
        </div>
    </header>
</template>

<style lang="scss" src="./MinimalistHeader.scss"></style>