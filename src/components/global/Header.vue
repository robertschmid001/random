<template>
  <div id="my-header">
      <div class="wrapper-outer"><div class="breadcrumbs">Profile</div> <router-link to="/Profile">profile</router-link></div>
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
            padding: 20px 0 0 20px;
        }
    }
}
</style>
