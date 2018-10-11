<template>
  <div id="home">

    <el-row>
      <el-col :span="12" :xs="24" :sm="24" :md="12" class="outer-wrapper-left">
        <el-row>
          <el-col :span="12" :xs="24" :sm="12" :md="12">
            <div class="outer-wrapper pointer">
              <div class="inner-wrapper">
                <div class="title-wrapper">
                    <div><font-awesome-icon icon="euro-sign" class="home-icons-left"/></div>
                    <h4>Mon Portefeuille client</h4>
                </div>
                <div class="content">
                  Consulter les données clés et téléchargez les documents associés : holdings, entreprises, contrats, cotisations, assurés, prestations.
                  Crées un graphique sur mesure en sélectionnant les données souhaitées ...
                </div>
                <router-link to="/portefeuille"><div class="voir pointer">Voir</div></router-link>
              </div>
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :md="12">
            <div class="outer-wrapper pointer">
              <div class="inner-wrapper">
                  <div class="title-wrapper">
                    <div><font-awesome-icon icon="user-friends" class="home-icons-left"/></div>
                    <h4>Recherche Assurés</h4>
                  </div>
                <div class="content">
                  Consultez les données assurés et téléchargez les documents associés (Carte Tiers-Payant, Certificat d'adhésion/radiation, Bulletin Individuel d'Affiliation).
                </div>
                <router-link to="/recherche"><div class="voir pointer">Voir</div></router-link>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" :xs="24" :sm="12" :md="12">
            <div class="outer-wrapper pointer">
              <div class="inner-wrapper">
                <div class="title-wrapper">
                  <div><font-awesome-icon icon="file-export" class="home-icons-left"/></div>
                  <h4>Outil d'extraction</h4>
                </div>
                <div class="content">Rechercher en dashbording et exporter au format Excel les données de mon portefeuille.</div>
                <div class="voir pointer">Voir</div>
              </div>
            </div>
          </el-col>
          <el-col :span="12" :xs="24" :sm="12" :md="12">
            <div class="outer-wrapper pointer">
              <div class="inner-wrapper">
                <div class="title-wrapper">
                  <div><font-awesome-icon icon="file-alt" class="home-icons-left"/></div>
                  <h4>Bibliothèque de documents</h4>
                </div>
                <div class="content">Accéder aux documents génériques utile à mon activité.</div>
                <div class="voir pointer">Voir</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="12" :xs="24" :sm="24" :md="12" class="outer-wrapper-right">
        <h2>Mon Portefeuille</h2>
        <el-row>
            <el-col :span="12" :xs="24">
              <el-row>
                <el-col :span="12" :xs="12" :sm="12">
                  <div class="blue inner-box radius-left">
                    <div class="full-width height-third home-icons-right"><font-awesome-icon icon="landmark"/></div>
                    <div class="full-width height-third number-size">18</div>
                    <div class="full-width height-third content-right">Holdings</div>
                  </div>
                </el-col>
                <el-col :span="12" :xs="12" :sm="12">
                  <div class="purple inner-box">
                    <div class="full-width height-third home-icons-right"><font-awesome-icon icon="landmark"/></div>
                    <div class="full-width height-third number-size">11</div>
                    <div class="full-width height-third content-right">Entreprises</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" :xs="24" :sm="24">
                  <div class="lgt-green inner-bot-box">
                    <div class="height-full">
                      <div class="full-width number-size">180 654<font-awesome-icon icon="euro-sign" class="icon-pad"/></div>
                    <div class="full-width content-right">Cotisations</div></div>
                  </div>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-row>
                <el-col :span="12" :xs="12" :sm="12">
                  <div class="orange inner-box">
                    <div class="full-width height-third home-icons-right"><font-awesome-icon icon="file-alt"/></div>
                    <div class="full-width height-third number-size">22</div>
                    <div class="full-width height-third content-right">Contrats</div>
                  </div>
                </el-col>
                <el-col :span="12" :xs="12" :sm="12">
                  <div class="red inner-box radius-right">
                    <div class="full-width height-third home-icons-right"><font-awesome-icon icon="user-friends"/></div>
                    <div class="full-width height-third number-size">253</div>
                    <div class="full-width height-third content-right">Assurés Bénéficiaires</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" :xs="24" :sm="24">
                  <div class="green inner-bot-box">
                    <div class="height-full">
                      <div class="full-width number-size">180 654<font-awesome-icon icon="euro-sign" class="icon-pad"/></div>
                      <div class="full-width content-right">Prestations</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
        </el-row>
        <el-row class="activity-wrapper">
          <el-col :span="24" class="line-height width-activity">
            <el-row><el-col :span="24"><div class="full-width"><font-awesome-icon icon="history" class="home-icons-right icon-pad-right"/><h2>Mon Activité des 6 derniers mois</h2></div></el-col></el-row>
            <el-row class="pad-left hover1 pointer"><el-col :span="21" class="act-cont">Affaires nouvelles</el-col><el-col :span="3" class="act-num">145</el-col></el-row>
            <el-row class="pad-left hover2 pointer"><el-col :span="21" class="act-cont">Résiliations</el-col><el-col :span="3" class="act-num">10</el-col></el-row>
            <el-row class="pad-left hover3 pointer"><el-col :span="21" class="act-cont">Cotisations encaissées</el-col><el-col :span="3" class="act-num">432</el-col></el-row>
            <el-row class="pad-left hover4 pointer"><el-col :span="21" class="act-cont">Cotisations impayées</el-col><el-col :span="3" class="act-num">23</el-col></el-row>
            <el-row class="pad-left hover5 pointer"><el-col :span="21" class="act-cont">Nouvelles adhésions</el-col><el-col :span="3" class="act-num">1000</el-col></el-row>
            <el-row class="pad-left hover6 pointer"><el-col :span="21" class="act-cont">Nouvelles mutations</el-col><el-col :span="3" class="act-num">46</el-col></el-row>
            <el-row class="pad-left hover7 pointer"><el-col :span="21" class="act-cont">Nouvelles radiations</el-col><el-col :span="3" class="act-num">12</el-col></el-row>

          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

