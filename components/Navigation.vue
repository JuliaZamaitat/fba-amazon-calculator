<template>
  <div>
    <div class="nav nav-desktop">
      <NuxtLink to="/">Amazon FBA Rechner</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
    </div>
    <div class="nav nav-mobile" v-if="!open">
      <button @click="toggleMenu">
        <img src="../assets/icons/burger-menu.svg" />
      </button>
    </div>
    <Transition name="fade">
      <div class="mobile-navigation-container" v-if="open">
        <button class="close-btn" @click="toggleMenu">x</button>
        <div class="links">
          <NuxtLink class="link" to="/" v-if="this.$route.path != '/'"
            >Amazon FBA Rechner</NuxtLink
          >
          <NuxtLink class="link" to="/blog" v-if="this.$route.path != '/blog'"
            >Blog</NuxtLink
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    }
  },
  watch: {
    $route() {
      this.open = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.nav-desktop,
.nav-mobile {
  font-size: var(--fs-400);
  text-align: right;
  position: absolute;
  top: 2.5em;
  right: 2em;

  a:not(:last-of-type) {
    margin-right: 0.8em;
  }

  @media (max-width: 55em) {
    display: none;
  }
}
.nav-mobile {
  display: none;
}

@media (max-width: 55em) {
  .nav-mobile {
    display: block;
  }
  body {
    overflow: hidden;
  }
}

button {
  border: none;
  padding: 0;
  margin: 0;
  width: auto;
}

.mobile-navigation-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: var(--clr-purple-100);
  z-index: 500;

  .close-btn {
    font-size: 40px;
    color: white;
    width: auto;
    position: fixed;
    right: 32px;
    margin-top: 10px;
  }
  .links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .link {
      color: white !important;
      text-decoration: none;
      margin: 30px;
      font-size: 25px;
    }
  }
}
</style>
