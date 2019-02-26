<template>
    <div id="detailsEntreprise">
        <div class="wrapper">
            <div class="title"><h2>{{this.aEntDet.nom_client}}</h2> <font-awesome-icon icon="times" class="close-icon pointer"  @click="close"/></div>
            <el-row>
                <el-col :span="24" class="block-wrapper">
                    <div class="details-wrapper">
                        <div class="content">{{this.aEntDet.num_siret}}</div><br>
                        <div class="descrip">N° Siret</div>
                    </div>
                </el-col>
                <el-col :span="24" class="block-wrapper">
                    <div class="details-wrapper">
                        <div class="content">{{this.aEntDet.code_naf}}</div>
                        <div class="descrip">Code Naf</div>
                    </div>
                </el-col>
                <el-col :span="24" class="block-wrapper">
                    <div class="details-wrapper">
                        <div class="content">
                            {{this.aEntDet.adresse}}, {{this.aEntDet.adresse_comp}} <br>
                            {{this.aEntDet.cp}} {{this.aEntDet.ville}}
                        </div>
                        <div class="descrip">Adresse</div>
                    </div>
                </el-col>
                <el-col :span="24" class="block-wrapper">
                    <div class="details-wrapper">
                        <div class="content">{{dateFormatEntree}}</div>
                        <div class="descrip">Date d'entrée</div>
                    </div>
                </el-col>
                <el-col :span="24" class="block-wrapper">
                    <div class="details-wrapper">
                        <div class="content" v-if="this.aEntDet.date_sortie !== '0000-00-00'">{{dateFormatSortie}}</div>
                        <div class="descrip">Date de résiliation</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'DetailsEntreprise',
    props: ['aEntDet'],
    data () {
      return {

      }
  },
  computed: {
    dateFormatEntree() {
        if (this.aEntDet.date_entre) {
        var date = moment(moment(this.aEntDet.date_entre, 'YYYY-MM-DD')).format('DD/MM/YYYY')
        return date
        } else return ''

    },
    dateFormatSortie() {
        if (this.aEntDet.date_sortie && this.aEntDet.date_sortie !== '0000-00-00') {
            var date = moment(moment(this.aEntDet.date_sortie, 'YYYY-MM-DD')).format('DD/MM/YYYY')
            return date
        } else return ''
    },
  },
  methods: {
    close () {
        this.$emit('close');
    },
  },
  mounted () {
      console.log(this.aEntDet, 'aEntDet')
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
@import "../../../../styles/_global.scss";

#detailsEntreprise {
    background-color: rgba(0, 0, 0, 0.349);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
.wrapper {
    background-color: $background-global;
    height: auto;
    width: auto;
    box-sizing: border-box;
    margin-right: 64px;
    padding: 30px;
    position: relative;
}
h2 {
    margin: 0;
    font-size: 20px;
    padding-bottom: 20px;
}
.title {
    font-size: 30px;
}
.close-icon {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
}
.content {
    color: $button-color;
    font-weight: 600;
    font-size: 18px;
    box-sizing: border-box;
}
.descrip {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-style: italic;
    font-size: 12px;
    box-sizing: border-box;
}
.details-wrapper {
    position: relative;
    display: flex;
    padding: 20px 0px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 7px;
    box-sizing: border-box;
}
.block-wrapper {
    padding: 10px 0;
}


</style>