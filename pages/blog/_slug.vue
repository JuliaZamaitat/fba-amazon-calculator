<template>
  <div>
    <div v-if="post">
      <h1>{{ post.title.rendered }}</h1>
      <p v-html="post.content.rendered"></p>
    </div>
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped></style>
