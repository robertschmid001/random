<template>
  <div class="modal-backdrop">
    <img src="../../assets/logo-cpms.png" alt="">
    <div class="modal">

        <section class="modal-body">
            <div class="box">
                <el-row class="modal-padding">
                    <el-col :span="24"><div class="modal-box"><label for="prénom" class="modal-label">Code Coutier CPMS</label><input type="number" class="modul-input" placeholder="Code Coutier CPMS"></div></el-col>
                </el-row>
                <el-row class="modal-padding">
                    <el-col :span="12" :xs="24"><div class="modal-box"><label for="prénom" class="modal-label">Prénom</label><input type="email" class="modul-input" placeholder="Prénom"></div></el-col>
                    <el-col :span="12" :xs="24"><div class="modal-box"><label for="nom">Nom</label><input type="nom" class="modul-input" placeholder="Nom"></div></el-col>
                </el-row>
                <el-row class="modal-padding">
                    <el-col :span="24"><div class="modal-box"  ><label for="prénom" class="modal-label">Adresse mail</label><input type="email" class="modul-input" placeholder="Adresse mail"></div></el-col>
                </el-row>
  
            </div>
        </section>
        
    </div>
  </div>
</template>

<script>

  export default {
    name: 'modal',

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss" scoped>
.se-conn-wrapper {
  padding-top: 7px;
  text-align: left;
}
.el-icon-loading {
  width: 30px;
}
img {
  height: 50px;
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
