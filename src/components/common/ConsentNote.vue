<template>
  <p class="consent-note muted q-mb-none">
    Отправляя форму, вы соглашаетесь на
    <router-link to="/privacy">обработку предоставленных данных</router-link>.
  </p>
</template>

<style lang="scss" scoped>
.consent-note {
  font-size: 0.875rem;
  line-height: 1.55;
}

.consent-note a {
  color: #0785b4;
}
</style>
