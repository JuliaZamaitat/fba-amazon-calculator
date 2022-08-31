<template>
  <div class="footer">
    <ul class="uppercase">
      <li class="link" name="Blog"><NuxtLink to="/blog">Blog</NuxtLink></li>
      <li class="link" name="Kontakt">
        <NuxtLink to="/kontakt">Kontakt</NuxtLink>
      </li>
      <li class="link" name="Impressum">
        <NuxtLink to="/impressum">Impressum</NuxtLink>
      </li>
      <li class="link" name="Datenschutz">
        <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
      </li>
    </ul>
    <p class="copyright">Copyright 2022</p>
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
  opacity: 0.7;
  font-weight: var(--fw-thin);

  .uppercase {
    display: flex;
    justify-content: center;
    padding: 0;

    @media (max-width: 55em) {
      flex-direction: column;
    }
  }

  ul {
    list-style: none;
  }
  li {
    margin: 0 2.5rem;

    ::v-deep a {
      text-decoration: none;
      color: inherit;
    }

    &::after {
      display: block;
      content: attr(name);
      font-weight: var(--fw-medium);
      height: 1px;
      color: transparent;
      overflow: hidden;
      visibility: hidden;
    }

    &:hover {
      font-weight: var(--fw-medium);
    }

    @media (max-width: 55em) {
      margin-top: 1rem;
    }
  }

  p {
    padding: 2.5rem 0;

    @media (max-width: 55em) {
      padding: 1rem 0;
    }
  }
}
</style>
