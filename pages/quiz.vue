<template>
  <div>
    <img class="bg-bottom" src="../assets/backgrounds/bg-bottom-purple.svg" />
    <img class="icon-quiz-1" src="../assets/icons/icon-quiz-1.svg" />
    <div class="questions">
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
            @input="checkPercentage()"
          />
        </div>
        <img class="icon-line" src="../assets/icons/line.svg" />
      </div>

      <div class="validation">
        <ul>
          <li class="error-message" v-for="error in errors" :key="error.id">
            {{ error }}
          </li>
        </ul>
      </div>
      <button
        @click="next()"
        :disabled="errors.length != 0 || percentage == ''"
        :class="{ disabled: errors.length != 0 || percentage == '' }"
      >
        Weiter
      </button>
    </div>

    <Disclaimer />
  </div>
</template>

<script>
import Disclaimer from '~/components/Disclaimer.vue';
export default {
  components: { Disclaimer },
  data() {
    return {
      date: new Date(),
      errors: [],
      percentage: ''
    };
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
  },
  methods: {
    next() {},
    checkPercentage() {
      this.errors = [];
      if (
        isNaN(this.percentage) ||
        this.percentage > 100 ||
        this.percentage < 0
      ) {
        this.errors.push('Ungültige Prozentangabe');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .page-enter-active,
// .page-leave-active {
//   position: absolute;
//   max-width: 100%; /*make sur our content keep it's original width*/
//   transition: all 1s ease;
// }

// /* entering start */
// .page-enter {
//   top: -100%;
// }

// /* entering end */
// .page-enter-to {
//   top: 0;
// }

// /* leaving start */
// .page-leave {
//   opacity: 1;
// }

// /* leaving end */
// .page-leave-to {
//   opacity: 0;
// }

.questions {
  text-align: right;
  margin-top: 2em;
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
      background-color: var(--clr-white-100);
      color: var(--clr-orange-100);
    }
    &.disabled {
      cursor: auto;
      border: 2px solid rgb(144, 144, 144);
      color: rgb(144, 144, 144);

      &:hover {
        background-color: transparent;
        color: rgb(144, 144, 144);
      }
    }
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
        margin-top: 2.4em;
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
  }
  .section-2 {
    margin-top: 3em; //4.15em;
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
      input {
        cursor: pointer;
        background: none;
        border: none;
        color: var(--clr-white-100);
        font-weight: var(--fw-thin);
        letter-spacing: 0.1em;

        &::placeholder {
          color: var(--clr-white-100);
          font-weight: var(--fw-thin);
        }

        &:focus-visible {
          outline: none;
        }
      }
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

.validation {
  display: inline;
  ul,
  li {
    display: inline;
  }

  .error-message {
    color: rgb(252, 0, 0);
    margin-right: 0.3em;
  }
}
</style>
