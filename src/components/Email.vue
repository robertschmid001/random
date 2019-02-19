<template>
  <div id="email">
    <el-row>
      <el-col :span="24" class="col-wrap">
        <div class="outer-wrapper">
          <el-select v-model="ruleForm.objet" prop="objet" placeholder="Votre demande concerne" class="input-style">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-form class="area-wrap">
            <el-form-item prop="message">
              <el-input type="textarea" v-model="ruleForm.message" class="area-style"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="12">
              <el-upload
                id="file"
                class="upload-demo"
                action="https://courtier.cpms.fr/sendMessage"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :file-list="fileAdded"
                :on-success="fileAdd"
                :on-change="changeUpload"
                :before-upload="handleBeforeUpload"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png,image/jpeg,application/pdf"
                >
                <button class="joindre-style pointer" size="small" type="primary"><font-awesome-icon icon="paperclip" class="paperclip-icon"  @click="close"/>Joindre un fichier</button>
                <div slot="tip" class="el-upload__tip">Veuillez vérifier que le volume des fichiers ne dépassent pas 15 Mo.</div>
              </el-upload>
            </el-col>
            <el-col :span="12"><button class="button button-style pointer" @click="validateMail()" >Envoyer</button></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"
import { Message } from 'element-ui';

export default {
  name: 'Email',
  props: {
  },
  data() {
    return {
      fileAdded: [],
      options: [{
        value: 'gestionconfiee@cpms.fr',
        label: 'La gestion'
      }, {
        value: 'dcommerciale@cpms.fr',
        label: 'Le commercial'
      }],
      value: '',
      ruleForm: {
        message: "",
        object: ""
      },
    }
  },
    methods: {

    sendMail: function() {
      let file = this.fileAdded;
      let fileSize = 0;

      file.forEach( e => {
        fileSize = fileSize + e.size/1000
      })
      if (fileSize <= 15000) {
        let formData = new FormData();
        // let passed = false;
        var i = 1

        formData.append('objet', this.ruleForm.objet);
        formData.append('message', this.ruleForm.message);
        file.forEach(e => {
          formData.append('file_'+ i, e.raw);
          i++
        })
        if (this.ruleForm.objet != undefined){
          var res = false
          axios.post('https://courtier.cpms.fr/sendMessage', formData)
          .then(function(response) {
            res = true
          })
          .catch(function(error) {
              console.log(error);
          })
          setTimeout(() => {
            if(res) {
              console.log(this.ruleForm.objet ,'this.ruleForm.objet')
              console.log(this.ruleForm.message ,'this.ruleForm.message')
              this.ruleForm.objet = ""
              this.ruleForm.message = ""
              this.fileAdded = []
              this.$message({
                message: 'Votre message a bien été envoyé. Nous reviendrons vers vous dans les meilleurs délais',
                type: 'success'
              });
            }
          }, 1000)
        }
      } else return this.$message.warning(`Veuillez vérifier que le volume des fichiers ne dépassent pas 15 Mo.`);
    },
    validateMail () {
      this.sendMail();
    },
    LOG () {
      console.log(this.fileAdded,'filelist')
    },
    fileAdd (file, fileList) {
        this.fileAdded.push(fileList)
    },
    handleRemove (file, fileList) {
      var i = 0;
      while (i < this.fileAdded.length) {
        if (file.name === this.fileAdded[i].name) {
          this.fileAdded.splice(i, 1);
        }
        else {
            ++i;
        }
      }
    },
    handleBeforeUpload (file, fileList) {
      console.log(file.size, 'size')
    },
    handlePreview (file) {
      console.log(file, 'preview');
    },
    handleExceed (files, fileList) {
      // this.$message.warning(`The limit is 4, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`Voulez-vous supprimer ce fichier ? ${ file.name }`);
    },
    changeUpload (file, fileList) {
    },
    close () {
      console.log('closed')
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
.area-style /deep/ .el-textarea__inner {
  height: fill;
}
.area-style {
  height: 300px;
}
.paperclip-icon {
  font-weight: 100;
  padding-right: 5px;
  color: rgba(128, 128, 128, 0.678);
}
.area-wrap {
  padding-top: 20px;
}
.inner-wrapper {
  display: flex;
  padding-top: 10px;
}
.joindre-style {
  border: none;
  background-color: white;
  color: rgba(128, 128, 128, 0.678);
  font-weight: 550;
}
.input-style {
  width: 50%;
}
.mess {
  text-align: left;
  font-weight: 600;
  color: rgba(128, 128, 128, 0.68);
}
.content-var {
  text-align: right;
  width: 100%;
  color: $button-color;
}
.col-wrap {
  padding: 10px;
}
.button-style {
  width: 100%;
}
#email {
  padding: 20px 30px;
  background-color: $background-global;
  .outer-wrapper {
    background-color: white;
    padding: 20px;
    border-radius: 7px;
    max-width: 500px;
  }
}
.el-upload__tip {
  margin-bottom: 7px;
}

</style>
