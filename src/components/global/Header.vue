<template>
  <div id="my-header">
    <el-row class="wrapper-outer">
      <el-col :span="20"><div class="breadcrumbs">Profile</div></el-col>
      <el-col :span="4"><router-link to="/Profile" class="profile-style">profile</router-link></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
  },
  methods: {
    toProfile () {
      this.$store.state.authenticated = false
      this.$router.replace('Profile')
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

</style>
