<template>
  <view></view>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { IDeviceItem } from '@/api/models/quaryDevice';

  const chartState: IDeviceItem = reactive({
    deviceAddr: '',
    deviceType: NaN,
    deviceTypeID: NaN,
    deviceTypeName: '',
    deviceCode: '',
    deviceId: NaN,
    deviceName: '',
    createTime: '',
  });

  const initRealChart = (devicedetail: IDeviceItem) => {
    chartState.deviceAddr = devicedetail.deviceAddr;
    chartState.deviceType = devicedetail.deviceType;
    chartState.deviceTypeID = devicedetail.deviceTypeID;
    chartState.deviceTypeName = devicedetail.deviceTypeName;
    chartState.deviceCode = devicedetail.deviceCode;
    chartState.deviceId = devicedetail.deviceId;
    chartState.deviceName = devicedetail.deviceName;
    chartState.version = devicedetail.version;
    chartState.createTime = devicedetail.createTime;
    chartState.marker = devicedetail.marker;
  };

  const loadRealChart = (devicedetail: IDeviceItem) => {
    initRealChart(devicedetail);
  };

  defineExpose({
    loadRealChart,
  });
</script>

<style></style>
