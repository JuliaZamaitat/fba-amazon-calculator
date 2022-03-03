<template>
  <div class="disclaimer">
    <p>
      * Bei dem errechneten Unternehmenswert handelt es sich lediglich um eine
      ungefähre Ersteinschätzung. Für eine exakte Ermittlung sind weitere Daten
      und Prüfungen notwendig. Der errechnete Unternehmenswert stellt kein
      verbindliches Kaufangebot dar.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.disclaimer {
  p {
    font-family: 'Montserrat', sans-serif;
    font-style: italic;
    font-weight: var(--fw-thin);
    font-size: 12px;
    color: var(--clr-white-100);
    opacity: 80%;
    margin-left: 6.6em;
    line-height: 15px;
    letter-spacing: 0.1em;
    max-width: 60vw;
  }
}
</style>
