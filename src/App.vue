<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.bg-news-title {
  background: #000000c0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.carousel-height {
  width: 100%;
  height: 50vh;
}

.bg-black {
  background-color: black;
}

.h-30 {
  height: 30%;
}

router-view {
  text-decoration: none;
}
</style>
