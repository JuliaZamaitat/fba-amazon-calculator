<template>
  <div>
    <div class="heading-container">
      <div class="bg-top">
        <div class="heading content" v-if="post">
          <h1>{{ post.title.rendered }}</h1>
        </div>
      </div>
    </div>
    <div class="placeholder" v-if="!post"></div>
    <div class="content" v-if="post">
      <p v-html="post.content.rendered"></p>
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
      loading: true,
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
    this.loading = true;
    await this.$store.dispatch('fetchPosts');
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
:deep h1,
:deep h2,
:deep h3,
:deep h4,
:deep h5 {
  padding: 2rem 0;
  color: #8000ff;
}
:deep ul,
:deep ol {
  list-style: inherit;
  margin-top: 0;
}
:deep a {
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
    min-height: 200px;
    background-image: url('../../assets/backgrounds/bg-top-purple.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;

    @media (min-width: 87.5em) {
      min-height: 450px;
    }

    @media (min-width: 131em) {
      min-height: 550px;
    }
  }
  .heading {
    @extend .content;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-right: 30px !important;
    padding: 6rem 0;

    @media (max-width: 55em) {
      padding: 3rem 0;
    }

    h1 {
      color: #ffb72c;
      font-weight: var(--fw-extra-bold);
      font-size: var(--fs-700);
      line-height: 145%;
      letter-spacing: 0.1em;
      text-transform: none;
      padding: 0;
    }
  }
}

.placeholder {
  min-height: 25rem;
}
.content {
  max-width: 70vw;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  letter-spacing: 0.07em;
  font-size: var(--fs-400);

  :deep p {
    max-width: 43em;
    margin: auto;
    padding-bottom: 1.5rem;
  }

  :deep img,
  :deep picture {
    object-fit: cover;
    height: 100%;
    width: 100%;
    padding-bottom: 1rem;
  }

  @media (max-width: 55em) {
    max-width: 85vw;
    margin-top: 3rem;
    margin-bottom: 0;
  }
}

.footer-block {
  height: 100%;
  background-image: url('../../assets/backgrounds/bg-bottom-grey.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: calc(-4vw + 2px);
  .text {
    padding-top: 8rem;
  }
}

:deep .link {
  &::after {
    font-weight: var(--fw-bold) !important;
  }
  &:hover {
    font-weight: var(--fw-bold) !important;
  }
}
</style>
