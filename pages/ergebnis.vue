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
        <p>DEINE EMAIL:</p>
        <img class="icon-line" src="../assets/icons/line.svg" />
        <div>
          <button>Absenden</button>
        </div>
      </div>
    </div>

    <div class="blog">
      <h2 class="uppercase">Unser Blog</h2>
      <div class="blog blog-posts">
        <Post />
        <Post />
        <Post />
      </div>
    </div>

    <div class="newsletter">
      <Newsletter />
    </div>

    <Footer />
  </div>
</template>

<script>
import Newsletter from '~/components/Newsletter.vue';
export default {
  components: { Newsletter },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';

    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
    this.step1 = true;
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: var(--clr-white-100);
  font-size: var(--fs-800);
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
  margin: 2.5em 0;

  p {
    font-weight: var(--fw-bold);
    margin-bottom: 0.8em;
  }

  div {
    text-align: right;
    button {
      margin-top: 2.15em;
      margin-right: 4em;
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
</style>
