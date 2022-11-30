<template>
  <view class="cu-dialog">
    <radio-group class="block" @change="singleChooseChange">
      <view class="cu-list menu text-left">
        <view class="cu-item">
          <view class="content">
            <text class="text-black">上一周</text>
          </view>
          <view class="action">
            <input
              type="radio"
              v-model="alarmStore.timePeriodFilter"
              class="round"
              :class="alarmStore.timePeriodFilter == 'WEEKLY' ? 'checked' : ''"
            />
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <text class="text-black">上一月</text>
          </view>
          <view class="action">
            <input
              type="radio"
              v-model="alarmStore.timePeriodFilter"
              class="round"
              :class="alarmStore.timePeriodFilter == 'MONTHLY' ? 'checked' : ''"
            />
          </view>
        </view>
      </view>
    </radio-group>
    <radio-group class="block" @change="alarmTypeSwitch">
      <view class="cu-list menu text-left">
        <view class="cu-item">
          <view class="content">
            <text class="text-black">全部警告</text>
          </view>
          <view class="action">
            <input
              type="radio"
              class="round"
              value="ALL"
              :class="alarmStore.alarmTypeSwitch == 'ALL' ? 'checked' : ''"
            />
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <text class="text-black">排除轻微警告</text>
          </view>
          <view class="action">
            <input
              type="radio"
              class="round"
              v-model="alarmStore.alarmTypeSwitch"
              :class="alarmStore.alarmTypeSwitch == 'EXCLUDE_LOW' ? 'checked' : ''"
            />
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <text class="text-black">仅显示严重</text>
          </view>
          <view class="action">
            <input
              type="radio"
              class="round"
              v-model="alarmStore.alarmTypeSwitch"
              :class="alarmStore.alarmTypeSwitch == 'ONLY_SERIOUS' ? 'checked' : ''"
            />
          </view>
        </view>
      </view>
    </radio-group>
  </view>
</template>

<script lang="ts" setup>
  import { useAlarmStore } from '@/stores/modules/alarm';
  import { AlarmPeriodFilterEnum, AlarmTypeFilterEnum } from '@/enums/alarmEnum';
  defineProps(['switchAlarm']);

  const alarmStore = useAlarmStore();
  const singleChooseChange = (selected: AlarmPeriodFilterEnum) => {
    alarmStore.setPeriodFilter(selected);
    emit('switchAlarmFilter');
  };
  const alarmTypeSwitch = (typeSwitch: AlarmTypeFilterEnum) => {
    alarmStore.setTypeSwitch(typeSwitch);
    emit('switchAlarmFilter');
  };

  const emit = defineEmits(['switchAlarmFilter']);
</script>

<style lang="scss" scoped></style>
