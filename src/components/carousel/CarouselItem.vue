<template>
	<div
		class="carousel-item carousel-height bg-dark text-light"
		:class="index == current ? 'active' : ''"
	>
		<img
			:src="imageLatest"
			class="d-block h-100 mx-auto"
			alt="No Image Provided"
		/>
		<div
			class="
				carousel-caption
				d-none d-md-block
				bg-news-title
				w-100
				h-30
				start-0
				end-0
				bottom-0
			"
		>
			<h3><router-link :to="'/details/' + index" class="text-decoration-none text-light">{{ titleLatest }} </router-link><small class="text-danger fs-6">{{ dateLatest }}</small></h3>
			<p>
				{{ desc }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: ["titleLatest", "imageLatest", "descLatest", "dateLatest", "index", "current"],
	data() {
		return {
			desc: String(this.descLatest).substring(0, 100) + "...",
		};
	},
};
</script>