<template>
  <div id="profile">
    <el-row>
        <el-col :span="12" :xs="24" class="left-wrapper">
            <div class="radius outer-wrapper" v-if="!isEditing">
            <div class="inner-header">
                <el-row>
                    <el-col :span="12" class="text-size-md align-left"><img src="../assets/icons/profile-icons/personbw.png" class="profile-icon" alt="">Mon profil</el-col>
                    <el-col :span="12" class="text-size-md align-right"><img src="../assets/icons/profile-icons/edit.png" class="profile-icon" alt=""><span class="underline pointer" @click="edit">Editer mon profil</span></el-col>
                </el-row>
            </div>
                <div class="align-left inner-body-l text-size-md">
                    <el-row>
                        <el-col :span="9" class="padding-item">Raison Sociale</el-col>
                        <el-col :span="15" class="padding-item">{{this.rsSociale}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Nom</el-col>
                        <el-col :span="15" class="padding-item">{{this.surname}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Prénom</el-col>
                        <el-col :span="15" class="padding-item">{{this.forename}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">N° Orlas</el-col>
                        <el-col :span="15" class="padding-item">{{this.orlas}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Adresse</el-col>
                        <el-col :span="15" class="padding-item">{{this.adresse.rue}} <br> {{this.adresse.codePostale}} <span> </span> {{this.adresse.ville}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">N° téléphone</el-col>
                        <el-col :span="15" class="padding-item">{{this.tel}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">E-mail</el-col>
                        <el-col :span="15" class="padding-item">{{this.email}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Identifiant</el-col>
                        <el-col :span="15" class="padding-item">{{this.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Mot de passe</el-col>
                        <el-col :span="15" class="padding-item">{{this.password}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">RIB</el-col>
                        <el-col :span="15" class="padding-item">{{this.rib}}</el-col>
                    </el-row>
                </div>
            </div>




            <div class="radius outer-wrapper" v-else>
                <div class="inner-header-right">
                        <el-row>
                            <el-col :span="16" class="text-size-md align-left colorYellow"><img src="../assets/icons/profile-icons/personbw.png" class="profile-icon" alt="">Mon profil</el-col>
                            <span class="pointer" @click="confirm"><el-col :span="8" class="text-size-md align-center colorRed pointer">Valider</el-col></span>
                        </el-row>
                </div>
                <div class="align-left inner-body-l text-size-md">
                    <el-row>
                        <el-col :span="9" class="padding-item"> Raison Sociale</el-col>
                        <el-col :span="15" class="padding-item">{{this.rsSociale}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Nom</el-col>
                        <el-col :span="15" class="padding-item">{{this.surname}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Prénom</el-col>
                        <el-col :span="15" class="padding-item">{{this.forename}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">N° Orlas</el-col>
                        <el-col :span="15" class="padding-item">{{this.orlas}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Adresse</el-col>
                        <el-col :span="15" class="padding-item">
                            <div class="input-icon-wrapper adresse-input"><input class="base-form-input" placeholder="Rue" v-model.trim.lazy="this.adresse.rue"/></div>
                            <el-row>
                                <el-col  :span="12"><div class="input-icon-wrapper adresse-input"><input class="base-form-input" placeholder="Ville" v-model.trim.lazy="this.adresse.ville"/></div></el-col>
                                <el-col  :span="12"><div class="input-icon-wrapper adresse-input"><input class="base-form-input" placeholder="Code postale" v-model.trim.lazy="this.adresse.codePostale"/></div></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">N° téléphone</el-col>
                        <el-col :span="15" class="padding-item">
                            <div class="input-icon-wrapper"><input class="base-form-input" placeholder="N° téléphone" v-model.trim.lazy="this.tel"/></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">E-mail</el-col>
                        <el-col :span="15" class="padding-item">
                            <div class="input-icon-wrapper">
                                <input class="base-form-input" placeholder="email" v-model.trim.lazy="this.email"/>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Identifiant</el-col>
                        <el-col :span="15" class="padding-item">{{this.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">Mot de passe</el-col>
                        <el-col :span="15" class="padding-item">{{this.password}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" class="padding-item">RIB</el-col>
                        <el-col :span="15" class="padding-item">{{this.rib}}</el-col>
                    </el-row>
                </div>
            </div>
        </el-col>

        <el-col :span="12" :xs="24" class="right-wrapper align-left">

            <button class="button pointer" v-if="!showList" @click="showUsersList"><div class="inner-button-wrapper text-size-small"><img src="../assets/icons/profile-icons/person.png" class="profile-icon" alt=""> <span>Voir la liste des utilisateurs habilités</span> </div></button>

            <div v-else class="radius outer-wrapper">
                <div v-if="!isAdding">
                    <div class="inner-header">
                            <el-row>
                                <el-col :span="12" class="text-size-md align-left"><img src="../assets/icons/profile-icons/personbw.png" class="profile-icon" alt=""> Liste des utilisateurs habilités</el-col>
                                <el-col :span="12" class="text-size-md align-right"><img src="../assets/icons/profile-icons/person_add.png" class="profile-icon-add" alt=""><span class="underline pointer" @click="isAdding=true">Ajouter un utilisateur</span></el-col>
                            </el-row>
                    </div>
                    <div class="align-left inner-body-r text-size-md">
                        <div v-for="(user, index) in this.usersList" :key="index">
                            <div class="box-user">
                                <div class="input-box">
                                    <span v-show="!user.edit">{{user.surname}}</span> <input class="base-input" placeholder="user.surname" v-model.trim.lazy="user.surname" v-show="user.edit"/><br>
                                    <span v-show="!user.edit">{{user.forename}}</span> <input class="base-input" placeholder="user.forename" v-model.trim.lazy="user.forename" v-show="user.edit"/><br>
                                    <span v-show="!user.edit">{{user.tel}}</span> <input class="base-input" placeholder="user.tel" v-model.trim.lazy="user.tel" v-show="user.edit"/><br>
                                    <span v-show="!user.edit">{{user.email}}</span> <input class="base-input" placeholder="user.email" v-model.trim.lazy="user.email" v-show="user.edit"/><br>
                                    {{user.edit}}
                                </div>
                                <div class="icons-wrapper">
                                    <img src="../assets/icons/profile-icons/edit.png" class="profile-icon pointer" alt="" @click="editUser(index, user)" v-show="!user.edit">
                                    <img src="../assets/icons/profile-icons/checkmark.png" class="profile-icon pointer" alt="" @click="confirmEdit(index, user)" v-show="user.edit">
                                    <img src="../assets/icons/profile-icons/cross.png" class="profile-icon pointer" alt=""  @click="openWarning(index, user)">
                                </div>
                                <!-- @click="deleteUser(index)" -->
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="inner-header">
                            <el-row>
                                <el-col :span="12" class="text-size-md align-left"><img src="../assets/icons/profile-icons/personbw.png" class="profile-icon" alt=""> Liste des utilisateurs habilités</el-col>
                                <el-col :span="12" class="text-size-md align-right"></el-col>
                            </el-row>
                    </div>
                    <div class="align-left inner-body-r text-size-md">
                        <input class="base-input" placeholder="Nom" v-model.trim.lazy="newUser.surname"/>
                        <input class="base-input" placeholder="Prénom" v-model.trim.lazy="newUser.forename"/>
                        <input class="base-input" placeholder="Numéro de téléphone" v-model.trim.lazy="newUser.tel"/>
                        <input class="base-input" placeholder="Email" v-model.trim.lazy="newUser.email"/>
                        <div class="button-wrapper-profile">
                            <button type="submit" class=" text-size-small button button-width" @click="addUser" >Ajouter</button>
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
  name: 'profile',
  props: {
  },
  data () {
      return {
        showList: false,
        rsSociale: 'Cabinet Tartiflette',
        surname: 'Du-gouda',
        forename: 'donn-amoi',
        orlas: '45145',
        adresse:{ rue: '11 rue de la chevalerie', ville:'Paris', codePostale:'75015'},
        tel: '01 75 14 55 61',
        email:'donnamoidugouda@wanadoo.com',
        id: '685675',
        password: '*********',
        rib: 'FR76 xxxx xxxx xxxx xx56',
        isEditing: false,
        isAdding: false,

        newUser: {surname: '', forename: '', tel: '', email: '', edit: false},

        usersList: [
            {surname: 'Schmid', forename: 'robert', tel: '0175145561', email: 'rschmid@gmail.com', edit: false},
            {surname: 'Rifto', forename: 'rico', tel: '0175145561', email: 'rifto@gmail.com', edit: false},
            {surname: 'Chair', forename: 'poppins', tel: '0175145561', email: 'chair@gmail.com', edit: false},
            {surname: 'Table', forename: 'marie', tel: '0175145561', email: 'table@gmail.com', edit: false},
            {surname: 'Screen', forename: 'annie', tel: '0175145561', email: 'screen@gmail.com', edit: false}
        ]
      }
  },
  methods: {
    showUsersList () {
        this.showList = true
    },
    edit () {
        this.isEditing = true
    },
    confirm () {
        this.isEditing = false
    },
    addUser () {
        this.usersList.unshift(this.newUser)
        console.log(this.newUser)
        this.isAdding = false
    },
    submit () {
        this.isAdding = false
    },
    deleteUser (index) {
        this.usersList.splice(index,1)
    },
    editUser (index, user) {
        user.edit = true
    },
    confirmEdit (index, user) {
        user.edit = false
    },
     openWarning(index, user) {
        this.$confirm('Souhaitez-vous supprimer cet utilisateur?', {
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non'
        }).then(() => {
        this.deleteUser(index, user)
          this.$message({
            type: 'success',
            message: 'L’utilisateur a bien été supprimé',
          })
        }).catch(() => {
        });
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
.input-box {
    width: 50%;
}
.icons-wrapper {
    position: absolute;
    top: 10px;
    right: 0;
}
.button-wrapper-profile {
    width: 100%;
    text-align: right;
}
.button-width {
    width: 50%;
}
.colorYellow {
    padding: 20px 0 20px 50px;
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
    width: 14px;
    height: 14px;
    padding-right: 10px;
}
.profile-icon-add {
    width: 17px;
    height: 12px;
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
    border-bottom: 1px solid $background-global;
    padding: 20px 20px 20px 50px;
    overflow: hidden;
}
.inner-header-right {
    border-bottom: 1px solid $background-global;
}
h1 {
    padding: 15px;
}
#profile {
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
