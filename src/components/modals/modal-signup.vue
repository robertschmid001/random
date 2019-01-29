<template>
  <div class="modal-backdrop">
    <img src="../../assets/cpms_logo_trans.png" alt="">
    <div class="modal">

        <section class="modal-body">
            <div class="box">
            <p>
              Merci de nous contacter à l'adresse suivante: <a href="mailto:dcommerciale@cpms.fr">dcommerciale@cpms.fr</a>
            </p>
            </div>
            <span class="size text-size-small pointer text-decoration" @click="close">Retour</span>
        </section>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'modal',

    methods: {
      close() {
      this.$router.push({name: 'Login'})
      },
    },
  };
</script>

<style lang="scss" scoped>
.modal-backdrop {
  padding: 20px;
}
p {
  text-align: left;
}
.se-conn-wrapper {
  padding-top: 7px;
  text-align: left;
}
.el-icon-loading {
  width: 30px;
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
  width: auto;
}
.modal-backdrop {
  flex-direction: column;
}
.text-decoration {
  text-decoration: underline;
}
a:link {
  color: black;
}
</style>
