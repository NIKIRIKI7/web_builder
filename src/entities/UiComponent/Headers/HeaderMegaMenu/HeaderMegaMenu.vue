<script setup lang="ts">
import { ChevronDownIcon } from '@/shared/ui/icons';

type Link = { id: number; text: string; url: string };
type Column = { id: number; title: string; links: Link[] };
type MenuItem = { id: number; title: string; url?: string; columns?: Column[] };

defineProps<{
  logoText: string;
  menuItems: MenuItem[];
}>();
</script>

<template>
  <header class="header-mega-menu">
    <div class="header-mega-menu__container">
      <a href="#" class="header-mega-menu__logo">{{ logoText }}</a>
      <nav class="header-mega-menu__nav">
        <div v-for="item in menuItems" :key="item.id" class="header-mega-menu__nav-item">
          <a v-if="item.url" :href="item.url" class="header-mega-menu__link">{{ item.title }}</a>
          <button v-else class="header-mega-menu__link js-menu-toggle">
            <span>{{ item.title }}</span>
            <ChevronDownIcon />
          </button>
          <div v-if="item.columns" class="header-mega-menu__menu js-mega-menu">
            <div class="header-mega-menu__menu-container">
              <div v-for="col in item.columns" :key="col.id" class="header-mega-menu__menu-column">
                <h4 class="header-mega-menu__menu-title">{{ col.title }}</h4>
                <a
                  v-for="link in col.links"
                  :key="link.id"
                  :href="link.url"
                  class="header-mega-menu__menu-link">
                  {{ link.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" src="./HeaderMegaMenu.scss"></style>
