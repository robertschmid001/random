<template>
  <div id="actualites">
    <el-row>
      <el-col :span="12">
        <el-row class="padding">
          <ul>
            <li v-for="(newsLetter, index) in newsLetters" :key="index" @click="focusNews(newsLetter)" >
              <el-col :span="8">
                <div class="image-space"><img :src="newsLetter.imgUrl" alt="" class="image-space"></div>
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

      <el-col :span="12">
        <div class="news-wrapper">
          <el-col :span="24" class="image-wrapper">
            <img :src="this.activeNews.imgUrl" alt="" class="image-space-big">
          </el-col>
          <el-col :span="24">
            <h5 class="align-center">{{this.activeNews.title}}</h5>
          </el-col>
          <el-col :span="24">
            <div class="text-size-small">
              {{this.activeNews.content}}
            </div>
          </el-col>
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
      activeNews: '',
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
#actualites {
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
  height: 75px;
  background: white;
  margin-right: 20px;
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
  padding: 0 80px 30px 50px;
}
ul {
  height: 100%;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  max-height: 800px;
}
li {
  height: 70px;
  margin-bottom: 20px;
}
.image-space-big {
    max-width: 200px;
    height: auto;
}
.image-wrapper {
  display: flex;
  justify-content: center;
}
</style>
