<template>
  <div class="background-image">
    <div class="result">
      <h1>Dein Ergebnis</h1>
      <img class="icon-ergebnis" src="../assets/icons/ergebnis.svg" />
      <p>Nach unseren Berechnungen ist dein Amazon FBA Business zwischen:</p>
      <p class="result-price">600.000€ - 700.000€</p>
      <p>
        Erhalte Tipps wie du den Wert deines
        <strong>Amazon FBA Business</strong> steigerst, sowie die detaillierte
        Auflistung darüber, wie sich dein
        <strong>Unternehmenswert</strong> zusammensetzt!
      </p>
      <div class="email">
        <div class="email email-input">
          <p>DEINE EMAIL:</p>
          <input
            type="text"
            placeholder="yourmail@mail.de"
            v-model="email"
            @input="markChecked()"
            @blur="checkEmail(email)"
          />
        </div>
        <img class="icon-line" src="../assets/icons/line.svg" />
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

    <div class="blog">
      <h2 class="uppercase">Unser Blog</h2>
      <div class="blog blog-posts">
        <div v-for="post in posts" :key="post.id" class="post">
          <Post :post="post" />
        </div>
      </div>
    </div>

    <div class="newsletter">
      <Newsletter />
    </div>

    <Footer />
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
  computed: {
    posts() {
      return this.$store.state.posts.slice(0, 3);
    }
  },

  async created() {
    await this.$store.dispatch('fetchPosts');
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
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
h1 {
  color: var(--clr-white-100);
  font-size: var(--fs-900);
  margin-bottom: 0.4em;
}

button {
  color: var(--clr-white-100);
  font-family: 'Montserrat', sans-serif;
  font-weight: var(--fw-bold);

  &:hover {
    background-color: var(--clr-white-100);
    color: var(--clr-orange-100);
  }
}

p {
  font-family: 'Montserrat', sans-serif;
  color: var(--clr-white-100);
  letter-spacing: 0.1em;
}

.result-price {
  font-style: normal;
  font-weight: var(--fw-bold);
  font-size: 50px;
  margin: 0.8em 0 1em;
}

.icon-ergebnis {
  position: absolute;
  top: 6em;
  right: 7em;
  max-height: 100vh;
  width: 16em;
  z-index: -10;
}

.result {
  margin-top: 2em;
  margin-left: 4em;
  max-width: 35em;
  padding-bottom: 10em;
}

.email {
  &-input {
    display: flex;
    align-items: flex-start;
    margin-top: 2.5em;
    max-width: 100%;

    p {
      display: inline;
      font-weight: var(--fw-bold);
      margin-bottom: 19px;
    }
    input {
      flex: 1;
      margin: 0 4em 0 2em;
    }
  }

  .confirm {
    ul,
    li {
      display: inline;
    }
    text-align: right;
    button {
      margin-top: 2.15em;
      margin-right: 4em;
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

.blog {
  h2 {
    font-size: var(--fs-700);
    color: var(--clr-white-100);
    margin-left: 1.5em;
    margin-bottom: 68px;
  }
  &-posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-block: 2rem;
    gap: 2rem;
  }
}

.newsletter {
  max-width: 70rem;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 12rem;
}

.background-image {
  background-image: url('../assets/backgrounds/bg-bottom-ergebnis.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.error-message {
  color: rgb(252, 0, 0);
  margin-right: 0.3em;
}
</style>
