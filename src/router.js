import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../src/components/pages/MainPage.vue';
import ArticleDetails from '../src/components/article/ArticleDetails.vue';
import SearchResults from '../src/components/pages/SearchResults.vue';
import LatestList from '../src/components/pages/LatestList.vue';
import SportLatest from '../src/components/pages/SportLatest.vue';
import KulturaLatest from '../src/components/pages/KulturaLatest.vue';
import SportList from '../src/components/categories/SportList.vue';
import CultureList from '../src/components/categories/CultureList.vue';
import EventAnns from '../src/components/pages/EventAnns.vue';
import RegisterPage from '../src/components/user-specific/RegisterPage.vue';
import LoginPage from '../src/components/user-specific/LoginPage.vue';
import MovieDetails from '../src/components/najava/MovieDetails.vue';
import ZajednicaList from '../src/components/secondaryPages/ZajednicaList.vue';
import PrivredaList from '../src/components/secondaryPages/PrivredaList.vue';
import IntervjuList from '../src/components/secondaryPages/IntervjuList.vue';
import PressList from '../src/components/secondaryPages/PressList.vue';

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
      path: '/kategorija/zajednica/sve',
      component: ZajednicaList
    },
    {
      path: '/kategorija/privreda/sve',
      component: PrivredaList
    },
    {
      path: '/kategorija/intervju/sve',
      component: IntervjuList
    },
    {
      path: '/kategorija/sport/sve',
      component: SportList
    },
    {
      path: '/kategorija/kultura/sve',
      component: CultureList
    },
    {
      path: '/kategorija/press/sve',
      component: PressList
    },
    {
      path: '/najava',
      component: EventAnns
    },
    {
      path: '/najava/details/:Nid',
      component: MovieDetails
    },
    {
      path: '/register',
      component: RegisterPage
    },
    { 
      path: '/login',
      component: LoginPage
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
})

export default router;