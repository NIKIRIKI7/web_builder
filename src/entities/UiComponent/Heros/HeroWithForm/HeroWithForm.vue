<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  placeholder: string;
  ctaText: string;
  disclaimer: string;
}>();
</script>

<template>
  <section class="hero-with-form">
    <div class="hero-with-form__container">
      <div class="hero-with-form__content">
        <h1 class="hero-with-form__title">{{ title }}</h1>
        <p class="hero-with-form__subtitle">{{ subtitle }}</p>
        <form class="hero-with-form__form" @submit.prevent>
          <input type="email" class="hero-with-form__input" :placeholder="placeholder" />
          <button type="submit" class="hero-with-form__button">{{ ctaText }}</button>
        </form>
        <p class="hero-with-form__disclaimer">{{ disclaimer }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./HeroWithForm.scss"></style>
