<template>
  <div id="email">
    <!-- <el-row>
      <el-col :span="5" class="outer-padding">
        <div class="write-wrapper">
          <el-row>
            <el-col :span="24" class="">
              <button class="button">Ecrire</button>
            </el-col>
            <el-col :span="24">
              <el-row class="messagerie-wrapper md-txt content-padding grey-text">
                <el-col :span="18" justify="start">
                  <div class="mes">Messagerie</div>
                </el-col>
                <el-col :span="6" justify="end">
                  <div class="mes-num">2</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24" class="md-txt padding grey-text-thin">
              <div>Envoyés</div>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="6" class="outer-padding">
        <div class="mails-wrapper">
          <div class="search">
            <font-awesome-icon icon="search" class="search-icon grey-text"/><input type="text" placeholder="Rechercher..." class="input grey-text-thin">
          </div>
                  <el-row>
            <el-col :span="24">
                <ul class="details-list pointer">
                    <li >
                        <div class="list-wrapper">
                          <div class="message-circle grey-text">ES</div>
                            <div class="wrapper">
                              <div class="message-object-wrapper grey-text"><strong>Elizabeth SAUSAGE</strong></div>
                              <div class="message-content-wrapper grey-text-thin">Tel est le constat dressé par l'Institut de recherche et documentation en économie de la santé (Irdes) dans une enquête publiée hier.
                                  Pour rappel, l'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais,
                                  seulement 16 % des établissement s'abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d'adhésions des salariés.
                                </div>
                            </div>
                          <div class="date sm-txt">7 Jan</div>
                          <div class="ellipsis-list">...</div>
                        </div>
                    </li>
                    <li >
                        <div class="list-wrapper">
                            <div class="message-circle grey-text">HP</div>
                                 <div class="wrapper">
                                    <div class="message-object-wrapper grey-text"><strong>Henri PINEAPPLE</strong></div>
                                <div class="message-content-wrapper grey-text-thin">Tel est le constat dressé par l'Institut de recherche et documentation en économie de la santé (Irdes) dans une enquête publiée hier. Pour rappel, l'Ani en question oblige tous les employeurs privés à proposer une complémentaire santé d'entreprise à leurs salariés à compter du 1er janvier 2016. Désormais, seulement 16 % des établissement s'abstiennent de proposer une telle complémentaire santé, principalement en raison des dispenses d'adhésions des salariés.
                                </div>
                            </div>
                            <div class="date sm-txt">4 Jan</div>
                            <div class="ellipsis-list">...</div>
                        </div>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <div class="bottom-list"></div>
        </div>
      </el-col>

      <el-col :span="13" class="outer-padding">
        <div class="message-wrapper">
          3rd
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>

export default {
  name: 'Email',
  props: {
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";
#email {
  padding: 20px;
}
.search {
  padding: 15px 20px;
  border-bottom: 1px solid $background-global;
}
.search-icon {
  font-size: 12px;
  justify-items: center;
}
.write-wrapper {
  width: 100%;
  border-radius: 7px;
  background-color: white;
  padding: 15px;
  box-sizing: border-box;
}
.mails-wrapper {
  width: 100%;
  border-radius: 7px;
  background-color: white;
}
.message-wrapper {
  width: 100%;
  border-radius: 7px;
  background-color: white;
}
.button {
  width: 100%;
}
.messagerie-wrapper {
  display: flex;
  flex-direction: row;
  font-weight: 600;
}
.inner-circle {
  display: flex;
}
.mes-num {
  text-align: right;
  color: $button-color;
}
.padding {
  padding: 5px 0px;
}
.content-padding {
  padding-top: 10px;
}
.outer-padding {
  padding: 0 10px;
}
.input {
  border-radius: 8px;
  height: 20px;
  border: none;
  outline: none;
  box-sizing: border-box;
  padding-left: 20px;
  font-size: 12px;
}
    .details-list {
        list-style: none;
        padding: 0;
        max-height: 400px;
        .list-wrapper {
          padding: 10px 10px;
            height: 32px;
            display: flex;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid $background-global;
            .ellipsis-list {
                position: absolute;
                bottom: 5px;
                right: 10px;
                background-color: white;
                padding-bottom: 8px;
                padding-left: 2px;
            }
            .date{
                position: absolute;
                top: 5px;
                right: 10px;
                background-color: white;
                color:$button-color;
                font-weight: 550;
            }
            .wrapper {
                padding-left: 10px;
                text-align: left;
                line-height: 15px;
                .message-object-wrapper {
                    font-size: 11px;
                }
                .message-content-wrapper {
                    font-size: 10px;
                    height: 13px;
                    overflow: hidden;
                }
            }
        }
}
.message-circle {
  justify-content: center;
  display: flex;
    border: none;
    border-radius: 50%;
    height: 30px;
    min-width: 30px;
    background-color: rgb(221, 221, 221);
    align-items: center;
}
.bottom-list {
  height: 50px;
}
        ul {
            margin: 0;
          }
</style>
