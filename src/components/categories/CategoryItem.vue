<template>
	<li class="p-1 my-5 row py-4">
		<div class="col-lg-7 col-12">
			<router-link :to="'/details/' + index"
				><img
					:src="image"
					class="w-100 rounded-3 listImg"
					alt="No Image Provided"
			/></router-link>
		</div>
		<div class="col-lg-5 col-12 mt-lg-2 mt-4 d-flex flex-column">
			<h3>
				<router-link
					:to="'/details/' + index"
					class="text-decoration-none text-light"
					>{{ title }}</router-link
				>
			</h3>
			<p class="flex-wrap indented mb-1 text-secondary">{{ desc }}</p>
			<p class="ms-auto mb-0 text-danger">
				<small>{{ date }}</small>
			</p>
		</div>
	</li>
</template>

<script>
import shortenDesc from "../hooks/shortenDesc.js";

export default {
	props: ["index", "title", "fullDesc", "image", "date"],
	setup(props) {
		const desc = shortenDesc(props.fullDesc, 400);

		return {
			desc,
		};
	}
};
</script>

<style scoped>
li {
	overflow: hidden;
}
</style>