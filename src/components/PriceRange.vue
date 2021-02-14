<template>
  <div class="price-range">
    <span class="flow-text">Price</span>

    <form class="row price-range__row" @submit.prevent="onSubmit">
      <div class="input-field col s4">
        <input id="first_name" type="text" v-model="min" />
        <label for="first_name">Min</label>
      </div>

      <div class="input-field col s4">
        <input id="last_name" type="text" v-model="max" />
        <label for="last_name">Max</label>
      </div>

      <button type="submit" class="btn waves-effect waves-light">ok</button>
    </form>

    <div ref="rangePrice"></div>
  </div>
</template>

<script>
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min.js';
import wNumb from 'wnumb';

export default {
  name: 'PriceRange',

  data() {
    return {
      range: null,
    };
  },

  computed: {
    min: {
      get() {
        return this.$store.getters.min;
      },

      set(value) {
        this.$store.commit('setMin', value);
      },
    },

    max: {
      get() {
        return this.$store.getters.max;
      },

      set(value) {
        this.$store.commit('setMax', value);
      },
    },
  },

  methods: {
    onSubmit() {
      this.$store.dispatch('filterProducts');
    },
  },

  mounted() {
    const slider = this.$refs.rangePrice;

    this.range = noUiSlider.create(slider, {
      start: [1, 29999],
      connect: true,
      step: 1,
      orientation: 'horizontal',
      range: {
        min: 1,
        max: 29999,
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    this.range.on('update', () => {
      this.$store.commit('setMin', +this.range.get()[0]);
      this.$store.commit('setMax', +this.range.get()[1]);
    });
  },
};
</script>

<style lang="scss">
.noUi-tooltip {
  display: none !important;
}

.price-range {
  margin-bottom: 50px;

  &__row {
    display: flex;
    align-items: baseline;
    margin-bottom: 0 !important;
  }
}
</style>