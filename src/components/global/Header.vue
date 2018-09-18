<template>
  <div id="my-header">
      <div class="wrapper-outer"><div class="logo-wrapper">this is a logo</div><div class="breadcrumbs">these are breadscumbs > again > areagain</div></div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
  }
}
</script>

<style lang="scss" scoped>
#my-header {
    background-color: rgb(201, 201, 201);
    height: 60px;
    width: 100%;
    .wrapper-outer {
        height: 100%;
        flex-direction: row;
        display: flex;
        .logo-wrapper {
            width: 10%;
            background-color: rgb(194, 195, 255);
            padding: 3px;
        }
        .breadcrumbs {
            padding: 20px 0 0 20px;
        }
    }
}
</style>
