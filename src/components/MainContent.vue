<template>
  <div class="col s9">
    <ul class="products row">
      <li
        class="products__item col s12 m6 l4"
        v-for="product in products"
        :key="product.id"
      >
        <div class="products__item-card card hoverable">
          <div class="products__item-outer card-image">
            <img :src="getUrl(product.image)" class="products__item-img" />

            <a class="btn-floating halfway-fab waves-effect waves-light blue"
              ><i class="material-icons">visibility</i></a
            >
          </div>

          <div class="card-content">
            <h4 class="products__item-name card-title" :title="product.name">
              {{ product.name }}
            </h4>

            <span class="products__item-price">
              {{ getPriceByCurrency(product.price) }}
            </span>

            <p class="products__item-description">{{ product.description }}</p>
          </div>
        </div>
      </li>
    </ul>

    <span class="flow-text" v-if="!products.length"
      >Oops.. No products found</span
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainContent',

  computed: {
    ...mapGetters(['products']),
  },

  methods: {
    getPriceByCurrency(value) {
      return this.$store.getters.price(value);
    },

    getUrl(url) {
      if (url.includes('data:image')) {
        return url;
      } else {
        return process.env.NODE_ENV === 'production'
          ? `/122002145232/products/${url}`
          : `/products/${url}`;
      }
    },
  },
};
</script>

<style lang="scss">
.products__item {
  height: 483px;

  &-outer {
    display: flex;
    padding: 10px;
    justify-content: center;
    height: 200px;
  }

  &-img {
    display: block;
    max-width: 100%;
    object-fit: contain;
  }

  &-name {
    height: 64px;
    overflow: hidden;
  }

  &-price {
    font-size: 20px;
    font-weight: 700;
  }

  &-description {
    height: 88px;
    min-height: 88px;
    overflow: hidden;
  }

  &-card:hover {
    position: relative;
    z-index: 10;

    .products__item-description {
      height: auto;
    }
  }
}
</style>