<template>
  <TheHeader class="mb-5"/>
	<div class="container-fluid w-75">
		<img :src="image" class="img-fluid w-100" alt="No Image Provided" />
		<span class="badge badge-danger text-light rounded-pill"
			><p>{{ category }}</p></span
		>
		<h1>{{ title }}</h1>
		<p>{{ date }}</p>
		<hr />
		<p class="lead">
			{{ desc }}
		</p>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from 'vue-router';
import { onMounted, computed } from "vue";
import TheHeader from '../UI/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
	setup() {
		const store = useStore();
    const route = useRoute();

		async function getArticle() {
			await store.dispatch("setArticle", route.params.Nid);
		}

		const article = computed(() => {
			return store.getters.getLatestArticles[0];
		});

		const category = computed(() => article.value.Nid);
		const title = computed(() => article.value.Naslov);
		const desc = computed(() => article.value["Sadrzaj clanka"]);
		const image = computed(() => article.value["Vodeca slika"]);
		const date = computed(() => article.value["Post date"]);
    console.log(category);

		onMounted(function () {
			getArticle();
		});

		return {
			category,
			title,
			desc,
			image,
			date,
		};
	},
};
</script>