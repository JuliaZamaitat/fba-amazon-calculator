<template>
  <div>
    <h1>Unternehmensbewertung</h1>
    <img class="bg-bottom" src="../assets/backgrounds/bottom-part.svg" />
    <img class="bg-three" src="../assets/backgrounds/3.svg" />
    <!-- <img class="bg-three-1" src="../assets/backgrounds/3-1.svg" /> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
h1 {
  color: var(--clr-white-100);
  margin-left: 4em;
  margin-top: 4em;
}

.bg-bottom {
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: -20;
}

.bg-three {
  position: absolute;
  top: 0;
  right: 0;
  max-height: 100vh;
  z-index: -10;
}
</style>
