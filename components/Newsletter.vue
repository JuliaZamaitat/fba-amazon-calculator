<template>
  <div class="newsletter">
    <h2>
      Die neusten Tipps für deine Business - Optimierung in unserem Newsletter.
    </h2>
    <div class="email">
      <p>DEINE EMAIL:</p>
      <img class="icon-line" src="../assets/icons/line.svg" />
      <div>
        <button>Bestätigen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
  .email {
    max-width: 50rem;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    margin-top: 129px;
    p {
      margin-bottom: 19px;
    }
    div {
      margin-top: 25px;
      text-align: right;
      button {
        &:hover {
          background-color: var(--clr-white-100);
          color: var(--clr-purple-100);
        }
      }
    }
  }
}
</style>
