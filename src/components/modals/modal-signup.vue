<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
          Créer votre compte
        </header>

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
                <el-row class="modal-padding">
                   <el-col :span="24"><div class="modal-box"><label for="nom">Mot de passe</label><input type="email" class="modul-input" placeholder="Mot de passe"></div></el-col>
                </el-row>
            </div>
        </section>

        <footer class="modal-footer">
            <button type="button" class="btn-green" @click="close"> Close me!</button>
        </footer>
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

<style>

</style>
