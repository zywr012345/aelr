<template>
  <div class="category">
    <home-common-search></home-common-search>
    <goodsclass-body></goodsclass-body>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HomeCommonSearch from '../common/HomeCommonSearch'
import GoodsclassBody from './GoodsclassBody'
export default {
  name: 'HomeGoodsclass',
  components: {
    HomeCommonSearch,
    GoodsclassBody
  },
  computed: {
    ...mapState({
      token: state => state.member.token,
	tsids:state =>state.member.tsids,
	tcids:state =>state.member.tcids,
	area_info:state =>state.member.tarea_info,
	area_id:state =>state.member.tarea_id,
    })

  },
mounted(){
this.gclass()
},
  methods: {
    ...mapMutations({
       membertuans: 'memberTuans'
    }),
     gclass(){
	this. membertuans({tid:0,tsids:this.tsids,tcids:this.tcids,tarea_info:this.area_info,tarea_id:this.area_id,mclass:0})
      }
},

}
</script>

<style scoped lang='scss'>

</style>
