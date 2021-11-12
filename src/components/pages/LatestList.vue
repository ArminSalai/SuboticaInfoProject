<template>
  <div class="bg-pattern">
    <SecondaryHeader />
    <section>
      <div class="container">
        <ul class="list-unstyled mt-5">
          <ResultItem
            v-for="latestItem in news"
            :key="latestItem.Nid"
            :index="latestItem.Nid"
            :title="latestItem.Naslov"
            :fullDesc="latestItem['Sadrzaj clanka']"
            :image="latestItem['Vodeca slika']"
            :date="latestItem['Post date']"
          />
        </ul>

        <div class="input-group my-5">
          <button
            class="btn btn-dark text-light pt-2"
            :class="disabledFirst"
            @click="first"
            type="button"
          >
            Prva
          </button>
          <button
            class="btn btn-dark text-light pt-2"
            :class="disabledFirst"
            @click="prev"
            type="button"
          >
            Predhodna
          </button>
          <button v-for="num in nums" :key="num" @click="set(num)" class="btn btn-outline-light pt-2" :class="num == page? 'active': ''" type="button">
            {{ num }}
          </button>
          <button
            class="btn btn-dark text-light pt-2"
            :class="disabledLast"
            @click="next"
            type="button"
          >
            Iduća
          </button>
          <button
            class="btn btn-dark text-light pt-2"
            :class="disabledLast"
            @click="last"
            type="button"
          >
            Poslednja
          </button>
        </div>
      </div>
    </section>
    <TheFooter />
  </div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";
import ResultItem from "../results/ResultItem.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  components: {
    SecondaryHeader,
    ResultItem,
    TheFooter
  },
  setup() {
    gsap.registerPlugin(ScrollToPlugin);

    const store = useStore();

    const page = ref(0);
    const nums = ref([1, 2, 3, 4, 5, 6, 7]);

    const news = computed(() => {
      return store.getters.getArticles;
    });

    const disabledLast = computed(() => {
      return page.value > 399? 'disabled' : '';
    })

    const disabledFirst = computed(() => {
      return page.value < 1? 'disabled' : '';
    })

    async function scrolled() {
      await store.dispatch("setLatest", page.value);
      await getLatest(page.value);
      if(page.value > 3 && page.value < 394) {
        nums.value = [...Array(7).keys()].map(i => i + page.value - 3);
      }
      else if(page.value > 395) {
        nums.value = [...Array(7).keys()].map(i => i + 394);
      }
      else if(page.value < 3) {
        nums.value = [1, 2, 3, 4, 5, 6, 7];
      }
      gsap.to(window, { duration: 0.2, scrollTo: 0 });
    }

    async function prev() {
      if (page.value > 0) {
        page.value--;
        scrolled();
      }
    }

    async function next() {
      page.value++;
      scrolled();
    }

    async function set(val) {
      page.value = val;
      scrolled();
    }

    async function first() {
      page.value = 0;
      scrolled();
    }

    async function last() {
      page.value = 400;
      scrolled();
    }

    async function getLatest(page) {
      await store.dispatch("setLatest", page);
    }

    onMounted(async function () {
      await getLatest(page.value);
    });

    return {
      news,
      prev,
      next,
      nums,
      page,
      set,
      first,
      last,
      disabledFirst,
      disabledLast
    };
  },
};
</script>