<script setup lang="ts">
defineProps<{
  logoText: string;
  searchPlaceholder: string;
  links: Array<{ id: number, text: string, url: string }>;
}>();
</script>

<template>
  <header class="header-with-search">
    <div class="header-with-search__container">
      <div class="header-with-search__left">
        <a href="#" class="header-with-search__logo">{{ logoText }}</a>
        <nav class="header-with-search__nav">
          <a
            v-for="link in links"
            :key="link.id"
            :href="link.url"
            class="header-with-search__link"
          >{{ link.text }}</a>
        </nav>
      </div>
      <div class="header-with-search__right">
        <div class="header-with-search__search-box">
          <input type="search" :placeholder="searchPlaceholder" class="header-with-search__search-input"/>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" src="./HeaderWithSearch.scss"></style>
