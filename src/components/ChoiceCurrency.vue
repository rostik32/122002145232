<template>
  <div>
    <span class="flow-text">Currency</span>

    <p>
      <label>
        <input
          class="with-gap"
          name="currency"
          value="UAH"
          type="radio"
          v-model="currency"
        />
        <span>UAH</span>
      </label>

      <label>
        <input
          class="with-gap"
          name="currency"
          value="USD"
          type="radio"
          v-model="currency"
        />
        <span>USD</span>
      </label>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChoiceCurrency',

  computed: {
    currency: {
      get() {
        return this.$store.getters.currency;
      },

      set(value) {
        this.$store.commit('setCurrency', value);
      },
    },
  },
};
</script>

<style lang="scss">
</style>