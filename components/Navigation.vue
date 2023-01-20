<template>
  <div class="nav">
    <div class="logo">
      <a href="/"><img src="../static/icon.svg" /></a>
    </div>

    <div class="nav nav-desktop">
      <div class="wrapper">
        <NuxtLink class="link" to="/">Amazon FBA Rechner</NuxtLink>
      </div>
      <div class="wrapper">
        <NuxtLink class="link" to="/blog">Blog</NuxtLink>
      </div>
    </div>
    <div class="nav nav-mobile" v-if="!open">
      <button class="burger" @click="toggleMenu">
        <img src="../assets/icons/burger-menu.svg" />
      </button>
    </div>
    <Transition name="fade">
      <div class="mobile-navigation-container" v-if="open">
        <div class="close">
          <button class="close-btn" @click="toggleMenu">x</button>
        </div>
        <div class="links">
          <NuxtLink class="link" to="/" v-if="this.$route.path != '/'"
            >Amazon FBA Rechner</NuxtLink
          >
          <NuxtLink class="link" to="/blog" v-if="this.$route.path != '/blog'"
            >Blog</NuxtLink
          >
          <NuxtLink
            class="link"
            to="/kontakt"
            v-if="this.$route.path != '/kontakt'"
            >Kontakt</NuxtLink
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
.nav {
  position: absolute;
  top: 15px;
  width: 100vw;
}
.logo {
  display: inline-block;
  width: 100px;
  position: absolute;
  left: 2em;
  top: 0.5em;
  z-index: 1;
}

.nav-desktop {
  .wrapper {
    position: relative;
    display: inline;
    &:not(:last-of-type) {
      margin-right: 0.8em;
    }
  }
  a {
    position: relative;
    display: inline-block;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      transform: scaleX(0);
      background-color: white;
      transition: transform 0.3s ease-in-out;
    }
    &:before {
      transition: transform 0.3s ease-in-out;
    }
    &.purple {
      &:after {
        background-color: var(--clr-purple-100);
      }
    }

    &.orange {
      &:after {
        background-color: var(--clr-orange-100);
      }
    }
    &.white {
      &:after {
        background-color: var(--clr-white-100);
      }
    }

    &:hover {
      &:after {
        transform: scaleX(1);
      }
    }
  }
}

.nav-desktop {
  right: 2em;
}

.nav-desktop,
.nav-mobile {
  font-size: var(--fs-400);
  text-align: right;

  @media (max-width: 55em) {
    display: none;
  }
}
.nav-mobile {
  display: none;

  .logo {
    left: 1em;
  }
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

  img {
    display: inline;
  }
}

.burger {
  text-align: right;
  padding: 0 10px;
  margin-right: 2em;
}

.mobile-navigation-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: var(--clr-purple-100);
  z-index: 600;

  .close {
    position: relative;
    z-index: 1;
    text-align: right;
    margin-right: 2em;
    .close-btn {
      font-size: 40px;
      color: white;
      text-align: right;
      padding: 0 10px;
    }
  }
  .links {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .link {
      color: white !important;
      text-decoration: none;
      margin: 0 0.8rem 2.5rem 0.8rem;
      font-size: 25px;
      text-align: center;
    }
  }
}
</style>
