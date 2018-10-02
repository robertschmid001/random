<template>
  <div id="sante">
    <span>This is the Santé component</span>
  </div>
</template>

<script>

export default {
  name: 'Sante',
  data () {
    return {
    }
  },
  props: {
  },
  component: {

  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/_global.scss";

#sante {
  background-color: white;
  height: 700px;
}
.header {
  height: 60px;
  background-color: $background-global;
}
</style>