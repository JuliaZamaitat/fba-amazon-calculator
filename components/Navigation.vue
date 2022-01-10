<template>
  <div class="nav">
    <NuxtLink to="/">Amazon FBA Rechner</NuxtLink>
    <NuxtLink to="/blog">Blog</NuxtLink>
    <NuxtLink to="/blog">DEU</NuxtLink>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav {
  color: var(--clr-orange-100);
  font-size: var(--fs-400);
  text-align: right;
  position: absolute;
  top: 2.5em;
  right: 2em;

  a:not(:last-of-type) {
    margin-right: 0.8em;
  }
}

@media all and (min-height: 800px) {
  .nav {
    right: 4em;
  }
}
</style>
