<template>
  <div id="login">
    <div class="login-container  align-center">
    <img src="../assets/cpms_logo_trans.png" alt="">
      <div class="outer-wrapper">
        <el-row v-loading.fullscreen.lock="isLoading">
          <div class="inner-wrapper">
            <form v-on:submit.prevent="submit" autocomplete="on">
              <el-row>
                <el-col :span="24" class="pword-error-wrapper">
                  <div class="input-icon-wrapper">
                    <input class="base-input" placeholder="email ou numéro de courtier" v-model.trim.lazy="id" autocapitalize="off" v-on:keyup.enter="submit"/><i class="el-icon-warning" v-if="$v.id.$error" ></i>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="input-icon-wrapper">
                    <input class="base-input" placeholder="Mot de passe" type="password" v-model.trim.lazy="$v.password.$model" autocapitalize="off" v-on:keyup.enter="submit"/><i class="el-icon-warning" v-if="$v.password.$error"></i>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="pword-wrapper">
                  <span class="text-size pointer text-decoration width" @click="showModalLostPassword">Mot de passe oublié</span>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                      <button type="button" class="size text-size-small button pointer" @click="submit" >Se connecter</button>
                  </el-col>
                </el-col>
              </el-row>
            </form>
            <div class="error" v-if="$v.id.$error"> Vous avez saisi un identifiant ou un mot de passe incorrect.</div>
            <div class="error" v-if="$v.id.customValidate.$error"> Merci de saisir une adresse email ou un n° de courtier </div>
            <div class="error" v-if="$v.password.$error">Merci de saisir votre mot de passe </div>
            <div class="error" v-if="errorMessage">{{setError}}</div>
          </div>
        </el-row>
      </div>
      <el-row>
        <div  class="bottom-wrapper">
        <el-col :span="12"><div class="text-size pointer bot-cont" @click="showModalCreate">Vous n'avez pas encore de compte ? <div class="text-decoration">Contactez-nous</div></div></el-col>
        <el-col :span="12" class="bottom-wrap"><button type="button" class="size text-size-small style bouton pointer" @click="showModalInitPassword" >Première connexion</button></el-col>
        </div>
      </el-row>
    </div>
    <transition name="slide-fade"><router-view></router-view></transition>
  </div>
</template>

<script>
import { required, maxLength, email, or} from "vuelidate/lib/validators";
import modalSignup from "./modals/modal-signup.vue";
import modalPassword from "./modals/modal-password.vue";
import axios from "axios"

export default {
  name: "login",
  data() {
    return {
      id: "",
      password: "",
      isModalVisible: false,
      isModalVisibleP: false,
      submitStatus: "",
      isLoading: false,
      errorMessage: ""
    };
  },
  computed: {
    setError () {
      var error = this.errorMessage
      if (error === "Wrong Password or Mail - " ) {
        return "Vous avez saisi un identifiant ou un mot de passe incorrect."
      }
      if (error === "Wrong Password or Mail" ) {
        return "Vous avez saisi un identifiant ou un mot de passe incorrect."
      }
      if (error === 'Courtier not found' ) {
        return 'Votre adresse email ou n° de courtier n’est pas reconnu. Pour tout reseignement, contactez-nous sur dcommerciale@cpms.fr' 
      }
      else return error
    }
  },
  components: {
    "modal-signup": modalSignup,
    "modal-password": modalPassword
  },
  validations: {
    id: {
      required,
      customValidate: or(email, maxLength(11)),
    },
    password: {
      required
    }
  },
  methods: {
    showModalCreate() {
      this.$router.push({name: 'signup'})
    },
    showModalLostPassword() {
      this.$router.push({name: 'mdp'})
    },
    showModalCreatePassword() {
      this.$router.push({name: 'createPassword'})
    },
    showModalInitPassword () {
      this.$router.push({name: 'initialisation'})
    },
    login () {
      this.errorMessage = "";
      this.isLoading = true
      axios.post('https://courtier.cpms.fr/login', {
        user: this.id,
        password: this.password
      })
      .then(response => {
        // console.log(response, 'response')
        if (response.data.status === true) {
          axios.post('https://courtier.cpms.fr/isLoged')
          .then(response => {
            if (response.data.status) {
              this.getInfoAccueil();
              this.getCabinets();
              this.getAssure();
              this.getCotisation();
              this.getTranslation();
              this.getAppel();
              this.getDocs();
              this.getCourtierDocs();
              // this.formatAssure();
              this.waitLoad();
            }
            else {
              // console.log('inside else')
              this.isLoading = false
              this.errorMessage = "La connexion n'a pas pu être établie, veuillez réessayer."
              }
          })
        }
        else {
          // console.log('inside Error')
          this.isLoading = false
          this.errorMessage = response.data.errorMesage
        }
      })
    },
    waitLoad(){
      setTimeout(() => {
        this.isLoading = false
        this.$router.push('/accueil');
        this.$store.state.authenticated = true;
      }, 6000)
    },
    submit() {
      this.isLoading = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isLoading = false
        return
      } else {
        this.login();
      }
    },
    // formatAssure () {
    //   var assFilter = this.$store.state.assure
    //   this.$store.state.holdings.forEach(e => {
    //     e.entreprises.forEach(f => {
    //       if (f.contracts !== false) { 
    //         f.contracts.forEach( g => {
    //           _.find(assFilter, function(ass){
    //             console.log('Not yet')
    //             if (ass.nh === e.nuH && ass.ne === f.nuC && ass.nc === g.n) {
    //               console.log('Accepted')
    //               ass.l1 = g.l1
    //               ass.l2 = g.l2
    //             }
    //           })
    //         })
    //       }
    //     })
    //   })
    //   consolelog(assFilter, 'assFilter')
    //   this.$store.state.assure = assFilter
    // },






    getCabinets: function() {
      axios.post('https://courtier.cpms.fr/getCourtier')
      .then(response => {
        this.$store.state.holdings = response.data.holding
        this.$store.state.cabinet = response.data.cabinet
        this.$store.state.coCourtiers = response.data.coCourtiers
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
  mounted () {
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/_global.scss';
.bouton {
  border-radius: 7px;
  border: none;
  // border: 1px solid $button-color;
  background-color: white;
  color: $button-color;
}
.bot-cont {
}
.bottom-wrapper {
  box-sizing: border-box;
}
.bottom-wrap {
  box-sizing: border-box;
  padding-right: 21px;
}
.text-size {
  font-size: 11px;
  box-sizing: border-box;
}
img {
  height: 40px;
}
.text-decoration {
  text-decoration: underline;
}
.pword-wrapper {
  text-align: left;
}
.outer-wrapper {
  background-color: white;
  border: 1px solid lightgrey;
  padding: 20px;
  box-shadow: 0px 0px 27px -8px;
  border-radius: 7px;
  margin: 10px 0;
}
.inner-wrapper {
  width: auto;
  height: 100%;
}
#login {
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
