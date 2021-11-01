<template>
  <div>
    <img class="bg-bottom" src="../assets/backgrounds/bg-bottom-purple.svg" />
    <img class="icon-quiz-1" src="../assets/icons/icon-quiz-1.svg" />

    <div class="questions">
      <div class="section-1">
        <h2>Seit wann verkaufst du aktiv auf Amazon?</h2>
        <client-only
          ><p>
            <date-picker
              :value="date"
              name="uniquename"
              inputClass="myClass"
            /></p
        ></client-only>
      </div>
      <div class="section-2">
        <h2>Anteil von Amazon Umsatz in Prozent von Gesamtumsatz</h2>
        <p>
          Umsatz deiner über Amazon erzielten Verkäufe im Verhältnis zum
          Gesamtumsatz.
        </p>
        <p>PLATZHALTER PLATZHALTER</p>
      </div>
      <button @click="next()">Weiter</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
    };
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
  },
  methods: {
    next() {}
  }
};
</script>

<style lang="scss" scoped>
.questions {
  text-align: right;
  margin-top: 4em;
  margin-left: 4em;
  max-width: 40em;

  p {
    font-family: 'Montserrat', sans-serif;
  }

  h2,
  p {
    text-align: left;
  }

  h2,
  button,
  p {
    color: var(--clr-white-100);
  }

  button {
    margin-top: 2.15em;
    margin-right: 4em;
    font-weight: var(--fw-bold);
    &:hover {
      background-color: white;
      color: var(--clr-orange-100);
    }
  }

  .section-1 {
    p {
      margin-top: 2.4em;
    }
  }
  .section-2 {
    margin-top: 2em; //4.15em;

    p:first-of-type {
      margin-top: 0.6em;
    }

    p:last-of-type {
      margin-top: 1.9em;
    }
  }
}

.icon-quiz-1 {
  position: absolute;
  top: 6em;
  right: 9em;
  max-height: 100vh;
  z-index: -10;
}
</style>
