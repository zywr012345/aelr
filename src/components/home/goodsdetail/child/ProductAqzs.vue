<template>
	

<div class="ui-detail-info1 product-aqzs">
<div class="label">商品追溯</div>
    <mt-field label="平台进货商" :class="{ft_c:chase}" v-model=" ghs"></mt-field>
    <mt-field label="销售商" :class="{ft_c:chase}" v-model=" xss"></mt-field>
<div class="label">商品安全信息</div>
<!-- <viewer :images="viewerList"> -->
        
    <mt-field label="产地" v-model=" detailInfo.goods_chandi"></mt-field>
    <mt-cell class="mt-5" title="产地证明">
        <div class="user-avatar-wrapper">
            <div v-if="detailInfo. goods_chandipic" class="user-avatar">
                <img-viewer 
                    :options="options"
                    @inited="inited"
                    class="viewer" ref="viewer"
                    >
                    <template>
                        <img :src=" detailInfo.goods_chandipic" :style="getBannerStyle1">
                    </template>
                </img-viewer>
            </div>

        </div>
    </mt-cell>
    <mt-field label="供货商" v-model=" detailInfo.goods_gonghuo"></mt-field>
    <mt-cell class="mt-5" title="购货证明">
        <div class="user-avatar-wrapper">
            <div v-if=" detailInfo.goods_gonghuopic" class="user-avatar">
                <img-viewer 
                    :options="options"
                    @inited="inited"
                    class="viewer" ref="viewer"
                    >
                    <template>
                        <img :src=" detailInfo.goods_gonghuopic" :style="getBannerStyle1">
                    </template>
                </img-viewer>
        
            </div>

        </div>
    </mt-cell>
   <mt-cell class="mt-5" title="检验报告">
        <div class="user-avatar-wrapper">
            <div v-if=" detailInfo.goods_jianyan" class="user-avatar">                           
                <img-viewer 
                    :options="options"
                    @inited="inited"
                    class="viewer" ref="viewer"
                    >
                    <template>
                        <img :src=" detailInfo.goods_jianyan" :style="getBannerStyle1">
                    </template>
                </img-viewer>
    
            </div>

        </div>
    </mt-cell>
<!-- </viewer> -->
</div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { productLike, productUnlike } from '../../../../api/homegoodsdetail'
import { Toast, Indicator } from 'mint-ui'
// npm install v-viewer --save

import 'viewerjs/dist/viewer.css'
import Viewer from "v-viewer/src/component.vue"
export default {
    components: {
        "img-viewer":Viewer
    },
  data () {
    return {
        ghs:'',
        xss:'',      
        showimage: '',
        isshow: false,
        chase:false,//产品追溯信息文本颜色
        // images: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg'],       
        options:{
          'button':true, //右上角按钮
          "zoomable": true, //是否可以缩放
          "movable": true, //是否可以移动
          "transition": true, //使用 CSS3 过度
          "fullscreen": true, //播放时是否全屏
          "keyboard": true, //是否支持键盘
          "title": false, //当前图片标题
          "tooltip": false, //显示缩放百分比
          "navbar": false, //底部缩略图
          "toolbar": false, //底部工具栏
          "rotatable": false, //是否可旋转
          "scalable": false, //是否可翻转
        }
    }
  },
  computed: {
    ...mapState({
      isFavorate: state => state.goodsdetail.isFavorate,
      detailInfo: state => state.goodsdetail.detailInfo,
      currentProductId: state => state.goodsdetail.currentProductId,
      user: state => state.member.info
    }),
    getBannerStyle1: function () {
      const { width, height } = window.screen
      var width1= (width-0)*0.3
      var height1= (height-0)*0.3
      return {
        maxWidth: width1 + 'px',
        maxHeight: height1+ 'px'
      }
    },
  },
  created () {
  },
  mounted () {
    this.fl();
  },
  methods: {
    ...mapMutations({
      saveInfo: 'saveDetailInfo',
      changeIndex: 'changeIndex',
      saveIsFavorate: 'saveIsFavorate'
    }),
    fl () {
    var s=this.detailInfo.goods_suyuan;
    // 如果 S 不是 null
    if( s != null ){
        var sA=s.split('|');
        this.ghs=sA[0];
        this.xss=sA.pop();
        this.chase = false;
    }else{
        this.ghs='暂无信息';
        this.xss='暂无信息';
        this.chase = true;
    }
    },
    inited (viewer) {
        this.$viewer = viewer
    },
  }
}
</script>

<style scoped lang="scss">
.product-aqzs{
    .label{
        padding:.5rem;
        font-size: .7rem;
    }
    .ft_c{
        &/deep/.mint-cell-value{
            input{
                color:#e93b3d
            }            
        }
    }
    &/deep/.mt-5{
        .mint-cell-title{
            width: 105px;
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
        }
    }
}
    .container{
        background: #fff;
        .label{
            padding:.5rem;
            font-size: .7rem;
            background: #eee;
        }
        .user-avatar-wrapper{display: inline-block;vertical-align: top;margin-right: .5rem;margin-bottom:.5rem}
        .user-avatar-wrapper .del-btn{position:absolute;bottom:.2rem;right:.2rem}
        .user-avatar {
            display: block;
            border:1px solid #eee;
            position: relative;
            width: 5rem;
            height: 5rem;
            margin: 0 auto;
            text-align: center;
            img {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;	
            }
            input {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0
            }
            .center-text{padding:.2rem;padding-top:3.5rem;font-size:.6rem}
        }
        .user-avatar::before {
            position: absolute;
            font-size: 1.5rem;
            line-height: 5rem;
            left: 50%;
            margin-left: -.75rem;
            color: rgba(0, 0, 0, 0.5)
        }
        .btn-wrapper{display:flex;
            .btn{flex:1}
        }
        .mint-radiolist {
            display: flex;
            .mint-cell {
                flex: 1;
                .mint-radio-input:checked + .mint-radio-core {
                    background-color: #ff9900 !important;
                    border-color: #ff9900 !important;
                }
            }
        }
        .body-list{
            .body-item{padding:1rem;position:relative;min-height:2.2rem;font-size:.6rem;
                img{max-width:100%}
                .btn-list{text-align:right;background:rgba(0,0,0,.5);position:absolute;top:.5rem;bottom:.5rem;left:.5rem;right:.5rem;padding:.5rem;box-sizing:border-box;
                    i{font-size:1.2rem;margin-left:.5rem;color:#fff;}
                }
            }
        }
        .popup{width:80%;overflow:scroll;}
        .brand-list{
            h2{line-height:2rem;font-size:.7rem;padding-left:.5rem;font-weight:700;}
            ul{overflow: hidden;border-top:1px solid #f6f6f9}
            li{
                box-sizing: border-box;
                text-align: center;
                width: 25%;
                padding-bottom:20%;
                float: left;
                border-bottom: 1px solid #f6f6f9;
                border-right: 1px solid #f6f6f9;
                position:relative;
                .p-img{
                    position:absolute;
                    top:.5rem;
                    bottom:.5rem;
                    right:.5rem;
                    left:.5rem;
                    background-size:contain;
                    background-position:center;
                    background-repeat:no-repeat;
                }

            }
            li:nth-child(4n) {
                border-right: 0;
            }
        }
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
