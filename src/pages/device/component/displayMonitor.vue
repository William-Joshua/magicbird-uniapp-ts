<template>
  <view></view>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { IDeviceItem } from '@/api/models/quaryDevice';

  const monitorState: IDeviceItem = reactive({
    deviceAddr: '',
    deviceType: NaN,
    deviceTypeID: NaN,
    deviceTypeName: '',
    deviceCode: '',
    deviceId: NaN,
    deviceName: '',
    createTime: '',
  });

  const initRealMonitor = (devicedetail: IDeviceItem) => {
    monitorState.deviceAddr = devicedetail.deviceAddr;
    monitorState.deviceType = devicedetail.deviceType;
    monitorState.deviceTypeID = devicedetail.deviceTypeID;
    monitorState.deviceTypeName = devicedetail.deviceTypeName;
    monitorState.deviceCode = devicedetail.deviceCode;
    monitorState.deviceId = devicedetail.deviceId;
    monitorState.deviceName = devicedetail.deviceName;
    monitorState.version = devicedetail.version;
    monitorState.createTime = devicedetail.createTime;
    monitorState.marker = devicedetail.marker;
  };

  const loadRealMonitor = (devicedetail: IDeviceItem) => {
    initRealMonitor(devicedetail);
  };

  defineExpose({
    loadRealMonitor,
  });
</script>

<style></style>
