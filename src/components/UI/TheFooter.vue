<template>
  <div v-if="panoramica" class="container-flex">
    <div class="position-relative">
      <img :src="pic" class="w-100" alt="No Image Available" />
      <p class="h4 footer-title pt-3 pb-2 px-5 text-dark">{{ title }}</p>
    </div>
    <p class="lead text-center text-dark mb-1 mt-3">
      This page is a replicated version of
      <a
        href="https://www.subotica.info/"
        class="text-dark"
        >https://www.subotica.info/</a
      >.
    </p>
    <p class="lead text-center text-dark">
      This site was created by Armin Salai
    </p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();
    const panoramica = computed(() => {
      return store.getters.getPanoramica;
    });

    const pic = computed(() => {
      return panoramica.value["Panoramska slika"];
    });

    const title = computed(() => {
      return panoramica.value.Naslov;
    });

    onMounted(async function () {
      await store.dispatch("setPanoramica");
    });

    return {
      pic,
      title,
      panoramica,
    };
  },
};
</script>