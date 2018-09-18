<template>
  <div id="home">
    <h1>This is my main page</h1>
    <h3>Router Ready</h3>
    <h3>Store Ready</h3>
    <h3>Element Ready</h3>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
#home {
  padding-top: 50px;
  h1 {
    margin: 0;
  }
  h3 {
    margin: 40px 0 0;
  }
}
</style>
