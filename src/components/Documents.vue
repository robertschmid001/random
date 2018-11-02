<template>
  <div id="documents">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="col-head">
              Guides pratiques
            </div>
          </template>
          <ul>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Présentation de gestion</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Présentation extranet</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Guide BIA</li>
          </ul>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="col-head">
              Formulaires
            </div>
          </template>
          <ul>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Formulaire de portabilité</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Formulaire de maintien de garantie (loi Evin et portabilité)</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>BIA</li>
          </ul>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="col-head">
              Mes documents
            </div>
          </template>
          <ul>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Un document très important</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Un autre</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>Puis un dernier</li>
            <li><font-awesome-icon icon="file-alt" class="icons"/>...Ou pas.</li>
          </ul>
        </el-collapse-item>
      </el-collapse>

  </div>
</template>

<script>
export default {
  name: 'Documents',
  data() {
    return {
      activeNames: ['1']
    };
  },
  props: {
  },
  methods: {
  handleChange(val) {
        console.log(val);
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

#documents {
  padding: 30px;
  box-sizing: border-box;
  .col-head {
    padding-left: 20px;
    font-size: 15px;
    font-weight: bold;
  }
  .col-head:hover {
    background-color: $button-color;
    color: white;
  }
  ul {
    text-decoration: none;
    list-style: none;
  }
  .icons {
    padding-right: 10px;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    color: $button-color;
  }

}
</style>
