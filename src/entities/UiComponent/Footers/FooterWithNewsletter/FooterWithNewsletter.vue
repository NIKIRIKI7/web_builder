<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  copyrightText: string;
}>();
</script>

<template>
  <footer class="footer-with-newsletter">
    <div class="footer-with-newsletter__container">
      <div class="footer-with-newsletter__content">
        <h3 class="footer-with-newsletter__title">{{ title }}</h3>
        <p class="footer-with-newsletter__subtitle">{{ subtitle }}</p>
        <form class="footer-with-newsletter__form" @submit.prevent>
          <input type="email" :placeholder="placeholder" class="footer-with-newsletter__input" />
          <button type="submit" class="footer-with-newsletter__button">{{ buttonText }}</button>
        </form>
      </div>
      <p class="footer-with-newsletter__copyright">{{ copyrightText }}</p>
    </div>
  </footer>
</template>

<style lang="scss" src="./FooterWithNewsletter.scss"></style>
