<template>
  <div class="modal-backdrop">
    
      <img src="../../assets/cpms_logo_trans.png" alt="">
      <div class="modal">
        <section class="modal-body modal-box" v-if="!reInitialised">
          <el-row class="height-input">
            <el-col :span="24">
              <div class="input-icon-wrapper">
                <input class="base-input" placeholder="Saississez votre adresse email" type="email" v-model.trim.lazy="$v.email.$model" autocapitalize="off"/><i class="el-icon-warning" v-if="$v.email.$error"></i>
                <i class="el-icon-loading" v-if='isLoading'></i>
              </div>
            </el-col>
          </el-row>
          <el-row class="submit-mdp-wrapper">
              <el-col :span="12" class="se-conn-wrapper">
                <span class="size text-size-small pointer text-decoration" @click="close">Retour</span>
              </el-col>
              <el-col :span="12">
                <button class="size text-size-small button" @click="submit">Recevoir un email</button>
              </el-col>
          </el-row>
          <div class="error" v-if="$v.email.$error">Merci de renseigner un format de mail valide</div>
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

  export default {
    name: 'modal-password',
    data() {
      return {
        email: "",
        reInitialised: false,
        isLoading: false
      }
    },
    methods: {
      close() {
        this.reInitialised = false
        this.$emit('close');
      },
      submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        return console.log(this.submitStatus)
        
      } else {
        this.isLoading = true
        // this is my login logic!
        // if name and pword
        // than check with database if they exist
        // if they are valid,
        // ROUTE and this.authenticated

        this.submitStatus = 'PENDING'
        console.log(this.submitStatus)
        setTimeout(() => {
          this.isLoading = false
          this.submitStatus = 'OK'
          this.reInitialised = true
          console.log(this.submitStatus)
        }, 500)
      }
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
