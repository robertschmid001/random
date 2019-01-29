<template>
    <div id="profile">
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" class="left-wrapper">
                <div class="radius outer-wrapper" >
                <div class="header-border">
                    <el-row>
                        <el-col :span="14" class="md-txt align-left grey-text colorYellow"><font-awesome-icon icon="user" class="profile-icon"/>Mon Profil</el-col>
                        <el-col :span="10" class="md-txt align-right colorBlue" v-show="!isEditing"><font-awesome-icon icon="pen" class="profile-icon" /><span class="hover pointer" @click="edit">Editer mon profil</span></el-col>
                        <div v-show="isEditing">
                            <el-col :span="7" class="md-txt colorRed pointer">
                                <div class="header-valider" @click="confirm">Valider</div>
                            </el-col>
                            <el-col :span="3" class="md-txt colorRed pointer">
                                <div class="header-valider"  @click="closeEdit">
                                    <font-awesome-icon icon="times" class="icon pointer" title="retour" alt="retour"/>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </div>
                    <div class="align-left inner-body-l md-txt">
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Raison Sociale</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.cabinet.nom_courtier}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Adresse</el-col>
                            <el-col :span="15" class="padding-item grey-text">
                                <div v-show="!isEditing">{{cabinet.adresse}} <br>{{this.emptyAdd}} <br> {{cabinet.cp}} <span> </span> {{cabinet.ville}}</div>
                                <el-col :span="24" v-show="isEditing">
                                    <div class="input-icon-wrapper adresse-input"><input class="base-form-input" :placeholder="cabinet.adresse" v-model.trim.lazy="newAd1"/></div>
                                    <div class="input-icon-wrapper adresse-input"><input class="base-form-input" :placeholder="emptyAdd" v-model.trim.lazy="newAd2"/></div>
                                    <el-row>
                                        <el-col  :span="12"><div class="input-icon-wrapper adresse-input"><input class="base-form-input" :placeholder="cabinet.ville" v-model.trim.lazy="newAd3"/></div></el-col>
                                        <el-col  :span="12"><div class="input-icon-wrapper adresse-input"><input class="base-form-input" :placeholder="cabinet.cp" v-model.trim.lazy="  newAd4"/></div></el-col>
                                    </el-row>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">N° téléphone</el-col>
                            <el-col :span="15" class="padding-item grey-text" v-show="!isEditing">{{cabinet.tel}}</el-col>
                            <el-col :span="15" class="padding-item" v-show="isEditing">
                                <div class="input-icon-wrapper"><input class="base-form-input" :placeholder="cabinet.tel" v-model.trim.lazy="newTel"/></div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">E-mail</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{cabinet.email}}</el-col>
                            <!-- <el-col :span="15" class="padding-item" v-show="isEditing">
                                <div class="input-icon-wrapper">
                                    <input class="base-form-input" placeholder="email" v-model.trim.lazy="this.email"/>
                                </div>
                            </el-col> -->
                        </el-row>
                        <el-row>
                            <el-col :span="9" class="padding-item lgt-grey-text">Identifiant</el-col>
                            <el-col :span="15" class="padding-item grey-text">{{this.cabinet.num_personne_courtier}}</el-col>
                        </el-row>
                        <el-row v-show="isEditing">
                            <el-col :span="9" class="padding-item lgt-grey-text">Mot de passe</el-col>
                             <el-col :span="15" class="padding-item lgt-grey-text">
                                <div class="input-icon-wrapper" v-if="isSent === false">
                                    <button class="button font-size custom-style pointer align-center" @click="passWordInit">Pour modifier mon mot de passe, cliquez ici</button>
                                </div>
                                <div class="input-icon-wrapper" v-if="isSent  === true">
                                    <div class="button custom-style font-size align-center">L’email de modification de mot de passe a bien été envoyé</div>
                                </div>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
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
                        </el-row> -->
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" class="right-wrapper align-left" v-if="cabinet.user_type === 'root'">
                <button class="pointer buttonShow" v-if="!showList" @click="showUsersList"><div class="inner-button-wrapper sm-txt"><font-awesome-icon icon="user" class="profile-icon" /><span>Voir la liste des utilisateurs habilités</span> </div></button>
                <div v-else class="radius outer-wrapper">
                <coUsers-list :key="componentKey" :isAdding="curAdding" @conEdit="forceRerender" @edit="forceRerender" @showList="showListOff"/>
                    <!-- <div v-if="!isAdding">
                        <div class="inner-header header-border">
                            <el-row>
                                <el-col :span="2" class="md-txt align-left grey-text"><font-awesome-icon icon="times" class="close-icon pointer"  @click="close"/></el-col>
                                <el-col :span="12" class="md-txt align-left grey-text"><font-awesome-icon icon="user" class="profile-icon"/> Liste des utilisateurs habilités</el-col>
                                <el-col :span="10" class="md-txt align-right"><font-awesome-icon icon="user-plus" class="profile-icon"/><span class="hover pointer" @click="isAdding=true">Ajouter un utilisateur</span></el-col>
                            </el-row>
                        </div>
                        <div class="align-left inner-body-r md-txt">
                            <div v-for="(user, index) in upCoCourtiers" :key="user.id">
                                <div class="box-user">
                                    <div class="input-box grey-text">
                                        <span>{{user.edit}}</span> <br>
                                        <span v-if="!user.edit">{{user.user_fname}}</span> <input v-else class="base-input" placeholder="Prénom" v-model.trim.lazy="user.user_fname"/><br>
                                        <span v-if="!user.edit">{{user.user_lname}}</span> <input v-else class="base-input" placeholder="Nom" v-model.trim.lazy="user.user_lname"/><br>
                                        <span v-if="!user.edit">{{'06 01 02 03 04'}}</span>  -->
                                        <!-- <input v-show="user.edit" class="base-input" placeholder="Téléphone" v-model.trim.lazy="user.tel"/>
                                        <br>
                                        <span v-if="!user.edit">{{user.user_mail}}</span> <input  :key="user.edit" v-else class="base-input" placeholder="@mail" v-model.trim.lazy="user.user_mail"/><br>
                                    </div>
                                    <div class="icons-wrapper grey-text">
                                        <font-awesome-icon icon="pen" class="profile-icon pointer" title="modifier un utilisateur" alt="modifier un utilisateur" @click="editUser(index, user)" v-show="!user.edit"/>
                                        <font-awesome-icon icon="check" class="profile-icon pointer" title="confirmer la modification" alt="confirmer la modification" @click="confirmEdit(index, user)" v-show="user.edit"/>
                                        <font-awesome-icon icon="times" class="profile-icon pointer" title="retour" alt="retour"  @click="openWarning(index, user)"/>
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
                            <input class="base-input" placeholder="Nom" v-model.trim.lazy="coUserLn"/>
                            <input class="base-input" placeholder="Prénom" v-model.trim.lazy="newUser.forename"/>
                            <!-- <input class="base-input" placeholder="Numéro de téléphone" v-model.trim.lazy="newUser.tel"/> -->
                            <!-- <input class="base-input" placeholder="Email" v-model.trim.lazy="newUser.email"/>
                            <el-row>
                                <el-col :span="12" class="align-left">
                                    <button type="submit" class=" text-size-vsm button button-width pointer" @click="cancelAdd">Annuler</button>
                                </el-col>
                                <el-col :span="12" class="align-right">
                                    <button type="submit" class=" text-size-vsm button button-width pointer" @click="addUser">Ajouter</button>
                                </el-col>
                            </el-row>
                        </div>
                    </div> -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios"
