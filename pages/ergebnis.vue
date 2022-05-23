<template>
  <div class="background-image">
    <div class="result">
      <h1>Dein Ergebnis</h1>
      <img class="icon-ergebnis" src="../assets/icons/ergebnis.svg" />
      <div class="result-text">
        <p>Nach unseren Berechnungen ist dein Amazon FBA Business zwischen:</p>
        <p v-if="result" class="result-price">
          {{ result.min }}€ - {{ result.max }}€
        </p>
        <p v-else>xxxx€ - xxxx€</p>
        <p class="result-desktop">
          Erhalte Tipps wie du den Wert deines
          <strong>Amazon FBA Business</strong> steigerst, sowie die detaillierte
          Auflistung darüber, wie sich dein
          <strong>Unternehmenswert</strong> zusammensetzt!
        </p>
        <p class="result-mobile">
          Erhalte die detaillierte Auflistung darüber, wie sich dein
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
          <div class="confirm">
            <ul>
              <li class="error-message" v-for="error in errors" :key="error.id">
                {{ error }}
              </li>
              <li class="email-sent-message" v-if="emailSent">
                Die Email wurde verschickt!
              </li>
            </ul>
            <button
              @click="sendEmailResult()"
              :class="{
                disabled:
                  errors.length != 0 ||
                  email == '' ||
                  !emailChecked ||
                  (result &&
                    Object.keys(result).length === 0 &&
                    Object.getPrototypeOf(result) === Object.prototype)
              }"
              :disabled="
                errors.length != 0 ||
                email == '' ||
                !emailChecked ||
                (result &&
                  Object.keys(result).length === 0 &&
                  Object.getPrototypeOf(result) === Object.prototype)
              "
            >
              Absenden
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="blog">
      <h2 class="uppercase">Unser Blog</h2>

      <div class="blog blog-posts desktop">
        <div v-for="(post, i) in posts" :key="post.id" class="post">
          <Post :post="post" :color="colors[i % colors.length]" />
        </div>
      </div>

      <div class="blog blog-posts mobile">
        <Swiper :options="swiperOptions">
          <SwiperSlide v-for="(post, i) in posts" :key="post.id">
            <Post :post="post" :color="colors[i % colors.length]" />
          </SwiperSlide>
          <div class="swiper-pagination" slot="pagination" />
        </Swiper>
      </div>
    </div>
    <button class="more">
      <NuxtLink class="link" to="/blog">Mehr Beiträge</NuxtLink>
    </button>

    <div class="newsletter">
      <Newsletter />
    </div>

    <Footer />
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      result: {},
      email: '',
      errors: [],
      emailChecked: false,
      emailSent: false,
      swiperOptions: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      },
      colors: ['#FFB72C', '#C038F0', '#3FA0C7']
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts.slice(0, 3);
    }
  },

  async created() {
    await this.$store.dispatch('fetchPosts');
    const { getters } = this.$store;
    this.result = getters.getResult;
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
    document.getElementsByClassName('link')[0].className = 'link purple';
    document.getElementsByClassName('link')[1].className = 'link purple';
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
    },
    sendEmailResult() {
      this.errors = [];
      if (
        !this.email ||
        (this.result &&
          Object.keys(this.result).length === 0 &&
          Object.getPrototypeOf(this.result) === Object.prototype)
      ) {
        console.log('missing params');
        return;
      }
      const maxes = this.result.maxes;
      const converted = this.result.converted;
      const serviceID = process.env.EMAILJS_SERVICE_ID;
      const templateID = process.env.EMAILJS_TEMPLATE_ID;
      const userID = process.env.EMAILJS_USER_ID;
      const templateParams = {
        to: this.email,
        userEmail: this.email,
        minMult: this.result.minMult,
        maxMult: this.result.maxMult,
        minVal: `${this.result.min} €`,
        maxVal: `${this.result.max} €`,
        redirect_to: process.env.EMAILJS_REDIRECT_TO,
        stability: (Math.round(converted[0]) / maxes[0]) * 10,
        diversification: (Math.round(converted[1]) / maxes[1]) * 10,
        profitability: (Math.round(converted[3]) / maxes[3]) * 10,
        concentration: (Math.round(converted[4]) / maxes[4]) * 10,
        focus: (Math.round(converted[5]) / maxes[5]) * 10
      };
      try {
        const response = emailjs.send(
          serviceID,
          templateID,
          templateParams,
          userID
        );
        if (response) {
          console.log('sent');
          this.emailSent = true;
        }
      } catch (e) {
        console.log(e);
        this.errors.push('Etwas ist schiefgelaufen!');
      }
      //Sending copy of email to us if user is interested in selling
      //TODO: Also send copy of email to us with the hint that the person is interested in selling when interestedInSelling == true
      if (!this.result.interestedInSelling) return;
      templateParams.to = 'info@gittr.com';
      try {
        const response = emailjs.send(
          serviceID,
          templateID,
          templateParams,
          userID
        );
        if (response) {
          console.log('sent');
        }
      } catch (e) {
        console.log(e);
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
  font-size: var(--fs-800);
  margin: 0.8em 0 1em;
  line-height: 1;
}

.result-desktop {
  @media (max-width: 55em) {
    display: none;
  }
}

.result-mobile {
  display: none;

  @media (max-width: 55em) {
    display: block;
  }
}

.icon-ergebnis {
  position: absolute;
  top: 6em;
  right: 7em;
  max-height: 100vh;
  width: 16em;
  z-index: -10;
  @media (max-width: 81em) {
    display: none;
  }
}

.result {
  position: relative;
  margin-top: 6em;
  margin-left: 4em;
  padding-bottom: 10em;

  @media (max-width: 55em) {
    margin: 6em 1.5em 0;
    padding-bottom: 5em;
  }

  .result-text {
    max-width: 38em;
  }
}

.email {
  &-input {
    display: flex;
    align-items: flex-start;
    margin-top: 2.5em;
    max-width: 100%;
    border-bottom: 2px solid white;
    margin-right: 60px;

    @media (max-width: 55em) {
      margin-right: 0;
    }

    p {
      display: inline;
      font-weight: var(--fw-bold);
      margin-bottom: 19px;
    }
    input {
      flex: 1;
      margin: 0 4em 0 2em;
      @media (max-width: 55em) {
        margin: 0 0.5em 0;
      }
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
      @media (max-width: 55em) {
        margin-right: 0;
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

    .post {
      display: flex;
    }
  }

  .desktop {
    @media (max-width: 55em) {
      display: none;
    }
  }

  .mobile {
    display: none;
    @media (max-width: 55em) {
      display: block;
    }
  }

  .swiper-container {
    padding-bottom: 35px;
  }
  .swiper-container-horizontal > .swiper-pagination {
    position: absolute;
    bottom: 0;
  }

  ::v-deep .swiper-pagination-bullet {
    width: 0.68rem;
    height: 0.375rem;
    background: #c4c4c4;
    border-radius: 6.25rem;
    opacity: 1;
  }
  ::v-deep .swiper-pagination-bullet-active {
    width: 1.75rem;
    height: 0.375rem;
    background: #ffffff;
    border-radius: 6.25rem;
  }
}
.more {
  margin: 2em auto;
  display: block;
  width: 15em;
  &:hover {
    background-color: var(--clr-white-100);
    color: var(--clr-purple-100);
  }
  @media (max-width: 55em) {
    width: 13em;
  }
}

.newsletter {
  max-width: 70rem;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 12rem;

  @media (max-width: 55em) {
    margin: 5rem 0;
  }
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

.email-sent-message {
  color: var(--clr-orange-100);
}
</style>
