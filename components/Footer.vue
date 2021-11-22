<template>
  <div class="footer">
    <ul class="uppercase">
      <li>Blog</li>
      <li>Kontakt</li>
      <li>Impressum</li>
      <li>Datenschutz</li>
    </ul>
    <p>Copyright 2021</p>
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
  }

  p {
    padding: 2.5rem 0;
  }
}
</style>
