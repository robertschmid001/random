<template>
    <div id="assures">
        <el-row class="comp-wrapper">
            <font-awesome-icon icon="times" class="close-icon"  @click="close"/>
            <el-col :span="12" :xs="24" class="left-wrapper">
                <div class="radius outer-wrapper" >
                <div class="header-border">
                    <el-row>
                        <el-col :span="14" class="md-txt align-left grey-text colorYellow"><font-awesome-icon icon="user" class="profile-icon"/>{{this.assures.name}}</el-col>
                    </el-row>
                </div>
                    <div class="align-left inner-body-l md-txt">
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Adresse</el-col>
                            <el-col :span="15" class="padding-item grey-text">
                                <div>{{this.adresse.rue}} <br> {{this.adresse.codePostale}} <span> </span> {{this.adresse.ville}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">E-mail</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.assures.email}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° téléphone 1</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.tel}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° téléphone 2</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.tel}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Bénéficiaire(s)</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.assures.beneficiaires}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Télétransmission</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.assures.teletransmission}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Mode réglement</el-col>
                            <el-col :span="15" class="padding-item grey-text">virement</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">RIB</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.rib}}</el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" :xs="24" class="right-wrapper align-left">
            <div class="radius outer-wrapper">
                    <div>
                        <div class="inner-header header-border">
                            <el-row>
                                <el-col :span="12" class="md-txt align-left grey-text"><font-awesome-icon icon="user" class="profile-icon"/>Rattachement</el-col>
                            </el-row>
                        </div>
                        <div class="align-left inner-body-r md-txt">
                            <div v-for="(user, index) in this.usersList" :key="index">
                                <div class="box-user">
                                    <div class="input-box grey-text">
                                        <span>{{user.surname}}</span><br>
                                        <span>{{user.forename}}</span><br>
                                        <span>{{user.tel}}</span><br>
                                        <span>{{user.email}}</span><br>
                                    </div>
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
export default {
    name: 'Assures',
    props: ['activeAss'],
    data () {
      return {
        assures: this.activeAss,
        showList: false,
        rsSociale: 'Cabinet Tartiflette',
        orlas: '45145',
        adresse:{ rue: '11 rue de la chevalerie', ville:'Paris', codePostale:'75015'},
        tel: '01 75 14 55 61',
        email:'donnamoidugouda@wanadoo.com',
        id: '685675',
        password: '*********',
        rib: 'FR76 xxxx xxxx xxxx xx56',

        newUser: {surname: '', forename: '', tel: '', email: '', edit: false},

        usersList: [
            {surname: 'Schmid', forename: 'george', tel: '0175145561', email: 'rschmid@gmail.com', edit: false},
            {surname: 'Schmid', forename: 'rico', tel: '0175145561', email: 'rifto@gmail.com', edit: false},
        ]
      }
  },
  methods: {
    close () {
        this.$emit('close');
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../styles/_global.scss";
.comp-wrapper {
    position: relative;
}
.close-icon {
    font-size: 30px;
    position: absolute;
    top: 10px;
    right: 15px;
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
.box-user {
    background-color: #dde0e7;
    margin-bottom: 15px;
    padding: 15px;
    position: relative;
    line-height: 16px;
}

.button {
    padding: 5px 13px;
}
.inner-body-l {
    padding: 20px 20px 20px 50px;
    height: 400px;
}
.inner-body-r {
    padding: 30px 50px 10px 50px;
    height: 400px;
    overflow-y: auto;
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
    padding-top: 50px;
    background-color: $background-global;
    padding: 20px 30px;
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
}
.underline {
    text-decoration: underline;
}
.padding-item {
    padding: 10px;
}

</style>