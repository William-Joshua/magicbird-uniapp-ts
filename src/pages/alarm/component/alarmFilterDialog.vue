<template>
  <view class="cu-dialog">
    <view>
      <view class="cu-bar">
        <view class="action"> <text class="cuIcon-title text-orange"></text> 时间过滤 </view>
      </view>
      <radio-group class="block" @change="singleChooseChange">
        <view class="cu-list menu text-left">
          <view class="cu-item">
            <view class="content">
              <text class="text-black">上一周</text>
            </view>
            <view class="action">
              <radio class="round" value="WEEKLY" :class="alarmStore.timePeriodFilter == 0 ? 'checked' : ''" />
            </view>
          </view>
          <view class="cu-item">
            <view class="content">
              <text class="text-black">上一月</text>
            </view>
            <view class="action">
              <radio class="round" value="MONTHLY" :class="alarmStore.timePeriodFilter == 1 ? 'checked' : ''" />
            </view>
          </view>
        </view>
      </radio-group>
    </view>
    <view>
      <view class="cu-bar">
        <view class="action"> <text class="cuIcon-title text-orange"></text> 类型过滤 </view>
      </view>
      <radio-group class="block" @change="alarmTypeSwitch">
        <view class="cu-list menu text-left">
          <view class="cu-item">
            <view class="content">
              <text class="text-black">全部警告</text>
            </view>
            <view class="action">
              <radio class="round" value="ALL" :class="alarmStore.alarmTypeSwitch == 0 ? 'checked' : ''" />
            </view>
          </view>
          <view class="cu-item">
            <view class="content">
              <text class="text-black">排除轻微警告</text>
            </view>
            <view class="action">
              <radio class="round" value="EXCLUDE_LOW" :class="alarmStore.alarmTypeSwitch == 1 ? 'checked' : ''" />
            </view>
          </view>
          <view class="cu-item">
            <view class="content">
              <text class="text-black">仅显示严重</text>
            </view>
            <view class="action">
              <radio class="round" value="ONLY_SERIOUS" :class="alarmStore.alarmTypeSwitch == 2 ? 'checked' : ''" />
            </view>
          </view>
        </view>
      </radio-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { useAlarmStore } from '@/stores/modules/alarm';
  import { AlarmPeriodFilterEnum, AlarmTypeFilterEnum } from '@/enums/alarmEnum';
  defineProps(['switchAlarm']);

  const alarmStore = useAlarmStore();

  const initAlarmFilter = () => {
    console.log('sub timePeriodFilter :', alarmStore.timePeriodFilter);
    console.log('sub alarmTypeSwitch:', alarmStore.alarmTypeSwitch);
  };
  defineExpose({
    initAlarmFilter,
  });

  const singleChooseChange = (selected: any) => {
    console.log(selected.detail.value);
    const alarmPeriodFilter = selected.detail.value as unknown as AlarmPeriodFilterEnum;
    alarmStore.setPeriodFilter(alarmPeriodFilter);
    emit('switchAlarmFilter');
  };
  const alarmTypeSwitch = (typeSwitch: any) => {
    console.log(typeSwitch.detail.value);
    const alarmTypeFilter = typeSwitch.detail.value as unknown as AlarmTypeFilterEnum;
    alarmStore.setTypeSwitch(alarmTypeFilter);
    emit('switchAlarmFilter');
  };

  const emit = defineEmits(['switchAlarmFilter']);
</script>

<style lang="scss" scoped></style>