#home {
  padding: 30px;
  background-color: white;
}
.width-activity {
  max-width: 400px;
}
h2{
  font-weight: 400;
  text-align: left;
}
.height-third {
  height: 33%;
}
.height-full {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.full-width {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-right {
  font-size: 12px;
  font-weight: 550;
  text-align: center;
}
.number-size {
  font-size: 40px;
  font-weight: 550;
}
.home-icons-right {
  font-size: 25px;
  padding-top: 3px;
}
.voir {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
h4 {
  display: flex;
  padding-left: 10px;
  align-items: center;
}
.title-wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.home-icons-left {
  font-size: 70px;
  margin-top: 12px;
  padding-left: 10px;
}
.outer-wrapper {
  height: 230px;
  text-align: left;
  margin: 10px;
  box-sizing: border-box;
  background-color: $button-color;
  font-size: 14px;
  box-shadow: 0px 1px 15px -8px black;
  border-radius: 7px;
  color: white;
}
.outer-wrapper:hover {
  color: $button-color;
  background-color: white;
  box-shadow: none;
}
.inner-wrapper {
  padding: 11px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.red {
  background-color: rgba(255, 0, 0, 0.4);
  border-radius: 0px 7px 0px 0px;
}
.orange {
  background-color: rgba(253, 98, 59, 0.4);
}
.blue {
  background-color: rgba(119, 78, 196, 0.4);
  border-radius: 7px 0px 0px 0px;
}
.purple {
  background-color: rgb(4, 172, 172);
}
.lgt-green {
  background-color: rgba(78, 255, 166, 0.4);
  border-radius: 0px 0px 0px 7px;
}
.green {
  background-color: rgba(221, 217, 2, 0.4);
  border-radius: 0px 0px 7px 0px;
}


.hover1:hover {
  background-color: rgba(255, 0, 0, 0.6);
  border-radius: 7px 7px 0 0;
  color: white;
}
.hover2:hover {
  background-color: rgba(253, 98, 59, 0.76);
  color: white;
}
.hover3:hover {
  background-color: rgba(122, 120, 1, 0.637);
  color: white;
}
.hover4:hover {
  background-color: rgba(1, 95, 133, 0.719);
  color: white;
}
.hover5:hover {
  background-color: rgb(4, 172, 172);
  color: white;
}
.hover6:hover {
  background-color: rgba(8, 106, 187, 0.425);
  color: white;
}
.hover7:hover {
 background-color: rgba(119, 78, 196, 0.6);
  border-radius: 0 0 7px 7px;
  color: white;
}











.inner-box {
  height: 120px;
}
.inner-bot-box {
  height: 120px;
}
.outer-wrapper-right {
  padding: 0px 10px 20px 10px;
  color: rgba(53, 53, 53, 0.815);
  box-shadow: 0px 0px 30px -7px;
  border-radius: 7px;
  margin-top: 10px;
}
.radius-left {
  border-radius: 7px 0px 0px 0px;
}
.line-height {
  line-height: 28px;
}
.pad-left {
  padding-left: 20px;
  text-align: left;
}
.content {
  font-size: 12px;
  padding-left: 10px;
}
.activity-wrapper {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.act-cont {
  font-size: 14px;
}
.act-num {
  font-weight: 550;
  text-align: center;
  cursor: pointer;
}
.icon-pad {
  padding-left: 10px;
}
.icon-pad-right {
  padding-right: 20px;
}
a {
  color: white;
}
</style>
