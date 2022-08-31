<template>
  <div>
    <!-- STEP 1 -->
    <div class="heading-container">
      <div
        class="bg-top"
        :class="{ orange: step1, purple: step2, 'purple light': step3 }"
      >
        <div v-show="step1">
          <img class="icon-quiz" src="../assets/icons/icon-quiz-1.svg" />
          <transition name="slide">
            <div v-if="step1" class="questions">
              <div class="section-1">
                <h2>Seit wann verkaufst du aktiv auf Amazon?</h2>
                <div class="calendar">
                  <img
                    class="icon-calendar"
                    src="../assets/icons/calendar.svg"
                  />
                  <client-only>
                    <date-picker
                      :value="date"
                      v-model="date"
                      name="uniquename"
                      inputClass="datepicker"
                      @input="checkDuration()"
                  /></client-only>
                </div>
              </div>
              <div class="section-2">
                <h2>Anteil von Amazon Umsatz in Prozent von Gesamtumsatz</h2>
                <p>
                  Umsatz deiner über Amazon erzielten Verkäufe im Verhältnis zum
                  Gesamtumsatz.
                </p>
                <div class="input-field">
                  <p>%</p>
                  <input
                    @input="checkSalesVolume(percentage)"
                    type="text"
                    placeholder="xx"
                    v-model="percentage"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- STEP 2 -->
        <div v-show="step2">
          <img class="icon-quiz" src="../assets/icons/icon-quiz-2.svg" />
          <transition name="slide">
            <div v-if="step2" class="questions">
              <div class="section-1">
                <h2>
                  Wie hoch ist dein durchschnittlicher monatlicher Nettoumsatz?
                </h2>
                <div class="input-field">
                  <p>€</p>
                  <input
                    type="text"
                    placeholder="0"
                    v-model="netSales"
                    @input="checkNetSales(netSales)"
                  />
                </div>
              </div>
              <div class="section-2">
                <h2>
                  Wie hoch ist dein durchschnittliches monatliches
                  Betriebsergebnis (EBITDA)?
                </h2>
                <p>
                  Umsatz deiner über Amazon erzielten Verkäufe im Verhältnis zum
                  Gesamtumsatz.
                </p>
                <div class="input-field">
                  <p>€</p>
                  <input
                    type="text"
                    placeholder="0"
                    v-model="ebitda"
                    @input="checkEbitda(ebitda)"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- STEP 3 -->
        <div v-show="step3">
          <img class="icon-quiz" src="../assets/icons/icon-quiz-3.svg" />
          <transition name="slide">
            <div v-if="step3" class="questions">
              <div class="section-1">
                <h2>
                  Anzahl der bei Amazon gelisteten Produkte (ohne Varianten)
                </h2>
                <div class="input-field">
                  <img
                    class="icon-dropdown"
                    src="../assets/icons/dropdown.svg"
                  />
                  <select v-model="productCount" class="select" name="products">
                    <option selected disabled>Hier auswählen</option>
                    <option value="9">&#060; 10</option>
                    <option value="24">&#060; 25</option>
                    <option value="49">&#060; 50</option>
                    <option value="99">&#060; 100</option>
                    <option value="249">&#060; 250</option>
                    <option value="499">&#060; 500</option>
                    <option value="999">&#060; 1.000</option>
                    <option value="2499">&#060; 2.500</option>
                    <option value="4099">&#060; 5.000</option>
                    <option value="9999">&#060; 10.000</option>
                    <option value="12000">&#062; 10.000</option>
                  </select>
                </div>
              </div>
              <div class="section-2">
                <h2>
                  Anteil von Eigenmarken an den gelisteten Produkten in Prozent
                </h2>
                <div class="input-field">
                  <p>%</p>
                  <input
                    type="text"
                    placeholder="xx"
                    v-model="ownProductsPercentage"
                    @input="checkProportion(ownProductsPercentage)"
                  />
                </div>
              </div>
              <div v-if="showCheckbox" class="saleCompany">
                <input
                  type="checkbox"
                  name="saleCompany"
                  v-model="interestedInSelling"
                />
                <label for="saleCompany"
                  >Ich bin an einem Verkauf meines Unternehmens
                  interessiert.</label
                >
              </div>
            </div>
          </transition>
        </div>
      </div>
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
          errors[0] != '' ||
          errors[1] != '' ||
          errors[2] != '' ||
          errors[3] != '' ||
          errors[4] != '' ||
          (step1 && percentage == '') ||
          !checkedSalesVolume ||
          (step2 && (netSales == '' || ebitda == '')) ||
          (step3 &&
            (productCount == 'Hier auswählen' || ownProductsPercentage == ''))
        "
        :class="{
          disabled:
            errors[0] != '' ||
            errors[1] != '' ||
            errors[2] != '' ||
            errors[3] != '' ||
            errors[4] != '' ||
            (step1 && percentage == '') ||
            !checkedSalesVolume ||
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
import Vue from 'vue';
import calculatorData from '../data/calculator/calculate.json';

