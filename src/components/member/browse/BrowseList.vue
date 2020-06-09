<template>
  <div class="container">
    <div class="common-header-wrap">
      <mt-header title="浏览历史" class="common-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        <mt-button slot="right" @click="clearallBrowse()">清空浏览记录</mt-button>
      </mt-header>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <div class="list-wrapper" v-if="goodsbrowse_list && goodsbrowse_list.length">
      <mt-cell-swipe class="browse-list" v-for="(item, index) in goodsbrowse_list">
        <div class="info">
          <img class="image" :src="item.goods_image_url" />
          <div class="title" @click="goGoods(item.goods_id)">{{ item.goods_name }}</div>
        </div>
    </mt-cell-swipe>
    </div>
    <empty-record v-else-if="goodsbrowse_list && !goodsbrowse_list.length"></empty-record>
  </div>
  </div>
</template>

<script>
import { getBrowseList, clearallBrowse } from '../../../api/memberBrowse'
import { Toast, MessageBox, Indicator } from 'mint-ui'
import EmptyRecord from '../../../components/EmptyRecord'
export default {
  components: {
    EmptyRecord
  },
  data () {
    return {
      params: { 'page': 0, 'per_page': 10 },
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多
      goodsbrowse_list: false
    }
  },
  created () {

  },
  methods: {
    // 清空浏览记录
    clearallBrowse () {
      clearallBrowse(this.params).then(res => {
        this.goodsbrowse_list = false
      }).catch(function (error) {
        Toast(error.message)
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    loadMore () {
      this.loading = true
      this.params.page = ++this.params.page
      if (this.isMore) {
        this.loading = false
        this.getBrowseList(true)
      }
    },
    getBrowseList () {
      Indicator.open()
      getBrowseList(this.params).then(res => {
        Indicator.close()
        if (res) {
          this.goodsbrowse_list = res.result.goodsbrowse_list
          if (res.result.hasmore) {
            this.isMore = true
          } else {
            this.isMore = false
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

}
.header {
  border-bottom: 1px solid #e8eaed;
}
.list-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .browse-list {
    background-color: #fff;
    border-bottom: 1px solid #e8eaed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.55rem 0.75rem;
    .right{width:2.5rem;}
    .info {
      flex:1;
      .title {
        font-size:0.8rem;
        color: #333;
        width: 70%;
        height: 70%;
        float:right;
      }
      .image {
        width: 25%;
        height: 25%;
        flex-shrink: 0;
        float:left;
      }
    }
  }
}

</style>
