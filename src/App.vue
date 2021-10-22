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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 5vw;
  margin-right: 1rem;
  font-size: 3.5rem;
  overflow: hidden;
  border-radius: 50%;
  color: white;
}

.profilePicHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 3vw;
  margin-right: 1rem;
  font-size: 2.5rem;
  overflow: hidden;
  border-radius: 50%;
  color: white;
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

.secondaryHeaderBg {
  background-color: #d00b0b;
}

.sHBg {
  background-color: #d00b0b;
}

.secondaryHeaderBg:hover {
  background-color: #a00808;
}

@media (max-width: 1199.98px) {
  .w-caru {
    width: 100%;
  }
  .profilePicHeader {
    width: 7vw;
    height: 7vw;
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
