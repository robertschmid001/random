<template>
  <div id="my-footer">
    <h1>This is my Footer</h1>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: {
  }
}
</script>

<style lang="scss" scoped>
#my-footer {
    background-color: rgb(175, 175, 175);
    position: fixed;
    width: 100%;
    bottom: 0px;
    h1 {
        margin: 0px;
    }
}
</style>
