<template>
  <view v-show="!hidePage" class="content">
    <image class="logo" src="/static/images/logo.svg" />
    <view class="text-area">
      <text class="title"> 您好 - {{ userStore?.wechatName }} </text>
    </view>

    <form class="login-form u-m-40">
      <view class="cu-form-group u-p-t-28 u-p-b-28">
        <view class="title">用户名</view>
        <input v-model="form.username" placeholder="请输入用户名" name="input" />
        <text class="cuIcon-service" />
      </view>
      <view class="cu-form-group u-p-t-28 u-p-b-28">
        <view class="title">密码</view>
        <input v-model="form.password" type="password" placeholder="请输入密码" name="input" />
      </view>
    </form>

    <view class="box u-m-t-40">
      <view class="cu-bar btn-group">
        <button class="cu-btn bg-gradual-red shadow-blur round lg" @click="submit">提交</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { onShow } from '@dcloudio/uni-app';
  import { LoginAccount } from '@/api/models/login';
  import { useAuthStore } from '@/stores/modules/auth';
  import { useUserStore } from '@/stores/modules/user';
  import type { LoginModel } from '@/api/models/authModel';
  import to from 'await-to-js';

  const authStore = useAuthStore();
  const userStore = useUserStore();

  const form = reactive<LoginAccount>({
    username: '',
    password: '',
    wxusername: '',
  });

  const formReady = ref(false);
  const submit = async () => {
    if (form.username.length > 0 && form.password.length > 0) {
      formReady.value = true;
    }

    if (!formReady.value) {
      uni.showToast({
        icon: 'none',
        title: '请输入用户名或密码',
      });
      return;
    }

    if (uni.getUserProfile) {
      uni.getUserProfile({
        desc: '用以获取用户昵称、头像等',
        success: function (userProfile) {
          const parms = {
            wechatName: userProfile.userInfo.nickName,
            avatarUrl: userProfile.userInfo.avatarUrl,
          };
          userStore.setWechatDetail(parms);
        },
        fail: function (e) {
          console.log('uniLogin fail:', e);
          formReady.value = false;
        },
      });
    }
    if (formReady.value) {
      if (userStore.uniGetOpenCode()) {
        let params = {
          loginName: form.username,
          password: form.password,
          opencode: userStore.openCode,
        };
        userStore.setAccount(form.username);
        const [err, data] = await to<LoginModel, ApiResult>(authStore.login(params));
      }
    }
  };

  /**
   * ==================================================== init ====================================================
   */
  // 凡跳转登录页清空token，401跳转该页
  onShow(() => {});
</script>

<style lang="scss" scoped>
  page {
    background-color: #ffffff;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 100rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    min-width: 146rpx;
    font-size: 28rpx;
    color: #606266;
  }

  .login-form {
    .uni-input-placeholder {
      color: #aaaaaa;
    }
  }

  .box {
    width: 100%;
  }
</style>
