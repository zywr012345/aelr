<template>
    <div class="container">
      <div class="common-header-wrap">
        <mt-header title="店铺入驻" class="common-header">
          <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div>
        <img class="back" src="../../../assets/image/sellerjoinin_back.png">
        <div class="wrapper mt-20">
            <div class="btn-wrapper">
                <mt-button class="btn" size="large" type="primary" >个人入驻(未开放)</mt-button>
                <mt-button class="btn" size="large" type="primary" @click="nextStep(0)">商家入驻</mt-button>
            </div>
            <div @click="onAgreement">
                <mt-checklist
                        v-model="value"
                        :options="options">
                </mt-checklist>
            </div>
        </div>
    </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { getStoreJoinin } from '../../../api/seller'
export default {
  components: {
  },
  data () {
    return {
      options: [{ label: '《同意商家入驻协议》', value: 1 }],
      value: [1]
    }
  },
  mounted () {
  },
  computed: {
      ...mapState({
          storeJoinin: state => state.member.storeJoinin
      })
  },
  created: function () {
    getStoreJoinin().then(res => {
      var store_joinin = res.result.store_joinin
      if (store_joinin) {
          if(store_joinin.joinin_state == 30){
              MessageBox('初审失败', store_joinin.joinin_message)
          }
        if (store_joinin.joinin_state == 11 || store_joinin.joinin_state == 20 || store_joinin.joinin_state == 31) {
          this.$router.push({ name: 'SellerJoinin5' })
          return
        }
        if (store_joinin.joinin_state == 40) {
          Toast('您的店铺已开通')
          this.$router.push({ name: 'HomeSellerLogin' })
          return
        }
        // if (!this.storeJoinin) {
          this.sellerJoininSave({ storeJoinin: store_joinin })
        // }
      }
    }).catch(error => {
      Toast(error.message)
    })
  },

  methods: {
    ...mapMutations({
      sellerJoininSave: 'sellerJoininSave'
    }),
    nextStep (type) {
      this.sellerJoininSave({ storeJoinin: { store_type: type } })
      this.$router.push({ name: 'SellerJoinin2' })
    },
    onAgreement () {
      this.$router.push({
        name: 'HomeDocument',
        query: { type: 'open_store' }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
    .container {
        background: #fff;
    }
.back{width:100%}
    .btn-wrapper{display: flex;padding:0 .5rem}
    .btn{margin:0 .5rem}
</style>
