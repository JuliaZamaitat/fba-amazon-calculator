export const state = () => ({
  posts: []
});

export const getters = {
  getPosts: (state) => {
    return state.posts;
  }
};

export const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts;
  }
};

export const actions = {
  async fetchPosts({ state, commit }) {
    // eslint-disable-next-line no-undef
    if (state.posts.length) return;
    var url;
    if (process.env.NODE_ENV == 'production') {
      url = '/api/posts';
    } else {
      url = `http://b10ptpl.myraidbox.de/wp-json/wp/v2/posts`;
    }
    try {
      let posts = await fetch(url).then((res) => res.json());
      posts = posts
        .filter((el) => el.status === 'publish')
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }));
      commit('SET_POSTS', posts);
    } catch (err) {
      console.log(err);
    }
  }
};