import coUsers from "./profile-sub/coUser-list.vue"


export default {
  name: 'profile',
  props: {
  },
  components: {
      'coUsers-list': coUsers
  },
  data () {
      return {
        isSent: false,
        showList: false,
        isEditing: false,
        isAdding: false,
        passwordCheck: '',
        cabinet: this.$store.state.cabinet,
        coCourtiers: [],
        hasChanged: false,
        componentKey: 0,
        newAd1: '',
        newAd2: '',
        newAd3: '',
        newAd4: '',
        newTel: '',
        coUserFn: '',
        coUserLn: '',
        coUserMail: '',
        newUser: {surname: '', forename: '', tel: '', email: '', edit: false},

        usersList: [
        ]
      }
  },
  computed: {
    emptyAdd () {
        if (this.cabinet.adresse_suite == 0) {
            return ''
        }
    },
    curAdding () {
        var adding = this.isAdding
        return adding
    },
    upCoCourtiers () {
        var courtiers = []
        courtiers = this.coCourtiers
        return courtiers
    },
    coUsersList () {
        var data = this.coCourtiers;
        return data
    }
  },
  methods: {
    passWordInit () {
        axios.post('https://courtier.cpms.fr/lostPassword',  {
          user: this.cabinet.email
        })
        .then(response => {
          if (response.data.status) {
            this.$message({
                type: 'success',
                message: 'L’email de modification de mot de passe a bien été envoyé',
            })
            this.isSent = true
            } else {
            this.$message({
                type: 'error',
                message: 'Une erreur s\'est produite veuillez réessayer ultérieurement',
            })
            this.isSent = false
            }
          })
    },
    setData () {
        this.$store.state.fullscreenLoading = true;
        this.getInfoAccueil();
        this.getCabinetInfo();
        setTimeout(() => {
            this.cabinet = this.$store.state.cabinet
            this.filtercoCourtiers();
            this.$store.state.fullscreenLoading = false;
        }, 1000);
    },
    closeEdit () {
        this.isEditing = false
    },
    emptyAddMore () {
         if (this.cabinet.adresse_suite == 0) {
            return ''
        }
    },
    showListOff () {
        this.showList = false
    },
    updateCoCourtiers () {
        return this.coCourtiers
    },
    filtercoCourtiers () {
        var coCourtier = this.$store.state.coCourtiers
        coCourtier.forEach( e => {
            if(!e.edit) {
                e.edit = false
            }
        })
        this.coCourtiers = coCourtier
    },
    showUsersList () {
        this.showList = true
    },
    close () {
        this.showList = false
    },
    edit () {
        this.isEditing = true
        this.newAd1 = this.cabinet.adresse
        this.newAd2 = this.emptyAddMore();
        this.newAd3 = this.cabinet.ville
        this.newAd4 = this.cabinet.cp
        this.newTel = this.cabinet.tel
    },
    confirm () {
        axios.post('https://courtier.cpms.fr/modifCourtier',{
            adresse: this.newAd1,
            adresse_suite: this.newAd2,
            cp: this.newAd3,
            tel: this.newTel,
            ville: this.newAd4
        })
        .then(response => {
            // console.log(response, 'response')
            if (response.data.status) {
                this.cabinet.adresse = this.newAd1
                this.cabinet.adresse_suite = this.newAd2
                this.cabinet.cp = this.newAd3
                this.cabinet.tel = this.newTel
                this.cabinet.ville = this.newAd4
            this.$message({
                type: 'success',
                message: 'Vos modifications ont été prises en compte et seront traitées dans les plus brefs délais.',
            })
            } else {
            this.$message({
                type: 'error',
                message: 'Vos modifications n\'ont pas été prise en compte.',
            })
            }
            this.isEditing = false
            }).catch( error => {
                console.log(error)
                this.newAd1= '',
                this.newAd2= '',
                this.newAd3= '',
                this.newAd4= '',
                this.isEditing = false
                this.$message({
                    type: 'error',
                    message: 'Vos modifications n\'ont pas été prise en compte.',
                })
            })
    },
    addUser () {
        this.isAdding = false

        axios.post('https://courtier.cpms.fr/modifCourtier',{
            mailCourtier: this.coUserMail,
            nomCourtier: this.coUserLn,
            prenomCourtier: this.coUserFn
        })
          .then(response => {
              console.log(response, 'response')
              if (response.data.status) {
                this.$message({
                    type: 'success',
                    message: 'Vos modifications ont été prises en compte et seront traitées dans les plus brefs délais.',
                })

              } else {
                if (response.data.errorMesage === 'User exist') {
                    this.$message({
                        type: 'error',
                        message: 'Cet utilisateur exist déjà.',
                    })
                    }  else {
                        this.$message({
                            type: 'error',
                            message: 'Vos modifications n\'ont pas été prise en compte.',
                        })
                }
                this.isEditing = false
              }
        })
    },
    submit () {
        this.isAdding = false
    },
    deleteUser (index, user) {

        axios.get('https://courtier.cpms.fr/deleteCoUser/'+ `${user.id}`
        ).then(response => {
              console.log(response, 'response')
              if ( response.data.status) {
                this.$message({
                    type: 'success',
                    message: 'Vos modifications ont été prises en compte et seront traitées dans les plus brefs délais.',
                })
              } else {
                this.isEditing = false
              }
          })
    },
    forceRerender () {
        this.filtercoCourtiers();
        this.componentKey += 1;
    },
    editUser (index) {
        this.coCourtiers.forEach((e, i) => {

            if (i == index) {
                console.log(this.coCourtiers[i].edit,'before')
                this.coCourtiers[i].edit = !this.coCourtiers[i].edit;
                this.updateCoCourtiers();
                this.hasChanged = !this.hasChanged
                console.log(this.coCourtiers[i].edit,'after')
                // Vue.set(this.coCourtiers[index],this.coCourtiers[index].edit, true)
                this.forceRerender();
            }
        });
    },
    confirmEdit (index) {
        // this.user.edit = false
        this.coCourtiers[index].edit = false
        this.forceRerender();
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
        }).catch(() => {
        });
      }
  },
  mounted () {
      this.filtercoCourtiers();
  },
  created () {
    if (this.$store.state.cabinet.length === 0) return this.setData();
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
.custom-style {
    display: flex;
    align-items: center;
}
.font-size {
    font-size: 12px;
}
.icon {
    padding-right: 10px;
}
.header-valider {
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
    height: 55px;
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
    justify-content: center;
    height: 55px;
    display: flex;
    align-content: center;
    align-items: center;
    color: white;
}
.colorRed:hover {
    background-color: white;
    color: $button-color;
}
.left-wrapper {
    padding: 15px;
    max-width: 550px;
}
.right-wrapper {
    padding: 15px 15px 50px 15px;
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
    padding: 20px 30px 0 20px;
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
.close-icon {
    font-size: 20px;
    position: absolute;
    top: -3px;
    left: -33px;
}

</style>
