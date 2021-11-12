<template>
	<div class="bg-pattern">
		<SecondaryHeader />
		<div class="container">
			<h1 class="mt-5 mb-3 display-2 text-light">Sport</h1>
			<div class="row d-flex flex-row">
				<ul class="p-0 mt-2 list-unstyled">
					<ResultItem
						data-aos="fade-right"
						v-for="article in articles"
						:key="article.Nid"
						:index="article.Nid"
						:title="article.Naslov"
						:fullDesc="article['Sadrzaj clanka']"
						:image="article['Vodeca slika']"
						:date="article['Post date']"
					/>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import ResultItem from "../results/ResultItem.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
	components: {
		SecondaryHeader,
		ResultItem,
	},
	setup() {
		gsap.registerPlugin(ScrollToPlugin);
		const store = useStore();
		const page = ref(0);
		const wait = ref(false);
		const articles = computed(() => {
			return store.getters.getSports;
		});

		async function load() {
			let scrollTop = window.scrollY;
			let docHeight = document.body.offsetHeight;
			let winHeight = window.innerHeight;
			let scrollPercent = scrollTop / (docHeight - winHeight);
			if (scrollPercent > 0.9 && !wait.value) {
				page.value++;
				wait.value = true;
				await store.dispatch("loadSportItems", page.value);
				wait.value = false;
			}
		}

		onBeforeUnmount(() => {
			window.removeEventListener("scroll", load);
		});

		onMounted(async function () {
			window.addEventListener("scroll", load);
			store.dispatch("Reset");
			await store.dispatch("loadSportItems", page.value);
		});

		return {
			articles,
			load,
		};
	},
	created() {
		AOS.init();
	},
};
</script>