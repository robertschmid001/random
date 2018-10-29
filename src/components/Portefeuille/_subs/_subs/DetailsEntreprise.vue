<template>
    <div id="detailsEntreprise">
        <div class="title">{{this.detailsEnt.name}} <font-awesome-icon icon="times" class="close-icon"  @click="close"/></div>
        <el-row>
            <el-col :span="7" class="block-wrapper">
                <div class="details-wrapper">
                    <div class="content">{{this.detailsEnt.NumSiret}}</div><br>
                     <div class="descrip">n° siret</div>
                </div>
                
            </el-col>
            <el-col :span="7" class="block-wrapper">
                <div class="details-wrapper">
                    <div class="content">{{this.detailsEnt.codeNaf}}</div>
                    <div class="descrip">code Naf</div>
                </div>
            </el-col>
            <el-col :span="7" class="block-wrapper">
                <div class="details-wrapper">
                    <div class="content">{{this.detailsEnt.adresse}}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'DetailsEntreprise',
    props: ['detailsEnt'],
    data () {
      return {

      }
  },
  methods: {
    close () {
        this.$emit('close');
        this.$store.state.breadArray.pop()
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../styles/_global.scss";

#detailsEntreprise {
    padding: 40px;
    background-color: $background-global;
    height: fill;
}
.title {
    font-size: 30px;
    position: relative;
}
.close-icon {
    position: absolute;
    top: 0;
    right: 15px;
}
.content {
    color: $button-color;
    font-weight: 600;
    font-size: 18px;
}
.descrip {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-style: italic;
    font-size: 12px;
}
.details-wrapper {
    position: relative;
    display: flex;
    padding: 20px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 7px;
}
.block-wrapper {
    padding: 30px 40px 0 0;
}


</style>