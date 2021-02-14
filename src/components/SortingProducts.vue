<template>
  <form>
    <span class="flow-text">Sort by</span>

    <p>
      <label>
        <input
          class="with-gap"
          name="sort"
          type="radio"
          value="toHigh"
          v-model="sortBy"
        />
        <span>Price: low to high</span>
      </label>
    </p>

    <p>
      <label>
        <input
          class="with-gap"
          name="sort"
          type="radio"
          value="toLow"
          v-model="sortBy"
        />
        <span>Price: high to low</span>
      </label>
    </p>

    <p>
      <label>
        <input
          class="with-gap"
          name="sort"
          type="radio"
          value="alphabet"
          v-model="sortBy"
        />
        <span>alphabetically</span>
      </label>
    </p>
  </form>
</template>

<script>
export default {
  name: 'SortingProducts',

  computed: {
    sortBy: {
      get() {
        return this.$store.getters.sortBy;
      },

      set(value) {
        this.$store.commit('setSort', value);
      },
    },
  },
};
</script>

<style lang="scss">
</style>