<template>
    <div id="assures">
        <el-row class="comp-wrapper">

            <el-col :span="12" :xs="24" class="left-wrapper">
                <div class="radius outer-wrapper" >
                <div class="header-border">
                    <el-row>
                        <el-col :span="14" class="md-txt align-left grey-text colorYellow"><font-awesome-icon icon="user" class="profile-icon"/>{{this.activeAss.l +' '+ this.activeAss.f}}</el-col>
                    </el-row>
                </div>
                <!-- <el-button @click="logging" >LOG</el-button> -->
                    <div class="align-left inner-body-l md-txt">
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Adresse</el-col>
                            <el-col :span="15" class="padding-item grey-text">
                                <div>{{this.assInfo.adresse}} <br> {{this.assInfo.adresse_comp}} <span> </span> {{this.assInfo.cp }} {{ this.assInfo.ville}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">E-mail</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.assInfo.email}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° téléphone 1</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.assInfo.tel1}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° téléphone 2</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{tel2Comp}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Bénéficiaire(s)</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{benef}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° de sécurité sociale</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{activeAss.s}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Télétransmission</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{transTeletrans(this.assInfo.connecte)}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Mode réglement</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{modeReglement}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">RIB</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.assInfo.iban}}</el-col>
                        </el-row>
                    </div>
                    <a :href="'/getCarteTP/' + this.activeAss.s" target="_blank" v-if="this.activeAss.tp == 1" ><div class="voirDoc pointer dark-grey"><font-awesome-icon icon="file-alt" class="padding-1"/>Carte de Tiers Payant</div></a>
                    <div class="voirDoc color" v-else><font-awesome-icon icon="file-alt" class="padding-1 color"/>Carte de Tiers Payant</div>
                </div>
            </el-col>
            <el-col :span="12" :xs="24" class="right-wrapper align-left">
            <div class="radius outer-wrapper">
                    <div>
                        <div class="inner-header header-border">
                            <el-row>
                                <el-col :span="12" class="md-txt align-left grey-text"><font-awesome-icon icon="user" class="profile-icon"/>COMPOSITION FAMILIALE<font-awesome-icon icon="times" class="close-icon pointer"  @click="close"/></el-col>
                            </el-row>
                        </div>
                        <div class="align-left inner-body-r md-txt">
                            <div>
                                <div class="box-user">
                                    <el-collapse :accordion="true">
                                        <div v-for="(item, index) in this.contratInfo" :key="index">
                                            <el-collapse-item :name="nameOfFile(index)">
                                                <template slot="title" class="titlehead">
                                                    <div class="col-head dark-grey">
                                                        {{formatType(item.ci.c)}}
                                                    </div>
                                                </template>
                                                <el-table :data="item.pi" style="width: 100%">
                                                    <el-table-column :label="formatLibelle(item)">
                                                        <el-table-column prop="nom" label=""><template scope="scope"><div class="data-wrapper md-txt">{{formatName(scope.row.type_personne)}}</div></template></el-table-column>
                                                        <el-table-column prop="name" label="Date d'entrée"><template scope="scope"><div class="data-wrapper md-txt">{{formatDate(scope.row.date_entre_atach)}}</div></template></el-table-column>
                                                        <el-table-column prop="address" label="Date de sortie"><template scope="scope"><div class="data-wrapper md-txt">{{formatDate(scope.row.date_sortie_atach)}}</div></template></el-table-column>
                                                    </el-table-column>
                                                </el-table>
                                            </el-collapse-item>
                                        </div>
                                    </el-collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'Assures',
    props: ['activeAss','assInfo', 'contratInfo'],
    data () {
      return {
        userData: this.assInfo,
        adresse:{ rue: '11 rue de la chevalerie', ville:'Paris', codePostale:'75015'},
        tel: '01 75 14 55 61',
        rib: 'FR76 xxxx xxxx xxxx xx56',

        newUser: {surname: '', forename: '', tel: '', email: '', edit: false},
      }
  },
  computed: {
    tel2Comp () {
        if (this.assInfo.tel2 === '0000000000'){
            return '- '
        } else return this.assInfo.tel2
    },
    modeReglement () {
        if (this.assInfo.iban){
            return 'Par virement '
        } else return 'Par chèque'
    },
    benef () {
        var count = Number(this.assInfo.ass_cnt) + Number(this.assInfo.conj_cnt) + Number(this.assInfo.enf_cnt)
        return count
    }
  },
  methods: {
    transTeletrans (data) {
        return this.$store.state.translation.connecte[data]
    },
    getAdresse () {
        var add = this.assInfo
        return this.userData = add
    },
    formatDate (date) {
        if ( date) {
            var date = moment(date).format('L')
            return date
        } else return ''
    },
    formatName (data) {
        if (data === 'A') { return 'Assuré' }
        if (data === 'E') { return 'Enfant' }
        if (data === 'C') { return 'Conjoint' }
        if (data === 'K') { return 'Ascendant' }
    },
    formatLibelle (data) {
        return this.$store.state.translation.contratLibelle[data.ci.l] + ': N° ' + data.ci.l1 + data.ci.l2
    },
    formatType (data) {
    
        return data === 'B'? 'Régime de base' : 'Régime optionnel'
    },
    nameOfFile (index) {
        return index
    },
    logging () {
        console.log(this.activeAss, 'activeAss')
        console.log(this.assInfo, 'assInfo')    
        console.log(this.assInfo.adresse, 'asureInfo.adresse')
        console.log(this.contratInfo, 'contratInfo')
    },
    close () {
        this.$emit('close');
    },
    mounted() {
        this.getAdresse();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../styles/_global.scss";
.col-head {
    padding-left: 20px;
    color: rgb(97, 96, 96);
}
.color {
    color: #dfdfdf;
}
.padding-1 {
    padding-right: 10px;
}
.comp-wrapper {
    position: relative;
    background-color: rgba(0, 0, 0, 0.349);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
}
.close-icon {
    font-size: 20px;
    position: absolute;
    top: -5px;
    right: 0px;
}
.close-icon:hover {
    color: $button-color;
}
.header-valider {
    height: 100%;
    width: 100%;
}
.hover:hover {
    text-decoration: underline;
}
.buttonShow:hover{
    background-color: $button-color;
    color: white;
}
.buttonShow{
    padding: 0;
    max-width: 250px;
    border-style: none;
    background-color: white;
    color: grey;
    border-radius: 7px;
    height: 50px;
    padding: 5px 13px;
}
.input-box {
    width: 50%;
}
.icons-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
}
.button-wrapper-profile {
    width: 50%;
}
.button-width {
    width: 95%;
}
.colorYellow {
    padding: 20px 0 20px 50px;
}
.colorBlue {
    padding: 20px 20px 20px 20px;
}
.colorRed {
    background-color: $button-color;
    padding: 20px 20px 20px 20px;
    color: white;
}
.left-wrapper {
    padding: 15px;
    max-width: 450px;
}
.voirDoc:hover {
    color: $button-color;
}
.voirDoc {
    position: absolute;
    bottom: 20px;
    right: 15px;
    font-size: 14px;
}
.right-wrapper {
    padding: 15px;
    max-width: 650px;
}
.adresse-input {
    margin: 1px;
}
.profile-icon {
    font-size: 14px;
    padding-right: 10px;
}
.inner-button-wrapper {
    height: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
}
.col-head:hover {
    background-color: $button-color;
    color: white;
}
.button {
    padding: 5px 13px;
}
.inner-body-l {
    padding: 20px 20px 20px 50px;
    height: 400px;
    box-sizing: border-box;
}
.inner-body-r {
    padding: 20px 10px 20px 10px;
    height: 400px;
    overflow-y: auto;
    background-color: #dde0e7;
    box-sizing: border-box;
}
.inner-header {
    padding: 20px 20px 20px 50px;
}
.inner-header-edit {
    padding: 20px 20px 20px 20px;
}
.header-border {
    border-bottom: 1px solid $background-global;
}
h1 {
    padding: 15px;
}
#assures {
    width: 100%;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    h1 {
        margin: 0;
    }
    h3 {
        margin: 40px 0 0;
    }
}
.outer-wrapper {
    background-color: white;
    overflow: hidden;
    position: relative;
}
.underline {
    text-decoration: underline;
}
.padding-item {
    padding: 10px;
}
.el-collapse-item /deep/ .is-active {
    div {
        color: white;
        background-color: $button-color;
    }
 .el-collapse-item__arrow {
     background-color: rgba(255, 255, 255, 0);
     color: white;
 }
}
.el-collapse-item /deep/ .el-collapse-item__header .is-active {

}
</style>