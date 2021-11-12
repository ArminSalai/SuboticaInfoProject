<template>
	<div class="bg-pattern">
		<SecondaryHeader class="mb-5" />
		<div class="container">
			<img :src="image" class="img-fluid w-50 m-auto" alt="No Image Provided" />
			<br />
			<span class="badge bg-danger text-light rounded-pill my-4"
				><p class="m-0 py-1 px-3">{{ category }}</p></span
			>
			<h1 class="display-2 my-3 text-light">{{ title }}</h1>
			<p class="text-light mb-4">Početak Događaja: {{ date }}</p>
			<hr />
			<p class="lead indented text-light">
				{{ desc }}
			</p>
			<p class="fw-bold mt-5 text-light">
				Mesto Održavanja: <span class="fw-light">{{ place }}</span>
			</p>
		</div>
    <div class="space"></div>
		<TheFooter />
	</div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { gsap } from 'gsap';
import { onMounted, computed } from "vue";
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";

export default {
	components: {
		SecondaryHeader,
		TheFooter,
	},
	setup() {
		const store = useStore();
		const route = useRoute();

		async function getArticle() {
			await store.dispatch("setNajavaDetails", route.params.Nid);
		}

		const article = computed(() => {
			return store.getters.getNajava[0];
		});

		const title = computed(() => {
			if (article.value == undefined) return null;
			else return article.value.Naslov;
		});
		const date = computed(() => {
			if (article.value == undefined) return null;
			else return article.value["Pocetak dogadjaja"];
		});
		const desc = computed(() => {
			if (article.value == undefined) return null;
			else return article.value["Sadrzaj clanka"];
		});
		const image = computed(() => {
			if (article.value == undefined) return null;
			else return article.value["Vodeca slika"];
		});
		const tagovi = computed(() => {
			if (article.value == undefined) return null;
			else return article.value.Tagovi;
		});
		const category = computed(() => {
			if (article.value == undefined) return null;
			else return article.value["Vrsta dogadjaja"];
		});
		const place = computed(() => {
			if (article.value == undefined) return null;
			else return article.value["Mesto odrzavanja"];
		});

		onMounted(async function () {
			await getArticle();
      gsap.from(".display-2", {
        delay: 0.2,
        filter: 'blur(10px)',
        duration: 0.5,
				scale: 4,
			});
		});

		return {
			category,
			title,
			desc,
			image,
			date,
			tagovi,
			place,
		};
	},
};
</script>