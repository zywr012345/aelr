﻿<template>
    <div class="member-auth">
      <div class="common-header-wrap">
        <mt-header title="从业人员认证" class="common-header">
          <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div>
      <div class="form">
        <mt-field v-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="menu-item" label="真实姓名：" v-model="realname" />
        <mt-cell v-else title="真实姓名：" >{{realname}}</mt-cell>
        <mt-field v-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="menu-item" label="身份证号：" v-model="idcard" />
        <mt-cell v-else title="身份证号：" >{{idcard}}</mt-cell>
        <div class="idcard-wrapper">
            <div class="idcard-item">
                <div class="img">
                     <div v-if="user.member_idcard_image1_url" class="user-avatar">
                        <img v-if="user.member_idcard_image1_url" @click="openImage(user.member_idcard_image1_url)" :src="user.member_idcard_image1_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image1')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image1',$event)">
                        <img src="../../../assets/image/member_idcard_image1.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">身份证正面照片</div>
            </div>
            <div class="idcard-item">
                <div class="img">
                    <div v-if="user.member_idcard_image2_url" class="user-avatar">
                        <img v-if="user.member_idcard_image2_url" @click="openImage(user.member_idcard_image2_url)" :src="user.member_idcard_image2_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image2')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image2',$event)">
                        <img src="../../../assets/image/member_idcard_image2.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">健康证</div>
            </div>
            <div class="idcard-item">
                <div class="img">
                    <div v-if="user.member_idcard_image3_url" class="user-avatar">
                        <img v-if="user.member_idcard_image3_url" @click="openImage(user.member_idcard_image3_url)" :src="user.member_idcard_image3_url">
                        <span v-if="user.member_auth_state!=1 && user.member_auth_state!=3" @click="dropImage('member_idcard_image3')" class="del-btn iconfont">&#xe619;</span>
                    </div>
                    <div v-else-if="user.member_auth_state!=1 && user.member_auth_state!=3" class="user-avatar iconfont icon-xiangji" ref="upload_btn1" @change="uploadInformPic('member_idcard_image3',$event)">
                        <img src="../../../assets/image/member_idcard_image3.png">
                        <input type="file" accept="image/*">
                    </div>
                </div>
                <div class="title">学习证</div>
            </div>
        </div>
        <mt-button class="ds-button-large mb-10" type="primary" @click="submitInformation" v-if="user.member_auth_state!=1 && user.member_auth_state!=3">保存</mt-button>
      </div>
      <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
        <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
      </mt-popup>
    </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { uploadAuth, dropAuth, updateMemberAuth } from '../../../api/member'
export default {
  components: {
  },
  name: 'MemberProfileSet',
  data () {
    return {
      if_confirm: false,
      showimage: '',
      isshow: false,
      realname: '',
      idcard: '',
      member_ww: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      user: state => state.member.info
    }),
    getBannerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = width
      let itemHeight = height
      return {
        maxWidth: itemWidth + 'px',
        maxHeight: itemHeight + 'px'
      }
    }
  },
  created: function () {
    if (this.user) {
      this.realname = this.user.member_truename
      this.idcard = this.user.member_idcard
    }
  },

  methods: {
    ...mapMutations({
      memberEdit: 'memberEdit'
    }),
    submitInformation () {
      if (!this.if_confirm) {
        this.confirmSumit()
        return
      }
      MessageBox.confirm('请仔细核对信息，确认上传后除非管理员审核否则无法再次上传').then(action => {
        this.confirmSumit()
      })
    },
    confirmSumit () {
      updateMemberAuth(this.realname, this.idcard, this.if_confirm).then(res => {
        if (this.if_confirm) {
          this.memberEdit({ member_truename: this.realname, member_idcard: this.idcard, member_auth_state: 1 })
          Toast(res.message)
        } else {
          this.if_confirm = true
          this.submitInformation()
        }
      }).catch(function (error) {
        Toast(error.message)
      })
    },
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
    dropImage (id) {
      MessageBox.confirm('确定要删除该图片吗？').then(action => {
        dropAuth(id).then(res => {
          this.user[id + '_url'] = ''
          var temp = {}
          temp[id + '_url'] = ''
          this.memberEdit(temp)
        }).catch(function (error) {
          Toast(error.message)
        })
      })
    },
    uploadInformPic (index, event) {
      if (typeof (event.target.files[0]) === 'undefined') {
        return
      }
      let formdata = new FormData()
      formdata.append(index, event.target.files[0])
      formdata.append('id', index)
      uploadAuth(formdata).then(res => {
        this.user[index + '_url'] = res.result.file_path
        var temp = {}
        temp[index + '_url'] = res.result.file_path
        this.memberEdit(temp)
      }).catch(function (error) {
        Toast(error.message)
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
  .member-auth {
    background: #fff;
    .idcard-wrapper{
        padding: .5rem 5% ;
        background: #f5f5f5;
        .idcard-item{
            background: #fff;
            padding: 1rem 0;
            margin-bottom:.5rem;
            .del-btn{
                    position: absolute;
                    font-size: 1.5rem;
                    top: -.75rem;
                    right: -.75rem;
            }
            .title{
                font-size: .8rem;
                text-align: center;
                margin-top:.5rem;
            }
        }
    }
    .user-avatar {
      display: block;
      position: relative;
      width: 10rem;
      height: 8rem;
      margin: 0 auto;
      text-align: center;
      img {
        width: 100%;
        height: 100%
      }
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0
      }
    }
    .user-avatar::before {
      position: absolute;
      font-size: 1.5rem;
      line-height: 8rem;
      left: 50%;
      margin-left: -.75rem;
      color: rgba(0, 0, 0, 0.5)
    }
  }

</style>
<style>
  .member-auth .mint-cell-title{flex:unset;width:7rem}
  .member-auth .mint-cell-value{flex:1}
</style>
