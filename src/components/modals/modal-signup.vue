<template>
  <div class="modal-backdrop">
    <img src="../../assets/logo-cpms.png" alt="">
    <div class="modal">

        <section class="modal-body">
            <div class="box">
            <p>
              • Extrait Kbis de moins de 3 mois <br>
              • Attestation ORIAS en cours de validité ... <br>
              • Attestation de Garantie FInancière (GF) en cours de validité; <br>
              • Attestation de responsabilité civile Professionelle (RC PRO) en cours de validité; <br>
              • RIB; <br>
              • Nom et qualité du signateire et coordonnées; <br>
              • Téléphone fixe: ligne directe (obligatoire); <br>
              • Adresse mail (obligatoire); <br>
              • Téléphone portable (ou à défaut numéro du standard); <br>
              • Télécopie (facultatif); <br>
              • Photocopie d'une pièce d'identité du signataire (passport ou CNI); <br>
              • Pouvoir du signataire si celui-ci n'apparaît pas dans le Kbis; <br>
              • Nom et qualité du correspondant / déclarant TRACFIN; <br>
            </p>
            </div>
            <span class="size text-size-small pointer text-decoration" @click="close">Se connecter</span>
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
  width: auto;
}
.modal-backdrop {
  flex-direction: column;
}
.text-decoration {
  text-decoration: underline;
}
</style>
