<template>
  <div class="modal-backdrop">
    <img src="../../assets/logo-cpms.png" alt="">
    <div class="modal">
      <section class="modal-body modal-box" v-if="!reInitialised">
        <el-row class="height-input">
          <el-col :span="24">
            <el-input placeholder="Saississez votre adresse email" v-model="email" type="email"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="submit-mdp-wrapper" justify="end">
            <el-col :span="12">
              <el-button class="size text-size-small button" @click="sendReinit">Valider</el-button>
            </el-col>
        </el-row>
        <div class="error" v-if="!$v.email.email">Merci de renseigner un format de mail valide</div>
      </section>

      <section class="modal-body modal-box" v-else>
        <el-row class="height-input">
          <el-col :span="24">
            <span class="pwordInit">L’émail de réinitialisation de votre mot de passe <br> a bien été envoyé</span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="submit-mdp-wrapper">
            <el-col :span="12">
              <el-button class="size text-size-small button" @click="close">Se connecter</el-button>
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
        reInitialised: false
      }
    },

    methods: {
      close() {
        this.reInitialised = false
        this.$emit('close');
      },
      sendReinit () {
        this.reInitialised = true
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
img {
  height: 50px;
  padding: 10px;
}
.pwordInit {
  color: rgb(4, 151, 151);
  line-height: 20px;
  font-size: 10px;
}
.modal-body {
  width: 250px;
}
.submit-mdp-wrapper {
  margin-top: 15px;
}
.modal-backdrop {
  flex-direction: column;
}
</style>
