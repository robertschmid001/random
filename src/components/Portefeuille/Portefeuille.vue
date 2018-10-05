<template>
  <div id="portefeuille">
    <div class="header">
      <button class="header-button pointer" :class="{active: currentView == 'sante'}" @click="currentView = 'sante'">Santé</button>
      <button class="header-button pointer" :class="{active: currentView == 'prevoyance'}" @click="currentView = 'prevoyance'">Prévoyance</button>
      <button class="header-button pointer" :class="{active: currentView == 'risques'}" @click="currentView = 'risques'">Autres risques</button>
    </div>
    <component :is="currentView" keep-alive></component>
  </div>
</template>
<script>
import Prevoyance from "./_subs/Prevoyance.vue"
import Sante from "./_subs/Sante.vue"
import Risques from "./_subs/Risques.vue"

export default {
  name: 'Portefeuille',
  data () {
      return {
        currentView: 'sante',
      }
  },
  props: {
  },
  components: {
    'prevoyance': Prevoyance,
    'sante': Sante,
    'risques': Risques
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

#portefeuille {
  .header {
    display: flex;
    height: 60px;
    background-color: $background-global;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 40px;
    box-sizing: border-box;
    align-items: center;
    .header-button {
      padding: 0 20px;
      max-width: 250px;
      border-style: none;
      background-color: rgba(255, 255, 255, 0);
      color: black;
      font-weight: 550;
      border-radius: 7px;
      height: 30px;
      margin-right: 30px;
    }
    .active {
        background: $button-color;
        color: white;
        outline: none;
    }
  }
}


</style>
