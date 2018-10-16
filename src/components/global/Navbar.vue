<template>
  <div id="my-navbar">
    <el-aside width="auto" style="text-align:left;"  v-click-outside="closeEvent">
        <div class="image-wrapper">
          <img src="../../assets/cpms_logo_small.png" class=" size2 collapse-icon" alt="" @click="changeCollapse">
        </div>
        <el-menu default-active="1" :router="true" :collapse="isCollapse" class="main-menu">
        <el-menu-item index="/Home" class="hover border">
          <font-awesome-icon icon="home" class="size-menu-icons"/>
          <span  class="padding-menu menu-title">Acceuil</span>
        </el-menu-item>
        <el-menu-item index="/portefeuille" class="hover border">
          <font-awesome-icon icon="euro-sign" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Portefeuille</span>
        </el-menu-item>
        <el-menu-item index="/Recherche" class="hover border">
          <font-awesome-icon icon="user-friends" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Recherche</span>
        </el-menu-item>
        <el-submenu index="4" class="">
          <template slot="title">
            <div class="hover">
              <font-awesome-icon icon="file-export" class="size-menu-icons"/>
              <span class="padding-menu menu-title">Extraction</span>
            </div>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/extraction" class="menu-title underline">Prestations</el-menu-item>
            <el-menu-item index="4-2" class="menu-title underline">Cotisations</el-menu-item>
            <el-menu-item index="4-3" class="menu-title underline">Assurés</el-menu-item>
            <el-menu-item index="4-4" class="menu-title underline">Contrats</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/Documents" class="hover border">
          <font-awesome-icon icon="file-alt" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Documents</span>
        </el-menu-item>
        <el-menu-item index="/Actualites" class="hover border">
          <font-awesome-icon icon="newspaper" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Actualités</span>
        </el-menu-item>
        <el-menu-item index="/messagerie" class="hover border">
          <font-awesome-icon icon="envelope" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Messagerie</span>
        </el-menu-item>
        <el-menu-item index="/home2" class="hover border">
          <font-awesome-icon icon="home" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Messagerie</span>
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
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    closeEvent () {
      if(this.isCollapse == false) {
        this.isCollapse = true;
        console.log('menu close event called')
      }
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
  padding-left: 20px;
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
  font-size: 20px;
  width: 20px;
}
.hover:hover {
  color: $button-color;
}
ul.main-menu.el-menu {
  border-right: none;
}
.menu-title {
  font-weight: 600;
  font-size: 13px;
  align-items: center;
}
.el-submenu .el-menu-item {
}
.el-menu-item {
}
.el-menu-item-group {
  padding: 0 15px;
}
.border:hover{
  border-left: 4px solid $button-color;
}

.el-menu-item-group__title {
}
.underline {
  font-weight: 700;
  font-size: 12px;
}
.underline:hover {
  text-decoration: underline;
}
</style>
