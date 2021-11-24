<template>
  <div class="background-image">
    <div class="content">
      <h1>Blog</h1>
      <div class="posts">
        <div v-for="post in posts" :key="post.id" class="post">
          <Post :post="post" />
        </div>
      </div>

      <div class="newsletter">
        <Newsletter />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },

  async created() {
    await this.$store.dispatch('fetchPosts');
  }
};
</script>

<style lang="scss" scoped>
.content {
  margin: 3em 4em 0;

  h1 {
    color: var(--clr-white-100);
    font-size: var(--fs-800);
  }

  .posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-block: 2rem;
    gap: 2rem;
  }

  .newsletter {
    max-width: 70rem;
    margin: 0 auto;
    margin-top: 10rem;
    margin-bottom: 12rem;
  }
}

.background-image {
  background-image: url('../../assets/backgrounds/bg-bottom-ergebnis.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
