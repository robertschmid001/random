<template>
  <div id="my-navbar">
    <el-aside width="auto" style="text-align:left;">
        <div class="image-wrapper">
          <img src="../../assets/cpms_logo_small.png" class=" size2 collapse-icon" alt="" @click="changeCollapse">
        </div>
        <el-menu default-active="1" :router="true" :collapse="isCollapse" class="main-menu">
        <el-menu-item index="/Home" class="hover border">
          <font-awesome-icon icon="home" class="size-menu-icons"/>
          <span  class="padding-menu">Acceuil</span>
        </el-menu-item>
        <el-menu-item index="2" class="hover border">
          <font-awesome-icon icon="euro-sign" class="size-menu-icons"/>
          <span class="padding-menu">Portefeuille</span>
        </el-menu-item>
        <el-menu-item index="3" class="hover border">
          <font-awesome-icon icon="user-friends" class="size-menu-icons"/>
          <span class="padding-menu">Recherche</span>
        </el-menu-item>
        <el-submenu index="4" class="border">
          <template slot="title">
            <div class="hover">
              <font-awesome-icon icon="file-export" class="size-menu-icons"/>
              <span class="padding-menu">Extraction</span>
            </div>
          </template>
          <el-menu-item-group >
            <el-menu-item index="4-1" class="hover">Prestations</el-menu-item>
            <el-menu-item index="4-2" class="hover">Cotisations</el-menu-item>
            <el-menu-item index="4-3" class="hover">Assurés</el-menu-item>
            <el-menu-item index="4-4" class="hover">Contrats</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5" class="hover border">
          <font-awesome-icon icon="file-alt" class="size-menu-icons"/>
          <span class="padding-menu">Documents</span>
        </el-menu-item>
        <el-menu-item index="6" class="hover border">
          <font-awesome-icon icon="newspaper" class="size-menu-icons"/>
          <span class="padding-menu">Actualités</span>
        </el-menu-item>
        <el-menu-item index="7" class="hover border">
          <font-awesome-icon icon="envelope" class="size-menu-icons"/>
          <span class="padding-menu">Messagerie</span>
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
@import "../../styles/_global.scss";

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
  font-size: 24px;
  width: 24px;
}
.hover:hover {
  color: $button-color;
}
.border:hover {
  border-left: 2px $button-color solid;
}
ul.main-menu.el-menu {
  border-right: none;
}
</style>
