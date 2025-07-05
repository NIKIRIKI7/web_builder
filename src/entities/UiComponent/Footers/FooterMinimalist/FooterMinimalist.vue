<script setup lang="ts">
defineProps<{
  copyrightText: string;
}>();
</script>

<template>
  <footer class="footer-minimalist">
    <p class="footer-minimalist__copyright">{{ copyrightText }}</p>
  </footer>
</template>

<style lang="scss" src="./FooterMinimalist.scss"></style>
