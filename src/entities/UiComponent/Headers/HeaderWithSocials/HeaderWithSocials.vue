<script setup lang="ts">
import { BurgerIcon } from '@/shared/ui/icons';

defineProps<{
    logoText: string;
    links: Array<{ id: number; text: string; url: string }>;
    socials: Array<{ id: number; name: string; url: string }>;
}>();
</script>

<template>
    <header class="header-with-socials">
        <div class="header-with-socials__container">
            <a href="#" class="header-with-socials__logo">{{ logoText }}</a>
            <nav class="header-with-socials__nav">
                <a
                    v-for="link in links"
                    :key="link.id"
                    :href="link.url"
                    class="header-with-socials__link"
                >{{ link.text }}</a
                >
            </nav>
            <div class="header-with-socials__socials">
                <a
                    v-for="social in socials"
                    :key="social.id"
                    :href="social.url"
                    target="_blank"
                    rel="noopener"
                    class="header-with-socials__social-link"
                    :aria-label="social.name"
                >
                    {{ social.name.substring(0, 1) }}
                </a>
            </div>
            <button class="header-with-socials__burger-btn" aria-label="Toggle menu">
                <BurgerIcon />
            </button>
            <div class="header-with-socials__nav-mobile">
                <a
                    v-for="link in links"
                    :key="link.id"
                    :href="link.url"
                    class="header-with-socials__link"
                >{{ link.text }}</a
                >
            </div>
        </div>
    </header>
</template>

<style lang="scss" src="./HeaderWithSocials.scss"></style>