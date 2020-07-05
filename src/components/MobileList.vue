<template>
  <div id="mobiles" class="container-fluid">
    <div class="main-product">
      <router-link to="/mobile">
        <h1>Available Mobiles</h1>
      </router-link>
    </div>
    <vue-horizontal-list
      :items="loadMobiles"
      :options="{
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { size: 3 }
        ]
      }"
    >
      <template v-slot:default="{ item }">
        <router-link :to="'/mobile/' + item.id">
          <div class="product">
            <div class="aspect r-5-3 border-3 overflow-hidden">
              <img class="product-img" :src="item.thumbnail" />
            </div>
            <h5>{{ item.product_title }}</h5>
            ${{ item.price }}
            <div class="mt-8 small-bold">{{ item.description }}</div>
          </div>
        </router-link>
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
export default {
  computed: {
    loadMobiles() {
      return this.$store.getters.Mobiles;
    }
  }
};
</script>

<style>
.product-img {
  object-fit: cover;
  width: 40%;
  height: 15%;
}
a {
  color: black;
}

.product:hover,
a:hover {
  color: grey;
  text-decoration: none;
}

.main-product:hover {
  color: grey;
}

.product {
  padding: 2rem;
}
</style>
