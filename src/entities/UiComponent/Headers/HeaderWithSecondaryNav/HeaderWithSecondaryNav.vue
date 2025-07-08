<script setup lang="ts">
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
    logoText: string;
    utilityLinks: Array<{ id: number; text: string; url: string }>;
    mainLinks: Array<{ id: number; text: string; url: string }>;
}>();
</script>

<template>
    <header class="secondary-nav-header">
        <div class="secondary-nav-header__top">
            <div class="secondary-nav-header__container">
                <nav class="secondary-nav-header__utility-nav">
                    <a
                        v-for="link in utilityLinks"
                        :key="link.id"
                        :href="link.url"
                        class="secondary-nav-header__utility-link"
                    >{{ link.text }}</a
                    >
                </nav>
            </div>
        </div>
        <div class="secondary-nav-header__bottom">
            <div class="secondary-nav-header__container">
                <a href="#" class="secondary-nav-header__logo">{{ logoText }}</a>
                <nav class="secondary-nav-header__main-nav">
                    <a
                        v-for="link in mainLinks"
                        :key="link.id"
                        :href="link.url"
                        class="secondary-nav-header__main-link"
                    >{{ link.text }}</a
                    >
                </nav>
                <button
                    class="secondary-nav-header__burger-btn"
                    aria-label="Toggle menu"
                >
                    <BurgerIcon />
                </button>
            </div>
        </div>
        <nav class="secondary-nav-header__nav-mobile">
            <a
                v-for="link in mainLinks"
                :key="link.id"
                :href="link.url"
                class="secondary-nav-header__main-link"
            >{{ link.text }}</a
            >
            <hr />
            <a
                v-for="link in utilityLinks"
                :key="link.id"
                :href="link.url"
                class="secondary-nav-header__utility-link"
            >{{ link.text }}</a
            >
        </nav>
    </header>
</template>

<style lang="scss" src="./HeaderWithSecondaryNav.scss"></style>