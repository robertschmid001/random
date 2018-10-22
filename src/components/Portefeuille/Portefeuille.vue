<template>
  <div id="portefeuille">
    <div class="header" :class="[{active: currentView == 'sante'},{active2: currentView == 'prevoyance'},{active3: currentView == 'risques'}]">
      <button class="header-button pointer" :class="{active: currentView == 'sante'}" @click="currentView = 'sante'">Santé</button>
      <button class="header-button pointer" :class="{active2: currentView == 'prevoyance'}" @click="currentView = 'prevoyance'">Prévoyance</button>
      <button class="header-button pointer" :class="{active3: currentView == 'risques'}" @click="currentView = 'risques'">Autres risques</button>
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
    background-color: rgb(4, 172, 172);
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
      color: white;
      font-weight: 550;
      border-radius: 7px;
      margin-right: 30px;
      height: 30px;
    }
  }
}
.active {
  background: rgba(4, 172, 172, 0.8)!important;
  outline: none;
}
.active2 {
  background: rgba(119, 78, 196, 0.8)!important;
  outline: none;
}
.active3 {
  background: rgba(53, 170, 112, 0.8)!important;
  outline: none;
}
</style>
