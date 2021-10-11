import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../src/components/pages/MainPage.vue';
import ArticleDetails from '../src/components/article/ArticleDetails.vue';
import SearchResults from '../src/components/pages/SearchResults.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/main',
      component: MainPage
    },
    {
      path: '/details/:Nid',
      component: ArticleDetails
    },
    {
      path: '/search',
      component: SearchResults
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
})

export default router;