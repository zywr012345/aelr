<template>
    <div class="container">
    <div class="common-header-wrap">
        <mt-header title="进货台账" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
    </div>
    <div style="width:40%;float:left" @click="onDate('d_start')"><mt-cell title="起始日期" is-link>{{dt.d_start?$moment.unix(dt.d_start).format('YYYY-MM-DD'):''}}</mt-cell></div>
    <div style="width:40%;float:left" @click="onDate('d_end')"><mt-cell title="结束日期" is-link>{{dt.d_end?$moment.unix(dt.d_end).format('YYYY-MM-DD'):''}}</mt-cell></div>
   <button class="toolbar-item confirm-item" @click="getGoodsList">查询</button>
<div>
      <el-table
   		 :data="tableData"
    		height="350"
    		border
   		 style="width: 100%">

   	 <el-table-column
      		prop="goods_name"
      		label="商品名称"
      		width="100">
    		</el-table-column>
    	<el-table-column
      		prop="goods_scdate"
     		 label="生产日期"
      		width="100">
    	</el-table-column>
    	<el-table-column
      		prop="guige"
      		label="规格"
		@cell-click="showxiangqing=true">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_jhl"
      		label="数量">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_bzq"
      		label="保质期">
   	 </el-table-column>
    	<el-table-column label="供货详情">
        		<template slot-scope="scope">	<el-button  type="success"    @click="pshow(scope.$index, scope.row)">查看</el-button></template>
   	 </el-table-column>
    	<el-table-column
      		prop="goods_addtime"
      		label="进货时间">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_yhren"
      		label="验货人">
   	 </el-table-column>

       </el-table>
</div>
  <div>
     
      <mt-datetime-picker
              ref="datePicker"
              type="date"
              :startDate="new Date('2000/1/1')"
              yearFormat="{value}年"
              monthFormat="{value}月"
              dateFormat="{value}日"
              :value="selectData?(new Date(selectData)):(new Date())"
              @confirm="dateConfirm"
      >
      </mt-datetime-picker>
       <mt-popup v-model="showxiangqing" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="进货详情" class="common-header">
                    <mt-button slot="left" icon="back" @click="showxiangqing=false"></mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content" >
              	
    	<mt-field label="进货商" v-model=" p.ghs"></mt-field>
    	<mt-field label="销售商" v-model=" p.xss"></mt-field>
	<div class="label">商品安全信息</div>
    		<mt-field label="产地" v-model=" p.goods_chandi"></mt-field>
    	<mt-cell class="mt-5" title="产地证明">
        		<div class="user-avatar-wrapper">
            			<div v-if="p. goods_chandipic" class="user-avatar">
                			<img :src=" p.goods_chandipic" :style="getBannerStyle1" @click="openImage( p.goods_chandipic)">
           
            			</div>

        		</div>
    	</mt-cell>
    	<mt-field label="供货商" v-model="p.goods_gonghuo"></mt-field>
    	<mt-cell class="mt-5" title="购货证明">
        		<div class="user-avatar-wrapper">
            			<div v-if="p.goods_gonghuopic" class="user-avatar">
                				<img :src=" p.goods_gonghuopic" :style="getBannerStyle1" @click="openImage( p.goods_gonghuopic)">
        
            			</div>

        		</div>
   	 </mt-cell>
   	<mt-cell class="mt-5" title="检验报告">
        		<div class="user-avatar-wrapper">
            			<div v-if=" p.goods_jianyan" class="user-avatar">
                				<img :src="p.goods_jianyan" :style="getBannerStyle1" @click="openImage(p.goods_jianyan)">
    
            			</div>

        		</div>
    	</mt-cell>
    
	
    </div>
        	<mt-popup v-model="isshow"   class="popup">
            		<img :src="showimage" :style="getBannerStyle" @click="isshow=false">
        	</mt-popup>
   </mt-popup>
    </div>
    </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { getGoodsList1, dropGoods, goodsShow, goodsUnshow } from '../../../api/sellerGoods'
export default {
  data () {
    	return {
      
		dt:{d_start:'',d_end:'',},
		dataName:'',
		selectData: '',
       		 tableData: [],
		p:[],
		showxiangqing:false,
		showimage: '',
 		isshow: false,
   	 }
  },
  computed: {
    getBannerStyle: function () {
      const { width, height } = window.screen
      var width1= (width-0)*0.8
      var height1= (height-0)*0.8
      return {
        maxWidth: width1 + 'px',
        maxHeight: height1+ 'px'
      }
    },
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

  methods: {

	pshow(i,r){
		var s=r.goods_suyuan
		var sA=s.split('|');
		this.p.ghs=sA[0];
		this.p.xss=sA.pop();
		this.p.goods_gonghuo=r.goods_gonghuo
		this.p.goods_gonghuopic=r.goods_gonghuopic
		this.p.goods_chandi=r.goods_chandi
		this.p.goods_chandipic=r.goods_chandipic
		this.p.goods_jianyan=r.goods_jianyan
		this.showxiangqing=true
	},
    	openImage (src) {
      		this.showimage = src
     		 this.isshow = true
   	 },

    	onDate (name) {
     		 this.dataName = name
      		this.$refs.datePicker.open()
    	},
    	dateConfirm (value) {
      		this.dt[this.dataName]=parseInt(value.getTime() / 1000)
     		 this.$forceUpdate()
    	},
    getGoodsList () {
      Indicator.open()
      getGoodsList1( this.dt.d_start, this.dt.d_end).then(res => {
          this. tableData = res.result.goods_list
	 Indicator.close()
      })
    },

    },
  }

</script>

<style scoped>

</style>
