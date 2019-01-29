<template>
  <div class="modal-backdrop">
      
      <img src="../../assets/cpms_logo_trans.png" alt="">
      <div class="modal">
        <section class="modal-body modal-box" v-if="!status">
          <el-row class="height-input">
            <el-col :span="24">
              <div class="input-icon-wrapper">
                <input class="base-input" placeholder="Saississez votre adresse email ou numéro courtier" type="email" v-model.trim.lazy="email" autocapitalize="off"/><i class="el-icon-warning" v-if="$v.email.$error"></i>
                <i class="el-icon-loading" v-if='isLoading'></i>
              </div>
            </el-col>
          </el-row>
          <el-row class="submit-mdp-wrapper">
              <el-col :span="12" class="se-conn-wrapper">
                <span class="size text-size-small pointer text-decoration" @click="close">Retour</span>
              </el-col>
              <el-col :span="12">
                <button class="size text-size-small button pointer" v-if="!this.init" @click="createUser">Recevoir un email</button>
                <button class="size text-size-small button pointer" v-if="this.init" @click="openChange">Oui</button>
              </el-col>
          </el-row>
          <!-- <div class="error" v-if="$v.email.$error">Merci de renseigner un format de mail valide</div> -->
            <el-row class="error-wrapper" >
              <el-col :span="24" class="se-conn-wrapper text-center">
                <div class="pwordInit">{{errorText}}</div>
              </el-col>
          </el-row>
        </section>
        
        <section class="modal-body modal-box" v-else>
          <el-row class="height-input">
            <el-col :span="24">
              <div class="pwordInit">L’email de réinitialisation de votre mot de passe <br> a bien été envoyé</div>
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
    name: 'initialisation',
    data() {
      return {
        email: "",
        init: false,
        errorMessage: "",
        isLoading: false,
        status: false,
      }
    },
    computed: {
      errorText () {
        var error = this.errorMessage
        if(error === 'Courtier not found') {
          return 'Vous avez saisi un identifiant ou un mot de passe incorrect.'
        } else {
          return this.errorMessage
        }
      }
    },
    methods: {
        openChange () {
            this.$router.push({name: 'mdp'})
        },
      createUser () {
        this.errorMessage = "",
        axios.post('https://courtier.cpms.fr/createUser',  {
          user: this.email
        })
        .then(response => {
          this.errorMessage = response.data.errorMesage,
          this.init = response.data.init
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
.text-center {
    display: flex;
    justify-content: center;
}
.oui-wrap {
    height: 100%;
    display: flex;
    align-content: center;
}
.oui-wrapper {
    align-items: center!important;
}
.error-wrapper {
    display: flex;
    align-content: center;
}
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
