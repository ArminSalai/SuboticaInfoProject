import { createStore } from 'vuex';
import newsModule from './news/index.js';
import authModule from './auth/index.js';

const store = createStore({
  modules: {
    auth: authModule,
    news: newsModule
  }
});

export default store;