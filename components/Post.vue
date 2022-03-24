<template>
  <div class="card">
    <a :href="`/blog/${post.slug}`">
      <div class="card__header" :style="{ backgroundColor: color }">
        <img v-if="post.icon" :src="post.icon.url" class="card__image" />
      </div>
      <div class="card__body">
        <h3>
          <a :href="`/blog/${post.slug}`">{{ post.title.rendered }}</a>
        </h3>
        <div class="meta">
          <p>Von:</p>
          <p class="bold purple">gittr</p>
          <p class="bold">|</p>
          <p class="bold purple">Nov: 18, 2021</p>
          <p class="bold">|</p>
          <p class="bold purple">Amazon FBA</p>
        </div>
        <p class="excerpt" v-html="truncatedText"></p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    color: String
  },
  computed: {
    truncatedText() {
      const parsedExcerpt = new DOMParser().parseFromString(
        this.post.excerpt.rendered,
        'text/html'
      );
      const excerptText = parsedExcerpt.body.innerText.trim();
      return excerptText.slice(0, 130).concat('…');
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--clr-white-100);
  display: flex;
  flex-direction: column;
  width: clamp(17rem, calc(17rem + 7vw), 25rem);
  min-height: clamp(28rem, calc(28rem + 2vw), 35rem);
  overflow: hidden;
  box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  margin: 0 auto;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1.005) translateZ(0);
  }

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
    min-height: 12rem;
    // background-color: var(--clr-purple-100);
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
      font-size: var(--fs-300);
      line-height: 20px;
      letter-spacing: 0.1em;
    }
  }
}
</style>
