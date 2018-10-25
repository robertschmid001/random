<template>
    <div id="profile">
        <el-row>
            <el-col :span="12" :xs="24" class="left-wrapper">
                <div class="radius outer-wrapper" >
                <div class="header-border">
                    <el-row>
                        <el-col :span="14" class="md-txt align-left grey-text colorYellow"><font-awesome-icon icon="user" class="profile-icon"/>Mon Profil</el-col>
                        <el-col :span="10" class="md-txt align-right colorBlue" v-show="!isEditing"><font-awesome-icon icon="pen" class="profile-icon" /><span class="hover pointer" @click="edit">Editer mon profil</span></el-col>
                        <div v-show="isEditing" @click="confirm"><el-col :span="10" class="md-txt colorRed pointer"><div class="header-valider">Valider</div></el-col></div>
                    </el-row>
                </div>
                    <div class="align-left inner-body-l md-txt">
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Raison Sociale</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.rsSociale}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Nom</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.surname}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Prénom</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.forename}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° Orlas</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.orlas}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Adresse</el-col>
                            <el-col :span="15" class="padding-item grey-text">
                                <div v-show="!isEditing">{{this.adresse.rue}} <br> {{this.adresse.codePostale}} <span> </span> {{this.adresse.ville}}</div>
                                <el-col :span="24" v-show="isEditing">
                                    <div class="input-icon-wrapper adresse-input"><input class="base-form-input" placeholder="Rue" v-model.trim.lazy="this.adresse.rue"/></div>
                                    <el-row>
                                        <el-col  :span="12"><div class="input-icon-wrapper adresse-input"><input class="base-form-input" placeholder="Ville" v-model.trim.lazy="this.adresse.ville"/></div></el-col>
                                        <el-col  :span="12"><div class="input-icon-wrapper adresse-input"><input class="base-form-input" placeholder="Code postale" v-model.trim.lazy="this.adresse.codePostale"/></div></el-col>
                                    </el-row>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° téléphone</el-col>
                            <el-col :span="15" class="padding-item grey-text" v-show="!isEditing">{{this.tel}}</el-col>
                            <el-col :span="15" class="padding-item" v-show="isEditing">
                                <div class="input-icon-wrapper"><input class="base-form-input" placeholder="N° téléphone" v-model.trim.lazy="this.tel"/></div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">E-mail</el-col>
                            <el-col :span="15" class="padding-item grey-text" v-show="!isEditing">{{this.email}}</el-col>
                            <el-col :span="15" class="padding-item" v-show="isEditing">
                                <div class="input-icon-wrapper">
                                    <input class="base-form-input" placeholder="email" v-model.trim.lazy="this.email"/>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Identifiant</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.id}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Mot de passe</el-col>
                            <el-col :span="15" class="padding-item grey-text" v-show="!isEditing">{{this.password}}</el-col>
                            <el-col :span="15" class="padding-item" v-show="isEditing">
                                <div class="input-icon-wrapper">
                                    <input class="base-form-input" placeholder="password" v-model.trim.lazy="this.password"/>
                                </div>
                                <div class="input-icon-wrapper">
                                    <input class="base-form-input" placeholder="password" v-model.trim.lazy="this.passwordCheck"/>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">RIB</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.rib}}</el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" :xs="24" class="right-wrapper align-left">
                <button class="pointer buttonShow" v-if="!showList" @click="showUsersList"><div class="inner-button-wrapper sm-txt"><font-awesome-icon icon="user" class="profile-icon" /><span>Voir la liste des utilisateurs habilités</span> </div></button>
                <div v-else class="radius outer-wrapper">
                    <div v-if="!isAdding">
                        <div class="inner-header header-border">
                            <el-row>
                                <el-col :span="12" class="md-txt align-left grey-text"><font-awesome-icon icon="user" class="profile-icon"/> Liste des utilisateurs habilités</el-col>
                                <el-col :span="12" class="md-txt align-right"><font-awesome-icon icon="user-plus" class="profile-icon"/><span class="hover pointer" @click="isAdding=true">Ajouter un utilisateur</span></el-col>
                            </el-row>
                        </div>
                        <div class="align-left inner-body-r md-txt">
                            <div v-for="(user, index) in this.usersList" :key="index">
                                <div class="box-user">
                                    <div class="input-box grey-text">
                                        <span v-show="!user.edit">{{user.surname}}</span> <input class="base-input" placeholder="user.surname" v-model.trim.lazy="user.surname" v-show="user.edit"/><br>
                                        <span v-show="!user.edit">{{user.forename}}</span> <input class="base-input" placeholder="user.forename" v-model.trim.lazy="user.forename" v-show="user.edit"/><br>
                                        <span v-show="!user.edit">{{user.tel}}</span> <input class="base-input" placeholder="user.tel" v-model.trim.lazy="user.tel" v-show="user.edit"/><br>
                                        <span v-show="!user.edit">{{user.email}}</span> <input class="base-input" placeholder="user.email" v-model.trim.lazy="user.email" v-show="user.edit"/><br>
                                    </div>
                                    <div class="icons-wrapper grey-text">
                                        <font-awesome-icon icon="pen" class="profile-icon pointer" alt="" @click="editUser(index, user)" v-show="!user.edit"/>
                                        <font-awesome-icon icon="check" class="profile-icon pointer" alt="" @click="confirmEdit(index, user)" v-show="user.edit"/>
                                        <font-awesome-icon icon="times" class="profile-icon pointer" alt=""  @click="openWarning(index, user)"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="inner-header header-border">
                            <el-row>
                                <el-col :span="12" class="sm-txt align-left"><font-awesome-icon icon="user" class="profile-icon"/> Liste des utilisateurs habilités</el-col>
                                <el-col :span="12" class="md-txt align-right"></el-col>
                            </el-row>
                        </div>
                        <div class="align-left inner-body-r md-txt">
                            <input class="base-input" placeholder="Nom" v-model.trim.lazy="newUser.surname"/>
                            <input class="base-input" placeholder="Prénom" v-model.trim.lazy="newUser.forename"/>
                            <input class="base-input" placeholder="Numéro de téléphone" v-model.trim.lazy="newUser.tel"/>
                            <input class="base-input" placeholder="Email" v-model.trim.lazy="newUser.email"/>
                            <el-row>
                                <el-col :span="12" class="align-left">
                                    <button type="submit" class=" text-size-vsm button button-width pointer" @click="cancelAdd">Annuler</button>
                                </el-col>
                                <el-col :span="12" class="align-right">
                                    <button type="submit" class=" text-size-vsm button button-width pointer" @click="addUser">Ajouter</button>
                                </el-col>
                            </el-row>
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
        password: '',
        rib: 'FR76 xxxx xxxx xxxx xx56',
        isEditing: false,
        isAdding: false,
        passwordCheck: '',

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
        console.log('click edit',this.isEditing)
    },
    confirm () {
        this.isEditing = false
        console.log('click confirm',this.isEditing)
    },
    addUser () {
        this.usersList.unshift(this.newUser)
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
    cancelAdd () {
        this.isAdding = false
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
