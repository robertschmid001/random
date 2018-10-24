<template>
  <div id="home">

    <el-row>
      <el-col :span="12" :xs="24" :sm="24" :md="12">
        <el-row>
          <el-col :span="12" :xs="24" :sm="12" :md="12">
            <div class="outer-wrapper">
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
            <div class="outer-wrapper">
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
            <div class="outer-wrapper">
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
            <div class="outer-wrapper">
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
                  <div class="lgt-green inner-box">
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
                  <div class="green inner-box">
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
          <el-col :span="24" class="line-height">
            <el-row><el-col :span="24"><div class="full-width"><font-awesome-icon icon="history" class="home-icons-right icon-pad-right"/><h2>Mon Activité des 6 derniers mois</h2></div></el-col></el-row>
            <el-row class="border-bot pad-left"><el-col :span="21" class="act-cont">Affaires nouvelles</el-col><el-col :span="3" class="act-num">145</el-col></el-row>
            <el-row class="border-bot pad-left"><el-col :span="21" class="act-cont">Résiliations</el-col><el-col :span="3" class="act-num">10</el-col></el-row>
            <el-row class="border-bot pad-left"><el-col :span="21" class="act-cont">Cotisations encaissées</el-col><el-col :span="3" class="act-num">432</el-col></el-row>
            <el-row class="border-bot pad-left"><el-col :span="21" class="act-cont">Cotisations impayées</el-col><el-col :span="3" class="act-num">23</el-col></el-row>
            <el-row class="border-bot pad-left"><el-col :span="21" class="act-cont">Nouvelles adhésions</el-col><el-col :span="3" class="act-num">24</el-col></el-row>
            <el-row class="border-bot pad-left"><el-col :span="21" class="act-cont">Nouvelles mutations</el-col><el-col :span="3" class="act-num">46</el-col></el-row>
            <el-row class="pad-left"><el-col :span="21" class="act-cont">Nouvelles radiations</el-col><el-col :span="3" class="act-num">12</el-col></el-row>
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

h4 {
  padding-left: 10px;
}
a:link {
  text-decoration: none;
  color: black;
}
a:visited {
    text-decoration: none;
    color: black;
}
#home {
  padding: 30px;
  background-color: $background-global;
  .outer-wrapper {
    height: 230px;
    text-align: left;
    margin: 10px;
    box-sizing: border-box;
    background-color: white;
    font-size: 14px;
    border: 1px solid black;
    border-radius: 7px;
    .inner-wrapper {
      padding: 11px;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      .content {
        font-size: 12px;
        padding-left: 10px;
        text-align: justify;
      }
      .voir {
        position: absolute;
        bottom: 10px;
        right: 15px;
      }
      .voir:hover {
        color: $button-color;
      }
      .title-wrapper {
        display: flex;
        flex-direction: row;
        .home-icons-left {
          font-size: 30px;
          margin-top: 12px;
          padding-left: 10px;
        }
      }
    }
  }
  .outer-wrapper-right {
  padding: 10px 0 0 10px;
    h2 {
      font-weight: 400;
      text-align: left;
    }
    .radius-left {
      border-radius: 7px 0px 0px 0px;
    }
    .inner-box {
      height: 120px;
      .height-third {
        height: 33%;
      }
      .height-full {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }
    .full-width {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .number-size {
      font-size: 40px;
      font-weight: 550;
    }
    .content-right {
      font-size: 12px;
      font-weight: 550;
      text-align: center;
    }
    .home-icons-right {
      font-size: 25px;
      padding-top: 3px;
    }
    .icon-pad {
      padding-left: 10px;
    }
    .activity-wrapper {
      padding-top: 20px;
      .line-height {
        line-height: 28px;
        .icon-pad-right {
          padding-right: 20px;
        }
        .border-bot {
          border-bottom: solid black 1px;
        }
        .pad-left {
          padding-left: 20px;
          text-align: left;
        }
        .act-cont {
          font-size: 12px;
        }
        .act-num {
          font-weight: 550;
        }
      }
    }
  }
}
</style>
