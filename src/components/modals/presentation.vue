<template>
  <div class="background-presa">
      
      <div class="modal">
        <div class="modal-body modal-box">
            <el-row>
                <el-col class="image-wrapper align-left">
                    <img class="image-presa" src="../../assets/cpms_logo_trans.png" alt="">
                </el-col>
            </el-row>
          <el-row class="submit-mdp-wrapper">
              <el-col :span="24" class="align-left">
                <div>
                    <div class="title-wrapper">
                        <h1> TITRE PRESA </h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non rutrum erat. Nullam finibus,
                        ante eu malesuada congue, mauris est ultrices diam, eget suscipit dui sem eu mauris. Ut dui nisi,
                        lacinia vitae interdum et, ullamcorper vel ex. Integer sit amet turpis augue. Suspendisse viverra
                        turpis in ex convallis dapibus. Quisque facilisis lorem lobortis, sagittis justo quis, ultricies
                        mauris. Duis fringilla tellus in lectus tempor scelerisque. Aenean tortor arcu, placerat eu ullamcorper
                        at, lobortis id purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium
                        tellus velit, ut congue mi ultrices in. Mauris ultricies nibh eget mauris condimentum imperdiet
                        et ac arcu. Nullam rutrum neque a lacus suscipit, vel sodales urna pulvinar.</p>
                </div>
              </el-col>
          </el-row>
              <el-col :span="24" class="text-center">
                  <el-checkbox v-model="checked">Ne plus afficher ce message</el-checkbox>
              </el-col>
              <el-col :span="24" class="text-center button-wrapper">
                  <button class=" text-size-small pointer btn-close" @click="close">Retour</button>
              </el-col>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios"

  export default {
    name: 'presentations',
    data () {
        return  {
            checked: false
      }
    },
    computed: {

    },
    methods: {
      close() {
        this.$emit('closePresa')
      }
    },
  };
</script>

<style lang="scss" scoped>

h1 {

}
.button-wrapper {
    margin: 7px;    
}
.title-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}
.image-wrapper {
    display: flex;
}
.image-presa {
    height: 30px;
    width: 150px;
}
.text-center {
    display: flex;
    justify-content: center;
}
.error-wrapper {
    display: flex;
    align-content: center;
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
  max-width: 700px;
}
.modal-backdrop {
  flex-direction: column;
}
.text-decoration {
  text-decoration: underline;
}
.modul-input {
    border: 1px solid rgba(190, 190, 190, 0.8);
    border-radius:2px;
    height: 20px;
    padding-left: 20px;
    font-size: 10px;
}
.modal-padding {
    padding: 5px;
}

.modal-box {
    display: flex;
    flex-direction: column;
    margin: 2px;
}

.background-presa {
    background-color: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 20px 20px 86px;
    height: 100%;
}

.modal {
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    box-shadow: 0px 0px 27px -8px;
}

.modal-body {
    position: relative;
    padding: 20px 40px;
    font-size: 13px;
}

.btn-close {
    background: #4aae9b;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 7px 20px!important;
    border-radius: 7px;
}
.btn-close:hover {
    background: white;
    color: #4aae9b;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}
</style>