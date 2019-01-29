<template>
  <div id="search">
    <input type="text" class="base-input" v-model="searcher" placeholder="Saisir un n° de sécurité social ou un nom">
    <DetailsAssure v-if="searcher.length > 3" :deleteCol="isSearching" :assure="assTableFilter" :search="searcher" class="details"/>
    <div v-else class="content" >Afin d’effectuer une recherche, merci de saisir le nom, prénom ou numéro de sécurité sociale d’un assuré dans la barre ci-dessus. </div>
  </div>
</template>

<script>
import AssTable from './Portefeuille/tables/AssTable.vue'

export default {
  name: 'Search',
  data () {
    return {
      searcher: '',
      isSearching: true
    }
  },
  props: {
  },
  components: {
   'DetailsAssure': AssTable
  },
  computed: {
    assTableFilter() {
      var assurefilter = this.$store.state.assure
      this.$store.state.holdings.forEach(e => {
          _.find(assurefilter, function(assure){
              if (assure.nh === e.nuH) {
              assure.noH = e.noH
              }
          }
        )
        e.entreprises.forEach(f => {
          _.find(assurefilter, function(assure){
            if (assure.ne === f.nuC) {
              assure.noC = f.noC
            }
          })
        })
      })
      return assurefilter
    }
  },
  methods: {
    setData () {
      this.$store.state.fullscreenLoading = true;
      this.getAssure();
      this.getCabinets();
      this.getTranslation();
      setTimeout(() => {
          this.$store.state.fullscreenLoading = false;
      }, 2000);
    }
  },
  created () {
    if (this.$store.state.assure.length === 0) return this.setData();
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

#search {
  padding: 80px 50px 0 50px;
  background-color: $background-global;
  input {
    font-size: 15px;
    color: rgb(51, 51, 51);
  }
  .but-style {
    padding: 0 20px;
  }
}
.content {
  color: rgba(84, 84, 84, 1);
  width: 100%;
  text-align: center;
  padding-top: 50px;
  font-size: 13px;
}
</style>
