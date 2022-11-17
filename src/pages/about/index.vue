<template>
  <view class="fixed">
    <cu-custom bgColor="bg-gradual-grey" :isBack="true">
      <template v-slot:backText> 返回 </template>
      <template v-slot:content> 我的 </template>
    </cu-custom>
  </view>
  <view class="mainHeight u-m-l-20 u-m-r-20 bodyTop">
    <view class="u-flex index-radius u-p-l-30 u-p-r-20 u-p-b-30 u-m-t-30 u-p-t-30">
      <view class="u-m-r-20">
        <navigator url="/pages/user/center">
          <img class="user-box" style="width: 70px; height: 70px" :src="userStore?.avatarUrl" />
        </navigator>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-20">{{ userStore?.userName }}</view>
        <navigator url="/pages/user/center">
          <view class="u-font-14 text-gray">微信号: {{ userStore?.wechatName }}</view>
        </navigator>
      </view>
      <view class="u-m-l-10 u-p-10">
        <text class="cuIcon-scan text-gray" />
      </view>
      <view class="u-m-l-10 u-p-10">
        <navigator url="/pages/login/index">
          <text class="cuIcon-right text-gray" />
        </navigator>
      </view>
    </view>

    <view class="u-m-t-20 index-radius">
      <view class="cu-list menu">
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-apps text-black" />
            <text class="text-black u-font-md">渔场管理</text>
          </view>
        </view>
      </view>
    </view>

    <view class="u-m-t-20 index-radius">
      <view class="cu-list menu">
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-record text-black" />
            <text class="text-black u-font-md">设备管理</text>
          </view>
        </view>
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-pay text-black" />
            <text class="text-black u-font-md">网关管理</text>
          </view>
        </view>
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-location text-black" />
            <text class="text-black u-font-md">位置管理</text>
          </view>
        </view>
      </view>
    </view>

    <view class="u-m-t-20 index-radius">
      <view class="cu-list menu">
        <view class="cu-item arrow">
          <view class="content" @click="navtoSetting">
            <text class="cuIcon-settings text-black" />
            <text class="text-black u-font-md">设置</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { onShow } from '@dcloudio/uni-app';
  import { useUserStore } from '@/stores/modules/user';

  /**
   * ==================================================== props/emits ====================================================
   */

  /**
   * ==================================================== data ====================================================
   */
  const userStore = useUserStore();

  /**
   * ==================================================== computed ====================================================
   */

  /**
   * ==================================================== methods ====================================================
   */

  const navtoSetting = () => {
    uni.navigateTo({
      url: './config/setting',
    });
  };
  /**
   * ==================================================== watch ====================================================
   */

  /**
   * ==================================================== init ====================================================
   */
  onShow(() => {});
</script>

<style lang="scss">
  .fixed {
    height: 80px;
    position: fixed;
    z-index: 99;
  }

  .bodyTop {
    margin-top: 80px;
  }

  .user-box {
    background-color: #fff;
  }

  .mainHeight {
    min-height: calc(100vh - 80px);
  }

  .index-radius {
    background: #ffffff;
    border-radius: 20rpx;
    overflow: hidden;
  }

  .grid-text {
    font-size: 26rpx;
    margin-top: 20rpx;
    color: #606266;
  }
</style>
