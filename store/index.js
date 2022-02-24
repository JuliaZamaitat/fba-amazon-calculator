import axios from 'axios';
import { baseURL } from '~/helper/url';

export const state = () => ({
  posts: [],
  categories: [],
  result: {}
});

export const getters = {
  getPosts: (state) => {
    return state.posts;
  },
  getCategories: (state) => {
    return state.categories;
  },
  getResult: (state) => {
    return state.result;
  }
};

export const mutations = {
  SET_POSTS: (state, posts) => {
    state.posts = posts;
  },
  SET_CATEGORIES: (state, categories) => {
    state.categories = categories;
  },
  SET_RESULT: (state, result) => {
    state.result = result;
  }
};

export const actions = {
  async fetchPosts({ commit }) {
    try {
      let posts = await axios.get(`${baseURL}/posts`).then((res) => res.data);
      posts = posts
        .filter((el) => el.status === 'publish')
        .map(
          ({ id, slug, title, excerpt, date, tags, content, categories }) => ({
            id,
            slug,
            title,
            excerpt,
            date,
            tags,
            content,
            categories
          })
        );
      commit('SET_POSTS', posts);
    } catch (err) {
      console.log(err);
    }
  },
  async fetchCategories({ commit }) {
    try {
      let categories = await axios
        .get(`${baseURL}/categories`)
        .then((res) => res.data);
      categories = categories
        .filter((c) => c.id != 1)
        .map(({ id, name }) => ({
          id,
          name
        }));
      commit('SET_CATEGORIES', categories);
    } catch (err) {
      console.log(err);
    }
  },
  saveResult({ commit }, result) {
    commit('SET_RESULT', result);
  }
};
