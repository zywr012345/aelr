<template>
<div class="container">
    <div class="common-header-wrap">
        <mt-header title="商品发布" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
    </div>
    <step :options="options" :active="0"></step>
    <div @click="classVisible=true">
        <mt-cell class="menu-item"
                 title="商品分类"
                 :value="goods_class.gc_name"
                 is-link>
        </mt-cell>
    </div>
    <mt-button size="large" type="primary" class="mt-10" @click="nextStep">下一步</mt-button>
    <!--服务分类-->
    <mt-popup v-model="classVisible" position="bottom">
        <mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
            <div class="toolbar">
                <button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
                <div class="picker-header">选择分类</div>
                <button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
            </div>
        </mt-picker>
    </mt-popup>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
import Step from '../../Step'
import { getGoodsClass } from '../../../api/sellerGoods'
export default {
  data () {
    return {
      options: [{ title: '选择商品分类' }, { title: '填写商品详情' }, { title: '上传商品图片' }],
      classVisible: false,
      goods_class: {},
      store_bind_class: false
    }
  },
  computed: {
    ...mapState({
      items: state => state.goodsclass.items
    }),
    buildItems: function () {
      if (!this.items || !this.store_bind_class || !this.items[0]) {
        return []
      }
      let items = new Array()

      if (this.store_bind_class.bind_all) {
        this.getDefaultItems(this.items, items)
      } else {
        this.getDefaultItems(this.store_bind_class.goods_class, items)
      }
      return items
    }
  },
  created () {
    getGoodsClass().then(res => {
      this.store_bind_class = res.result
    }).catch(error => {
      Toast(error.message)
    })
    this.fetchGoodsclassList()
  },
  components: {
    Step
  },
  methods: {
    ...mapActions({
      fetchGoodsclassList: 'fetchGoodsclassList'
    }),
    getDefaultItems (_item, defaultItems) {
      defaultItems.push({
        flex: 1,
        values: _item,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: _item[0].children,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: (_item[0].children && _item[0].children.length) ? _item[0].children[0].children : [],
        textAlign: 'center'

      })
    },

    cancelClass () {
      this.classVisible = false
    },
    confirmClass () {
      let values = this.$refs.class_picker.getValues()
      var temp = values[2]
      if (!temp) {
        temp = values[1]
      }
      if (!temp) {
        temp = values[0]
      }
      this.goods_class.gc_name = temp.value
      this.goods_class.gc_id = temp.id

      this.classVisible = false
    },
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
      picker.setSlotValues(3, values[2] ? values[2].children : [])
    },
    nextStep () {
      if (!this.goods_class.gc_id) {
        Toast('请选择商品分类')
        return
      }
      this.$router.push({ name: 'SellerGoodsForm2', query: { class_id: this.goods_class.gc_id, commonid: this.$route.query.commonid } })
    }
  }
}
</script>

<style scoped lang="scss">
.container{
    background: #fff;
}
.toolbar {
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #f0f2f5;
    .toolbar-item {
        font-size: .6rem;
        border: none;
        border-radius: 0;
        background-color: #f0f2f5;
    }
    .cancel-item {
        margin-left: 0.5rem;
        color: #4e545d;
    }
    .confirm-item {
        margin-right: 0.5rem;
        color: red;
    }
    .picker-header {
        color: #4e545d;
        line-height: 2rem;
        font-size:.8rem;
    }
}
</style>
