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
                            <div v-for="(user, index) in upCoCourtiers" :key="user.id">
                                <div class="box-user">
                                    <div class="input-box grey-text">
                                        <span v-if="!user.edit">{{user.user_fname}}</span> <input v-else class="base-input" :placeholder="user.user_fname" v-model.trim.lazy="modifUser.forename"/><br>
                                        <span v-if="!user.edit">{{user.user_lname}}</span> <input v-else class="base-input" :placeholder="user.user_lname" v-model.trim.lazy="modifUser.surname"/><br>
                                        <span v-if="!user.edit">{{'06 01 02 03 04'}}</span> 
                                        <!-- <input v-show="user.edit" class="base-input" placeholder="Téléphone" v-model.trim.lazy="user.tel"/> -->
                                        <br>
                                        <span>{{user.user_mail}}</span>
                                        <!-- <input  :key="user.edit" v-else class="base-input" :placeholder="user.user_mail" v-model.trim.lazy="modifUser.email"/> -->
                                        <br>
                                    </div>
                                    <div class="icons-wrapper grey-text">
                                        <!-- <font-awesome-icon icon="pen" class="profile-icon pointer" title="modifier un utilisateur" alt="modifier un utilisateur" @click="editUser(index, user)" v-show="!user.edit"/>
                                        <font-awesome-icon icon="check" class="profile-icon pointer" title="confirmer la modification" alt="confirmer la modification" @click="confirmEdit(index, user)" v-show="user.edit"/> -->
                                        <!-- <font-awesome-icon icon="times" class="profile-icon pointer" title="retour" alt="retour"  @click="editUser(index, user)" v-show="user.edit"/> -->
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
                            <!-- <input class="base-input" placeholder="Numéro de téléphone" v-model.trim.lazy="newUser.tel"/> -->
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
</template>

<script>

import axios from "axios"

export default {
  name: 'coUsers',
  props: ['coUsersList', 'isAdding', 'key'],
  data() {
    return {
        keys : this.key,

        showList: false,
        isEditing: false,
        isAdding: false,
        passwordCheck: '',
        coCourtiers: [],
        hasChanged: false,
        newAd1: '',
        newAd2: '',
        newAd3: '',
        newAd4: '',
        newTel: '',
        coUserFn: '',
        coUserLn: '',
        coUserMail: '',
        modifUser: {surname: '', forename: '', tel: '', email: '', edit: false},
        newUser: {surname: '', forename: '', tel: '', email: ''},

        usersList: [
        ]
    };
  },
  props: {
  },
  computed: {
    upCoCourtiers () {
        var courtiers = []
        courtiers = this.coCourtiers
        return courtiers
    },
  },
  methods: {
    closeEdit () {

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
        this.$emit('showList')
    },
    // edit () {
    //     this.isEditing = true
    //     console.log('click edit',this.isEditing)
    // },
    // confirm () {
    //     axios.post('https://courtier.cpms.fr/modifCourtier',{
    //         adresse: this.newAd1,
    //         adresse_suite: this.newAd2,
    //         cp: this.newAd3,
    //         tel: this.newTel,
    //         ville: this.newAd4
    //     })
    //       .then(response => {
    //           console.log(response, 'response')
    //           if ( response.data.status) {
    //             this.isEditing = false
    //             this.$message({
    //                 type: 'success',
    //                 message: 'Vos modifications ont bien été prise en compte.',
    //             })
    //           } else {
    //             this.$message({
    //                 type: 'error',
    //                 message: 'Vos modifications n\'ont pas été prise en compte.',
    //             })
    //             this.isEditing = false
    //           }
    //       })
    // },
    addUser () {
        // this.usersList.unshift(this.newUser)

        this.isAdding = false
            axios.post('https://courtier.cpms.fr/createCoUser',{
            mailCourtier: this.newUser.email,
            nomCourtier: this.newUser.surname,
            prenomCourtier: this.newUser.forename
        })
          .then(response => {
            //   console.log(response, 'response')
              if ( response.data.status) {
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
          })

    },
    submit () {
        this.isAdding = false
    },
    deleteUser (index, user) {
        axios.post('https://courtier.cpms.fr/deleteCoUser/'+ `${user.id}`
        ).then(response => {
              console.log(response, 'response')
              if ( response.data.status == true) {
                this.$message({
                    type: 'success',
                    message: 'Vos modifications ont été prises en compte et seront traitées dans les plus brefs délais.',
                })
                this.$store.state.coCourtiers[index].edit = false
                this.$store.state.coCourtiers.splice(this.$store.state.coCourtiers[index], 1)
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
    // editUser (index, element) {
    //     console.log('clickkityty')
    //     this.$store.state.coCourtiers.forEach((e, i) => {
    //         if (i == index) {
    //             this.$store.state.coCourtiers[i].edit = !this.$store.state.coCourtiers[i].edit;
    //             this.$emit('edit')
    //         }
    //     });
    // },
    // confirmEdit (index, user) {
    //     var that = this;
    //     axios.post('https://courtier.cpms.fr/modifCourtier/', {
    //         mailCourtier: that.$store.state.coCourtiers[i].user_mail,
    //         nomCourtier: that.modifUser.surname,
    //         prenomCourtier: that.modifUser.forename
    //     }
    //     ).then(response => {
    //         console.log(response, 'response')
    //         if ( response.data.status == true) {
    //             that.$store.state.coCourtiers[index].user_lname = that.modifUser.surname
    //             that.$store.state.coCourtiers[index].user_fname = that.modifUser.forename
                
    //             that.$message({
    //                 type: 'success',
    //                 message: 'L\'utilisateur a bien été rajouté à la liste',
    //             })
    //             that.$store.state.coCourtiers[index].edit = false
    //             that.$emit('conEdit')
    //         } else {
    //             that.$message({
    //                 type: 'error',
    //                 message: 'Vos modifications n\'ont pas été prise en compte.',
    //             })
    //             that.$store.state.coCourtiers[index].edit = false
    //             that.$emit('conEdit')
    //         }
    //     })
        
    // },
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
        // console.log('inside comp')
        // this.coCourtier = this.$store.state.coCourtiers
        // console.log(this.coUsersList, 'coUsersList')
        this.filtercoCourtiers();
    }

}
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";
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