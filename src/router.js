import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../src/components/pages/MainPage.vue';
import ArticleDetails from '../src/components/article/ArticleDetails.vue';
import SearchResults from '../src/components/pages/SearchResults.vue';
import LatestList from '../src/components/pages/LatestList.vue';
import SportLatest from '../src/components/pages/SportLatest.vue';
import KulturaLatest from '../src/components/pages/KulturaLatest.vue';
import CategoryAll from '../src/components/pages/CategoryAll.vue';

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
      path: '/latest',
      component: LatestList
    },
    {
      path: '/sport',
      component: SportLatest
    },
    {
      path: '/kultura',
      component: KulturaLatest
    },
    {
      path: '/kategorija/:Category/sve',
      component: CategoryAll
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
})

export default router;