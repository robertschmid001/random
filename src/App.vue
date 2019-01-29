<template>

  <div id="app">
    <el-container class="main-height" v-loading.fullscreen.lock="this.$store.state.fullscreenLoading">
        <el-header><MyHeader v-if="this.$store.state.authenticated"/></el-header>
        <MyNavbar class="navbar" v-if="this.$store.state.authenticated"/>
        <el-main class="no-padding main" ><router-view></router-view></el-main>
        <MyFooter/>
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
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/_global.scss";

#app {
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // height: auto;
  height: 100vh;
  background-color: $background-global;
  // overflow: hidden;
  overflow: auto;
  box-sizing: border-box;

}
header.el-header {
  padding: 0 0 0 0;
}
main.el-main {
  padding: 0 0 0 64px;
  box-sizing: border-box;
}
.main-height {
  box-sizing: border-box;
}
.main {
  box-sizing: border-box;
}

</style>
