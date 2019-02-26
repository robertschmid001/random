<template>
  <div id="coUser-list">
    <div v-if="!isAdding">
        <div class="inner-header header-border">
            <el-row>
                <el-col :span="2" class="md-txt align-left grey-text"><font-awesome-icon icon="times" class="close-icon pointer"  @click="close"/></el-col>
                <el-col :span="12" class="md-txt align-left grey-text"><font-awesome-icon icon="user" class="profile-icon"/> Liste des utilisateurs habilités</el-col>
                <el-col :span="10" class="md-txt align-right"><font-awesome-icon icon="user-plus" class="profile-icon"/><span class="hover pointer" @click="isAdding=true">Ajouter un utilisateur</span></el-col>
            </el-row>
        </div>
        <div class="align-left inner-body-r md-txt">
            <div v-for="(user, index) in upCoCourtiers" :key="index">
                <div class="box-user">
                    <div class="input-box grey-text">
                        <span v-if="!user.edit">{{user.user_fname}}</span> <input v-else class="base-input" :placeholder="user.user_fname" v-model.trim.lazy="modifUser.forename"/><br>
                        <span v-if="!user.edit">{{user.user_lname}}</span> <input v-else class="base-input" :placeholder="user.user_lname" v-model.trim.lazy="modifUser.surname"/><br>
                        <span v-if="!user.edit">{{telFormat(user.tel)}}</span> 
                        <br>
                        <span>{{user.user_mail}}</span>
                        <br>
                    </div>
                    <div class="icons-wrapper grey-text">
                        <font-awesome-icon icon="times" class="profile-icon pointer" title="retour" alt="retour"  @click="openWarning(index, user)" v-show="!user.edit"/>
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
                    <button type="submit" class=" text-size-vsm button button-width pointer" @click="validateAddUser">Ajouter</button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="padding-item lgt-grey-text">
                    <div v-if="this.validate.nom" class="validate"> {{this.validate.nom}}</div>
                    <div v-if="this.validate.prenom" class="validate"> {{this.validate.prenom}}</div>
                    <div v-if="this.validate.email" class="validate"> {{this.validate.email}}</div>
                    <div v-if="this.validate.tel" class="validate"> {{this.validate.tel}}</div>
                    <div v-if="this.validate.back" class="validate"> {{errorMesage}}</div>
                </el-col>
            </el-row>
        </div>
    </div>

  </div>
</template>

<script>

import axios from "axios"
import { required, maxLength, email, numeric} from "vuelidate/lib/validators";

export default {
  name: 'coUsers',
  props: ['coUsersList', 'isAdding', 'key'],
  data() {
    return {
        keys : this.key,
        validate: {
            nom: '',
            prenom: '',
            email: '',
            back: '',
            tel: ''
        },
        // showList: false,
        // isEditing: false,
        isAdding: false,
        // passwordCheck: '',
        coCourtiers: [],
        // hasChanged: false,
        // newAd1: '',
        // newAd2: '',
        // newAd3: '',
        // newAd4: '',
        // newTel: '',
        // coUserFn: '',
        // coUserLn: '',
        // coUserMail: '',
        modifUser: {surname: '', forename: '', tel: '', email: '', edit: false},
        newUser: {surname: '', forename: '', tel: '', email: ''},

        // usersList: [
        // ]
    };
  },
  computed: {
    upCoCourtiers () {
        var courtiers = []
        courtiers = this.coCourtiers
        return courtiers
    },
    errorMesage () {
        if (this.validate.back === 'Invalid Mail') return 'Veuillez saisir un email valide.'
        if (this.validate.back === 'User exist') return 'Cet email existe déjà.'
        return this.validate.back
    }
  },
  methods: {
    telFormat (user) {
        if (!user) {
            return 'Merci de renseigner un numéro de téléphone.'
        } return user
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
    close () {
        this.validate.nom = '';
        this.validate.prenom = '';
        this.validate.email = '';
        this.validate.back = '';
        this.validate.tel = '';
        this.$emit('showList')
    },
    validateAddUser () {
        this.validate.nom = '';
        this.validate.prenom = '';
        this.validate.email = '';
        this.validate.back = '';
        this.validate.tel = '';
    
        var reg = new RegExp('^[0-9]+$');
        var checkTel = reg.test(this.newUser.tel);

        if ( !this.newUser.tel || this.newUser.tel.length != 10 || !checkTel ) return this.validate.tel = 'Veuillez saisir un numéro de téléphone.'
        if ( !this.newUser.email ) return this.validate.email = 'Veuillez saisir un email.'
        if ( !this.newUser.surname ) return this.validate.nom = 'Veuillez saisir un nom.'
        if ( !this.newUser.forename ) return this.validate.prenom = 'Veuillez saisir un prénom.'
        if ( this.validate.nom == '' && this.validate.prenom == '' && this.validate.email  == '' && this.validate.tel  == '' ) this.addUser();
    },
    addUser () {
            axios.post('https://courtier.cpms.fr/createCoUser',{
            mailCourtier: this.newUser.email,
            nomCourtier: this.newUser.surname,
            prenomCourtier: this.newUser.forename,
            telCourtier: this.newUser.tel
        })
        .then(response => {
            if ( response.data.status.status === true) {
                this.isAdding = false
                this.$message({
                    type: 'success',
                    message: 'Vos modifications ont été prises en compte et seront traitées dans les plus brefs délais.',
                })
                this.$emit('edit')
            } else {
                this.validate.back = response.data.status.errorMesage;
                this.$message({
                    type: 'error',
                    message: 'Vos modifications n\'ont pas été prise en compte.',
                })
            }
        })
    },
    submit () {
        this.isAdding = false
    },
    deleteUser (index, user) {
        axios.post('https://courtier.cpms.fr/deleteCoUser/'+ `${user.id}`
        ).then(response => {
              if ( response.data.status == true) {
                this.$message({
                    type: 'success',
                    message: 'Vos modifications ont été prises en compte et seront traitées dans les plus brefs délais.',
                })
                this.$store.state.coCourtiers[index].edit = false
                // this.$store.state.coCourtiers.splice(this.$store.state.coCourtiers[index], 1)
              } else {
                this.$message({
                    type: 'error',
                    message: 'Vos modifications n\'ont pas été prise en compte par le serveur',
                })
                this.$store.state.coCourtiers[index].edit = false
                this.$emit('edit')
              }
          })
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
    },
    mounted () {
        this.filtercoCourtiers();
    }

}
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";
.validate {
    color: #ff4c4c;
    font-size: 10px;
    justify-content: center;
    display: flex;
    font-size: 10px;
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