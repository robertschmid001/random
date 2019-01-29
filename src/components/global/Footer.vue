<template>
  <div id="my-footer">
    <el-row class="row">
      <el-col :span="24">
        <div class="align-left footer-padding-right"><router-link to="/mentions-legales">Mentions légales</router-link></div>
      </el-col>
      <!-- <el-col :span="12">
        <div class="align-left footer-padding-left"><a href="https://www.cpms.fr" target="_blank">Site CPMS</a></div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: {
  }
}
</script>

<style lang="scss" scoped>
#my-footer {
    background-color: rgb(73, 73, 73);
    color: rgba(255, 255, 255, 0.897);
    padding-left: 80px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    box-sizing: border-box;
    height: 41px;
    z-index: 5;
    display: flex;
    align-items: center;
    .footer-padding-right {
      padding-right: 40px;
    }
    .footer-padding-left {
      padding-left: 40px;
    }
    a {
      text-decoration: none;
      color: white;
      font-size: 12px;
    }
    a:hover {
      text-decoration: underline;
    }
    .row {
      width: 100%;
    }
}
</style>
