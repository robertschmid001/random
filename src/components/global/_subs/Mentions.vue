<template>
  <div id="mentions">
    <div class="mentions-wrapper">
        <h1>MENTIONS LÉGALES</h1> <br><br>
        <div class="style">Responsable de la publication – Nathalie BENOUAICH</div><br><br><br>
        <div class="style">CPMS SAS</div> – Société de Gestion et de Courtage d’Assurance au capital<br><br>
        de 4 429 000 € inscrite auprès de l’ORIAS sous le N° 07 001 007<br><br>
        5, Rue Geoffroy Marie 75009 PARIS<br><br>
        Téléphone : 01 47 70 30 97 – Fax : 01 42 46 68 10 – www.cpms.fr<br><br>
        RC PARIS B 97 B 14894 – Siret 414 357 889 00040<br><br>
        Garantie Financière et RC Professionnelle conformes aux articles L 530-1 et 530-2 du Code des Assurances<br><br><br>
        <div class="style">AVERTISSEMENT :</div> <br><br>
        Les informations présentées sur ce site sont nécessairement partielles et n’ont aucune valeur contractuelle.<br><br><br>
        <div class="style">DROIT APPLICABLE :</div><br><br>
        Le présent site est soumis au droit français<br><br><br>
        <div class="style">REPRODUCTION INTERDITE  :</div> <br><br>
        Sauf autorisation, la reproduction ainsi que l’utilisation du contenu du site autre que la consultation individuelle et privée sont interdites.<br><br>
        <div class="style">PROTECTION DES DONNÉES   :</div> <br><br>
        Conformément à la loi Informatique et Libertés du 6 janvier 1978 et du règlement général sur la protection des données (RGPD) en date du 27 Avril 2016, les données personnelles recueillies dans le cadre du présent contrat feront l’objet d’un traitement informatique nécessaire à la gestion et l’exécution de votre contrat santé. En signant ce document, vous donnez expressément votre consentement au traitement de vos données personnelles. Aucun traitement commercial ne sera mise en œuvre. En l’application de la législation en vigueur, vous pourrez exercer votre droit d’accès, de rectification et d’opposition concernant l’utilisation et le traitement de vos données personnelles en écrivant par voie postale ou par email au délégué à la protection des données : dpo@cpms.fr / CPMS-DPO 5 rue Geoffroy Marie, 75009 Paris »<br><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyMentions',
  props: {
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/_global.scss";
#mentions {
    padding: 40px 20px;
    .mentions-wrapper {
        padding: 20px;
        background-color: white;
    }
    .style {
      color: $button-color;
    }
    h1 {
      text-decoration: underline;
    }
}
</style>