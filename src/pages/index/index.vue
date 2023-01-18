<template>
  <view class="back-image">
    <scroll-view scroll-y class="page float-tabBar">
      <swiper
        class="card-swiper round-dot"
        :indicator-dots="true"
        :circular="true"
        :autoplay="true"
        interval="5000"
        duration="500"
        indicator-color="#8799a3"
        indicator-active-color="#0081ff"
        height="48vw"
      >
        <swiper-item v-for="(item, index) in state.swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
          <view class="swiper-item">
            <image :src="item.url" mode="aspectFit" v-if="item.type == 'image'" />
          </view>
        </swiper-item>
      </swiper>

      <view class="cu-bar bg-gradual-blue">
        <view class="action text-bold text-white"> <text class="cuIcon-favorfill"></text> 特别关注 </view>
      </view>
      <view class="nav-list" style="margin-top: 20rpx">
        <view class="nav-li bg-cyan" style="animation: show 1.2s 1">
          <view class="nav-title">鳜鱼</view>
          <view class="nav-name">价格 ：45 </view>
          <view class="nav-name">类型 ：生鲜 </view>
          <text class="cuIcon-coin"></text>
        </view>
        <view class="nav-li bg-blue" style="animation: show 1.4s 1">
          <view class="nav-title">河虾</view>
          <view class="nav-name">价格 ：45</view>
          <view class="nav-name">类型 ：生鲜 </view>
          <text class="cuIcon-newsfill"></text>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom">
        <view class="action text-bold text-black"> <text class="cuIcon-goodsfill"></text> 商品列表 </view>
      </view>
      <view class="nav-list" style="margin-top: 20rpx">
        <view class="nav-li bg-cyan" style="animation: show 1.2s 1">
          <view class="nav-title">鳜鱼</view>
          <view class="nav-name">价格 ：45 </view>
          <view class="nav-name">类型 ：生鲜 </view>
          <text class="cuIcon-coin"></text>
        </view>
        <view class="nav-li bg-blue" style="animation: show 1.4s 1">
          <view class="nav-title">河虾</view>
          <view class="nav-name">价格 ：45</view>
          <view class="nav-name">类型 ：生鲜 </view>
          <text class="cuIcon-newsfill"></text>
        </view>
        <view class="nav-li bg-green" style="animation: show 1.4s 1">
          <view class="nav-title">带鱼</view>
          <view class="nav-name">价格 ：27</view>
          <view class="nav-name">类型 ：冰鲜 </view>
          <text class="cuIcon-newsfill"></text>
        </view>
      </view>

      <view class="content">
        <BasicButton @click="handleShowDialog">Show</BasicButton>
      </view>
    </scroll-view>
    <view class="cu-modal bottom-modal" :class="state.isShowDialog ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white">
          <view class="action text-green">商品明细</view>
          <view class="action text-blue" @click="handleCloseDialog">
            <text class="lg text-gray cuIcon-close"></text>
          </view>
        </view>
        <view class="flex p-xs margin-bottom-sm mb-sm">
          <view class="flex-sub padding-sm margin-xs radius">
            <image :src="state.productDetail.previewUrl" style="width: 300rpx; height: 200rpx" mode="aspectFit" />
          </view>
          <view class="flex-sub padding-sm margin-xs radius">
            <view class="cu-list menu">
              <view class="cu-item">
                <view class="flex-twice text-left">
                  <text class="cuIcon-goodsnewfill text-green"></text>
                  <text class="text-black"> 商品名 : </text>
                </view>
                <view class="flex-sub">
                  <text class="text-black text-bold">{{ state.productDetail.productName }}</text>
                </view>
              </view>
              <view class="cu-item">
                <view class="flex-twice text-left">
                  <text class="cuIcon-moneybag text-green"></text>
                  <text class="text-black"> 价格 : </text>
                </view>
                <view class="flex-sub">
                  <text class="text-black text-bold">{{ state.productDetail.price }}</text>
                </view>
              </view>
              <view class="cu-item">
                <view>
                  <view class="cu-tag bg-red light sm round">价格变动</view>
                  <view class="cu-tag bg-blue light sm round">鲜活</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="cu-bar bg-white tabbar float-tabBar">
          <button class="action" open-type="contact">
            <view class="cuIcon-service text-green">
              <view class="cu-tag badge"></view>
            </view>
            客服
          </button>
          <view class="action text-orange">
            <view :class="state.productDetail.collectstatus ? 'cuIcon-favorfill' : 'cuIcon-favor'"></view>
            {{ state.productDetail.collect }}
          </view>
          <view class="bg-red submit">添加关注</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
  import { reactive } from 'vue';
  import BasicButton from '@/components/BasicButton/index.vue';
  import { onShow } from '@dcloudio/uni-app';

  interface IProductPrice {
    productName: string;
    previewUrl: string;
    price: number;
    collect: string;
    collectstatus: boolean;
  }
  interface ISwiperImage {
    id: number;
    type: string;
    url: string;
  }
  interface IState {
    title: string;
    isShowDialog: boolean;
    productDetail: IProductPrice;
    swiperList: Array<ISwiperImage>;
    favoriteProduct: Array<IProductPrice>;
    productList: Array<IProductPrice>;
  }

  const state: IState = reactive({
    title: 'uni-app vue3 ts --Vite',
    isShowDialog: false,
    productDetail: {
      productName: '',
      previewUrl: '',
      price: NaN,
      collect: '',
      collectstatus: false,
    },
    swiperList: [],
    favoriteProduct: [],
    productList: [],
  });

  const handleShowDialog = () => {
    state.isShowDialog = true;
  };

  const handleCloseDialog = () => {
    state.isShowDialog = false;
  };
  const initProductPrice = () => {
    let userProductDetail = {
      productName: '鳜鱼',
      previewUrl: 'http://p.ayxbk.com/images/3/3e/%E9%B3%9C%E9%B1%BC.jpg',
      price: 45,
      collect: '已收藏',
      collectstatus: true,
    };
    state.productDetail = userProductDetail;

    let swiperImage = [
      {
        id: 0,
        type: 'image',
        url: 'https://img.nczfj.com/d/file/2018-04/184/15226303526614393.jpg',
      },
      {
        id: 1,
        type: 'image',
        url: 'http://17dzx.com/UploadFiles/201382319015407.jpg',
      },
      {
        id: 2,
        type: 'image',
        url: 'https://picx.zhimg.com/v2-09d7b762b349c9dcadbc00f39f4ce301_1440w.jpg?source=172ae18b',
      },
    ];
    state.swiperList = swiperImage;
  };

  onShow(() => {
    initProductPrice();
  });
</script>
<style lang="scss">
  .page {
    height: 100vh;
  }

  .back-image {
    background-image: url('https://oss.colorui.org/cos/img/4put2.png');
    background-repeat: no-repeat;
    position: fixed;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .nav-list {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 0 20px 0;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .nav-li {
    padding: 15px;
    border-radius: 6px;
    width: 45%;
    margin: 0 2.5% 20px;
    background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
    background-size: cover;
    background-position: 50%;
    position: relative;
    z-index: 1;
  }
  .nav-title {
    font-size: 16px;
    font-weight: 300;
  }
  .nav-name {
    font-size: 14px;
    text-transform: Capitalize;
    margin-top: 10px;
    position: relative;
  }
  .nav-li text {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 26px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin: 280rpx auto 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
    margin-bottom: 60rpx;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
  .float-tabBar {
    margin-bottom: 120rpx;
  }
</style>
