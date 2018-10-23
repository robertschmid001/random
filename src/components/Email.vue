<template>
  <div id="email">
    <div>
      <img src="./../assets/messagerie2.png" alt="">
    </div>
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
img {
  width: 100%;
  height: auto;
}
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
