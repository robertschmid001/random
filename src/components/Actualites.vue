<template>
  <div id="actualites">
    <el-row>
      <el-col :span="13">
        <el-row class="padding">
          <ul>
            <li v-for="(newsLetter, index) in newsLetters" :key="index" @click="focusNews(newsLetter)" >
              <el-col :span="8">
                <div class=""><img :src="newsLetter.imgUrl" alt="" class="image-space"></div>
              </el-col>
              <el-col :span="16">
                <div class="content-wrapper">
                  <h4>{{newsLetter.title}}</h4>
                  <div class="text-size-vsm text">{{newsLetter.content}}<div class="dots">...</div></div>
                </div>
              </el-col>
            </li>
          </ul>
        </el-row>
      </el-col>

      <el-col :span="11" class="inside-padding">
        <div class="news-wrapper">
          <el-row>
          <el-col :span="24" class="image-wrapper">
            <img :src="this.activeNews.imgUrl" alt="" class="image-space-big">
          </el-col>
          <el-col :span="24">
            <h3 class="align-center">{{this.activeNews.title}}</h3>
          </el-col>
          <el-col :span="24">
            <div class="text-size-small">
              {{this.activeNews.content}}
            </div>
          </el-col>
          </el-row>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Actualites',
  props: {
  },
  data () {
    return {
      newsLetters: this.$store.state.newsLetters,
      activeNews: this.$store.state.newsLetters[0],
    }
  },
  methods: {
    focusNews(param) {
        this.$emit('details');
        this.activeNews = param
        this.$emit('messageOnInit');
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./../styles/_global.scss";

#actualites {
  background-color: $background-global;
  padding-top: 20px;
  padding-left: 30px;
}
.text {
  position: relative;
  line-height: 12px;
  height: 50px;
}
.dots {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.image-space {
  justify-content: center;
  display: flex;
  height: 75px;
  margin-right: 10px;
  overflow: hidden;
  object-fit: contain;
}
h4 {
  margin: 0;
  padding-bottom: 3px;
}
.content-wrapper {
  height: 75px;
  overflow: hidden;
}
.padding {
  padding-bottom: 20px;
}
.news-wrapper {
  padding: 30px 50px 30px 50px;
}
ul {
  height: 100%;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  max-height: 600px;
  box-sizing: border-box;
}
li {
  height: 70px;
  margin-bottom: 20px;
}
.image-space-big {
    max-width: 100%;
    object-fit: contain;
    max-height: 200px;
}
.image-wrapper {
  display: flex;
  justify-content: center;
}
.inside-padding {
  padding: 30px;
}
</style>
