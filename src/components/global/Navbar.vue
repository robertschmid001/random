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
            <el-menu-item index="4-1" class="menu-title border-blue">Holdings</el-menu-item>
            <el-menu-item index="4-2" class="menu-title border-purple">Entreprises</el-menu-item>
            <el-menu-item index="4-3" class="menu-title border-red">Prestations</el-menu-item>
            <el-menu-item index="4-4" class="menu-title border-orange">Cotisations</el-menu-item>
            <el-menu-item index="4-5" class="menu-title border-lgt-green">Assurés</el-menu-item>
            <el-menu-item index="4-6" class="menu-title border-green">Contrats</el-menu-item>
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

.border-blue {
  border-left: 8px $button-color solid;
}
.border-blue:hover {
  background-color:$button-color;
  color: white;
}
.border-red {
  border-left: 8px rgba(255, 0, 0, 1) solid;
}
.border-red:hover {
  background-color:rgba(255, 0, 0, 1);
  color: white;
}
.border-purple {
  border-left: 8px rgba(119, 78, 196, 1) solid;
}
.border-purple:hover {
  background-color:rgba(119, 78, 196, 1);
  color: white;
}
.border-orange {
  border-left: 8px rgba(255, 166, 0, 1) solid;
}
.border-orange:hover {
  background-color: rgba(255, 166, 0, 1);
  color: white;
}
.border-lgt-green {
  border-left: 8px rgb(212, 255, 131) solid;
}
.border-lgt-green:hover {
  background-color: rgb(212, 255, 131);
  color: white;
}
.border-green {
  border-left: 8px rgba(114, 248, 37, 1) solid;
}
.border-green:hover {
  background-color: rgba(114, 248, 37, 1);
  color: white;
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
.el-menu-item-group__title {
}
</style>
