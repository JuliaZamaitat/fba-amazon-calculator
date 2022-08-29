<template>
  <div class="newsletter">
    <!-- Begin Mailchimp Signup Form -->
    <div class="email">
      <div id="mc_embed_signup">
        <form
          action="https://gittr.us13.list-manage.com/subscribe/post?u=4eb766ca1a1db29dbff34ec2b&amp;id=24d8fcc99c&amp;f_id=0056f5e2f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_self"
        >
          <div id="mc_embed_signup_scroll">
            <h2>
              Die neusten Tipps für deine Business - Optimierung in unserem
              Newsletter.
            </h2>

            <div class="input">
              <div class="mc-field-group">
                <label for="mce-EMAIL">DEINE EMAIL: </label>
                <input
                  type="email"
                  v-model="email"
                  @input="markChecked()"
                  @blur="checkEmail(email)"
                  value=""
                  name="EMAIL"
                  placeholder="yourmail@mail.de"
                  class="required email"
                  id="mce-EMAIL"
                  required
                />
                <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
              </div>
            </div>
            <div id="mce-responses" class="clear foot">
              <div
                class="response"
                id="mce-error-response"
                style="display: none"
              ></div>
              <div
                class="response"
                id="mce-success-response"
                style="display: none"
              ></div>
            </div>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px" aria-hidden="true">
              <input
                type="text"
                name="b_4eb766ca1a1db29dbff34ec2b_24d8fcc99c"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="confirm">
              <div class="optionalParent">
                <div class="clear foot">
                  <input
                    type="submit"
                    value="Bestätigen"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    class="button"
                    :disabled="
                      errors.length != 0 || email == '' || !emailChecked
                    "
                    :class="{
                      disabled:
                        errors.length != 0 || email == '' || !emailChecked
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!--End mc_embed_signup-->
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
.button,
label,
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
      margin-top: 2.5em !important;

      max-width: 100%;
      border-bottom: 1px solid white;

      input {
        display: inline;
        flex: 1;
        margin: 0 4em 1em 2em !important;
        @media (max-width: 55em) {
          margin: 0 0.5em 0 !important;
        }
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
      .button {
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
