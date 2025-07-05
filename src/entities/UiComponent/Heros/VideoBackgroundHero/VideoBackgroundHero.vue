<script setup lang="ts">
defineProps<{
  videoUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
}>();
</script>

<template>
  <section class="video-hero">
    <div class="video-hero__background">
      <video
        class="video-hero__video"
        playsinline
        autoplay
        muted
        loop
        :src="videoUrl"
      ></video>
    </div>
    <div class="video-hero__scrim"></div>
    <div class="video-hero__content">
      <h1 class="video-hero__title">{{ title }}</h1>
      <p class="video-hero__subtitle">{{ subtitle }}</p>
      <a v-if="ctaText" :href="ctaUrl" class="video-hero__cta">{{ ctaText }}</a>
    </div>
  </section>
</template>

<style lang="scss" src="./VideoBackgroundHero.scss"></style>
