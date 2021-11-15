import { createRouter, createWebHistory } from "vue-router";
import { gsap } from 'gsap';
import MainPage from '../src/components/pages/MainPage.vue';
import SearchResults from '../src/components/pages/SearchResults.vue';
import LatestList from '../src/components/pages/LatestList.vue';
import SportLatest from '../src/components/pages/SportLatest.vue';
import KulturaLatest from '../src/components/pages/KulturaLatest.vue';
import SportList from '../src/components/categories/SportList.vue';
import CultureList from '../src/components/categories/CultureList.vue';
import EventAnns from '../src/components/pages/EventAnns.vue';
import ZajednicaList from '../src/components/secondaryPages/ZajednicaList.vue';
import PrivredaList from '../src/components/secondaryPages/PrivredaList.vue';
import IntervjuList from '../src/components/intervju/IntervjuList.vue';
import PressList from '../src/components/secondaryPages/PressList.vue';
import DailyPhoto from '../src/components/daily/DailyPhoto.vue';
import ScrollToPlugin from "gsap/ScrollToPlugin";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/main',
      component: MainPage
    },
    {
      path: '/details/:Nid',
      component: () => import('../src/components/article/ArticleDetails.vue')
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
      path: '/kategorija/press/:category',
      component: PressList
    },
    {
      path: '/najava',
      component: EventAnns
    },
    {
      path: '/daily',
      component: DailyPhoto
    },
    {
      path: '/najava/details/:Nid',
      component: () => import('../src/components/najava/MovieDetails.vue')
    },
    {
      path: '/daily/details/:Nid',
      component: () => import('../src/components/daily/DailyDetails.vue')
    },
    {
      path: '/intervju/details/:Nid',
      component: () => import('../src/components/intervju/IntervjuDetails.vue')
    },
    {
      path: '/register',
      component: () => import('../src/components/user-specific/RegisterPage.vue')
    },
    {
      path: '/login',
      component: () => import('../src/components/user-specific/LoginPage.vue')
    },
    {
      path: '/',
      redirect: '/main'
    }
  ]
});

gsap.registerPlugin(ScrollToPlugin);

router.afterEach(() => {
  gsap.to(window, { duration: 0.2, scrollTo: 0 });
});

export default router;