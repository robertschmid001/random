<template>
  <div id="search">
    <input type="text" class="base-input" placeholder="Numéro SS ou Nom Prénom">
    <button class="button but-style pointer" @click="click"> Afficher la fiche assuré</button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
  },
  methods: {
    click () {
      console.log('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

#search {
  padding: 80px 50px;
  input {
    font-size: 15px;
    color: rgb(51, 51, 51);
  }
  .but-style {
    padding: 0 20px;
  }
}
</style>
