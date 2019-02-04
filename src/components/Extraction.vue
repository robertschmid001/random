<template>

           <!-- <el-select class="select" v-model="value10" multiple filterable remote reserve-keyword placeholder="Numéro de Holding" :remote-method="remoteMethod2" :loading="loading">
                <el-option v-for="item in options4" :key="item.value2" :label="item.label2" :value="item.value2"> </el-option>
            </el-select> -->

            <!-- <el-select v-if="this.$store.state.extrType === 'a'" class="select" v-model="value12" multiple filterable remote reserve-keyword placeholder="Type de contrat">
                <el-option v-for="item in ctList" :key="item.tc" :label="item.tc" :value="item.tc"><div @click="addData(item, 'ct')"></div></el-option>
            </el-select> -->
  <div id="extraction">
        <el-row>

          <el-col :span="12" class="column-wrap">
            <div class="title-wrapper">Je souhaite extraire {{setTitle}}.</div>

            <el-select class="select" remove-tag="remove" @change='changedList(value9)' v-model="value9" multiple auto-complete="on"  filterable remote reserve-keyword placeholder="Nom ou numéro de holding" :filter-method="remoteMethod">
                <el-option v-for="(item, index) in options4" :key="index" :label="item.noH" :value="item.nuH"><div @click="addData(item, 'h')">{{item.noH }} {{ item.nuH}}</div></el-option>
            </el-select>



            <el-select class="select" @change='changedList2(value10)' v-model="value10" multiple filterable remote reserve-keyword placeholder="Nom ou numéro client" :remote-method="remoteMethodEnt">
                <el-option v-for="(item, index) in entList" :key="index" :label="item.noC" :value="item.nuC"><div @click="addData(item, 'e')">{{item.noC }} {{ item.nuC}}</div></el-option>
            </el-select>

            <el-select v-if="this.$store.state.extrType === 'assures'" class="select" v-model="valueTc" multiple filterable remote reserve-keyword placeholder="Type de contrat">
                <el-option v-for="item in optCt" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>

            <el-select class="select" @change='changedList3(valueAss)' v-model="valueAss" placeholder="Assureur" multiple remote filterable :remote-method="remoteMethodAss">
                <el-option v-for="item in optsAss" :key="item" :label="item" :value="item"><div @click="addData(item, 'a')">{{item}}</div></el-option>
            </el-select>

            <el-select v-if="this.$store.state.extrType === 'contrats'" class="select" v-model="valueSt" multiple filterable remote reserve-keyword placeholder="Statut" :remote-method="remoteMethod2">
                <el-option v-for="item in optsStat" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>

            <el-select class="select" v-model="valueCat" placeholder="Catégorie">
                <el-option v-for="item in optsCat" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>

            <div class="block" v-if="this.$store.state.extrType !== 'contrats'">
                <el-row>
                    <el-col :span="24">
                        <div class="periodtitle">{{setDatePickerTitle}}</div>
                    </el-col>
                    <el-col :span="24">
                        <el-date-picker
                        value-format='yyyy-MM-dd'
                        class="data-picker"
                        v-model="valueDateRange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="Date de début"
                        end-placeholder="Date de fin"
                        >
                        <!-- :picker-options="pickerOptions2" -->
                        </el-date-picker>
                    </el-col>
                </el-row>
            </div>

            <div v-show="error" class="error"> {{error}} </div>
            <div class='widthValidate'>
                <el-button  class="button validate pointer" @click="addSearch" >Valider</el-button>
            </div>
          </el-col>
          <el-col :span="8" class="column-wrap">
              <div>Extraction de :</div>
              <div class="outer-wrapper">

                <div class="outer-wrapper margin ul-wrapper" v-for="(sendData, index) in selection" :key="index">
                    <div @click="deleteSelection(index)" class="pointer"><font-awesome-icon icon="times" class="icon2"/></div>
                    <div> <div class="subtitle">Entreprises:</div>
                        <div v-for="(item, index) in sendData.listName" :key="index" >{{item}}</div>
                    </div>
                    <br>
                    <div><div class="subtitle">Catégorie:</div> {{formatCat(sendData.category)}}</div><br>
                    <div v-if="sendData.status > 0"><div class="subtitle">Assureur:</div>{{sendData.status}} <div v-for="(item, index) in sendData.type" :key="index" >{{item}}</div></div>
                    <div v-if="sendData.type.length > 0"> <div class="subtitle">Type:</div><div v-for="(item, index) in sendData.type" :key="index" >{{formatType(item)}}</div><br></div><br>
                    <div v-if="sendData.stDate[0]"> <div class="subtitle">Date d'entrée:</div> {{sendData.stDate}}<br></div>
                    <div v-if="sendData.fnDate[1]"> <div class="subtitle">Date de sortie:</div> {{sendData.fnDate}}<br></div>
                    <!-- <div v-if="sendData.isLoading"><i class="el-icon-loading"></i></div> -->
                </div>
                <button class="button" @click="LOG">LOG</button>
                <el-button  class="button validate pointer" @click="getExtraction()" >Préparer les extractions</el-button>
              </div>
              
          </el-col>
           <el-col :span="4" class="column-wrap">
                <div class="linkList-wrap">
                    <template v-for="item in linkList">
                        <div class="center">
                            <a :href="extraction(item)" target="_blank" :title="item" class="align-center sizeThis" >
                                <font-awesome-icon icon="file-alt" class="iconSize fontawe"/>
                            </a>
                        </div>
                    </template>
                 </div>
          </el-col>
      </el-row>

  </div>
