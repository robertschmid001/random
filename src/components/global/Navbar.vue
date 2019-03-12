<template>
  <div id="my-navbar" v-on:mouseover="isOpening" v-on:mouseleave="isClosing">
    <el-aside width="auto" style="text-align:left;">
        <div class="image-wrapper">
          <font-awesome-icon icon="bars" class="size2 collapse-icon"/>
        </div>
        <el-menu default-active="1" :router="true" :collapse="isCollapse" class="main-menu">
        <el-menu-item index="/Accueil" class="hover border" title="Accueil">
          <font-awesome-icon icon="home" class="size-menu-icons"/>
          <span  class="padding-menu menu-title">Accueil</span>
        </el-menu-item>
        <el-menu-item index="/portefeuille" class="hover border" title="Mon Portefeuille clients">
          <font-awesome-icon icon="euro-sign" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Mon Portefeuille clients</span>
        </el-menu-item>
        <el-menu-item index="/Recherche" class="hover border" title="Rechercher d'un assuré">
          <font-awesome-icon icon="user-friends" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Rechercher d'un assuré</span>
        </el-menu-item>
        <el-submenu index="4" class="" title="Extraction">
          <template slot="title">
            <div class="hover">
              <font-awesome-icon icon="file-export" class="size-menu-icons"/>
              <span class="padding-menu menu-title">Extraction</span>
            </div>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/extraction" class="menu-title underline" @click="changeExtr('prestations')">Prestations</el-menu-item>
            <el-menu-item index="/extraction" class="menu-title underline" @click="changeExtr('cotisations')">Cotisations</el-menu-item>
            <el-menu-item index="/extraction" class="menu-title underline" @click="changeExtr('assures')">Assurés</el-menu-item>
            <el-menu-item index="/extraction" class="menu-title underline" @click="changeExtr('contrats')">Contrats</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/Documents" class="hover border" title="Documents">
          <font-awesome-icon icon="file-alt" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Documents</span>
        </el-menu-item>
        <!-- <el-menu-item index="/Actualites" class="hover border">
          <font-awesome-icon icon="newspaper" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Actualités</span>
        </el-menu-item> -->
        <el-menu-item index="/messagerie" class="hover border" title="Messagerie">
          <font-awesome-icon icon="envelope" class="size-menu-icons"/>
          <span class="padding-menu menu-title">Nous contacter</span>
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
    isClosing () {
      return this.isCollapse = true
    },
      isOpening () {
      return this.isCollapse = false
    },
    changeExtr (data) {
      switch(data)
            {
                case "prestations":
                    return this.$store.state.extrType = data;

                case "cotisations":
                    return this.$store.state.extrType = data;

                case "assures":
                    return this.$store.state.extrType = data;

                case "contrats":
                    return this.$store.state.extrType = data;

                default:
                    return ""
            }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/_global.scss";

#my-navbar {
  background-color: white;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0px;
  height: 100%;
  z-index: 6;
  box-shadow: 13px 0px 19px -19px;
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
  padding: 20px 21px;
}
.bigger {
  font-size: 50px;
  margin: 4px;
}
.collapse-icon {
  position: relative;
  left: 0;
  justify-content: center;
}
.main-menu:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.size2 {
  width: 20px;
  height: 20px;
  transition:transform 0.4s;   //testing rotation animation
}
.size2:active {   //testing rotation animation
   transform: rotate(45deg);
   -webkit-transform: rotate(45deg);
   -ms-transform: rotate(45deg);
   color: $button-color;
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
