<template>
  <div>
    <img class="bg-bottom" src="../assets/backgrounds/bg-bottom-orange.svg" />
    <img class="bg-three" src="../assets/icons/3.svg" />
    <div class="heading">
      <h1>Unternehmensbewertung</h1>
      <h2>Berechne jetzt kostenlos den Wert deines Amazon FBA Business.</h2>
      <button @click="openQuiz()">Jetzt Starten</button>
    </div>

    <!-- <img class="bg-three-1" src="../assets/backgrounds/3-1.svg" /> -->
  </div>
</template>

<script>
export default {
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-purple-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-orange-100)';
  },
  methods: {
    openQuiz() {
      this.$router.push({
        path: '/quiz'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.heading {
  margin-top: 9em;
  margin-left: 4em;
  max-width: 35em;

  h1,
  h2,
  button {
    color: var(--clr-white-100);
  }

  h1 {
    font-weight: var(--fw-extra-bold);
  }

  h2 {
    font-weight: var(--fw-medium);
    margin-top: 0.7em;
  }

  button {
    margin-top: 2.15em;
    &:hover {
      background-color: white;
      color: var(--clr-purple-100);
    }
  }
}

.bg-three {
  position: absolute;
  top: 0;
  right: 0;
  max-height: 100vh;
  z-index: -10;
}
</style>
