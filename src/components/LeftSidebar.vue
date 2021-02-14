<template>
  <div class="col s3">
    <sorting-products></sorting-products>
    <choice-currency></choice-currency>
    <price-range></price-range>
    <add-new-modal></add-new-modal>
  </div>
</template>

<script>
import SortingProducts from './SortingProducts';
import ChoiceCurrency from './ChoiceCurrency';
import AddNewModal from './AddNewModal';
import PriceRange from './PriceRange';

export default {
  name: 'LeftSidebar',

  components: { SortingProducts, ChoiceCurrency, AddNewModal, PriceRange },
};
</script>

<style lang="scss">
</style>