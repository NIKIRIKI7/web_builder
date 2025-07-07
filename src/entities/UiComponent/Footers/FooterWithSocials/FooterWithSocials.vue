<script setup lang="ts">
withDefaults(defineProps<{
  copyrightText: string;
  socialLinks: Array<{ id: number, name: string, url: string }>;
}>(), {
  socialLinks: () => [],
});
</script>

<template>
  <footer class="footer-with-socials">
    <div class="footer-with-socials__container">
      <div class="footer-with-socials__socials">
        <a
          v-for="link in socialLinks"
          :key="link.id"
          :href="link.url"
          :aria-label="link.name"
          class="footer-with-socials__social-link"
        >{{ link.name.substring(0, 1) }}</a>
      </div>
      <div class="footer-with-socials__copyright">
        {{ copyrightText }}
      </div>
    </div>
  </footer>
</template>

<style lang="scss" src="./FooterWithSocials.scss"></style>
