<template>
  <div class="posts">
    <h2>Posts</h2>
    <!-- here we loop through the posts -->
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>
        <!-- for each one of them, we’ll render their title, and link off to their individual page -->
        <a :href="`/blog/${post.slug}`">{{ post.title.rendered }}</a>
      </h3>
      <div v-html="post.excerpt.rendered"></div>
      <a :href="`/blog/${post.slug}`" class="readmore">Read more ⟶</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // posts: []
    };
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

<style lang="scss" scoped></style>
