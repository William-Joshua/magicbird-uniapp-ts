<template>
  <view class="fixed">
    <cu-custom :is-back="true" bgColor="bg-gradual-green">
      <template v-slot:backText> 返回 </template>
      <template v-slot:content> 设备详情 </template>
    </cu-custom>
  </view>
  <scroll-view scroll-y class="DrawerPage bodyTop" :class="pageVisable ? 'show' : ''">
    <view class="padding margin text-left">
      <view class="cu-btn bg-gradual-blue lg block shadow radius" @click="showDragerPage">
        <text class="cuIcon-list margin-sm"></text> 切 换 站 点
      </view>
    </view>
    <view class="cu-list cu-menu margin-xs shadow-lg">
      <DisplaySite :ref="displaySiteRef"></DisplaySite>
    </view>
  </scroll-view>

  <view class="DrawerClose" :class="pageVisable ? 'show' : ''" @tap="hideDragerPage">
    <text class="cuIcon-pullright"></text>
  </view>
  <scroll-view scroll-y class="DrawerWindow bodyTop" :class="pageVisable ? 'show' : ''">
    <view class="cu-btn bg-gradual-pink shadow"> <text class="cuIcon-list margin-sm"></text> 站 点 列 表 </view>
    <view class="cu-list card-menu margin-xs shadow-lg">
      <view class="cu-item arrow" v-for="(item, index) in state.data" :key="index">
        <view class="content" @click="showSiteDetail(item)">
          <text class="cuIcon-github text-grey"></text>
          <text class="text-grey">{{ item.siteAbbr }}</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { onShow } from '@dcloudio/uni-app';
  import { ICheckPoint } from '@/api/models/quaryDevice';
  import { queryDevice } from '@/api/deviceApi';
  import DisplaySite from '@/pages/device/component/displaySite.vue';
  import { useUserStore } from '@/stores/modules/user';
  import { useAuthStore } from '@/stores/modules/auth';
  import { useRouter } from '@/hooks/router';

  const router = useRouter();

  const authStore = useAuthStore();

  interface siteData {
    data: Array<ICheckPoint>;
  }

  const userStore = useUserStore();
  const pageVisable = ref(false);
  const showDragerPage = () => {
    pageVisable.value = true;
  };

  const state: siteData = reactive({
    data: [],
  });

  const displaySiteRef = ref();

  const hideDragerPage = () => {
    pageVisable.value = false;
  };

  const showSiteDetail = (item: ICheckPoint) => {
    displaySiteRef.value.showSiteForm(item);
  };

  const initSiteDeviceDetails = () => {
    const params = {
      loginName: userStore.accountID,
    };
    queryDevice(params)
      .then((reponse: any) => {
        if (reponse.resultCode == 200) {
          state.data = reponse.extend.data;
        }
      })
      .catch(() => {});
  };

  /**
   * ==================================================== init ====================================================
   */
  // 凡跳转登录页清空token，401跳转该页
  onShow(() => {
    console.log('notlog', authStore.token);
    if (authStore.token == null) {
      console.log('notlog');
      router.push('/pages/login/notLog');
    } else {
      initSiteDeviceDetails();
    }
  });
</script>

<style lang="scss" scoped>
  page {
    background-image: var(--gradualBlue);
    width: 100vw;
    overflow: hidden;
  }

  .bodyTop {
    margin-top: 80px;
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
