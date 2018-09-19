<template>
  <div id="login">
    <div class="login-container">
    <img src="../assets/logo-cpms.png" alt="">
      <div class="outer-wrapper">
        <el-row>

          <div class="inner-wrapper">

            <form v-on:submit.prevent="submit">
              <el-row>
                <el-col :span="24" class="pword-error-wrapper">
                  <div>
                    <el-input placeholder="email ou numéro de courtier" v-model.lazy="id" autocapitalize="off" ></el-input>
                  </div>
                </el-col>
                <el-col :span="24"><div><el-input placeholder="Mot de passe" type="password" v-model.lazy="password" autocapitalize="off"></el-input> </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="pword-wrapper">
                  <span class="text-size-small pointer  text-decoration" @click="showModalLostPassword">Mot de passe oublié ?</span>
                </el-col>
                <el-col :span="12">
                  <el-col :span="24">
                    <div>
                      <el-button type="submit" class="size text-size-small button" @click="submit" >Se connecter</el-button>
                    </div>
                  </el-col>
                </el-col>
              </el-row>

            </form>

            <div class="error" v-if="!$v.id.customValidate">Merci de renseigner un format de mail valide</div>
            <div class="error" v-if="!$v.password" >Pword</div>
          </div>
        </el-row>

      </div>
      <el-row>
        <el-col :span="24"><span class="text-size-small pointer" @click="showModalCreate">Vous n'avez pas encore de compte ? <span class="text-decoration">Contactez-nous</span> </span></el-col>
      </el-row>
    </div>
    <modal-password v-show="isModalVisibleP" @close="closeModal"/>
    <modal-signup v-show="isModalVisible" @close="closeModal"/>
  </div>
</template>

<script>
import { required, maxLength, email, or } from "vuelidate/lib/validators";
import modalSignup from "./modals/modal-signup.vue";
import modalPassword from "./modals/modal-password.vue";

export default {
  name: "login",
  data() {
    return {
      id: "",
      password: "",
      isModalVisible: false,
      isModalVisibleP: false,
      submitStatus: ""
    };
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
      this.isModalVisible = true;
    },
    showModalLostPassword() {
      this.isModalVisibleP = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isModalVisibleP = false;
    },
    submit() {
      console.log('submit!')
      this.$v.$touch()
      console.log(this.$v)
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        return console.log(this.submitStatus)
        
      } else {

        // this is my login logic!
        // if name and pword
        // than check with database if they exist
        // if they are valid,
        // ROUTE and this.authenticated

        this.submitStatus = 'PENDING'
        console.log(this.submitStatus)
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.$store.state.authenticated = true;
          this.$router.replace("home");
          console.log(this.submitStatus)
        }, 500)
      }
     }
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 50px;
}
.text-decoration {
  text-decoration: underline;
}
.pword-wrapper {
  padding-top: 5px;
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
  width: 250px;
  height: 100%;
}
#login {
  display: flex;
  background-color: lightgrey;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
}

.el-input {
  margin-bottom: 10px;
}
// .el-input /deep/ input:focus {
//   background-color: black;
//   color: white;
// }
</style>
