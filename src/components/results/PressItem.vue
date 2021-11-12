<template>
	<li
		data-aos-anchor-placement="center-bottom"
		class="p-3 py-5 my-4 border-bottom border-secondary"
	>
		<div class="row">
			<h3>
				<router-link
					:to="'/details/' + index"
					class="text-decoration-none text-light"
					>{{ title }}</router-link
				>
			</h3>
			<p class="flex-fill text-secondary indented">{{ desc }}</p>
			<p class="mb-0 text-danger text-right ms-auto">{{ date }}</p>
		</div>
	</li>
</template>

<script>
import shortenDesc from "../hooks/shortenDesc.js";

export default {
	props: ["index", "title", "fullDesc", "image", "date", "category"],
	setup(props) {
		const desc = shortenDesc(props.fullDesc, 400);

		return {
			desc,
		};
	},
};
</script>