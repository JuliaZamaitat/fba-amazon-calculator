import axios from 'axios';
let dynamicRoutes = () => {
  return axios
    .get('http://content.gittr.com/wp-json/wp/v2/posts')
    .then((res) => {
      return res.data.map((post) => `/blog/${post.slug}`);
    });
};
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fba-amazon-calculator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon_small.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-datepicker', mode: 'client' },
    { src: '~/plugins/vue-pagination', mode: 'client' },
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   // https://go.nuxtjs.dev/eslint
  //   '@nuxtjs/eslint-module'
  // ],
  buildModules: [
    ['@nuxtjs/eslint-module', { fix: true }],
    ['@nuxtjs/svg'],
    ['@nuxtjs/dotenv', { systemvars: true }],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Montserrat: {
            wght: [300, 400, 500, 700, 900]
          }
        },
        display: 'swap',
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false
      }
    ]
  ],

  env: {
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID_FBA_RESULT: process.env.EMAILJS_TEMPLATE_ID_FBA_RESULT,
    EMAILJS_TEMPLATE_ID_CONTACT_FORM:
      process.env.EMAILJS_TEMPLATE_ID_CONTACT_FORM,

    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
    EMAILJS_REDIRECT_TO: process.env.EMAILJS_REDIRECT_TO
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  eslint: {
    fix: true
  },
  generate: {
    routes: dynamicRoutes
  }
};
