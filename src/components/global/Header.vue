<template>
  <div id="my-header">
    <el-row class="wrapper-outer">
      <el-col :span="20" :xs="16"><div class="breadcrumbs">Profile</div></el-col>
      <el-col :span="4" :xs="8" v-click-outside="closeEvent">
        <div @mouseover="deconnexion = true" class="btn-wrapper-con btn-gen" :class="{active: deconnexion == true}"><router-link to="/Profile" class="btn-inner">Mr. Dupont</router-link></div>
        <transition name="slide-down"><div v-show="deconnexion" class="btn-wrapper-dec btn-gen"><div class="prof-deco btn-inner" @click="logOut">Deconnexion</div></div></transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
  },
  data () {
    return {
      deconnexion: false,
    }
  },
  events: {

  },
  methods: {
    toProfile () {
      this.$store.state.authenticated = false
      this.$router.replace('Profile')
    },
    mouseOver (){
      this.deconnexion = true;
    },
    closeEvent (event) {
      if(this.deconnexion){
        this.deconnexion = false;
        console.log('header close event called')
      }
    },
    logOut () {
      this.$store.state.authenticated = false
      this.$router.replace('Login')
    },
  }
}
</script>

<style lang="scss" scoped>
#my-header {
    background-color: white;
    height: 60px;
    width: 100%;
    .wrapper-outer {
        height: 100%;
        flex-direction: row;
        display: flex;
        .breadcrumbs {
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: 40px;
        }
        .profile-style {
          display: flex;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          padding-right: 30px;
        }
    }
}
.btn-gen {
  height: 60px;
  width: 100%;
}
.btn-wrapper-dec {
  background-color: rgb(51, 45, 77);
  z-index: 5;
  position: relative;
}
.prof-deco {
  color: white;
}
.btn-inner {
  height: 100%;
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
  a {
    color: black;
  }
.active {
  background-color: rgb(30, 25, 61);
  color: white;
  a {
    color: white;
  }
}
</style>
