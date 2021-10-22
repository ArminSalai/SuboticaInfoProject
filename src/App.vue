<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.dispatch('autoLogin');
  }
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

.bg-news-title:hover {
  background: #101010f0;
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

.indented {
  white-space: break-spaces;
}

.center-title {
  position: absolute; 
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto;
  width: max-content;
  max-width: 90%;
  text-align: center;
  text-decoration: none;
}

.listImg {
  height: 15rem;
  object-fit: cover;
}

.categImg {
  height: 20rem;
  object-fit: cover;
}

.w-caru {
  width: 50%;
}

.profilePic {
  display: block;
  width: 5vw !important;
  height: 5vw !important;
}

.likeButton {
  width: 2vw;
  height: 2vw;
  mask: url('assets/thumb_up_black_24dp.svg');
  mask-repeat: no-repeat;
  mask-size: 90%;
  mask-position: center;
  background-color: #ccc;
  cursor: pointer;
}

.likeButton:hover {
  background-color: white;
}

.dislikeButton {
  width: 2vw;
  height: 2vw;
  mask: url('assets/thumb_down_black_24dp.svg');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 90%;
  background-color: #ccc;
  cursor: pointer;
}

.likeText {
  width: 2vw;
  display: flex;
  justify-content: center;
}

.dislikeButton:hover {
  background-color: white;
}

@media (max-width: 1199.98px) {
  .w-caru {
    width: 100%;
  }
}

.footer-title {
  position: absolute; 
  left: 0; 
  right: 0;
  bottom: 1rem;
  background: #ccccccc0;
  margin-left: auto; 
  margin-right: auto; 
  width: max-content;
}
</style>
