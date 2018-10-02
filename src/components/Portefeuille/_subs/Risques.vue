<template>
  <div id="risques">
    <span>This is the risques component</span>
  </div>
</template>

<script>

export default {
  name: 'Risques',
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

#risques {
  background-color: white;
  height: 700px;
}
.header {
  height: 60px;
  background-color: $background-global;
}
</style>