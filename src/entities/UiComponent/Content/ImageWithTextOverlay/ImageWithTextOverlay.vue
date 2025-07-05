<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  title: string;
  subtitle: string;
  imageUrl: string;
}>();
const sectionStyle = computed(() => ({
  backgroundImage: `url(${props.imageUrl})`,
}));
</script>

<template>
  <section class="image-with-overlay" :style="sectionStyle">
    <div class="image-with-overlay__scrim"></div>
    <div class="image-with-overlay__container">
      <h2 class="image-with-overlay__title">{{ title }}</h2>
      <p class="image-with-overlay__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style lang="scss" src="./ImageWithTextOverlay.scss"></style>
