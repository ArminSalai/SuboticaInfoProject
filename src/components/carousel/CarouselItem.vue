<template>
	<div
		class="carousel-item carousel-height bg-dark text-light"
		:class="index == current ? 'active' : ''"
	>
		<router-link :to="'/details/' + index"><img v-if="imageLatest"
			:src="imageLatest"
			class="d-block h-100 mx-auto center"
			alt="No Image Provided"
		/></router-link>
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
			<h3><router-link :to="'/details/' + index" class="text-decoration-none text-light">{{ titleLatest }} </router-link> <small class="text-danger fs-6">{{ dateLatest }}</small></h3>
			<p>
				{{ desc }}
			</p>
		</div>
	</div>
</template>

<script>
import shortenDesc from '../hooks/shortenDesc.js';

export default {
	props: ["titleLatest", "imageLatest", "descLatest", "dateLatest", "index", "current"],
	setup(props) {
		const desc = shortenDesc(props.descLatest, 100);

		return {
			desc
		}
	},
};
</script>