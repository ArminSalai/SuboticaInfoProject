<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light top-0">
		<div class="container">
			<router-link to="/main" class="navbar-brand"><img src="../../assets/logo.png" /></router-link>
			<ul class="navbar-nav ms-3 me-auto">
				<li class="nav-item">
					<a class="nav-link h5 pb-0 mb-0 text-danger" role="button">Poslednje vesti</a>
				</li>
        <li class="nav-item">
					<a class="nav-link h5 pb-0 mb-0 text-danger ms-3" role="button">Sport</a>
				</li>
        <li class="nav-item">
					<a class="nav-link h5 pb-0 mb-0 text-danger ms-3" role="button">Kultura</a>
				</li>
        <li class="nav-item">
					<a class="nav-link h5 pb-0 mb-0 text-danger ms-3" role="button">Najava</a>
				</li>
        <li class="nav-item">
					<a class="nav-link h5 pb-0 mb-0 text-danger ms-3" role="button">Više vesti</a>
				</li>
			</ul>
			<form class="d-flex">
				<input
					class="form-control me-2 pb-1"
					type="search"
					placeholder="Search"
					aria-label="Search"
				/>
				<button class="btn btn-outline-danger pb-1" type="submit">
					Search
				</button>
			</form>
		</div>
	</nav>
</template>