<script setup lang="ts">
// В будущем здесь может быть логика компонента, например, управление состоянием бургер-меню
</script>

<template>
  <header class="simple-header">
    <div class="simple-header__container">
      <a href="#" class="simple-header__logo">Logo</a>
      <nav class="simple-header__nav">
        <a href="#" class="simple-header__link">Home</a>
        <a href="#" class="simple-header__link">About</a>
        <a href="#" class="simple-header__link">Contact</a>
      </nav>
      <button class="simple-header__cta">Get Started</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.simple-header {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  font-family: sans-serif;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }

  &__nav {
    display: flex;
    gap: 1.5rem;
  }

  &__link {
    color: #34495e;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #3498db;
    }
  }

  &__cta {
    padding: 0.5rem 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>