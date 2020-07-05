<template>
  <div id="laptop-view" class="container-fluid">
    <div v-if="!remove">
      <div class="row" v-if="!edit">
        <div class="col-lg-4">
          <img :src="laptops.thumbnail" />
        </div>
        <div class="col-lg-8">
          <h1>{{ laptops.product_title }}</h1>
          <h4>${{ laptops.price }}/- Only</h4>
          <br />
          <h6>{{ laptops.description }}</h6>
          <br />
          <span>Specifications:</span>
          <ul>
            <li>Processor: {{ laptops.processor }}</li>
            <li>RAM: {{ laptops.RAM }}</li>
            <li>HD Capacity: {{ laptops.HD_capacity }}</li>
          </ul>

          <div v-if="show">
            <button @click="edit = !edit">Edit This Product</button>
            <button @click.prevent="remove = !remove">Delete Product</button>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-lg-4">
          <img :src="laptops.thumbnail" />
        </div>
        <div class="col-lg-8">
          <h2 style="color:red;">{{ error }}</h2>
          <h1>
            <input
              type="text"
              v-model="laptops.product_title"
              placeholder="Product Title"
            />
          </h1>
          <h4>
            $
            <input type="text" v-model="laptops.price" placeholder="Price" />/-
            Only
          </h4>
          <br />
          <h6>
            <textarea
              cols="81"
              rows="4"
              v-model="laptops.description"
              placeholder="Description"
            ></textarea>
          </h6>
          <span>Specifications:</span>
          <ul>
            <li>
              Processor:
              <input
                type="text"
                v-model="laptops.processor"
                placeholder="Processor"
              />
            </li>
            <li>
              RAM:
              <input type="text" v-model="laptops.RAM" placeholder="RAM" />
            </li>
            <li>
              HD Capacity:
              <input
                type="text"
                v-model="laptops.HD_capacity"
                placeholder="HD Capacity"
              />
            </li>
          </ul>
          <div v-if="edit">
            <button @click.prevent="saveProduct">Save</button>
            <button @click.prevent="edit = !edit">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Are you sure you want to delete this?</h4>
      <button @click.prevent="deleteProduct">Delete</button>
      <button @click.prevent="remove = !remove">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "product-laptop",
  data() {
    return {
      laptops: {},
      edit: false,
      remove: false,
      error: ""
    };
  },
  created() {
    return axios
      .get("http://127.0.0.1:8000/api/laptop/" + this.$route.params.id)
      .then(res => {
        this.laptops = res.data;
      })
      .catch(e => context.error(e));
  },
  computed: {
    show() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    saveProduct() {
      if (!this.laptops.product_title) {
        this.error = "*Please Provide a valid Product Name*";
      } else if (!this.laptops.price) {
        this.error = "*Invalid Price*";
      } else if (!this.laptops.description) {
        this.error = "*Please Provide a description*";
      } else if (!this.laptops.processor) {
        this.error = "*processor cannot be undefined*";
      } else if (!this.laptops.RAM) {
        this.error = "*RAM cannot be undefined*";
      } else if (!this.laptops.HD_capacity) {
        this.error = "*HD Capacity cannot be undefined*";
      } else {
        this.edit = !this.edit;
        this.$store.dispatch("editLaptops", this.laptops);
      }
    },
    deleteProduct() {
      this.$store.dispatch("deleteLaptops", this.laptops);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#laptop-view {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

img {
  width: 100%;
}
</style>
