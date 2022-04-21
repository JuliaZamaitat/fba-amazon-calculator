<template>
  <div>
    <div class="heading-container">
      <div class="bg-top">
        <div class="heading">
          <h1>Impressum</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <p>
        gittr.com ist ein Projekt der
        <a href="https://firmcatalyst.de/"
          >FirmCatalyst GmbH & Co. KG aus Berlin.</a
        >
      </p>
      <h3>Angaben gemäß § 5 TMG</h3>
      <p></p>

      <p>
        FirmCatalyst GmbH & Co. KG<br />Schreiberhauer Straße 4<br />10317
        Berlin
      </p>
      <br />
      <p>
        Handelsregister: HRA 49813 B<br />Registergericht: Amtsgericht Berlin
        (Charlottenburg)
      </p>
      <br />
      <p>
        <strong>Vertreten durch:</strong><br />FirmCatalyst Verwaltungs GmbH
      </p>
      <br />

      <p>Diese vertreten durch:<br />Nils Cartsburg</p>
      <h3>Kontakt</h3>
      <p>
        Telefon: +49(0) 156 785 535 92 <br />Telefax: +49 (0) 30 747526926
        <br />E-Mail: support [at] firmcatalyst.com
      </p>
      <h3>Umsatzsteuer-ID</h3>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        DE296480873
      </p>
      <h3>Redaktionell verantwortlich</h3>
      <p>
        FirmCatalyst GmbH & Co. KG<br />
        Nils Cartsburg <br />Schreiberhauer Straße 4 <br />10317 Berlin
      </p>
      <h3>EU-Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a href="https://ec.europa.eu/consumers/odr/"
          >https://ec.europa.eu/consumers/odr/</a
        >. Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
      <h3>Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h3>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
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

.heading-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  .bg-top {
    z-index: -100;
    width: 100%;
    min-height: 350px;
    background-image: url('../assets/backgrounds/bg-top-blue.svg');
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

.content {
  max-width: 70vw;
  margin: 0 auto;
  margin-top: 5rem;
  letter-spacing: 0.07em;
  font-size: var(--fs-400);

  @media (max-width: 55em) {
    max-width: 85vw;
    margin-top: 3rem;
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
</style>
