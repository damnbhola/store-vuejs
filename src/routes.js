import Vue from "vue";
import Router from "vue-router";
import Index from "./Pages/Index.vue";
import Login from "./Pages/Login.vue";
import Signup from "./Pages/Signup.vue";
import Mobile from "./Pages/Mobile.vue";
import Laptop from "./Pages/Laptop.vue";
import New from "./Pages/New.vue";
import ViewMobile from "./Pages/ViewMobile.vue";
import ViewLaptop from "./Pages/ViewLaptop.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/signup",
      name: "signup",
      components: { default: Signup, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/mobile",
      name: "mobile",
      components: { default: Mobile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/mobile/:id",
      name: "product-mobile",
      components: {
        default: ViewMobile,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/laptop",
      name: "laptop",
      components: { default: Laptop, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/laptop/:id",
      name: "product-laptop",
      components: {
        default: ViewLaptop,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/new",
      name: "new",
      components: {
        default: New,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
