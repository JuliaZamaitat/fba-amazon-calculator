<template>
  <div class="card">
    <div class="card__header">
      <img
        src="../assets/icons/icon-post.svg"
        alt="card__image"
        class="card__image"
      />
    </div>
    <div class="card__body">
      <h3>Ich bin ein Titel</h3>
      <div class="meta">
        <p>Von:</p>
        <p class="bold purple">gittr</p>
        <p class="bold">|</p>
        <p class="bold purple">Nov: 18, 2021</p>
        <p class="bold">|</p>
        <p class="bold purple">Amazon FBA</p>
      </div>
      <p>
        Wer sich mit einer eigenen Marke und einer guten Produktstrategie bei
        Amazon auf FBA Basis (Fulfilment by Amazon) ein gewinnbringendes
        Geschäft aufgebaut hat, steht neben diesem erfreulichen Aspekt manchmal
        auch vor ganz neuen Hürden, die
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--clr-white-100);
  display: flex;
  flex-direction: column;
  width: clamp(22rem, calc(25rem + 2vw), 25rem);
  height: clamp(30rem, calc(30rem + 2vw), 35rem);

  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;

  img {
    max-width: 100%;
    display: block;
    object-fit: cover;
  }

  .card__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: clamp(10rem, calc(10rem + 2vw), 15rem);
    background-color: var(--clr-purple-100);
  }

  .card__body {
    font-family: 'Montserrat', sans-serif;
    margin: 1.2em 1.45em;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      color: #8000ff;
      margin-bottom: 0.5em;
    }

    .meta {
      margin-bottom: 0.5em;
      p {
        display: inline;
        font-size: 0.6em;
        &.bold {
          font-weight: var(--fw-bold);
        }

        &.purple {
          color: #8000ff;
        }
      }
    }

    p {
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.1em;
    }
  }
}
</style>
