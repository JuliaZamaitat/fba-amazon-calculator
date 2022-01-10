<template>
  <div>
    <img class="bg-top" src="../../assets/backgrounds/bg-top-purple.svg" />

    <div v-if="post">
      <div class="heading">
        <h1>{{ post.title.rendered }}</h1>
      </div>
      <div class="content">
        <p v-html="post.content.rendered"></p>
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
  },
  data() {
    return {
      slug: this.$route.params.slug
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    post() {
      return this.posts.find((el) => el.slug === this.slug);
    }
  },
  async created() {
    await this.$store.dispatch('fetchPosts');
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
  color: #8000ff;
}
::v-deep ul,
::v-deep ol {
  list-style: inherit;
}
::v-deep a {
  text-decoration: underline;
  color: blue;
}

.bg-top {
  z-index: -100;
  height: 40vw;
}

.heading {
  h1 {
    color: #ffb72c;
    font-weight: var(--fw-extra-bold);
    font-size: var(--fs-700);
    letter-spacing: 0.1em;
    text-transform: none;
    position: absolute;
    top: 12rem;
    padding-left: 10rem;
  }
}

.content {
  max-width: 70vw;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 5rem;
  letter-spacing: 0.07em;
  font-size: var(--fs-400);
}

.footer-block {
  height: 100%;
  background-image: url('../../assets/backgrounds/bg-bottom-grey.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 40vh;

  margin-top: calc(-4vw + 2px);

  .text {
    padding-top: 8rem;
  }
}
</style>
