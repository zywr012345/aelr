<template>
  <div class="container">
    <home-common-search :from='"home"'></home-common-search>
    <index-menu  :items="navs"></index-menu>
    <article_list  :items="articles" ></article_list>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
import HomeCommonSearch from '../common/HomeCommonSearch'
import IndexMenu from './IndexMenu'
import Articlelist from './Articlelist'

export default {
  name: 'HomeFaxian',
  data () {
    return {

    }
  },
  components: {

    HomeCommonSearch,
	Articlelist,
    IndexMenu,

  },
  mounted () {
  },
  created: function () {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
