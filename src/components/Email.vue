<template>
  <div id="email">
    <el-row>
      <el-col :span="24" class="col-wrap">
        <div class="outer-wrapper">
          <el-select v-model="value" placeholder="Votre demande concerne" class="input-style">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-form class="area-wrap">
            <el-form-item prop="desc" class="area-inner-wrap">
              <el-input type="textarea" v-model="ruleForm.desc" class="area-style"></el-input>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <button class="joindre-style pointer" size="small" type="primary"><font-awesome-icon icon="paperclip" class="paperclip-icon"  @click="close"/>Joindre un fichier</button>
                <!-- <div slot="tip" class="el-upload__tip">//alerte < 500 ko?</div> -->
              </el-upload>
            </el-col>
            <el-col :span="12"><button class="button button-style pointer">Envoyer</button></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Email',
  props: {
  },
  data() {
    return {
      fileList: [{name: 'fichier.pdf', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'fichier.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      options: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }],
      value: '',
      ruleForm: {
          desc: ''
      },
    }
  },
    methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Delete ce ${ file.name }？`);
    },
    close () {
      console.log('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
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
  color: rgba(128, 128, 128, 0.678);
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
  .outer-wrapper {
    background-color: white;
    padding: 20px;
    border-radius: 7px;
    max-width: 500px;
  }
}

</style>
