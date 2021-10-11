import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../src/components/pages/MainPage.vue';
import ArticleDetails from '../src/components/article/ArticleDetails.vue';

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
      path: '/',
      redirect: '/main'
    }
  ]
})

export default router;