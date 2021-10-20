import axios from 'axios';
import { baseURL } from '~/helper/url';

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
    if (state.posts.length) return;
    try {
      let posts = await axios.get(baseURL).then((res) => res.data);
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
