<template>
  <div>
    <div class="heading-container">
      <div class="bg-top">
        <img class="icon-quiz" src="../assets/icons/icon-startseite.svg" />
        <div class="heading">
          <h1>Amazon FBA Wertermittlung</h1>
          <h2>Berechne jetzt kostenlos den Wert deines Amazon FBA Business.</h2>
          <button @click="openQuiz()">Jetzt Starten</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-white-100)';
    document.getElementsByClassName('link')[0].className = 'link white';
    document.getElementsByClassName('link')[1].className = 'link white';
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
.heading-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  .bg-top {
    background-image: url('../assets/backgrounds/bg-top-purple-large.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    min-height: 700px;
    width: 100%;
  }
  .heading {
    margin-top: 9em;
    margin-left: 4em;
    max-width: 55vw;

    @media (max-width: 55em) {
      font-size: 1.7rem;
      margin-top: 6em;
      margin-left: 1em;
      max-width: 90vw;
    }
  }
}

.icon-quiz {
  position: absolute;
  top: 6em;
  right: 7em;
  max-height: 100vh;
  z-index: -10;
  z-index: 500;

  @media (max-width: 81em) {
    display: none;
  }
}

h2,
button {
  color: var(--clr-white-100);
}

h1 {
  font-weight: var(--fw-extra-bold);
  color: var(--clr-orange-100);
  font-size: 2.2rem;

  @media (max-width: 81em) {
    font-size: 1.7rem;
  }
}

h2 {
  font-weight: var(--fw-medium);
  margin-top: 0.7em;
  @media (max-width: 81em) {
    font-size: 1.5rem;
  }
}

button {
  margin-top: 2.15em;
  border-color: var(--clr-orange-100);
  &:hover {
    background-color: var(--clr-orange-100);
    color: var(--clr-white-100);
  }
}
</style>
