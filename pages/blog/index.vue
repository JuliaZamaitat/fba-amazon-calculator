<template>
  <div class="background-image">
    <div class="content">
      <h1>Blog</h1>
      <div class="categories">
        <div v-for="category in categories" :key="category.id" class="category">
          <Category
            :category="category"
            @selected="changeSelectedCategories($event, category)"
          />
        </div>
      </div>
      <div class="posts">
        <div v-for="post in shownPosts" :key="post.id" class="post">
          <Post :post="post" />
        </div>
      </div>
      <div>
        <paginate
          :page-count="pageCount"
          :prev-text="''"
          :next-text="''"
          :click-handler="updateShownPosts"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link-item'"
        >
          >
        </paginate>
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
  data() {
    return {
      categories: [],
      posts: [],
      selectedCatgeories: [],
      shownPosts: [],
      pageCount: 1,
      pageNum: 1,
      numberOfPostsOnPage: 6
    };
  },
  async created() {
    await this.$store.dispatch('fetchPosts');
    await this.$store.dispatch('fetchCategories');
    const { getters } = this.$store;
    this.categories = getters.getCategories;
    this.posts = getters.getPosts;
    this.shownPosts = Array.from(this.posts);
    this.updateShownPosts(this.pageNum);
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-orange-100)';
    document.getElementsByClassName('nav')[0].style.color =
      'var(--clr-purple-100)';
  },
  methods: {
    changeSelectedCategories(event, category) {
      if (event == true && this.selectedCatgeories.indexOf(category) == -1) {
        this.selectedCatgeories.push(category);
      } else {
        this.selectedCatgeories.splice(
          this.selectedCatgeories.indexOf(category),
          1
        );
      }
      this.filterPosts();
    },
    filterPosts() {
      if (this.selectedCatgeories.length == 0) {
        this.shownPosts = Array.from(this.posts);
        this.calculateShownPostsBasedOnPageNumber();
        this.calculatePageCount(this.posts);
      } else {
        this.shownPosts = [];
        var copiedPosts = Array.from(this.posts);
        for (const post in copiedPosts) {
          var inside = false;
          for (const category in copiedPosts[post].categories) {
            for (const sc in this.selectedCatgeories) {
              if (
                this.selectedCatgeories[sc].id ==
                copiedPosts[post].categories[category]
              )
                inside = true;
            }
          }
          if (inside == true) this.shownPosts.push(copiedPosts[post]);
          this.calculatePageCount(this.shownPosts);
        }
        this.calculateShownPostsBasedOnPageNumber();
      }
    },
    updateShownPosts(pageNum) {
      this.pageNum = pageNum;
      this.filterPosts();
    },
    calculateShownPostsBasedOnPageNumber() {
      let r = this.pageNum - 1;
      let startIndex = r * this.numberOfPostsOnPage;
      if (this.shownPosts.length > this.numberOfPostsOnPage) {
        this.shownPosts = this.shownPosts.splice(
          startIndex,
          this.numberOfPostsOnPage
        );
      }
    },
    calculatePageCount(posts) {
      this.pageCount = posts.length / this.numberOfPostsOnPage;
    }
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
    // min-height: clamp(
    //   59rem,
    //   calc(59rem + 7vw),
    //   73rem
    // ); //calculated from height of cards + 3 margin-block from flexbox

    justify-content: center;
    margin-block: 3rem;
    gap: 2rem;
    margin-top: 6rem;
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
  background-size: cover;
  background-position: 0px center;
}

.categories {
  width: 50vw;
  display: flex;
  flex-wrap: wrap;
  margin-block: 2rem;
  gap: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 0;

  ::v-deep li {
    color: var(--clr-white-100);
  }
  ::v-deep li:not(:first-of-type, :last-of-type) {
    width: 3rem;
    height: 3rem;
    display: flex;
    margin: 15px;
    align-items: center;
    justify-content: center;
    background-color: #ad00ff;
    box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    font-weight: var(--fw-bold);

    &:hover {
      color: #44364a;
    }
    &.active {
      color: #44364a;
    }
  }
}
</style>
