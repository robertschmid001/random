<template>
  <div id="create">
    <div class="login-container  align-center">
    <img src="../../assets/cpms_logo_trans.png" alt="">
      <div class="outer-wrapper">
        <el-row v-loading.fullscreen.lock="isLoading">
          <div class="inner-wrapper">
            <form v-on:submit.prevent="submit" autocomplete="on">
              <el-row>
                <el-col :span="24" class="pword-error-wrapper">
                  <div class="input-icon-wrapper">
                    <input class="base-input" placeholder="Saisir votre mot de passe" type="password" v-model.trim.lazy="password" autocapitalize="off" v-on:keyup.enter="submit" autocomplete="on"/><i class="el-icon-warning" v-if="errorMessage" ></i>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="input-icon-wrapper">
                    <input class="base-input" placeholder="Ressaisir votre mot de passe" type="password" v-model.trim.lazy="passwordVerify" autocapitalize="off" v-on:keyup.enter="submit" autocomplete="on"/><i class="el-icon-warning"  v-if="errorMessage"></i>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <button type="button" class="size text-size-small button" @click="submit">Validé</button>
                <el-col :span="24">
                  <el-col :span="24">
                      <button type="button" class="size text-size-small button" @click="close">Retour</button>
                  </el-col>
                </el-col>
              </el-row>
            </form>
          </div>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24"><span class="text-size-small pointer" >Vous n'avez pas encore de compte ? <span class="text-decoration">Contactez-nous</span></span></el-col>
        <el-col :span="24"><span class="text-size-small pointer" v-if="errorMessage"> {{this.errorMessage}} </span></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "create",
  data() {
    return {
      password: "",
      passwordVerify: "",
      errorMessage: "",
      isLoading: false
    };
  },
  components: {

  },
  methods: {
    close() {
      this.$router.push({name: 'Login'})
    },
    createPassword: function() {
      this.errorMessage = "";
      this.isLoading = true;
      axios.post('https://courtier.cpms.fr/createPassword', {
        passOne: this.password,
        passTwo: this.passwordVerify,
        hash: this.$route.params.hash
      })
      .then(response => {
        if (response.data.status) {
          // console.log(response.data.status, "createPassword Status")
          this.getCabinets();
          this.getAssure();
          this.getCotisation();
          this.getInfoAccueil();
          this.getTranslation();
          this.getAppel();
          this.getDocs();
          this.getCourtierDocs();
          this.waitLoad();
        } else {
          this.isLoading = false
          this.errorMessage = "La connexion n'a pas pu être établie, veuillez réssayer."
        }
      })
    },
    waitLoad () {
      setTimeout(() => {
        axios.post('https://courtier.cpms.fr/isLoged')
          .then(response => {
            //   console.log(response, 'response islogged')
            if (!response.data.status) {
              this.isLoading = false
              this.$router.push({ name: 'Login'})
            } else {
              this.isLoading = false
              this.$store.state.authenticated = true
              this.$router.push({ name: 'Accueil'})
            }
          })

      }, 3000)
    },
    submit() {
      this.errorMessage = "";
      if (this.password.trim() === this.passwordVerify.trim()) {
        this.createPassword()
      } else {
        this.errorMessage = "Les mots de passe saisis ne sont pas identiques"
        return this.errorMessage
      }
    },
    checkHash() {
      if (this.$route.params.hash) {
        axios.post('https://courtier.cpms.fr/checkHash', {
          hash: this.$route.params.hash,
        })
        .then(response => {
          if (!response.data.status) {
            this.$router.replace({ name: "Login" });
          }
        })
      }
    },
      getCabinets: function() {
      axios.post('https://courtier.cpms.fr/getCourtier')
      .then(response => {
        this.$store.state.holdings = response.data.holding
        this.$store.state.cabinet = response.data.cabinet
      })
    },
    getCotisation: function() {
      axios.post('https://courtier.cpms.fr/getCotisation')
      .then(response => {
        this.$store.state.cotisations = response.data
      })
    },
    getAssure: function() {
      axios.post('https://courtier.cpms.fr/getAssure')
      .then(response => {
        this.$store.state.assure = response.data

      })
    },
    getCourtierDocs: function() {
      axios.post('https://courtier.cpms.fr/getCourtierDocs')
      .then(response => {
        this.$store.state.docs = response.data

      })
    },
    getInfoAccueil: function() {
      axios.post('https://courtier.cpms.fr/getMainInfo')
      .then(response => {
        this.$store.state.Main = response.data
      })
    },
    getTranslation: function() {
      axios.post('https://courtier.cpms.fr/getTranslation')
      .then(response => {
        this.$store.state.translation = response.data
      })
    },
    getAppel: function() {
      axios.post('https://courtier.cpms.fr/getAppel')
      .then(response => {
        this.$store.state.appel = response.data
      })
    },
    getDocs: function() {
      axios.post('https://courtier.cpms.fr/getDocs')
      .then(response => {
        this.$store.state.tableDocs = response.data
      })
    },
  },
  created () {
    this.checkHash();
  },
  mounted () {
    this.store.state.authenticated = false
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/global-modal-css.scss';
.el-row /deep/ .el-col {
  float: none!important;
}
img {
  height: 40px;
}
.text-decoration {
  text-decoration: underline;
}
.pword-wrapper {
  padding-top: 7px;
  text-align: left;
}
.outer-wrapper {
  background-color: white;
  border: 1px solid lightgrey;
  padding: 20px;
  box-shadow: 0px 0px 27px -8px;
  border-radius: 7px;
  margin: 10px;
}
.inner-wrapper {
  width: auto;
  height: 100%;
}
#create {
  display: flex;
  background-color: $background-global;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
}
.width {
  width: 100%;
}
</style>