<template>
  <div id="my-navbar">
    <el-aside width="auto" style="text-align:left;">
        <div class="image-wrapper">
          <img src="../../assets/cpms_logo_small.png" class=" size2 collapse-icon" alt="" @click="changeCollapse">
        </div>
        <el-menu default-active="1" :router="true" :collapse="isCollapse" :disabled="true" class="main-menu">
        <el-menu-item index="/Home" >
          <img src="../../assets/icons/menu-icons/home.png" class="size-menu-icons" alt="">
          <span  class="padding-menu">Mon Portefeuille</span>
        </el-menu-item>
        <el-menu-item index="2">
          <img src="../../assets/icons/menu-icons/eur.png" class="eur-icon euro-icon-height" alt="">
          <span class="padding-menu">Faire une extraction</span>
        </el-menu-item>
        <el-menu-item index="3">
          <img src="../../assets/icons/menu-icons/database.png" class="size-menu-icons" alt="">
          <span class="padding-menu">Bibliothèque</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
              <img src="../../assets/icons/menu-icons/envelope.png" class="size-menu-icons" alt="">
              <span class="padding-menu">Messagerie (0)</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1"><i class="el-icon-document"></i>Envoyés</el-menu-item>
            <el-menu-item index="4-2"><i class="el-icon-star-on"></i>Messages suivis</el-menu-item>
            <el-menu-item index="4-3"><i class="el-icon-warning"></i>Important</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5">
          <img src="../../assets/icons/menu-icons/files.png" class="size-menu-icons" alt="">
          <span class="padding-menu">Bibliothèque</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: 'MyNavbar',
  props: {
  },
  data(){
    return {
      isCollapse: true

    }
  },
  methods: {
    logOut () {
      this.$store.state.authenticated = false
      this.$router.replace('Login')
    },
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>

#my-navbar {
    background-color: white;
    position: absolute;
    left: 0;
    height: 100%;
    z-index: 5;
    box-shadow: 1px -13px 20px -5px;

    h1 {
        margin: 0px;
    }
}
.router-link {
  height: 100%;
}
.eur-icon {
  padding: 0 6px;
}
span.padding-menu {
  padding-left: 10px;
}
.image-wrapper {
  padding: 8px 12px 8px 12px;
}
.bigger {
  font-size: 50px;
  margin: 4px;
}
.collapse-icon {
  position: relative;
  left: 0;
}
.main-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.size2 {
  width: 40px;
  height: 40px;
}
.size-menu-icons {
  width: 24px;
}
.euro-icon-height {
  height:24px;
  width: 12px;
}
ul.main-menu.el-menu {
  border-right: none;
}
</style>
