<template>
  <div>
    <a
      class="waves-effect waves-light btn modal-trigger light-blue darken-2"
      href="#addModal"
    >
      add new product
    </a>

    <div id="addModal" class="modal" ref="addModal">
      <div class="modal-content">
        <h4>Add new product</h4>

        <div class="row">
          <form class="col s12" @submit.prevent="onSubmit">
            <div class="row">
              <div class="input-field col s6">
                <input
                  id="name"
                  type="text"
                  :class="{ invalid: $v.name.$error }"
                  v-model.trim="name"
                />
                <label for="name">Name</label>

                <span
                  class="helper-text red-text"
                  v-if="$v.name.$dirty && $v.name.$error"
                >
                  {{ !$v.name.required ? 'Field is required' : '' }}
                </span>
              </div>

              <div class="input-field col s6">
                <input
                  id="price"
                  type="number"
                  :class="{ invalid: $v.price.$error }"
                  v-model.number="price"
                />
                <label for="price">Price</label>

                <span
                  class="helper-text red-text"
                  v-if="$v.price.$dirty && $v.price.$error"
                >
                  {{
                    !$v.price.required ? 'Field is required' : 'Min value is 1'
                  }}
                </span>
              </div>

              <div class="input-field col s12">
                <textarea
                  id="description"
                  class="materialize-textarea"
                  :class="{ invalid: $v.description.$error }"
                  v-model.trim="description"
                ></textarea>
                <label for="description">Description</label>

                <span
                  class="helper-text red-text"
                  v-if="$v.description.$dirty && $v.description.$error"
                >
                  {{ !$v.description.required ? 'Field is required' : '' }}
                </span>
              </div>

              <div class="file-field input-field col s12">
                <div class="btn">
                  <span>Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    ref="image"
                    @change="changeFile"
                  />
                </div>

                <div class="file-path-wrapper">
                  <input
                    class="file-path"
                    type="text"
                    placeholder="Add product image"
                    :class="{ invalid: $v.image.$error }"
                  />
                </div>

                <span
                  class="helper-text red-text"
                  v-if="$v.image.$dirty && $v.image.$error"
                >
                  {{ !$v.image.required ? 'Image is required' : '' }}
                </span>
              </div>
            </div>

            <button class="btn right" type="submit">submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: 'AddNewModal',

  data() {
    return {
      addModal: null,
      name: '',
      price: '',
      description: '',
      image: [],
    };
  },

  methods: {
    async onSubmit(e) {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const imageFile = this.$refs.image.files[0];
      await this.getImageUrl(imageFile);

      const product = {
        name: this.name,
        price: this.price,
        description: this.description,
        image: this.image,
        date: Date.now(),
      };

      this.$store.dispatch('addProduct', product);
      this.addModal.close();
      e.target.reset();
    },

    getImageUrl(imageFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          this.image = reader.result;
          resolve();
        };
      });
    },

    changeFile(e) {
      this.image = e.target.files;
    },
  },

  mounted() {
    const modal = this.$refs.addModal;
    this.addModal = M.Modal.init(modal);
  },

  beforeDestroy() {
    this.addModal.destroy();
  },

  validations: {
    name: {
      required,
    },

    price: {
      required,
      minValue: minValue(1),
    },

    description: {
      required,
    },

    image: {
      required,
    },
  },
};
</script>

<style lang="scss">
.modal {
  max-height: none !important;
}
</style>