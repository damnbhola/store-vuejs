import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    mobiles: [],
    laptops: [],
    token: null
  },
  mutations: {
    setMobiles(state, posts) {
      state.mobiles = posts;
    },
    addMobiles(state, post) {
      state.mobiles.push(post);
    },
    editMobiles(state, editedPost) {
      const postIndex = state.mobiles.findIndex(
        post => post.id === editedPost.id
      );
      state.mobiles[postIndex] = editedPost;
    },
    deleteMobiles(state, deletedPost) {
      const postIndex = state.mobiles.findIndex(
        post => post.id === deletedPost.id
      );
      state.mobiles.pop(postIndex);
    },
    setLaptops(state, posts) {
      state.laptops = posts;
    },
    addLaptops(state, post) {
      state.laptops.push(post);
    },
    editLaptops(state, editedPost) {
      const postIndex = state.laptops.findIndex(
        post => post.id === editedPost.id
      );
      state.laptops[postIndex] = editedPost;
    },
    deleteLaptops(state, deletedPost) {
      const postIndex = state.laptops.findIndex(
        post => post.id === deletedPost.id
      );
      state.laptops.pop(postIndex);
    },
    setToken(state, token) {
      $cookies.set("token", token, 60 * 60);
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    }
  },
  actions: {
    fetchProducts(vuexContext) {
      return (
        axios
          .get("http://127.0.0.1:8000/api/mobile/")
          .then(res => {
            const postArray = [];
            for (let key in res.data) {
              postArray.push(res.data[key]);
            }
            vuexContext.commit("setMobiles", postArray);
          })
          .catch(e => console.log(`error ${e}`)),
        axios
          .get("http://127.0.0.1:8000/api/laptop/")
          .then(res => {
            const postArray = [];
            for (let key in res.data) {
              postArray.push(res.data[key]);
            }
            vuexContext.commit("setLaptops", postArray);
          })
          .catch(e => console.log(`error ${e}`))
      );
    },
    setMobiles(vuexContext, posts) {
      vuexContext.commit("setMobiles", posts);
    },
    addMobiles(vuexContext, createdPost) {
      return axios
        .post("http://127.0.0.1:8000/api/mobile/", createdPost, {
          headers: {
            Authorization: "Token " + this.getters.getToken
          }
        })
        .then(result => {
          vuexContext.commit("addMobiles", {
            ...createdPost,
            id: result.data.id
          });
        })
        .catch(e => console.log(e));
    },
    editMobiles(vuexContext, editedPost) {
      return axios
        .put(
          "http://127.0.0.1:8000/api/mobile/" + editedPost.id + "/",
          editedPost,
          {
            headers: {
              Authorization: "Token " + this.getters.getToken
            }
          }
        )
        .then(result => {
          vuexContext.commit("editMobiles", editedPost);
        })
        .catch(e => console.log(e));
    },
    deleteMobiles(vuexContext, deletedPost) {
      return axios
        .delete("http://127.0.0.1:8000/api/mobile/" + deletedPost.id + "/", {
          headers: {
            Authorization: "Token " + this.getters.getToken
          }
        })
        .then(result => {
          vuexContext.commit("deleteMobiles", deletedPost);
        })
        .catch(e => console.log(e));
    },
    setLaptops(vuexContext, posts) {
      vuexContext.commit("setLaptops", posts);
    },
    addLaptops(vuexContext, createdPost) {
      return axios
        .post("http://127.0.0.1:8000/api/laptop/", createdPost, {
          headers: {
            Authorization: "Token " + this.getters.getToken
          }
        })
        .then(result => {
          vuexContext.commit("addLaptops", {
            ...createdPost,
            id: result.data.id
          });
        })
        .catch(e => console.log(e));
    },
    editLaptops(vuexContext, editedPost) {
      return axios
        .put(
          "http://127.0.0.1:8000/api/laptop/" + editedPost.id + "/",
          editedPost,
          {
            headers: {
              Authorization: "Token " + this.getters.getToken
            }
          }
        )
        .then(result => {
          vuexContext.commit("editLaptops", editedPost);
        })
        .catch(e => console.log(e));
    },
    deleteLaptops(vuexContext, deletedPost) {
      return axios
        .delete("http://127.0.0.1:8000/api/laptop/" + deletedPost.id + "/", {
          headers: {
            Authorization: "Token " + this.getters.getToken
          }
        })
        .then(result => {
          vuexContext.commit("deleteLaptops", deletedPost);
        })
        .catch(e => console.log(e));
    },
    LoginUser(vuexContext, authData) {
      let authURL = "http://127.0.0.1:8000/rest-auth/login/";
      return axios
        .post(authURL, {
          username: authData.username,
          password: authData.password,
          returnSecureToken: true
        })
        .then(result => {
          vuexContext.commit("setToken", result.data.key);
        })
        .catch(e => console.log(e));
    },
    SignupUser(vuexContext, authData) {
      let authURL = "http://127.0.0.1:8000/rest-auth/registration/";
      return axios
        .post(authURL, {
          username: authData.username,
          email: authData.email,
          password1: authData.password1,
          password2: authData.password2,
          returnSecureToken: true
        })
        .then(result => {
          vuexContext.commit("setToken", result.data.key);
        })
        .catch(e => console.log(e));
    },
    LogoutUser(vuexContext) {
      $cookies.remove("token");
      vuexContext.commit("clearToken");
    },
    UpdateCookies(vuexContext, token) {
      vuexContext.commit("setToken", token);
    }
  },
  getters: {
    Mobiles(state) {
      return state.mobiles;
    },
    Laptops(state) {
      return state.laptops;
    },
    isAuthenticated(state) {
      return state.token != null;
    },
    getToken(state) {
      return state.token;
    }
  }
});
export default store;
