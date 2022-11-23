<template>
  <view class="content">
    <img class="logo" :src="userStore?.avatarUrl" />
    <view class="text-area">
      <text class="title"> 尚未登录，请等登录 </text>
    </view>
    <view class="button-demo">
      <button class="cu-btn text-gray margin-tb-sm lg ground" style="font-size: 28rpx" @click="logout()"
        >重新登录</button
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/stores/modules/user';

  const userStore = useUserStore();
  const logout = () => {
    uni.navigateTo({
      url: 'index',
    });
  };
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
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
    font-size: 28rpx;
    color: #606266;
  }

  .button-demo {
    margin-top: 80rpx;
  }
</style>
