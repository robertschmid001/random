<template>
  <div id="my-header">
    <el-row class="wrapper-outer">
      <el-col :span="20"><div class="breadcrumbs">Profile</div></el-col>
      <el-col :span="4">
        <div @mouseover="deconnexion = false" class="btn-wrapper-con btn-gen" :class="{active: deconnexion == false}"><router-link to="/Profile" class="btn-inner">Mr. Dupont</router-link></div>
        <transition name="slide-down"><div v-show="!deconnexion" @mouseleave="deconnexion = !deconnexion" class="btn-wrapper-dec btn-gen"><router-link to="/Login" class="prof-deco btn-inner">Deconnexion</router-link></div></transition>
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
  methods: {
    toProfile () {
      this.$store.state.authenticated = false
      this.$router.replace('Profile')
    },
    mouseOver (){
      this.deconnexion = false;
    }
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
