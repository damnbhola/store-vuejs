<template>
  <div id="mobiles" class="container-fluid">
    <h1>Available Laptops</h1>
    <div class="row">
      <div v-for="item in loadLaptops" :key="item.id" class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <router-link :to="'/laptop/' + item.id">
          <div class="aspect r-5-3 border-3 overflow-hidden">
            <img class="all-img" :src="item.thumbnail" />
          </div>
          <h5>{{ item.product_title }}</h5>
          <div class="mt-8 small-bold">{{ item.description }}</div>
          <p class="text-ellipsis-2l">{{ item.price }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "laptop",
  computed: {
    isLogin() {
      return this.$store.getters.isAuthenticated;
    },
    loadLaptops() {
      return this.$store.getters.Laptops;
    }
  }
};
</script>

<style scoped>
.all-img {
  object-fit: cover;
  width: 45%;
  height: 15%;
}

a {
  color: black;
}

a:hover {
  color: grey;
  text-decoration: none;
}
</style>
