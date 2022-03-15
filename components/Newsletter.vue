<template>
  <div class="newsletter">
    <h2>
      Die neusten Tipps für deine Business - Optimierung in unserem Newsletter.
    </h2>
    <div class="email">
      <div class="input">
        <p>DEINE EMAIL:</p>
        <input
          type="text"
          placeholder="yourmail@mail.de"
          v-model="email"
          @input="markChecked()"
          @blur="checkEmail(email)"
        />
      </div>
      <div class="confirm">
        <ul>
          <li class="error-message" v-for="error in errors" :key="error.id">
            {{ error }}
          </li>
        </ul>
        <button
          :disabled="errors.length != 0 || email == '' || !emailChecked"
          :class="{
            disabled: errors.length != 0 || email == '' || !emailChecked
          }"
        >
          Bestätigen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      errors: [],
      emailChecked: false
    };
  },

  methods: {
    markChecked() {
      this.emailChecked = false;
    },
    checkEmail(email) {
      this.errors = [];
      this.emailChecked = true;
      var re = /\S+@\S+\.\S+/;
      if (re.test(email)) {
        //send email
      } else if (email != '') {
        this.errors.push('Ungültige Email');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p,
button,
h2 {
  font-family: 'Montserrat', sans-serif;
  color: var(--clr-white-100);
  font-weight: var(--fw-bold);
}

h2 {
  text-align: center;
}

.newsletter {
  @media (max-width: 55em) {
    margin: 0 2em !important;
  }

  .email {
    margin: 0 auto !important;
    display: flex;
    flex-direction: column;
    max-width: 50rem;

    .input {
      display: flex;
      align-items: flex-start;
      margin-top: 2.5em;
      max-width: 100%;
      border-bottom: 1px solid white;

      input {
        display: inline;
        flex: 1;
        margin: 0 4em 0 2em;
        @media (max-width: 55em) {
          margin: 0 0.5em 0;
        }
      }

      p {
        display: inline;
        margin-bottom: 19px;
      }
    }

    .confirm {
      margin-top: 25px;
      text-align: right;
      ul,
      li {
        display: inline;
      }
      .error-message {
        color: rgb(252, 0, 0);
        margin-right: 0.3em;
      }
      button {
        &:hover {
          background-color: var(--clr-white-100);
          color: var(--clr-purple-100);
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
    }
  }
}
</style>