</template>

<script>
import moment from 'moment'
import axios from "axios"

export default {
  name: 'Extraction',
    data() {
        return {
            filteredData: [],
            error: '',
            valueDateRange:'',
            boxSelection: [],
            selection: [],
            holding: this.$store.state.holdings,
            allContrats:[],
            linkList: [],

            optsStat: [{
                value: 'e',
                label: 'en cours'
            }, {
                value: 'r',
                label: 'résiliés'
            }],
            optsCat: [{
                value: 's',
                label: 'Santé'
            }, {
                value: 'p',
                label: 'Prévoyance'
            }, {
                value: 'a',
                label: 'Autres risques'
            }],
            optsAss: [],
            optionsCont: [{
                value: 'gestionconfiee@cpms.fr',
                label: 'La gestion'
            }, {
                value: 'dcommerciale@cpms.fr',
                label: 'Le commercial'
            }],
            optCt: [{
                value: '01',
                label: 'Base'
            },{
                value: '02',
                label: 'Option'
            }],
            list: this.$store.state.holdings,
            options4: [], //list of all holdings according to the search input
            value9: [], //each independant label chosen when filtering, used data for filtering through list of holdings
            filterHol: [], //what ends up in the selection box, filtered holdings
            valueCat: [],
            valueAss: [],
            valueTc: [],
            valueSt: [],
            value10: [],
            value12: [],
            entList: [],
            entFilter: [],
            ctList: [],
            acList: [],
            aCFilter: [],
            ctFilter: [],
            options5: [],
            value11: [],

            // pickerOptions2: {
            // shortcuts: [{
            //     text: 'Le mois passé',
            //     onClick(picker) {
            //     const end = new Date();
            //     const start = new Date();
            //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            //     picker.$emit('pick', [start, end]);
            //     }
            // }, {
            //     text: 'Les 6 derniers mois',
            //     onClick(picker) {
            //     const end = new Date();
            //     const start = new Date();
            //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
            //     picker.$emit('pick', [start, end]);
            // }
            // }]
            // },
            value6: '',
            value7: ''
        }
    },
    computed: {
        setDatePickerTitle () {
            switch(this.$store.state.extrType)
            {
                case "prestations":
                    return "Période de soins"

                case "cotisations":
                    return "Période de cotisations"

                case "assures":
                    return "Période de présence"

                default:
                    return ""
            }
        },
        setTitle () {
            switch(this.$store.state.extrType)
            {
                case "prestations":
                    return "des prestations"

                case "cotisations":
                    return "des cotisations"

                case "contrats":
                    return "des contrats"

                case "assures":
                    return "des assurés"

                default:
                    return ""
            }
        }
    },
    mounted () {
        // this.list = this.holding.map(item => {
        //     // console.log(item, 'item')
        //     return { value: item.nuH, label: item.noH, value2: item.nuH, label2: item.nuH };
        // });
    },
    methods: {
        extraction (data) {
            return '/getExtraction/' + data
        },
        isDownloading (data) {
            var data2 = data
            return data
        },
        formatType (data) {
            if ( data === '01' ) {
                return 'Base'
            }
            if ( data === '02' ) {
                return 'Option'
            }
        },
        formatCat (data) {
            if ( data === 's' ) {
                return 'Santé'
            }
            if ( data === 'p' ) {
                return 'Prévoyance'
            }
            if ( data === 'a' ) {
                return 'Autres risque'
            }
        },

        remove () {
            // console.log('ee')
        },
        changedList (array) {
            var list = array;
            var newList = [];
            for (var i = 0; i < list.length; i++){
                _.find(this.filterHol, function(item){
                    if (item.nuH === list[i]) {
                        newList.push(item)
                    } else return
                })
            } this.filterHol = newList;
        },
        changedList2 (array) {
            var list = array;
            var newList = [];
            for (var i = 0; i < list.length; i++){
                _.find(this.entFilter, function(item){
                    if (item.nuC === list[i]) {
                        newList.push(item)
                    } else return
                })
            }
             this.entFilter = newList;
        },
        changedList3 (array) {
            var list = array;
            var newList = [];
            for (var i = 0; i < list.length; i++){
                _.find(this.aCFilter, function(item){
                    if (item === list[i]) {
                        newList.push(item)
                    } else return
                })
            } this.aCFilter = newList;
        },
        LOG () {
            console.log(this.selection,'sendData')
            console.log(this.linkList, 'linkList')
            // console.log(this.aCFilter,'acfilter')
            // console.log(this.optsAss,'optsAss')
            // console.log(this.valueAss,'valueAss')
            // console.log(this.optsStat,'optsStat')
            // console.log(this.optsCat,'optsCat')
            // console.log(this.optCt,'optCt')
            // console.log(this.options4,'options4')
            // console.log(this.entList,'entList')
            // console.log(this.entFilter,'entFilter')
            // console.log(this.filterHol,'filterHol')
            // console.log(this.value9, 'value9=Hol')
            // console.log(this.value10, 'value10=Ent')
            // console.log(moment(this.valueDateRange[1]).diff(this.valueDateRange[0], 'days'), 'valueDateRange2')
            // console.log(this.valueDateRange[0], '.moment()')
            // console.log(this.valueDateRange[1], '.moment()2')
            console.log(this.selection, 'boxSelection')
            // console.log(moment(this.valueDateRange[1]).unix() - moment(this.valueDateRange[0]).unix(), '2222')
            // console.log(moment(this.valueDateRange[0]).format('L'),moment(this.valueDateRange[1]).format('L'), 'range');
        },
        getExtraction () {
            this.linkList = []
            this.selection.forEach(e => {
                axios.post('https://courtier.cpms.fr/extraction/'+ `${this.formatType()}`, {
                    list: e.list
                })
                .then(response => {
                    var that = this
                    console.log(response, 'response')
                    console.log(e, 'e')
                    if(response.data.status) {
                        if(that.linkList.length == 0){
                            that.linkList.push(response.data.link)
                        } else {
                            that.linkList.forEach(e => {
                                if(response.data.link !== e.link) {
                                    that.linkList.push(response.data.link)
                                }
                            })
                        }
                        console.log(this.linkList, 'linklist inside response')
                    }
                })
            })

            // this.selection[this.selection.length - 1].isLoading = true
            // axios.post('https://courtier.cpms.fr/extraction/'+ `${this.formatType()}`, {
            //     list: data
            // })
            // .then(response => {
            //     if (response.data.status) {
            //             this.selection[this.selection.length - 1].link = response.data.link
            //             this.selection[this.selection.length - 1].isLoading = false

            //     }
            // })
        },
        formatType () {
            switch(this.$store.state.extrType)
            {
                case "prestations":
                    return "prestation"

                case "cotisations":
                    return "cotisation"

                case "contrats":
                    return "contrat"

                case "assures":
                    return "assure"

                default:
                    return ""
            }
        },
        emptyFilters () {
            this.value9 = []
            this.valueCat = []
            this.valueAss = []
            this.valueTc = []
            this.valueSt = []
            this.value10 = []
            this.value12 = []
            this.value11 = []
        },
        addSearch () {
            var baseData = []
            var filteredData = []
            var stringCon = []
            var listName = []
            var allCoti = []
            var stDate = ""
            var endDate = ""
            
            if ( this.valueCat !== "" ) {
                this.error = ""

            if (this.entFilter.length === 0) {
                this.filterHol.forEach( e => {
                    e.entreprises.forEach( f => {
                        baseData.push(f)
                    })
                });
            }
             else {
                baseData = this.entFilter;
            }


            if (this.$store.state.extrType === 'cotisations') {
                allCoti = this.$store.state.cotisations
                console.log(this.valueSt, 'this.valueSt')
                console.log(baseData, 'baseData')
                baseData.forEach( e => {
                    // console.log(this.valueSt, '======> this.valueSt')
                    listName.push(e.noC)
                    if ( e.contracts !== null && e.contracts ) {
                        var cat = this.valueCat
                        e.contracts.forEach( f => {
                            console.log('Cot 1')
                            f.noC = e.noC
                            f.nuC = e.nuC
                            _.find(allCoti, function(cotisation){
                                // console.log(f.nuC, 'f.nuC cot 2')
                                //  console.log(cotisation.e, 'cotisation.e')
                                if (cotisation.c === f.n) {
                                    console.log('Cot 3')
                                    console.log(cotisation, 'cotisation inside cot3')
                                    console.log(cat + "e")
                                    // if (this.valueSt.length === 0 || this.valueSt.length === 2 || !this.valueSt) {
                                        if (cotisation.ct === cat + "e" || cotisation.ct === cat + "r") {
                                            console.log('inside cot3')
                                            filteredData.push(cotisation)
                                        }
                                    // } else {
                                    //      console.log('Cot 4')
                                    //     if ( this.valueSt.length === 1 ) {
                                    //          console.log('Cot 5')
                                            // if ( cotisation.ct === this.valueCat + this.valueSt[0] ) {
                                            //     console.log("length 1")
                                            //     console.log(cotisation.ct, 'cot.ct')
                                            //     filteredData.push(cotisation)
                                            // }
                                    //     }
                                    // }
                                } else {
                                    console.log('no')
                                }
                            })
                        })
                        console.log(filteredData, 'filteredData COTI')
                    } else {
                        return
                    }
                })
            }




                    //         if ( this.valueSt.length === 0 || this.valueSt.length === 2 ){
                    //                 console.log('inside !!!valueSt')
                    //             if ( f.t === this.valueCat + "e" || f.t === this.valueCat + "r" ) {
                    //                 console.log("length 0 or 2")
                    //                 filteredData.push(f)
                    //                 }


                    //         } else {
                    //             if ( this.valueSt.length === 1 ) {
                    //                 if ( f.t === this.valueCat + this.valueSt[0] ) {
                    //                     console.log("length 1")
                    //                     filteredData.push(f)
                    //                 }
                    //             }
                    //         }



                    //     })
                    // } else {
                    //     return
                    // }




            if (this.valueTc.length !== 0) {
                var data = filteredData
                filteredData = []
                data.filter( a => {
                    this.valueTc.forEach( b => {
                        if ( a.tc === b ) {
                            filteredData.push(a)
                        }
                    })
                })
            }

            if (this.valueAss.length !== 0) {
                var data = filteredData
                filteredData = []
                data.filter( a => {
                    this.valueAss.forEach( b => {
                        var x = _.invert(this.$store.state.translation.assureurLibelle)[b];
                        if ( a.a === x ) {
                            filteredData.push(a)
                        }
                    })
                })
            }
            if (this.valueDateRange !== null && this.valueDateRange.length !== 0) {
                var data = filteredData
                filteredData = []
                var startDate = moment(this.valueDateRange[0]);
                var endDate = moment(this.valueDateRange[1]);
                data.filter( a => {
                    var entry = moment(a.dep);
                    var end =  moment(a.dsp);
                    if (entry >=  startDate && (a.dsp === null || end <= endDate) && endDate >= entry ) {
                        // console.log(moment(a.dep), 'moment a.dep')
                        // console.log(moment(a.dsp), 'moment a.dsp')
                        // console.log('isRight', a.dep, a.dsp)
                        filteredData.push(a)
                    }
                })
            }
            console.log(filteredData, 'filteredData')
                filteredData.forEach( a => {
                    stringCon.push(a.lID)
                })
            console.log(stringCon, 'stringCon')

            // Stored Data
            console.log(this.valueDateRange, 'this.valueDateRange')
                if (this.valueDateRange) {
                    stDate = moment(this.valueDateRange[0]).format('DD/MM/YYYY')
                    endDate = moment(this.valueDateRange[1]).format('DD/MM/YYYY')
                } else {
                    stDate = ""
                    endDate = ""
                }

                let sendData = {
                    'listName': listName,
                    'list': stringCon, // done
                    'type': this.valueTc, // done
                    'category': this.valueCat,
                    'status': this.valueSt,
                    'assureur': this.valueAss,
                    'stDate': stDate,
                    'fnDate': endDate,
                    'isLoading': true,
                    'link': "",
                    'hasDownloaded': false
                }
                
                setTimeout(() => {
                    this.selection.push(sendData)
                },0)

                //this.getExtraction(stringCon);
                console.log(sendData, 'sendData')
                
                this.valueDateRange = []
                this.emptyFilters();
            }
            else {
                return this.error = "Veuillez choisir une catégorie pour faire une extraction."
            }
        },
        addData (data, id) {
            console.log('switch')
            switch(id)
            {
                case "h":
                    return this.filterHol.push(data)

                case "e":
                    return this.entFilter.push(data)

                case "ac":
                    return this.aCFilter.push(data)

                case "a":
                    return this.aCFilter.push(data)

                case "ct":
                    return this.ctFilter.push(data)

                default:
                    return ""
            }
        },
        remoteMethod(query) {
            if (query !== '') {
            setTimeout(() => {
                this.options4 = this.list.filter(item => {
                    let filter = item.noH + item.nuH;
                    return filter.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
                });
            }, 200);
            } else {
            this.options4 = [];
            }
        },
        remoteMethodEnt(query) {
            if(this.filterHol.length < 1){this.filterHol = this.$store.state.holdings}
            if (query !== '') {
            setTimeout(() => {
                var list = []
                this.filterHol.filter( e => {
                    e.entreprises.forEach( f => {
                        list.push(f)
                    })
                })
                this.entList = list.filter(item => {
                    let filter = item.noC + item.nuC;
                    return filter.toLowerCase().indexOf(query.toLowerCase()) > -1
                })
            }, 200);
            } else {
            this.entList = [];
            }
        },
        remoteMethodAss (query) {
            if ( this.entList.length < 1 ) {
                this.filterHol = this.$store.state.holdings
                var listed = []
                this.filterHol.filter( e => {
                    e.entreprises.forEach( f => {
                        listed.push(f)
                    })
                })
                this.entList = listed
            }
            if ( query !== '' ) {
            setTimeout(() => {
                var list = []
                this.entList.filter( e => {
                    if ( e.contracts === false ) { return console.log('Im false') }
                    else {
                        e.contracts.forEach( f => {
                            f.aS = this.$store.state.translation.assureurLibelle[f.a]
                            list.push(f.aS)
                        })
                    }
                })
                let noDup = [...new Set(list)];
                console.log(noDup, 'noDup')
                console.log(list, 'list')
                this.optsAss = noDup
            }, 200);
            } else {
            this.optsAss = [];
            }
        },

        remoteMethod2(query) {
            if (query !== '') {
            setTimeout(() => {
                this.options4 = this.list.filter(item => {
                return item.label2.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
            } else {
            this.options4 = [];
            }
        },
        deleteSelection (param) {
            this.selection.splice(param,1)
        },
        deleteItem (param) {
            this.selection.splice(param,1)
        },
        // addSelection () {
        //     this.boxSelection.push(sendData)
        // }

    }
};
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
#extraction {
}
.fontawe {
    color: $button-color;
    font-size: 45px;
}
.linkList-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.iconSize {
    font-size: 26px;
}
.validate {
    width: 50%;
}
.widthValidate {
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
}
a:visited {
  background-color: white;
  color:$button-color;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
.successColor {
    color: white;
}
.subtitle {
    color: $button-color;
}
.center {
    align-items: center;
    justify-content: center;
    display: flex;
    a {
        text-decoration: none;
        color: white;
        text-decoration: none;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
    }
    a:link {
        text-decoration: none;
        width: 50%;
    }
}
.select /deep/ input{
    // background-color: $background-global!important;
}
.data-picker {
    width: 100%!important;
}
.select {
    width: 100%;
    margin-bottom: 10px;
}
.periodtitle {
    padding: 10px 0px;
}
.margin {
    margin-top: 10px;
}
.column-wrap {
    padding: 30px 30px;
}
.base-input {
    background-color: rgba(255, 255, 255, 0);
    max-width: 100%;
}
.block {
    // margin-top: 20px;
}
.title-wrapper {
    padding-bottom: 30px;
}
.outer-wrapper {
    padding: 20px 15px;
    border-radius: 7px;
}
.list-wrapper {
    position: relative;
    margin-bottom: 5px;
}
ul {
    height: 100%;
    list-style: none;
    padding: 0;
    max-height: 600px;
    box-sizing: border-box;
    margin: 0;
}
.icon {
    position: absolute;
    bottom: 0px;
    right: 0px;
}
.icon2 {
    position: absolute;
    top: 10px;
    right: 10px;
}
.ul-wrapper {
    position: relative;
    overflow-y: auto;
    max-height: 150px;
    background-color: white;
}
.button {
    width: 100%;
    margin-top: 10px;
}
.result {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(185, 185, 185);
    border-style: none;
    background-color: $button-color;
    color: white;
    border-radius: 7px;
    height: 35px;
    margin-top: 10px;
}
</style>
