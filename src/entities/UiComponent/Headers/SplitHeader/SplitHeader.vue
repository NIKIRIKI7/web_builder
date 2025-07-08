<script setup lang="ts">
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
    logoText: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    links: Array<{ id: number; text: string; url: string }>;
}>();
</script>

<template>
    <header class="split-header">
        <div class="split-header__container">
            <div class="split-header__left">
                <a href="#" class="split-header__logo">{{ logoText }}</a>
                <nav class="split-header__nav">
                    <a
                        v-for="link in links"
                        :key="link.id"
                        :href="link.url"
                        class="split-header__link"
                    >{{ link.text }}</a
                    >
                </nav>
            </div>
            <div class="split-header__right">
                <button class="split-header__cta split-header__cta--secondary">
                    {{ ctaSecondaryText }}
                </button>
                <button class="split-header__cta split-header__cta--primary">
                    {{ ctaPrimaryText }}
                </button>
            </div>

            <button class="split-header__burger-btn" aria-label="Toggle menu">
                <BurgerIcon />
            </button>

            <div class="split-header__nav-mobile">
                <nav class="split-header__nav-mobile-links">
                    <a
                        v-for="link in links"
                        :key="link.id"
                        :href="link.url"
                        class="split-header__link"
                    >{{ link.text }}</a
                    >
                </nav>
                <div class="split-header__nav-mobile-actions">
                    <button class="split-header__cta split-header__cta--secondary">
                        {{ ctaSecondaryText }}
                    </button>
                    <button class="split-header__cta split-header__cta--primary">
                        {{ ctaPrimaryText }}
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" src="./SplitHeader.scss"></style>