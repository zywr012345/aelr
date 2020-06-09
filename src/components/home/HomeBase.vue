<template>
    <div class="home-base">
        <router-view/>
        <div v-if="$route.meta.footer.show" class='common-footer-wrap'>
            <mt-tabbar v-model='home_selected' fixed class="common-footer">
                <mt-tab-item class='item-wrap' :class="{'active':$route.name=='HomeIndex'}" id='home_index'><router-link :to="{ name: 'HomeIndex'}" class='item'><i class='iconfont icon-homepage' /><span class='text'>首页</span></router-link></mt-tab-item>
                <mt-tab-item class='item-wrap' :class="{'active':$route.name=='HomeGoodsclass'}" id='home_goodsclass'><router-link :to="{ name: 'HomeGoodsclass'}" class='item'><i class="iconfont icon-fenlei" /><span class='text'>分类</span></router-link></mt-tab-item>
                <mt-tab-item class='item-wrap' :class="{'active':$route.name=='HomeMapdh'}" id='home_mapdh'><router-link :to="{ name: 'HomeMapdh'}" class='item'><i class="iconfont icon-jiangjia" /><span class='text'>导航</span></router-link></mt-tab-item>
                <mt-tab-item class='item-wrap' :class="{'active':$route.name=='HomeFaxian'}" id='home_cart'><router-link :to="{ name: 'HomeFaxian'}" class='item'><i class='iconfont icon-search' /><span class='text'>发现</span></router-link></mt-tab-item>
                <mt-tab-item class='item-wrap' :class="{'active':$route.name=='MemberIndex'}" id='member_index'><router-link :to="{ name: 'MemberIndex'}" class='item'><i class='iconfont icon-people' /><span class='text'>我的</span></router-link></mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>

export default {
  name: 'HomeBase',
  data () {
    return {
      home_selected: 'home_index'
    }
  },
  computed: {

  },
  created: function () {
  
  }
}
</script>
