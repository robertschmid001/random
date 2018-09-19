<template>
  <div id="my-navbar">
    <h1>This is my navbar</h1> <button @click="logOut">back</button>
  </div>
</template>

<script>
export default {
  name: 'MyNavbar',
  props: {
  }
}
</script>

<style lang="scss" scoped>
#my-navbar {
    background-color: rgb(168, 163, 163);
    height: 60px;
    h1 {
        margin: 0px;
    }
}
</style>
<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    logOut () {
      this.$store.state.authenticated = false
      this.$router.replace('Login')
    }
  }
}
</script>
