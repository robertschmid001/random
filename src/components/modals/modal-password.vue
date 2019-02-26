<template>
  <div class="modal-backdrop">

      <img src="../../assets/cpms_logo_trans.png" alt="">
      <div class="modal">
        <section class="modal-body modal-box" v-if="!status">
          <el-row class="height-input">
            <el-col :span="24">
              <div class="input-icon-wrapper">
                <input class="base-input" placeholder="Saisissez votre adresse email ou numéro courtier" type="email" v-model.trim.lazy="email" autocapitalize="off" autocomplete="on"/><i class="el-icon-warning" v-if="$v.email.$error"></i>
                <i class="el-icon-loading" v-if='isLoading'></i>
              </div>
            </el-col>
          </el-row>
          <el-row class="submit-mdp-wrapper">
              <el-col :span="12" class="se-conn-wrapper">
                <span class="size text-size-small pointer text-decoration" @click="close">Retour</span>
              </el-col>
              <el-col :span="12">
                <button class="size text-size-small button" @click="modifyPassword">Recevoir un email</button>
              </el-col>
          </el-row>
          <div class="pwordInit">{{errorText}}</div>
          <!-- <div class="error" v-if="$v.email.$error">Merci de renseigner un format de mail valide</div> -->
        </section>
        <section class="modal-body modal-box" v-else>
          <el-row class="height-input">
            <el-col :span="24">
              <div class="pwordInit">L’email de demande de mot de passe a bien été envoyé</div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" class="submit-mdp-wrapper">
              <el-col :span="12">
                <button class="size text-size-small button" @click="close">Se connecter</button>
              </el-col>
          </el-row>
        </section>
      </div>
  </div>
</template>

<script>
import '../../styles/global-modal-css.scss';
import { required, email } from "vuelidate/lib/validators";
import axios from "axios"

  export default {
    name: 'modal-password',
    data() {
      return {
        email: "",
        init: false,
        errorMessage: "",
        isLoading: false,
        status: false,
      }
    },
    mounted () {
      this.$store.state.authenticated = false
    },
    computed: {
      errorText () {
        var error = this.errorMessage
        if(error === 'Courtier not found') {
          return 'Votre adresse email ou n° de courtier n’est pas reconnu. Pour tout reseignement, contactez-nous sur dcommerciale@cpms.fr'
        } else {
          return this.errorMessage
        }
      }
    },
    methods: {
      modifyPassword () {
        this.errorMessage = "",
        axios.post('https://courtier.cpms.fr/lostPassword',  {
          user: this.email
        })
        .then(response => {
          // console.log(response, 'response')
          this.errorMessage = response.data.errorMesage;
          this.status = response.data.status
        })
        this.email = ""
      },
      close() {
        this.reInitialised = false
        this.$router.push({name: 'Login'})
      }
    },
    validations: {
      email: {
        required,
        email
      }
    },
  };
</script>

<style lang="scss" scoped>
@import '../../styles/_global.scss';

.se-conn-wrapper {
  padding-top: 7px;
  text-align: left;
}
.el-icon-loading {
  width: 30px;
  text-align: center;
}
img {
  height: 40px;
  padding: 10px;
}
.pwordInit {
  color: rgb(4, 151, 151);
  line-height: 20px;
  font-size: 10px;
  margin-bottom: 10px;
}
.modal-body {
  width: 250px;
}
.modal-backdrop {
  flex-direction: column;
}
.text-decoration {
  text-decoration: underline;
}
</style>
