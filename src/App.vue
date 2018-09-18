<template>
  <div id="app">
    
      <MyHeader v-if="this.$store.state.authenticated"/>
      <MyNavbar v-if="this.$store.state.authenticated"/>
      <router-view></router-view>
      <MyFooter v-if="this.$store.state.authenticated"/>

  </div>
</template>

<script>
import Home from './components/Home.vue'
import MyFooter from './components/global/Footer.vue'
import MyHeader from './components/global/Header.vue'
import MyNavbar from './components/global/Navbar.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Home,
    MyFooter,
    MyHeader,
    MyNavbar,
    Login
  },
  mounted() {
        if(!this.$store.state.authenticated) {
        this.$router.replace({ name: "Login" });
    }
  }
}
</script>

<style>
@import "./styles/_global.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