export default {
  data() {
    return {
      errors: ['', '', '', '', ''],
      step1: false,
      step2: false,
      step3: false,
      date: new Date(),
      months: 0,
      percentage: '',
      checkedSalesVolume: false,
      netSales: '',
      ebitda: '',
      productCount: 'Hier auswählen',
      ownProductsPercentage: '',
      rules: calculatorData,
      showCheckbox: false,
      interestedInSelling: false
    };
  },
  mounted() {
    document.querySelector('body').style.backgroundColor = '#9300D9';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
    console.log(document.getElementsByClassName('link')[0]);
    document.getElementsByClassName('link')[0].className = 'link purple';
    document.getElementsByClassName('link')[1].className = 'link purple';

    this.step1 = true;
  },
  methods: {
    next() {
      if (this.step1 === true) {
        this.step1 = false;
        this.step2 = true;
        document.querySelector('body').style.backgroundColor =
          'var(--clr-purple-100)';
        document.getElementsByClassName('nav')[0].style.color =
          'var(--clr-orange-100)';
        document.getElementsByClassName('link')[0].className = 'link orange';
        document.getElementsByClassName('link')[1].className = 'link orange';
      } else if (this.step2 === true) {
        this.step2 = false;
        this.step3 = true;
        document.querySelector('body').style.backgroundColor =
          'var(--clr-orange-100)';
        document.getElementsByClassName('nav')[0].style.color =
          'var(--clr-orange-100)';
        document.getElementsByClassName('link')[0].className = 'link orange';
        document.getElementsByClassName('link')[1].className = 'link orange';
      } else if (this.step3 === true) {
        const result = this.calculateResult();
        this.$store.dispatch('saveResult', result);
        this.$router.push({
          path: '/ergebnis'
        });
      }
    },
    back() {
      if (this.step2 === true) {
        document.querySelector('body').style.backgroundColor =
          'var(--clr-purple-100)';
        document.getElementsByClassName('nav')[0].style.color =
          'var(--clr-purple-100)';
        document.getElementsByClassName('link')[0].className = 'link purple';
        document.getElementsByClassName('link')[1].className = 'link purple';
        if (this.errors[2] != '' || this.errors[3] != '') {
          this.netSales = '';
          this.ebitda = '';
          this.errors[2] = '';
          this.errors[3] = '';
        }
        this.step1 = true;
        this.step2 = false;
      } else if (this.step3 === true) {
        document.querySelector('body').style.backgroundColor =
          'var(--clr-orange-100)';
        if (this.errors[4] != '') {
          this.ownProductsPercentage = '';
          this.errors[4] = '';
        }
        this.step2 = true;
        this.step3 = false;
      }
    },
    //step1
    checkDuration() {
      this.errors[0] = '';
      const dateNow = new Date();
      const months =
        dateNow.getMonth() -
        this.date.getMonth() +
        12 * (dateNow.getFullYear() - this.date.getFullYear());
      if (months < 12)
        this.errors[0] =
          'Dein Unternehmen muss mind. 12 Monate alt sein für eine Bewertung';
      else this.months = months;
    },

    async checkSalesVolume(percentage) {
      this.checkedSalesVolume = false;
      this.showCheckbox = false;
      // await new Promise((resolve) => setTimeout(resolve, 300));
      Vue.set(this.errors, 1, '');

      if (isNaN(percentage) || percentage > 100 || percentage < 0)
        Vue.set(this.errors, 1, 'Ungültige Prozentangabe');
      else if (this.percentage != '' && this.percentage > 60)
        this.showCheckbox = true;
      // else if (this.percentage != '' && this.percentage < 60)
      //   Vue.set(
      //     this.errors,
      //     1,
      //     'Das Tool eignet sich erst zu einer Berechnung ab 60%'
      //   );
      //TODO: remember if over 60
      this.checkedSalesVolume = true;
    },

    //step 2
    checkNetSales(netSales) {
      this.errors[2] = '';
      if (isNaN(netSales) || netSales < 0) this.errors[2] = 'Ungültige Zahl';
    },
    checkEbitda(ebitda) {
      this.errors[3] = '';
      if (isNaN(ebitda) || ebitda < 0) this.errors[3] = 'Ungültige Zahl';
    },
    //step 3
    checkProportion(percentage) {
      this.errors[4] = '';
      if (isNaN(percentage) || percentage > 100 || percentage < 0) {
        this.errors[4] = 'Ungültige Prozentangabe';
      }
    },
    calculateResult() {
      if (!this.rules) return;

      //calculating Months
      const calculatedValues = [];
      calculatedValues[0] = this.months;
      calculatedValues[1] = this.percentage;
      calculatedValues[2] = this.netSales * 12;
      calculatedValues[3] = (this.ebitda / this.netSales) * 100;
      calculatedValues[4] = this.productCount;
      calculatedValues[5] = this.ownProductsPercentage;

      // recount values
      const converted = [];
      for (let i = 0; i < calculatedValues.length; i++) {
        converted[i] = this.fcpConvert(calculatedValues[i], this.rules[i]);
      }

      //add weights
      const weights = [];
      const weighted = [];
      for (let i = 0; i < converted.length; i++) {
        weights[i] = this.rules[i]['weight'];
        weighted[i] = this.fcpWeight(converted[i], this.rules[i]);
      }

      //max values NOT SURE
      const maxes = [];
      for (let i = 0; i < this.rules.length; i++) {
        var b = Object.values(this.rules[i].options);
        maxes[i] = Math.max(...b);
        //NaN for one value where we have an array within the array
      }

      // count total
      let score = 0;
      weighted.forEach((value) => {
        if (!isNaN(value)) score += value;
      });

      const evaluated =
        ((weighted[2][1] - weighted[2][0]) * score) / 10000 + weighted[2][0];
      const minMult = (evaluated - 0.2).toPrecision(2) * 1;
      const maxMult = (evaluated + 0.2).toPrecision(2) * 1;
      const evalMinFull = (evaluated - 0.2) * this.ebitda * 12;
      const evalMaxFull = (evaluated + 0.2) * this.ebitda * 12;
      const min = this.numberWithCommas(evalMinFull.toPrecision(3) * 1);
      const max = this.numberWithCommas(evalMaxFull.toPrecision(3) * 1);

      return {
        calculatedValues,
        converted,
        weights,
        weighted,
        maxes,
        score,
        minMult,
        maxMult,
        min,
        max,
        showCheckbox: this.showCheckbox,
        interestedInSelling: this.interestedInSelling
      };
    },
    fcpConvert(value, rule) {
      if (!rule['compare'] || !rule['options']) return value;

      let result = null;
      if (rule['compare'] === 'less') {
        const options = rule['options'];
        for (const [k, v] of Object.entries(options)) {
          if (!isNaN(k) && parseInt(value) < k) {
            result = v;
            break;
          }
        }
        if (result === null && typeof options.higher !== 'undefined')
          result = options['higher'];
      }
      return result !== null ? result : value;
    },
    fcpWeight(value, rule) {
      if (!rule['compare'] || !rule['options']) return value;

      let result = null;
      if (rule['weight']) result = value * rule['weight'];
      return result !== null ? result : value;
    },
    numberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

.heading-container {
  h1 {
    color: var(--clr-white-100);
    font-size: var(--fs-800);
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg-top {
    &.purple {
      background-image: url('../assets/backgrounds/bg-top-purple-large.svg');
      &.light {
        background-image: url('../assets/backgrounds/bg-top-purple-light-large.svg');
      }
    }
    &.orange {
      background-image: url('../assets/backgrounds/bg-top-orange.svg');
    }
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    width: 100%;
    min-height: 37rem;
  }
}

.questions {
  text-align: right;
  margin-top: 7em;
  margin-left: 4em;
  max-width: 38em;

  @media (max-width: 55em) {
    margin: 7em 2em 0;
  }

  p {
    font-family: 'Montserrat', sans-serif;
  }

  h2,
  p {
    text-align: left;
  }

  //Discuss with Konstantin
  // h2 {
  //   @media (max-width: 55em) {
  //     // font-size: 16px;
  //     // line-height: 20px;
  //   }
  // }

  // p {
  //   @media (max-width: 55em) {
  //     // line-height: 20px;
  //   }
  // }
  input:not([type='checkbox']) {
    &:focus-visible {
      border-width: 0px;
      outline: 0;
      -webkit-appearance: none;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
    }

    &:focus {
      border-width: 0px;
      outline: 0;
      -webkit-appearance: none;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
    }
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
        z-index: 500;
      }

      :deep .vdp-datepicker {
        display: inline;

        div:first-of-type {
          display: inline;
        }
      }

      :deep .datepicker {
        border: none;
        background: transparent;
        color: var(--clr-white-100);
        letter-spacing: 0.1em;

        &:hover {
          cursor: pointer;
          font-weight: var(--fw-regular);
        }

        &:focus-visible {
          outline: none !important;
        }
      }

      :deep .vdp-datepicker__calendar {
        border: none;
        border-radius: 10px;
        @media (max-width: 55em) {
          width: 250px;
        }
      }
    }
    .icon-dropdown {
      display: inline;
      margin-right: 20px;
      z-index: 500;
    }
  }

  .input-field,
  .calendar {
    padding-top: 1.9em;
    border-bottom: 1px solid white;
    max-width: 34em;
  }

  .section-1,
  .section-2 {
    text-align: left;
    padding-top: 1.9em;

    p:first-of-type {
      margin-top: 0.6em;
      letter-spacing: 0.1em;
    }

    div {
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

.saleCompany {
  text-align: left;
  margin-top: 1em;

  label {
    color: var(--clr-white-100);
  }
}

.icon-quiz {
  position: absolute;
  top: 6em;
  right: 5em;
  max-height: 100vh;
  z-index: 500;

  @media (max-width: 81em) {
    display: none;
  }
}

.validation {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 42em;
  margin-top: -1rem;
  ul,
  li {
    text-align: right;
    flex: 0 0 100%;
    margin-right: 3em;
  }

  button {
    margin: 0 4em 2em 0;

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

    @media (max-width: 55em) {
      margin-right: 1em;
    }
  }
}

.disclaimer {
  margin-bottom: 1em;
  @media (max-width: 55em) {
    display: none;
  }
}
</style>
