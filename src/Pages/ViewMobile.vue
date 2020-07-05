<template>
  <div id="mobile-view" class="container-fluid">
    <div v-if="!remove">
      <div class="row" v-if="!edit">
        <div class="col-lg-4">
          <img :src="mobiles.thumbnail" />
        </div>
        <div class="col-lg-8">
          <h1>{{ mobiles.product_title }}</h1>
          <h4>${{ mobiles.price }}/- Only</h4>
          <br />
          <h6>{{ mobiles.description }}</h6>
          <br />
          <span>Specifications:</span>
          <ul>
            <li>Processor: {{ mobiles.processor }}</li>
            <li>RAM: {{ mobiles.RAM }}</li>
            <li>Screen Size: {{ mobiles.screen_size }}</li>
            <li>Colour: {{ mobiles.color }}</li>
          </ul>

          <div v-if="show">
            <button @click="edit = !edit">Edit This Product</button>
            <button @click.prevent="remove = !remove">Delete Product</button>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-lg-4">
          <img :src="mobiles.thumbnail" />
        </div>
        <div class="col-lg-8">
          <h2 style="color:red;">{{ error }}</h2>
          <h1>
            <input
              type="text"
              v-model="mobiles.product_title"
              placeholder="Product Title"
            />
          </h1>
          <h4>
            $
            <input type="text" v-model="mobiles.price" placeholder="Price" />/-
            Only
          </h4>
          <br />
          <h6>
            <textarea
              cols="81"
              rows="4"
              v-model="mobiles.description"
              placeholder="Description"
            ></textarea>
          </h6>
          <span>Specifications:</span>
          <ul>
            <li>
              Processor:
              <input
                type="text"
                v-model="mobiles.processor"
                placeholder="Processor"
              />
            </li>
            <li>
              RAM:
              <input type="text" v-model="mobiles.RAM" placeholder="RAM" />
            </li>
            <li>
              Screen Size:
              <input
                type="text"
                v-model="mobiles.screen_size"
                placeholder="Screen Size"
              />
            </li>
            <li>
              Colour:
              <input type="text" v-model="mobiles.color" placeholder="Colour" />
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
  name: "product-mobile",
  data() {
    return {
      mobiles: {},
      edit: false,
      remove: false,
      error: ""
    };
  },
  created() {
    return axios
      .get("http://127.0.0.1:8000/api/mobile/" + this.$route.params.id)
      .then(res => {
        this.mobiles = res.data;
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
      if (!this.mobiles.product_title) {
        this.error = "*Please Provide a valid Product Name*";
      } else if (!this.mobiles.price) {
        this.error = "*Invalid Price*";
      } else if (!this.mobiles.description) {
        this.error = "*Please Provide a description*";
      } else if (!this.mobiles.processor) {
        this.error = "*processor cannot be undefined*";
      } else if (!this.mobiles.RAM) {
        this.error = "*RAM cannot be undefined*";
      } else if (!this.mobiles.screen_size) {
        this.error = "*Screen Size cannot be undefined*";
      } else if (!this.mobiles.color) {
        this.error = "*Colour cannot be undefined*";
      } else {
        this.edit = !this.edit;
        this.$store.dispatch("editMobiles", this.mobiles);
      }
    },
    deleteProduct() {
      this.$store.dispatch("deleteMobiles", this.mobiles);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#mobile-view {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

img {
  width: 100%;
}
</style>
