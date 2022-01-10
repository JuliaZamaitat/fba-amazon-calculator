<template>
  <div class="footer">
    <ul class="uppercase">
      <li><NuxtLink to="/blog">Blog</NuxtLink></li>
      <li><NuxtLink to="/kontakt">Kontakt</NuxtLink></li>
      <li><NuxtLink to="/impressum">Impressum</NuxtLink></li>
      <li><NuxtLink to="/datenschutz">Datenschutz</NuxtLink></li>
    </ul>
    <p class="copyright">Copyright 2021</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  color: var(--clr-white-100);
  opacity: 70%;
  font-weight: var(--fw-thin);

  li {
    display: inline;
    margin: 0 2.5rem;

    ::v-deep a {
      text-decoration: none;
      color: inherit;
    }
  }

  p {
    padding: 2.5rem 0;
  }
}
</style>
