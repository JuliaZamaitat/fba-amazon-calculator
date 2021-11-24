<template>
  <div>
    <!-- STEP 1 -->
    <div v-show="step1">
      <img class="bg-bottom" src="../assets/backgrounds/bg-bottom-purple.svg" />
      <img class="icon-quiz" src="../assets/icons/icon-quiz-1.svg" />
      <transition name="slide">
        <div v-if="step1" class="questions">
          <div class="section-1">
            <h2>Seit wann verkaufst du aktiv auf Amazon?</h2>
            <div class="calendar">
              <img class="icon-calendar" src="../assets/icons/calendar.svg" />
              <client-only>
                <date-picker
                  :value="date"
                  name="uniquename"
                  inputClass="datepicker"
              /></client-only>
            </div>
            <img class="icon-line" src="../assets/icons/line.svg" />
          </div>
          <div class="section-2">
            <h2>Anteil von Amazon Umsatz in Prozent von Gesamtumsatz</h2>
            <p>
              Umsatz deiner über Amazon erzielten Verkäufe im Verhältnis zum
              Gesamtumsatz.
            </p>
            <div>
              <p>%</p>
              <input
                type="text"
                placeholder="xx"
                v-model="percentage"
                @input="checkPercentage(percentage)"
              />
            </div>
            <img class="icon-line" src="../assets/icons/line.svg" />
          </div>
        </div>
      </transition>
    </div>
    <!-- STEP 2 -->
    <div v-show="step2">
      <img
        class="bg-bottom"
        src="../assets/backgrounds/bg-bottom-purple-light.svg"
      />
      <img class="icon-quiz" src="../assets/icons/icon-quiz-2.svg" />
      <transition name="slide">
        <div v-if="step2" class="questions">
          <div class="section-1">
            <h2>
              Wie hoch ist dein durchschnittlicher monatlicher Nettoumsatz?
            </h2>
            <div>
              <p>€</p>
              <input
                type="text"
                placeholder="0"
                v-model="netSales"
                @input="checkNumber(netSales)"
              />
            </div>

            <img class="icon-line" src="../assets/icons/line.svg" />
          </div>
          <div class="section-2">
            <h2>
              Wie hoch ist dein durchschnittliches monatliches Betriebsergebnis
              (EBITDA)?
            </h2>
            <p>
              Umsatz deiner über Amazon erzielten Verkäufe im Verhältnis zum
              Gesamtumsatz.
            </p>
            <div>
              <p>€</p>
              <input
                type="text"
                placeholder="0"
                v-model="ebitda"
                @input="checkNumber(ebitda)"
              />
            </div>
            <img class="icon-line" src="../assets/icons/line.svg" />
          </div>
        </div>
      </transition>
    </div>

    <!-- STEP 3 -->
    <div v-show="step3">
      <img class="bg-bottom" src="../assets/backgrounds/bg-bottom-orange.svg" />
      <img class="icon-quiz" src="../assets/icons/icon-quiz-3.svg" />
      <transition name="slide">
        <div v-if="step3" class="questions">
          <div class="section-1">
            <h2>Anzahl der bei Amazon gelisteten Produkte (ohne Varianten)</h2>
            <div>
              <img class="icon-dropdown" src="../assets/icons/dropdown.svg" />
              <select v-model="productCount" class="select" name="products">
                <option selected disabled>Hier auswählen</option>
                <option>Weniger als 10</option>
                <option>Mehr als 10</option>
              </select>
            </div>

            <img class="icon-line" src="../assets/icons/line.svg" />
          </div>
          <div class="section-2">
            <h2>
              Anteil von Eigenmarken an den gelisteten Produkten in Prozent
            </h2>
            <div>
              <p>%</p>
              <input
                type="text"
                placeholder="xx"
                v-model="ownProductsPercentage"
                @input="checkPercentage(ownProductsPercentage)"
              />
            </div>
            <img class="icon-line" src="../assets/icons/line.svg" />
          </div>
        </div>
      </transition>
    </div>

    <!-- WEITER -->

    <div class="validation">
      <ul>
        <li class="error-message" v-for="error in errors" :key="error.id">
          {{ error }}
        </li>
      </ul>

      <button
        v-show="step2 || step3"
        @click="back()"
        class="back-button"
        :class="{
          'clr-purple': step2
        }"
      >
        Zurück
      </button>
      <button
        @click="next()"
        :disabled="
          errors.length != 0 ||
          (step1 && percentage == '') ||
          (step2 && (netSales == '' || ebitda == '')) ||
          (step3 &&
            (productCount == 'Hier auswählen' || ownProductsPercentage == ''))
        "
        :class="{
          disabled:
            errors.length != 0 ||
            (step1 && percentage == '') ||
            (step2 && (netSales == '' || ebitda == '')) ||
            (step3 &&
              (productCount == 'Hier auswählen' || ownProductsPercentage == ''))
        }"
      >
        <span v-if="step1 || step2" :class="{ 'clr-purple': step2 }"
          >Weiter</span
        >
        <span v-else :class="{ 'clr-purple': step2 }">Berechnen</span>
      </button>
    </div>
    <Disclaimer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      errors: [],
      percentage: '',
      step1: false,
      step2: false,
      step3: false,
      netSales: '',
      ebitda: '',
      productCount: 'Hier auswählen',
      ownProductsPercentage: ''
    };
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
    this.step1 = true;
  },
  methods: {
    next() {
      if (this.step1 === true) {
        this.step1 = false;
        this.step2 = true;
        document.querySelector('body').style.backgroundColor =
          'var(--clr-purple-200)';
        document.getElementsByClassName('nav')[0].style.color =
          'var(--clr-orange-100)';
      } else if (this.step2 === true) {
        this.step2 = false;
        this.step3 = true;
        document.querySelector('body').style.backgroundColor =
          'var(--clr-purple-100)';
      } else if (this.step3 === true) {
        this.$router.push({
          path: '/ergebnis'
        });
      }
    },
    back() {
      if (this.step2 === true) {
        document.querySelector('body').style.backgroundColor =
          'var(--clr-orange-100)';
        document.getElementsByClassName('nav')[0].style.color =
          'var(--clr-purple-100)';
        this.step1 = true;
        this.step2 = false;
      } else if (this.step3 === true) {
        document.querySelector('body').style.backgroundColor =
          'var(--clr-purple-200)';
        this.step2 = true;
        this.step3 = false;
      }
    },
    checkPercentage(percentage) {
      this.errors = [];
      if (isNaN(percentage) || percentage > 100 || percentage < 0) {
        this.errors.push('Ungültige Prozentangabe');
      }
    },
    checkNumber(number) {
      this.errors = [];
      if (isNaN(number) || number < 0) {
        this.errors.push('Ungültige Zahl');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: transform 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

h2,
button,
p,
select {
  color: var(--clr-white-100);
}

button,
select {
  font-family: 'Montserrat', sans-serif;
}
.slide-enter {
  transform: translateY(400px);
}

select {
  background-color: transparent;
  border: none;
  outline: none;
  appearance: none;
  font-weight: var(--fw-thin);
  cursor: pointer;
}

.questions {
  text-align: right;
  margin-top: 2em;
  margin-left: 4em;
  max-width: 38em;

  p {
    font-family: 'Montserrat', sans-serif;
  }

  h2,
  p {
    text-align: left;
  }

  .icon-line {
    margin-top: 0.5em;
  }
  .section-1 {
    .calendar {
      font-family: 'Montserrat', sans-serif;
      text-align: left;
      font-weight: var(--fw-thin);
      display: flex;
      align-items: self-end;

      .icon-calendar {
        display: inline;
        margin-right: 38px;
      }

      ::v-deep .vdp-datepicker {
        display: inline;

        div:first-of-type {
          display: inline;
        }
      }

      ::v-deep .datepicker {
        border: none;
        background: transparent;
        color: var(--clr-white-100);
        letter-spacing: 0.1em;

        &:hover {
          cursor: pointer;
          font-weight: var(--fw-regular);
        }

        &:focus-visible {
          outline: none;
        }
      }

      ::v-deep .vdp-datepicker__calendar {
        border: none;
        border-radius: 10px;
      }
    }
    .icon-dropdown {
      display: inline;
      margin-right: 20px;
    }
  }

  .section-1,
  .section-2 {
    text-align: left;

    p:first-of-type {
      margin-top: 0.6em;
      letter-spacing: 0.1em;
    }

    div {
      padding-top: 1.9em;
      p:first-of-type {
        font-weight: var(--fw-bold);
        display: inline;
      }
    }
  }
  .section-2 {
    margin-top: 3em; //4.15em;
  }
}

.icon-quiz {
  position: absolute;
  top: 6em;
  right: 7em;
  max-height: 100vh;
  z-index: -10;
}

.validation {
  max-width: 38.5em;
  text-align: right;
  ul,
  li {
    display: inline;
  }

  button {
    margin-top: 2.15em;
    margin-right: 4em;

    &:hover {
      background-color: var(--clr-white-100);
    }

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      font-weight: var(--fw-bold);
      &:hover {
        color: var(--clr-orange-100);
        &.clr-purple {
          color: var(--clr-purple-100);
        }
      }
    }
    &.disabled {
      cursor: auto;
      border: 2px solid rgb(144, 144, 144);
      color: rgb(144, 144, 144);

      &:hover {
        background-color: transparent;
        color: rgb(144, 144, 144);
      }

      span {
        &:hover {
          color: rgb(144, 144, 144);
        }
      }
    }

    &.back-button {
      font-weight: var(--fw-thin);
      border: 1px solid var(--clr-white-100);
      margin-right: 1.25em;

      // p:hover {

      // }
      &:hover {
        font-weight: var(--fw-bold);
        color: var(--clr-orange-100);
        &.clr-purple {
          color: var(--clr-purple-100);
        }
      }
    }
  }
  .error-message {
    color: rgb(252, 0, 0);
    margin-right: 0.3em;
  }
}
</style>
