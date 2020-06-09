<template>
  <div class="menu clear-fix">
    	<div class="menu-item" @click="see1('http://www.bioplasm.cn/wx/spaqpx/')">
      		<i class="iconfont bg-2">&#xe68c;</i>
      		<span class="menu-item-title">从业学习</span>
    	</div>
   	 <div class="menu-item" @click="see1('http://www.bioplasm.cn/wx/spaqpx/')">
      		<i class="iconfont bg-4">&#xe6e6;</i>
      		<span class="menu-item-title">直通315</span>
    	</div>
    	<div class="menu-item" @click="see('https://www.wenjuan.com/s/RfEZnigY/?share_device=weixin')">
      		<img class="menu-item-icon" src="../../../assets/image/home/home-index-menu5.png" />
      		<span class="menu-item-title">问卷调查</span>
    	</div>
    	<div class="menu-item" @click="see('https://mp.weixin.qq.com/mp/homepage?__biz=MzUyNTgwMDI3Ng==&hid=29&sn=c0fecf4821763422c1c48fa566b4dc2e&scene=18')">
     		 <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu8.png" />
      		<span class="menu-item-title">新闻资讯</span>
    	</div>
    	<div class="menu-item" @click="goArticleclass">
      		<i class="iconfont bg-4">&#xe674;</i>
      		<span class="menu-item-title">帮助中心</span>
    	</div>
    <div class="menu-item">
      <img class="menu-item-icon" @click="$router.push({name:'HomeGoodslist',query:{xianshi:1}})" src="../../../assets/image/home/home-index-menu3.png" />
      <span class="menu-item-title">促销</span>
    </div>
    <div class="menu-item" @click="goPointsgoods">
      <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu5.png" />
      <span class="menu-item-title">积分商城</span>
    </div>
    <div class="menu-item" @click="myOrder">
      <img class="menu-item-icon" src="../../../assets/image/home/home-index-menu8.png" />
      <span class="menu-item-title">我的订单</span>
    </div>
    <div class="menu-item" @click="goGroupBuy">
      <i class="iconfont bg-6">&#xe633;</i>
      <span class="menu-item-title">抢购</span>
    </div>
    <div class="menu-item" @click="goMemberIndex">
      <i class="iconfont bg-2">&#xe68c;</i>
      <span class="menu-item-title">个人中心</span>
    </div>
<iframe 
   id="bdIframe"  :src="tourl" frameborder="0"  :style="select"  scrolling="auto"  @onload="chht">           
    
</iframe>
  
  </div>


</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomeMenu',
  props: ['items'],
 data () {
	return {
		tourl:'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5MzQ2MTM0Nw==&hid=2&sn=586e9645d736e4575d1396aa899c204b&scene=18',
		select:{width:'100%', height:'100px'},
	}
},
  computed: {
    ...mapState({
      isOnline: state => state.member.isOnline,
      navs: state => state.home.navs
    })
  },
  mounted(){
    const oIframe = document.getElementById('bdIframe');
  const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
   this.select.width = (Number(deviceWidth)-10) + 'px'; //数字是页面布局宽度差值
   this.select.height = (Number(deviceHeight)-120) + 'px'; //数字是页面布局高度差
//this.select.height =oIframe.contents().find('body').height();
  },
  methods: {
see(s){
this.tourl=s

},
chht(){
var oIframe = document.getElementById('bdIframe');
this.select.height =oIframe.contents().find('body').height();
},
see1(s){window.location.href=s},
    showLogin () {
      this.$router.push({ name: 'HomeMemberLogin' })
    },
    goPointsgoods () {
      this.$router.push({ 'name': 'HomePointsgoods' })
    },
    goStoreclass () {
      this.$router.push({ 'name': 'HomeStoreclass' })
    },
    goPintuan () {
      this.$router.push({ 'name': 'HomePintuanList' })
    },
    goBargain () {
      this.$router.push({ 'name': 'HomeBargainlist' })
    },
    goBrand () {
      this.$router.push({ 'name': 'HomeBrand' })
    },
    goArticleclass () {
      this.$router.push({ 'name': 'HomeArticleclass' })
    },
    goMemberIndex () {
      this.$router.push({ 'name': 'MemberIndex' })
    },
    goGroupBuy () {
      this.$router.push({ 'name': 'HomeGroupBuyList' })
    },
    goVrGroupBuy () {
      this.$router.push({ 'name': 'HomeVrGroupBuyList' })
    },
    goMemberPointSignin () {
      this.$router.push({ 'name': 'MemberPointSignin' })
    },
    myOrder () {
      if (this.isOnline) {
        this.$router.push({
          name: 'MemberOrderList'
        })
      } else {
        this.showLogin()
      }
    },
    goAdUrl (item) {
      switch (item.adv_type) {
        case 'goods':
          this.$router.push({ 'name': 'HomeGoodsdetail', query: { goods_id: item.adv_typedate } })
          break
        case 'store':
          this.$router.push({ 'name': 'HomeStoredetail', query: { id: item.adv_typedate } })
          break
        case 'article':
          this.$router.push({ 'name': 'HomeArticledetail', query: { article_id: item.adv_typedate } })
          break
        case 'url':
          window.location.href = item.adv_typedate
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .menu {
    overflow: hidden;
    justify-content: space-around;
    background: #FFFFFF;
    padding-top:1rem;
    .menu-item {
      margin-bottom:1rem;
      width:20%;
      text-align:center;
      float: left;
      .iconfont{
        margin:auto;
        width: 2rem;
        height: 2rem;
        line-height:2rem;
        font-size:1.4rem;
        color:#fff;
        overflow: hidden;
        display:block;
        text-align: center;
        border-radius:50%;
      }
      .menu-item-icon {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
      }
      .menu-item-title {
        display:block;
        color: #333;
        font-size:.6rem;
        margin-top:.2rem;
      }
    }
  }
  .bg-1{background-image: linear-gradient(to bottom , #d69dcc,#e8198b );}
  .bg-2{background-image: linear-gradient(to bottom , #04befe,#4481eb );}
  .bg-3{background-image: linear-gradient(to bottom , #cc208e,#6713d2 );}
  .bg-4{background-image: linear-gradient(to bottom , #ff9a44,#fc6076 );}
  .bg-5{background-image: linear-gradient(to bottom , #00ecbc,#007adf );}
  .bg-6{background-image: linear-gradient(to bottom , #ff8177,#b12a5b );}
</style>
