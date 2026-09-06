<template>
  <router-link
    class="brand-logo row no-wrap items-center"
    to="/"
    aria-label="Teorema Service"
  >
    <q-img
      src="/logo.svg"
      alt="Teorema Service"
      width="44px"
      height="44px"
      fit="contain"
      class="brand-logo__mark"
    >
      <template #error>
        <div class="brand-logo__fallback row items-center justify-center">
          TS
        </div>
      </template>
    </q-img>
    <div class="brand-logo__text q-ml-sm gt-xs">
      <div class="brand-logo__name">Teorema</div>
      <div class="brand-logo__sub">Service</div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.brand-logo {
  color: inherit;
  text-decoration: none;
}

.brand-logo__fallback {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #f5a83d;
  color: #102a36;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
}

.brand-logo__name,
.brand-logo__sub {
  font-family: "Oswald", sans-serif;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand-logo__name {
  font-size: 1.15rem;
}

.brand-logo__sub {
  margin-top: 4px;
  font-size: 0.875rem;
  color: #f5a83d;
}
</style>
