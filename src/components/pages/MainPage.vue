<template>
	<div>
		<TheHeader />
		<section>
			<CarouselMain :latest-articles="latestArticles" :current="current" />
		</section>
	</div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import CarouselMain from "../carousel/CarouselMain.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
	components: {
		TheHeader,
		CarouselMain,
	},
	setup() {
		const store = useStore();
        const current = ref(0);
		async function getLatestArticles() {
			await store.dispatch("setArticle", "latest");
		}
		const latestArticles = computed(() => {
			return store.getters.getLatestArticles;
		});

        

		onMounted(async function () {
			await getLatestArticles();
            current.value = latestArticles.value.find(node => node.Nid == Math.max(node.Nid)).Nid;
		});

		return {
            current,
			latestArticles,
		};
	},
};
</script>