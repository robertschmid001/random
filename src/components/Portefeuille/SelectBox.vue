<template>
    <div id="select-box" >
        <div class="middle-pop-wrapper" v-show="show" >
            <div class="middle-pop">
                <h1>Elements selectionnés</h1>
                <ul>
                    <li v-for="(item, index) in selection" :key="index" >
                        {{getName(item)}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom-pop-wrap">
            <div class="bottom-pop">
                <button class="button buttonDeco pointer" :class="{ selectionBox: show }" @click="showPop" >Voir la selection ({{this.selection.length}})</button>
                <button class="button buttonDeco pointer" v-if="showComputed" @click="clickChart(selection)" >Créer Graphique</button>
                <button class="button buttonDeco pointer"><download-excel :data = "selection" :fields = "getFields"> Exporter </download-excel></button>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import JsonExcel from 'vue-json-excel'

export default {
    name: 'SelectBox',
    props: ['selection', 'current', 'actFilter'],
    data () {
        return {
            show: false,
        }
    },
    computed: {
        showComputed () {
            // console.log(this.actFilter, 'this.actFilter')
            return this.current === 'ContTable' && this.actFilter === 's'
        },
        getFields() {
            if (this.current === 'HolTable') {
                var json_fields = {
                    'Holding': 'noH',
                    'Numero holding': 'nuH',
                    'Entreprises':'iEe',
                    'Nombre de contrats': 'iCc',
                    'Nombre d\' assurés': 'iAa',
                    'Nombre de bénéficiaires': 'iBb',
                    'Cotisations encaissées': {
                        callback: (value) => {
                            return `${this.year()}: ${value.iCoo[0]} <br> ${this.year2()}: ${value.iCoo[1]}`;
                        }
                    },
                    'Prestations réglées': {
                        callback: (value) => {
                            return `${this.year()}: ${value.iPrr[0]} <br> ${this.year2()}: ${value.iPrr[1]}`;
                        }
                    },
                    'Taux de télétransmission': 'iTt'
                }
                return json_fields
            }
            if (this.current === 'entTable' || this.current === 'globEnt-table') {
                var json_fields = {
                    'Holding': 'noH',
                    'Numéro holding': 'nuH',
                    'Entreprises':'noC',
                    'Numéro entreprises':'nuC',
                    'Nombre de contrats': 'iCc',
                    'Nombre d\' assurés': 'iAa',
                    'Nombre de bénéficiaires': 'iBb',
                    'Cotisations encaissées': {
                        callback: (value) => {
                            return `${this.year()}: ${value.iCoo[0]} <br> ${this.year2()}: ${value.iCoo[1]}`;
                        }
                    },
                    'Prestations réglées': {
                        callback: (value) => {
                            return `${this.year()}: ${value.iPrr[0]} <br> ${this.year2()}: ${value.iPrr[1]}`;
                        }
                    },
                    'Taux de télétransmission': 'iTt'
                }
                return json_fields
            }
            if (this.current === 'ContTable') {
                var json_fields = {
                    'Holding': 'noH',
                    'Numero holding': 'nuH',
                    'Entreprises':'noC',
                    'Numéro entreprises':'nuC',
                    'Contrat':{
                        callback: (value) => {
                            return `${this.transLibelle(value.l)}`;
                        }
                    },
                    'Type de contrat': {
                        callback: (value) => {
                            return `${this.transType(value.tc)}`;
                        }
                    },
                    'Catégorie': {
                        callback: (value) => {
                            return `${this.transCat(value.a)}`;
                        }
                    },
                    'Collège': {
                        callback: (value) => {
                            return `${this.transCol(value.o)}`;
                        }
                    },
                    'Assureur': {
                        callback: (value) => {
                            return `${this.transAss(value.s)}`;
                        }
                    },
                    'Réseau': {
                        callback: (value) => {
                            return `${this.transRes(value.r)}`;
                        }
                    },
                    'Nombre d\' assurés': 'iA',
                    'Nombre de bénéficiaires': 'iB',
                    'Cotisations encaissées': {
                        callback: (value) => {
                            return `${this.year()}: ${value.c[0]} <br> ${this.year2()}: ${value.c[1]}`;
                        }
                    },
                    'Prestations réglées': {
                        callback: (value) => {
                            return `${this.year()}: ${value.p[0]} <br> ${this.year2()}: ${value.p[1]}`;
                        }
                    },
                }
                return json_fields
            }
            if (this.current === 'AssTable') {
                var json_fields = {
                    'Holding': 'noH',
                    'Entreprises':'noC',
                    'Contrat':{
                        callback: (value) => {
                            return `${this.transLibelle(value.c.l)}`;
                        }
                    },
                    'Type de contrat': {
                        callback: (value) => {
                            return `${this.transTypeAss(value.c.c)}`;
                        }
                    },
                    'Catégorie': {
                        callback: (value) => {
                            return `${this.transCat(value.c.a)}`;
                        }
                    },
                    'Collège': {
                        callback: (value) => {
                            return `${this.transCol(value.c.o)}`;
                        }
                    },
                    'Nom': 'l',
                    'prénom': 'f',
                    'Numéro sécurité sociale': 's',
                    'Date d\'affiliation': 'c.e',
                    'Date de radiation': 'c.s',
                    'Régime': {
                        callback: (value) => {
                            return `${this.transReg(value.r)}`;
                        }
                    },
                    'Etat de la télétransmission': {
                        callback: (value) => {
                            return `${this.transTeletrans(value.t)}`;
                        }
                    },
                    'Carte TP': 'tp'
                }
                return json_fields
            }
            if (this.current === 'CotTable') {
                var json_fields = {
                    'Holding': 'noH',
                    'Numero holding': 'nuH',
                    'Entreprises':'noC',
                    'Numero entreprises': 'nuC',
                    'Contrats': 'c',
                    'Type de contrat': {
                        callback: (value) => {
                            return `${this.transType(value.ts)}`;
                        }
                    },
                    'Catégorie': {
                        callback: (value) => {
                            return `${this.transCat(value.cg)}`;
                        }
                    },
                    'Collège': {
                        callback: (value) => {
                            return `${this.transCol(value.cl)}`;
                        }
                    },
                    'Début de période': 'dp',
                    'Fin de période': 'fp',
                    'Montant encaissé': 'me',
                    'Date de l\'encaissement': 'de',
                    'Status cotisation': {
                        callback: (value) => {
                            return `${this.transStatus(value.s)}`;
                        }
                    },
                    'Dsn': {
                        callback: (value) => {
                            return `${this.transDsn(value.d)}`;
                        }
                    },
                    'Mode de réglement': {
                        callback: (value) => {
                            return `${this.transMode(value.td)}`;
                        }
                    },
                    'Montant reversé à la compagnie': 'mr',
                    'Date de reversement': 'dr',

                }
                return json_fields
            }
        }
    },
    methods: {
        year () {
            return new Date().getFullYear()
        },
        year2 (data) {
            return new Date().getFullYear()-1
        },
        transReg (data) {
            return this.$store.state.translation.regime[data]
        },
        transTeletrans (data) {
            return this.$store.state.translation.connecte[data]
        },
         transLibelle (data) {
            return this.$store.state.translation.contratLibelle[data]
        },
        transStatus (data) {
            return this.$store.state.translation.etatCotisation[data]
        },
        transDsn (data) {
            switch(data)
            {
                case "1":
                    return "OUI"
                    break;

                case "0":
                    return "NON"
                    break;

                default:
                    return ""
                    break;
            }
        },
        transMode (data) {
            return this.$store.state.translation.modeReglement[data]
        },
        transCol (data) {
            return this.$store.state.translation.college[data]
        },
        transCat (data) {
            return this.$store.state.translation.category[data]
        },
        transAss (data) {
            return this.$store.state.translation.assureurLibelle[data]
        },
        transRes (data) {
            return this.$store.state.translation.reseau[data]
        },
        transTypeAss (data) {
            switch(data)
            {
                case "B":
                    return "Base"
                    break;

                case "O":
                    return "Option"
                    break;

                default:
                    return ""
                    break;
            }
        },
        transType (data) {
            switch(data)
            {
                case "01":
                    return "Base"
                    break;

                case "02":
                    return "Option/Surcomplémentaire"
                    break;

                case "P1":
                    return "Base"
                    break;

                case "P2":
                    return "Surcomplémentaire"
                    break;

                case "04":
                    return "ASSISTANCE"
                    break;

                case "05":
                    return "Frais d'Obsèque"
                    break;

                case "08":
                    return "Frais d'Obsèques Prévoyance"
                    break;

                case "15":
                    return "Frais d'Obsèques"
                    break;

                case "16":
                    return "Frais d'Obsèques surcomplémentaire"
                    break;

                case "18":
                    return "Frais Association"
                    break;

                default:
                    return ""
                    break;
            }
        },
        log () {
            return console.log(this.selection, 'selection')
        },
        getName (data) {
            if ( data.f ) {
                return data.f + ' ' + data.l;
            }
            if ( data.nuH ) {
                return data.noH + ' '+  data.nuH;
            }
        },
        showPop () {
            this.show = !this.show
        },
        clickChart (data) {
            this.$store.state.selectedItems = data;
            this.$emit('clickChart')
            this.$router.push({ name: 'tableaux et graphiques'})
        }
    }
}
</script>
<style lang="scss">
@import "../../styles/_global.scss";
.selectionBox {
    background-color: white!important;
    color: $button-color!important;
}
.button:active{
    background:white;
    color: $button-color;
    border: 1px solid $button-color;
}
h1 {
    margin-top: 0;
    margin-bottom: 40px;
}
.bottom-pop-wrap {
  display: flex;
  justify-content: center;
}
.bottom-pop {
  box-shadow: 0px 0px 25px -9px;
  padding: 40px 50px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
  background-color: white;
  margin-bottom: 73px;
}
.buttonDeco {
  padding: 0 20px!important;
  height: 50px!important;
  margin-right: 20px;
  align-items: center;
}
.middle-pop {
  box-shadow: 0px 0px 25px -9px;
  padding: 40px;
  position: absolute;
  top: 20%;
  z-index: 1;
  background-color: white;
  max-height: 200px;
  overflow: auto;
}
.middle-pop-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}
.middle-pop ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        font-size: 12px;
        line-height: 20px;
    }

}


</style>