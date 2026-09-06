<template>
  <router-link
    class="brand-logo"
    to="/"
    aria-label="Teorema Service"
  >
    <img
      class="brand-logo__image"
      :src="logoUrl"
      alt="Teorema Service"
      width="280"
      height="64"
    />
  </router-link>
</template>

<script setup lang="ts">
import logoUrl from "@/assets/logo-black.png";
</script>

<style lang="scss" scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  line-height: 0;
  text-decoration: none;
}

.brand-logo__image {
  display: block;
  width: auto;
  object-fit: contain;
  object-position: left center;
  border-radius: 6px;
}
</style>
