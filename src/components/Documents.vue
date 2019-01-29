<template>
  <div id="documents">
    <div v-if="this.docs">
      <el-collapse v-model="activeNames" @change="handleChange">
        <div v-for="(doc, index) in docs" :key="index" >
          <el-collapse-item :name="nameOfFile(index)">
            <template slot="title" class="titlehead">
              <div class="col-head">
                {{doc.fn}}
              </div>
            </template>
            <ul>
              <li v-for="(file, index) in doc.files" :key="index"><a :href="'/getCourtierDoc/' + file.id" target="_blank" ><font-awesome-icon icon="file-alt" class="icons"/>{{file.fn}}</a></li>
            </ul>
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
    <div v-else>
      <h4>Aucun document n'a été trouvé</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Documents',
  data() {
    return {
      activeNames: [],
      docs: [],
    };
  },
  props: {
  },
  computed: {

  },
  methods: {
    nameOfFile (index) {
      return index
    },
    handleChange(val) {
          console.log(val);
        },
    setData () {
      this.$store.state.fullscreenLoading = true;
      this.getInfoAccueil();
      this.getCabinetInfo();
      this.getCourtierDocs();
      setTimeout(() => {
        this.docs = this.$store.state.docs
        this.$store.state.fullscreenLoading = false;
      }, 500);
    }
    },
    mounted () {
      this.docs = this.$store.state.docs
    },
    created () {
      if (this.$store.state.docs.length === 0) return this.setData();
    }

}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

#documents {
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
  background-color: $background-global;
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
  .el-collapse-item /deep/ .is-active {
    background-color: $button-color;
    color: white;
  }
  .el-collapse-item /deep/ .el-collapse-item__header .is-active {
    background-color: rgba(255, 255, 255, 0);
    color: white;
     .el-collapse-item__arrow {
     color: white;
 }
  }
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color: $button-color;
  }
  h4 {
    text-align: center;
  }
}
</style>
