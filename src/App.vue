<template>

  <div id="app">
    <el-container>
        <el-header><MyHeader v-if="this.$store.state.authenticated"/></el-header>
        <MyNavbar class="navbar" v-if="this.$store.state.authenticated"/>
        <el-main class="no-padding" ><router-view></router-view></el-main>
    </el-container>
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
    Login,
  },
  mounted() {
        if(!this.$store.state.authenticated) {
        this.$router.replace({ name: "Login" });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/_global.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  background-color: $background-global;
  overflow: hidden;

}
header.el-header {
  padding: 0 0 0 0;
}
main.el-main {
  padding: 0 0 0 64px;
}
</style>
