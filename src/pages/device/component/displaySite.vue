<template>
  <view class="padding-top padding-lr" v-for="(item, index) in checkPointState.deviceData" :key="index">
    <view class="cu-bar solid-bottom bg-white">
      <view class="action">
        <text class="cuIcon-circlefill text-gray"></text> 设 备 {{ item.deviceId }}:
        <text class="margin-sm text-bold">{{ item.deviceName }}</text>
      </view>
    </view>
    <view class="cu-list">
      <view class="cu-item">
        <form>
          <view class="content">
            <view>
              <view class="cu-bar bg-white solid-bottom text-gray">
                <view class="action"> <text class="cuIcon-title text-orange"></text> 基本信息 </view>
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备编号</view>
                <input placeholder="设备编号" name="input" v-model="item.deviceId" />
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备名</view>
                <input placeholder="设备名" name="input" class="" v-model="item.deviceName" />
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备地址</view>
                <input placeholder="设备地址" name="input" v-model="item.deviceAddr" />
                <text class="cuIcon-locationfill text-orange"></text>
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备类型</view>
                <input placeholder="设备类型" name="input" v-model="item.deviceTypeName" />
                <text class="cuIcon-info text-orange"></text>
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备码</view>
                <input placeholder="设备码" name="input" v-model="item.deviceCode" />
                <text class="cuIcon-barcode text-orange"></text>
              </view>
            </view>

            <view v-if="true">
              <view class="cu-bar bg-white solid-bottom margin-top-xs">
                <view class="action"> <text class="cuIcon-title text-orange"></text> 实时监控 </view>
                <DisplayMonitor ref="displayMonitorRef"></DisplayMonitor>
              </view>
            </view>
            <view v-if="true">
              <view class="cu-bar bg-white solid-bottom margin-top-xs">
                <view class="action"> <text class="cuIcon-title text-orange"></text> 图表预览 </view>
                <DisplayChart ref="displayChartRef"></DisplayChart>
              </view>
            </view>
          </view>
        </form>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { ICheckPoint, IDeviceItem } from '@/api/models/quaryDevice';
  import DisplayChart from '@/pages/device/component/displayChart.vue';
  import DisplayMonitor from '@/pages/device/component/displayMonitor.vue';

  const checkPointState: ICheckPoint = reactive({
    placeID: NaN,
    placeAddr: '',
    deviceData: [],
    siteAbbr: '',
  });

  const displayChartRef = ref();
  const displayMonitorRef = ref();
  const showSiteForm = (sitedetail: ICheckPoint) => {
    initSiteDetail(sitedetail);
  };

  defineExpose({
    showSiteForm,
  });

  const initSiteDetail = (siteItem: ICheckPoint) => {
    checkPointState.placeID = siteItem.placeID;
    checkPointState.placeAddr = siteItem.placeAddr;
    checkPointState.deviceData = siteItem.deviceData;
    checkPointState.siteAbbr = siteItem.siteAbbr;

    checkPointState.deviceData.forEach((item: IDeviceItem) => {
      if (true) {
        displayChartRef.value.loadRealChart(item);
      }
      if (true) {
        displayMonitorRef.value.loadRealMonitor(item);
      }
    });
  };
</script>

<style lang="scss">
  .cu-item {
    width: 100%;
    text-align: center;
    background-color: #fff;
    margin: 0;
    border: none;
    height: 50px;
    position: relative;
  }

  .cu-item.cur {
    background-color: #f1f1f1;
  }

  .cu-item.cur::after {
    content: '';
    width: 8upx;
    height: 30upx;
    border-radius: 10upx 0 0 10upx;
    position: absolute;
    background-color: currentColor;
    top: 0;
    right: 0upx;
    bottom: 0;
    margin: auto;
  }
</style>
