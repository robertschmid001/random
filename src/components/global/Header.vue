<template>
  <div id="my-header">
    <el-row class="padding-left">
      <el-col :span="20" :xs="16" class="wrapper"><img src="../../assets/logoCPMS.png" alt="" class="image">
        <!-- <div class="breadcrumbs">
          <ul class="breadcrumbsStyle">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: $route.fullPath }" ><span @click="turnOffTable($route.name)">{{$route.name}}</span></el-breadcrumb-item>
              <el-breadcrumb-item v-for="(crumbs, index) in this.$store.state.breadArray" :key="index"><span @click="turnOffTable(crumbs.trail, index)">{{crumbs.name}}</span></el-breadcrumb-item>
            </el-breadcrumb>
          </ul>
        </div> -->
      </el-col>
      <el-col :span="4" :xs="8" v-click-outside="closeEvent">
        <div @mouseover="deconnexion = true" class="btn-wrapper-con btn-gen" :class="{active: deconnexion == true}"><router-link to="/Profile" class="btn-inner"><font-awesome-icon icon="user-circle" class="size-header-icon"/>Mr. Dupont</router-link></div>
        <transition name="slide-out"><div v-show="deconnexion" class="btn-wrapper-dec btn-gen"><div class="prof-deco btn-inner pointer" @click="logOut">Deconnexion</div></div></transition>
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
    // initTables() {
    //   this.$store.state.holdingTable = true;
    //   this.$store.state.entrepriseTable = false;
    //   this.$store.state.contratsTable = false;
    //   this.$store.state.assuresTable = false;
    //   this.$store.state.gEntTable = false;
    //   this.$store.state.eTable = true;
    //   this.$store.state.eConTable = false;
    //   this.$store.state.eAssTable = false;
    //   this.$store.state.cotTable = false;
    //   this.$store.state.prestTable = false;
    //   this.$store.state.tableHeader = true;
    // },
    // turnOffTable (id, index) {
    //   if(!id) {
    //     return console.log('click')
    //   }
    //   this.$store.state.holdingTable = false;
    //   this.$store.state.entrepriseTable = false;
    //   this.$store.state.contratsTable = false;
    //   this.$store.state.assuresTable = false;
    //   this.$store.state.gEntTable = false;
    //   this.$store.state.eTable = false;
    //   this.$store.state.eConTable = false;
    //   this.$store.state.eAssTable = false;
    //   this.$store.state.cotTable = false;
    //   this.$store.state.prestTable = false;

    //   if (id === 'Portefeuille' || id === 'begin') {
    //     this.initTables();
    //     this.$store.state.breadArray.splice(1)
    //   }
    //    if (id === 'holding') {
    //     this.$store.state.entrepriseTable = true;
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'hcont') {
    //     this.$store.state.contratsTable = true;
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'econt') {
    //     this.$store.state.eConTable = false;
    //      this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'hben') {
    //     this.$store.state.assuresTable = true;
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'hcot') {
    //     this.$store.state.cotTable = true;
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'hprest') {
    //     this.$store.state.prestTable = true;
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'heben') {
    //     this.$store.state.assuresTable = true
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'eben') {
    //     this.$store.state.eAssTable = true
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    //   if (id === 'gecont') {
    //     this.$store.state.eConTable = true
    //     this.$store.state.breadArray.splice(index+1)
    //   }
    // },
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
      }
    },
    logOut () {
      this.$store.state.authenticated = false
      this.$router.replace('Login')
    },
  },
  created () {
  },
    watch:{
    $route (to, from){
      if(from.name === 'Portefeuille') {
        this.$store.state.breadArray = [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#my-header {
    background-color: white;
    height: 60px;
    width: 100%;
    .breadcrumbs {
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 10px;
    }
    .profile-style {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
      padding-right: 30px;
    }
}
.breadcrumbsStyle {
 display: inline;
}
.padding-left {
  padding-left: 70px;
}
.wrapper {
  flex-direction: row;
  display: flex;
  align-items: center;
}
.image {
  width: 150px;
  height: 60px;
  margin-right: 10px;
  object-fit: contain;
  box-sizing: border-box;
}
.size-header-icon {
  padding-right: 10px;
  font-size: 20px;
}
.btn-gen {
  height: 60px;
  width: 100%;
  z-index: 5;
}
.btn-wrapper-dec {
  background-color: rgb(4, 151, 151);
  position: relative;
  border-radius: 0px 0px 0px 7px;
}
.btn-wrapper-dec:hover {
  background-color: rgb(4, 95, 95)
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
  background-color: rgba(4, 151, 151, 0.5);
  color: white;
  a {
    color: white;
  }
}
</style>
