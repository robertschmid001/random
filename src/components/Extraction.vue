<template>
  <div id="extraction">
        <el-row>
        
          <el-col :span="8" class="column-wrap">
            <div class="title-wrapper">Je souhaite extraire:</div>
            <input type="text" class="base-input" placeholder="Nom ou N° de Holding">
            <input type="text" class="base-input" placeholder="Nom ou N° client">
            <input type="text" class="base-input" placeholder="Type de contrat">
            <input type="text" class="base-input" placeholder="Assureur">
            <div class="block">
                <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
                </el-date-picker>
            </div>
            <div class="result">{{randomNumber(112)}} Résultats</div>
          </el-col>
          <el-col :span="8" class="column-wrap">
              <div class="outer-wrapper">
                  <ul>
                      <li v-for="(bunch, index) in selection" :key="index" >
                        <div class="list-wrapper">{{bunch.name}} <div><font-awesome-icon icon="times" class="icon" @click="deleteItem(index)"/></div></div>
                      </li>
                  </ul>
              </div>
              <el-button class="button" @click="addSelection">Valider</el-button>
          </el-col>
          <el-col :span="8" class="column-wrap">
                <div>Extraction de :</div>
                
                <div class="outer-wrapper margin ul-wrapper" v-for="(box, index) in boxSelection" :key="index" @click="deleteSelection(index)">
                    <font-awesome-icon icon="times" class="icon2"/>
                    <ul>
                        <li v-for="(item, index) in boxSelection[index]" :key="index">
                            <div class="list-wrapper">{{item.name}}</div>
                        </li>
                    </ul>
                </div>
                <el-button class="button" @click="'click'">Extraction</el-button>
          </el-col>
      </el-row>

  </div>
</template>

<script>

export default {
  name: 'Extraction',
  props: {
  },
    data() {
        return {
            value6: '',
            boxSelection: [],
            selection: [{name: 'Assureur AXA'},{name: 'Roi'},{name: 'Albert'},{name: 'William'},{name: 'Elizabeth'},{name: 'Charles'},{name: 'Assureur AXA'},{name: 'Roi'},{name: 'Wang'},{name: 'Bang'},{name: 'Pong'},{name: 'Ping'},{name: 'Assureur AXA'},{name: 'Roi'},{name: 'Albert'},{name: 'William'},{name: 'Elizabeth'},{name: 'Charles'}]
        };
    },
    computed: {

    },
    methods: {
        deleteSelection (param) {
            this.boxSelection.splice(param,1)
        },
        deleteItem (param) {
            this.selection.splice(param,1)
        },
        addSelection () {
            this.boxSelection.push(_.cloneDeep(this.selection))
        },
        randomNumber (max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

#extraction {
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
   display: flex;
   justify-content: center;
}
.title-wrapper {
    padding-bottom: 30px;
}
.outer-wrapper {
    padding: 20px 15px;
    border-radius: 7px;
    background-color: white;
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
