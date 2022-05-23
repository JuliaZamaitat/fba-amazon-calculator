<template>
  <div>
    <div class="heading-container">
      <div class="bg-top">
        <div class="heading">
          <h1>Kontakt</h1>
        </div>
      </div>
    </div>

    <div class="form">
      <h2>Wir freuen uns auf Deine Nachricht.</h2>
      <div class="container">
        <div class="name">
          <div class="input">
            <input
              type="text"
              placeholder="NAME"
              v-model="name"
              @input="markNameChecked()"
              @blur="checkName(name)"
            />
          </div>
        </div>
        <div class="email">
          <div class="input">
            <input
              type="text"
              placeholder="EMAIL"
              v-model="email"
              @input="markEmailChecked()"
              @blur="checkEmail(email)"
            />
          </div>
        </div>
      </div>
      <div class="message">
        <div class="input">
          <textarea
            placeholder="Deine Nachricht"
            v-model="message"
            @blur="checkMessage(message)"
          />
        </div>
      </div>
      <div class="datenschutz">
        <input type="checkbox" @change="checkDatenschutzAgreement()" />
        <label
          >Einwilligung zur
          <NuxtLink to="/datenschutz">Datenschutzerklärung</NuxtLink></label
        >
      </div>

      <div class="confirm">
        <ul>
          <li class="error-message" v-for="error in errors" :key="error.id">
            {{ error }}
          </li>
        </ul>
        <button
          @click="sendContactMail()"
          :disabled="
            errors.length != 0 ||
            email == '' ||
            !emailChecked ||
            name == '' ||
            !nameChecked ||
            message == '' ||
            !messageChecked ||
            !datenschutzChecked
          "
          :class="{
            disabled:
              errors.length != 0 ||
              email == '' ||
              !emailChecked ||
              name == '' ||
              !nameChecked ||
              message == '' ||
              !messageChecked ||
              !datenschutzChecked
          }"
        >
          Absenden
        </button>
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
import emailjs from '@emailjs/browser';

export default {
  data() {
    return {
      email: '',
      name: '',
      message: '',
      errors: [],
      emailChecked: false,
      nameChecked: false,
      messageChecked: false,
      datenschutzChecked: false,
      emailSent: false
    };
  },
  methods: {
    markEmailChecked() {
      this.emailChecked = false;
    },
    markNameChecked() {
      this.nameChecked = false;
    },
    markMessageChecked() {
      this.messageChecked = false;
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
    checkName(name) {
      this.errors = [];
      this.nameChecked = true;
      if (name == '') {
        this.errors.push('Bitte trage einen Namen ein');
      }
    },
    checkMessage(message) {
      this.errors = [];
      this.messageChecked = true;
      if (message.length < 20) {
        this.errors.push('Bitte schreibe eine längere Nachricht');
      }
    },
    checkDatenschutzAgreement() {
      this.datenschutzChecked = !this.datenschutzChecked;
    },
    sendContactMail() {
      this.errors = [];

      const serviceID = process.env.EMAILJS_SERVICE_ID;
      const templateID = process.env.EMAILJS_TEMPLATE_ID_CONTACT_FORM;
      const userID = process.env.EMAILJS_USER_ID;

      const templateParams = {
        to: 'info@gittr.com',
        userEmail: this.email,
        userName: this.name,
        message: this.message
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
    document.getElementsByClassName('link')[0].className = 'link white';
    document.getElementsByClassName('link')[1].className = 'link white';
  }
};
</script>

<style lang="scss" scoped>
.heading-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  .bg-top {
    z-index: -100;
    width: 100%;
    min-height: 350px;
    background-image: url('../assets/backgrounds/bg-top-purple-light.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;

    @media (min-width: 30em) {
      min-height: 450px;
    }

    @media (min-width: 87.5em) {
      min-height: 500px;
    }

    @media (min-width: 131em) {
      min-height: 600px;
    }
  }
  .heading {
    h1 {
      color: var(--clr-white-100);
      font-weight: var(--fw-bold);
      font-size: 2.5rem;
      letter-spacing: 0.1em;
      position: absolute;
      top: 12rem;
      padding-left: 7rem;
      @media (max-width: 55em) {
        padding-left: 3rem;
      }
    }
  }
}

.email,
.name,
.message {
  input {
    cursor: text;
    color: black;
    width: 100%;

    &::placeholder {
      color: black;
      font-weight: var(--fw-bold);
    }
  }
}
.name,
.email {
  width: 100%;
  border-bottom: 2px solid var(--clr-purple-100);
}

.name {
  margin-right: 4rem;
}
.message {
  margin-top: 2rem;

  textarea {
    padding: 1rem;
    border: 2px solid var(--clr-purple-100);
    width: 100%;
    height: 300px;
    resize: none;
  }
}

.confirm {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    margin-top: 0.5rem;
    font-weight: var(--fw-bold);
    border: 2px solid var(--clr-purple-100);
    &:hover {
      background-color: var(--clr-purple-100);
      color: var(--clr-white-100);
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

.form {
  margin: 0 auto;
  width: 70vw;
  margin-top: 3rem;

  @media (max-width: 55em) {
    max-width: 85vw;
    margin-top: 3rem;
    margin-bottom: 0;
  }

  h2 {
    text-align: left;
  }

  .container {
    display: flex;
    margin-top: 2.8rem;

    @media (max-width: 55em) {
      flex-direction: column;
      margin-top: 1rem;

      .email {
        margin-top: 2rem;
      }
    }
  }
}

.datenschutz {
  margin-top: 0.5rem;
  label {
    font-weight: var(--fw-thin);
    font-size: 13px;
    letter-spacing: 0.1em;
  }
}

.footer-block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;

  .text {
    background-image: url('../assets/backgrounds/bg-bottom-grey.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    width: 100%;
    padding-top: 13rem;
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
</style>
