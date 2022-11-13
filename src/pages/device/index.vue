<template>
  <view class="bg-gradual-blue">
    <view class="fixed">
      <cu-custom :is-back="true" bgColor="bg-gradual-blue">
        <template v-slot:backText> 返回 </template>
        <template v-slot:content> 设备详情 </template>
      </cu-custom>
    </view>

    <scroll-view scroll-y class="DrawerPage" :class="pageVisable ? 'show' : ''">
      <view class="padding margin text-left">
        <view class="cu-btn bg-gradual-pink lg block shadow radius" @click="showDragerPage">
          <text class="cuIcon-list margin-sm"></text> 切 换 站 点
        </view>
      </view>
      <view class="cu-list cu-menu margin-xs shadow-lg">
        <DisplaySite></DisplaySite>
      </view>
    </scroll-view>

    <view class="DrawerClose" :class="pageVisable ? 'show' : ''" @tap="hideDragerPage">
      <text class="cuIcon-pullright"></text>
    </view>
    <scroll-view scroll-y class="DrawerWindow" :class="pageVisable ? 'show' : ''">
      <view class="cu-btn bg-gradual-pink shadow"> <text class="cuIcon-list margin-sm"></text> 站 点 列 表 </view>
      <view class="cu-list card-menu margin-xs shadow-lg">
        <view class="cu-item arrow" v-for="(item, index) in 20" :key="index">
          <view class="content">
            <text class="cuIcon-github text-grey"></text>
            <text class="text-grey">{{ index + 1 }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import DisplaySite from '@/pages/device/component/displaySite.vue';

  const pageVisable = ref(false);
  const showDragerPage = () => {
    pageVisable.value = true;
  };

  const hideDragerPage = () => {
    pageVisable.value = false;
  };
</script>

<style>
  page {
    background-image: var(--gradualBlue);
    width: 100vw;
    overflow: hidden;
  }

  .DrawerPage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0vw;
    background-color: #f1f1f1;
    transition: all 0.4s;
  }

  .DrawerPage.show {
    transform: scale(0.9, 0.9);
    left: 70vw;
    box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
    transform-origin: 0;
  }

  .DrawerWindow {
    position: absolute;
    width: 70vw;
    height: 100vh;
    left: 0;
    top: 0;
    transform: scale(0.9, 0.9) translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
    padding: 100upx 0;
  }

  .DrawerWindow.show {
    transform: scale(1, 1) translateX(0%);
    opacity: 1;
    pointer-events: all;
  }

  .DrawerClose {
    position: absolute;
    width: 40vw;
    height: 100vh;
    right: 0;
    top: 0;
    color: transparent;
    padding-bottom: 30upx;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
    letter-spacing: 5px;
    font-size: 50upx;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
  }

  .DrawerClose.show {
    opacity: 1;
    pointer-events: all;
    width: 30vw;
    color: #fff;
  }

  .DrawerPage .cu-bar.tabbar .action button.cuIcon {
    width: 64upx;
    height: 64upx;
    line-height: 64upx;
    margin: 0;
    display: inline-block;
  }

  .DrawerPage .cu-bar.tabbar .action .cu-avatar {
    margin: 0;
  }

  .DrawerPage .nav {
    flex: 1;
  }

  .DrawerPage .nav .cu-item.cur {
    border-bottom: 0;
    position: relative;
  }

  .DrawerPage .nav .cu-item.cur::after {
    content: '';
    width: 10upx;
    height: 10upx;
    background-color: currentColor;
    position: absolute;
    bottom: 10upx;
    border-radius: 10upx;
    left: 0;
    right: 0;
    margin: auto;
  }

  .DrawerPage .cu-bar.tabbar .action {
    flex: initial;
  }
</style>
