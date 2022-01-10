<template>
  <div>
    <img class="bg-top" src="../assets/backgrounds/bg-top-purple-light.svg" />
    <div class="heading">
      <h1>Kontakt</h1>
    </div>
    <div class="form">
      <h2>Wir freuen uns auf Deine Nachricht.</h2>
      <div class="email">
        <div class="input">
          <input
            type="text"
            placeholder="EMAIL"
            v-model="email"
            @input="markChecked()"
            @blur="checkEmail(email)"
          />
        </div>
        <img class="icon-line" src="../assets/icons/line-purple.svg" />
        <div class="confirm">
          <ul>
            <li class="error-message" v-for="error in errors" :key="error.id">
              {{ error }}
            </li>
          </ul>
          <button
            :class="{
              disabled: errors.length != 0 || email == '' || !emailChecked
            }"
          >
            Absenden
          </button>
        </div>
      </div>
    </div>

    <div class="footer-block">
      <div class="text">
        <Footer />
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
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-white-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-white-100)';
    document.getElementsByClassName('uppercase')[0].style.color =
      'var(--clr-purple-300)';
    document.getElementsByClassName('footer')[0].style.opacity = '100%';
    document.getElementsByClassName('uppercase')[0].style.fontWeight =
      'var(--fw-medium)';
    document.getElementsByClassName('copyright')[0].style.color =
      'var(--clr-purple-300)';
    document.getElementsByClassName('copyright')[0].style.fontWeight =
      'var(--fw-300)';
  }
};
</script>

<style lang="scss" scoped>
.email {
  // background-color: red;
  input {
    color: black;
    &::placeholder {
      color: black;
      font-weight: var(--fw-bold);
    }
  }
  button {
    font-weight: var(--fw-bold);
    border: 2px solid var(--clr-purple-100);
  }
}
::v-deep h1,
::v-deep h2,
::v-deep h3,
::v-deep h4,
::v-deep h5 {
  padding: 2rem 0;
}
::v-deep ul,
::v-deep ol {
  list-style: inherit;
}
::v-deep a {
  text-decoration: underline;
  color: blue;
}

.bg-top {
  z-index: -100;
  height: 40vw;
}

.heading {
  h1 {
    color: var(--clr-white-100);
    font-weight: var(--fw-bold);
    font-size: var(--fs-700);
    letter-spacing: 0.1em;
    position: absolute;
    top: 12rem;
    padding-left: 10rem;
  }
}

.form {
  margin: 0 auto;
  width: 80vw;
  h2 {
    // padding-left: 10rem;
    text-align: left;
  }

  margin-bottom: 5rem;
}

.footer-block {
  height: 100%;
  background-image: url('../assets/backgrounds/bg-bottom-grey.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 40vh;

  margin-top: calc(-4vw + 2px);

  .text {
    padding-top: 8rem;
  }
}
</style>
