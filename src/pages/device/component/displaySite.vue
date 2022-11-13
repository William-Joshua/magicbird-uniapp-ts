<template>
  <view class="padding-top padding-lr" v-for="(item, index) in checkPointState.DeviceStatusDetails" :key="index">
    <view class="cu-bar solid-bottom bg-white">
      <view class="action">
        <text class="cuIcon-circlefill text-gray"></text> 设 备 {{ item.id }}:
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
                <input placeholder="设备编号" name="input" v-model="item.deviceLabel" />
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备名</view>
                <input placeholder="设备名" name="input" class="" v-model="item.deviceName" />
              </view>
              <view class="cu-form-group text-black">
                <view class="title">设备地址</view>
                <input placeholder="设备地址" name="input" v-model="item.address" />
                <text class="cuIcon-locationfill text-orange"></text>
              </view>
            </view>

            <view>
              <view class="cu-bar bg-white solid-bottom margin-top-xs">
                <view class="action"> <text class="cuIcon-title text-orange"></text> 实时状态 </view>
              </view>
            </view>
            <view>
              <view class="cu-bar bg-white solid-bottom margin-top-xs" v-if="item.showChart">
                <view class="action"> <text class="cuIcon-title text-orange"></text> 图表预览 </view>
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

  import DisplayChart from '@/pages/device/component/displayChart.vue';
  interface DeviceStatus {
    id?: number;
    deviceName: string;
    deviceLabel: string;
    address: string;
    showChart: boolean;
  }

  interface CheckPoint {
    DeviceStatusDetails: Array<DeviceStatus>;
  }

  const checkPointState = reactive<CheckPoint>({
    DeviceStatusDetails: [
      {
        id: 1,
        deviceName: 'xxx',
        deviceLabel: 'xxx',
        address: 'xxx',
        showChart: false,
      },
    ],
  });
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
