<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="simple-footer">
    <div class="simple-footer__container">
      <div class="simple-footer__links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>
      <div class="simple-footer__copyright">
        © {{ currentYear }} Web Builder Inc. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.simple-footer {
  width: 100%;
  padding: 2rem;
  background-color: #2c3e50;
  color: #ecf0f1;
  font-family: sans-serif;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  &__links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;

    a {
      color: #ecf0f1;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #3498db;
      }
    }
  }

  &__copyright {
    font-size: 0.9rem;
    color: #bdc3c7;
  }
}
</style>