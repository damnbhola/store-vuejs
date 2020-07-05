<template>
  <div class="container-fluid">
    <h1>Add Product</h1>

    <div class="dropdown col">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Choose Product Type
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="setMobile">Add Mobile</a>
        <a class="dropdown-item" @click="setLaptop">Add Laptop</a>
      </div>
    </div>
    <div class="row" v-if="product == 'Mobile'">
      <div class="col-lg-4">
        <img :src="mobile.thumbnail" />
      </div>
      <div class="col-lg-8">
        <h2 style="color:red;">{{ error }}</h2>
        <h1>
          <input
            type="text"
            v-model="mobile.product_title"
            placeholder="Product Title"
          />
        </h1>
        <h4>
          $
          <input type="text" v-model="mobile.price" placeholder="Price" />/-
          Only
        </h4>
        <br />
        <h6>
          <textarea
            cols="81"
            rows="4"
            v-model="mobile.description"
            placeholder="Description"
          ></textarea>
        </h6>
        <span>Specifications:</span>
        <ul>
          <li>
            Processor:
            <input
              type="text"
              v-model="mobile.processor"
              placeholder="Processor"
            />
          </li>
          <li>
            RAM:
            <input type="text" v-model="mobile.RAM" placeholder="RAM" />
          </li>
          <li>
            Screen Size:
            <input
              type="text"
              v-model="mobile.screen_size"
              placeholder="Screen Size"
            />
          </li>
          <li>
            Colour:
            <input type="text" v-model="mobile.color" placeholder="Colour" />
          </li>
        </ul>
        <button @click.prevent="addMobile">Add Mobile</button>
        <button @click.prevent="cancel">Cancel</button>
      </div>
    </div>
    <div class="row" v-else-if="product == 'Laptop'">
      <div class="col-lg-4">
        <img :src="laptop.thumbnail" />
      </div>
      <div class="col-lg-8">
        <h2 style="color:red;">{{ error }}</h2>
        <h1>
          <input
            type="text"
            v-model="laptop.product_title"
            placeholder="Product Title"
          />
        </h1>
        <h4>
          $
          <input type="text" v-model="laptop.price" placeholder="Price" />/-
          Only
        </h4>
        <br />
        <h6>
          <textarea
            cols="81"
            rows="4"
            v-model="laptop.description"
            placeholder="Description"
          ></textarea>
        </h6>
        <span>Specifications:</span>
        <ul>
          <li>
            Processor:
            <input
              type="text"
              v-model="laptop.processor"
              placeholder="Processor"
            />
          </li>
          <li>
            RAM:
            <input type="text" v-model="laptop.RAM" placeholder="RAM" />
          </li>
          <li>
            HD Capacity:
            <input
              type="text"
              v-model="laptop.HD_capacity"
              placeholder="HD Capacity"
            />
          </li>
        </ul>
        <button @click.prevent="addLaptop">Add Laptop</button>
        <button @click.prevent="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: {
        product_title: "",
        thumbnail:
          "https://ecommerce.laraship.com/media/demo/app-iph-x/Apple-iPhoneX-SpaceGray-1-3x.jpg",
        processor: "",
        RAM: "",
        screen_size: "",
        color: "",
        description: "",
        price: ""
      },
      laptop: {
        product_title: "",
        thumbnail:
          "https://store.hp.com/UKStore/Html/Merch/Images/c05456657_1750x1285.jpg",
        processor: "",
        RAM: "",
        HD_capacity: "",
        description: "",
        price: ""
      },
      product: "",
      error: "",
      edit: false
    };
  },
  created: function() {
    this.checkLogin();
  },
  methods: {
    setMobile() {
      this.product = "Mobile";
      this.edit = true;
    },
    setLaptop() {
      this.product = "Laptop";
      this.edit = true;
    },
    addMobile() {
      if (!this.mobile.product_title) {
        this.error = "*Please Provide a valid Product Name*";
      } else if (!this.mobile.price) {
        this.error = "*Invalid Price*";
      } else if (!this.mobile.description) {
        this.error = "*Please Provide a description*";
      } else if (!this.mobile.processor) {
        this.error = "*processor cannot be undefined*";
      } else if (!this.mobile.RAM) {
        this.error = "*RAM cannot be undefined*";
      } else if (!this.mobile.screen_size) {
        this.error = "*Screen Size cannot be undefined*";
      } else if (!this.mobile.color) {
        this.error = "*Colour cannot be undefined*";
      } else {
        this.$store.dispatch("addMobiles", this.mobile);
        this.$router.push("/");
      }
    },
    addLaptop() {
      if (!this.laptop.product_title) {
        this.error = "*Please Provide a valid Product Name*";
      } else if (!this.laptop.price) {
        this.error = "*Invalid Price*";
      } else if (!this.laptop.description) {
        this.error = "*Please Provide a description*";
      } else if (!this.laptop.processor) {
        this.error = "*processor cannot be undefined*";
      } else if (!this.laptop.RAM) {
        this.error = "*RAM cannot be undefined*";
      } else if (!this.laptop.HD_capacity) {
        this.error = "*HD Capacity cannot be undefined*";
      } else {
        console.log(this.laptop);
        this.$store.dispatch("addLaptops", this.laptop);
      }
    },
    checkLogin() {
      if (!this.$store.getters.isAuthenticated) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    cancel() {
      this.edit = !this.edit;
      this.product = "";
    }
  }
};
</script>

<style>
img {
  width: 100%;
}
</style>
