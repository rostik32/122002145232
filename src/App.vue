<template>
  <div id="app" class="wrapper">
    <div class="row">
      <left-sidebar></left-sidebar>
      <main-content></main-content>
    </div>
  </div>
</template>

<script>
import MainContent from './components/MainContent';
import LeftSidebar from './components/LeftSidebar';

export default {
  name: 'App',

  components: {
    MainContent,
    LeftSidebar,
  },

  mounted() {
    this.$store.dispatch('GET_PRODUCTS');
  },
};
</script>

<style lang="scss">
.wrapper {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
