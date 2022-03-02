<template>
  <div>
    <div class="heading-container">
      <div class="bg-top">
        <div class="heading">
          <h1>Blog</h1>
          <div class="categories">
            <div
              v-for="category in categories"
              :key="category.id"
              class="category"
            >
              <Category
                :category="category"
                @selected="changeSelectedCategories($event, category)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-if="!loading">
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
    </div>

    <div class="newsletter">
      <Newsletter />
    </div>
    <div class="footer">
      <Footer />
    </div>
    <div class="bg-bottom-shapes"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
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
    this.loading = true;
    await this.$store.dispatch('fetchPosts');
    await this.$store.dispatch('fetchCategories');
    const { getters } = this.$store;
    this.categories = getters.getCategories;
    this.posts = getters.getPosts;
    this.shownPosts = Array.from(this.posts);
    this.updateShownPosts(this.pageNum);
    this.loading = false;
  },
  mounted() {
    document.querySelector('body').style.backgroundColor =
      'var(--clr-purple-100)';
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
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
.heading-container {
  h1 {
    color: var(--clr-white-100);
    font-size: var(--fs-800);
  }
  display: flex;
  flex-direction: row;
  align-items: center;

  .bg-top {
    background-image: url('../../assets/backgrounds/bg-top-orange.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    width: 100%;
    min-height: 37.5rem;

    @media (min-width: 90.5em) {
      min-height: 46.875rem;
    }

    @media (min-width: 131em) {
      min-height: 53.125rem;
    }

    .heading {
      margin: 7em 6em;
      @media (max-width: 55em) {
        width: 80vw;
        margin: 7em 1em;
      }

      .categories {
        width: 50vw;
        display: flex;
        flex-wrap: wrap;
        margin-block: 2rem;
        gap: 1rem;
        @media (max-width: 55em) {
          width: 80vw;
        }
        z-index: 500;
      }
    }
  }
}

.content {
  margin: -14em 4em 0;

  @media (max-width: 35em) {
    margin: -14em 0 0;
  }

  .posts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    margin-top: 6rem;

    .post {
      display: flex;
    }
    @media (max-width: 35em) {
      margin-top: 3rem;
    }
  }
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
    margin: 0.93rem;
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

.newsletter {
  max-width: 70rem;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 12rem;
  @media (max-width: 55em) {
    margin-bottom: 5rem;
  }
}

.footer {
  margin-top: 12.5rem;
  @media (max-width: 55em) {
    margin-top: 9.375rem;
  }
}

.bg-bottom-shapes {
  background-image: url('../../assets/backgrounds/bg-bottom-purple-shapes.svg');
  background-position: top;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 59.375rem;
  margin-top: -59.375rem;
  z-index: -500;

  @media (min-width: 120em) {
    min-height: 65em;
    margin-top: -60em;
  }
}
</style>
