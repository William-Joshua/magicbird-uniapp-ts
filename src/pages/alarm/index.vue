<template>
  <view class="fixed">
    <cu-custom :is-back="true" bgColor="bg-gradual-red">
      <template v-slot:backText> 返回 </template>
      <template v-slot:content> 设备警告</template>
    </cu-custom>
  </view>
  <scroll-view scroll-y class="bodyTop">
    <view class="cu-bar">
      <view class="action"> <text class="cuIcon-title text-orange"></text> 警告明细 </view>
      <view class="action">
        <button class="cu-btn bg-green shadow" @click="showFilter"> <text class="cuIcon-settingsfill"></text></button>
      </view>
    </view>
    <view class="cu-modal" :class="filterVisable ? 'show' : ''" @tap="hideFilterPage">
      <AlarmFilterDialog ref="alarmFilterRef" :switchAlarm="switchAlarmFilter" />
    </view>
    <view class="cu-timeline" v-for="alarmDate in state.alarmDetails" :key="alarmDate.alarmGroupID">
      <view class="cu-time" v-for="alarm in alarmDate.alarmItems" :key="alarm.id"
        >{{ alarmDate.alarmDate }}
        <view v-if="alarm.alarmLevel === 1" class="cu-item text-blue">
          <view class="cotent bg-green shadow-blur">
            <text>{{ alarm.alarmTime }}</text> {{ alarm.description }}
          </view>
        </view>
        <view v-else-if="alarm.alarmLevel === 2" class="cu-item cur cuIcon-noticefill">
          <view class="content bg-green shadow-blur">
            <text>{{ alarm.alarmTime }}</text> {{ alarm.description }}
          </view>
        </view>
        <view v-else-if="alarm.alarmLevel === 3" class="cu-item text-red cuIcon-attentionforbidfill">
          <view class="ctent bg-green shadow-blur">
            <text>{{ alarm.alarmTime }}</text> {{ alarm.description }}
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { onShow } from '@dcloudio/uni-app';
  import { useAuthStore } from '@/stores/modules/auth';
  import { useRouter } from '@/hooks/router';
  import AlarmFilterDialog from '@/pages/alarm/component/alarmFilterDialog.vue';
  import { useAlarmStore } from '@/stores/modules/alarm';
  import { AlarmPeriodFilterEnum, AlarmTypeFilterEnum } from '@/enums/alarmEnum';
  import { IAlarmData, IDeviceAlarm } from '@/api/models/quaryAlarm';
  import { queryAlarm } from '@/api/alarmApi';

  interface alarmData {
    data: Array<IAlarmData>;
    alarmDetails: Array<IDeviceAlarm>;
  }

  const state: alarmData = reactive({
    data: [],
    alarmDetails: [],
  });

  const alarmFilterRef = ref();
  const alarmStore = useAlarmStore();
  const router = useRouter();
  const authStore = useAuthStore();

  const filterVisable = ref(false);

  const showFilter = () => {
    console.log('filterVisable');
    filterVisable.value = true;
  };
  const hideFilterPage = () => {
    console.log('hideVisable');
    filterVisable.value = false;
  };

  const switchAlarmFilter = () => {
    initAlarmTimeLine();
  };
  const initAlarmTimeLine = () => {
    alarmFilterRef.value.initAlarmFilter();
    const params = {
      startTime: '',
      endTime: '',
      isDeal: 1,
    };
    if (alarmStore.timePeriodFilter == AlarmPeriodFilterEnum.WEEKLY) {
      let lastWeekDate = new Date();
      lastWeekDate.setDate(lastWeekDate.getDate() - 7);

      params.startTime =
        lastWeekDate.getFullYear() + '-' + (lastWeekDate.getMonth() + 1) + '-' + lastWeekDate.getDate() + ' 00:00:00';
      let todayDate = new Date();
      params.endTime =
        todayDate.getFullYear() +
        '-' +
        (todayDate.getMonth() + 1) +
        '-' +
        todayDate.getDate() +
        ' ' +
        todayDate.getHours() +
        ':' +
        todayDate.getMinutes() +
        ':' +
        todayDate.getSeconds();
    } else if (alarmStore.timePeriodFilter == AlarmPeriodFilterEnum.MONTHLY) {
      let lastMonthDate = new Date();
      lastMonthDate.setDate(lastMonthDate.getDate() - 30);
      params.startTime =
        lastMonthDate.getFullYear() +
        '-' +
        (lastMonthDate.getMonth() + 1) +
        '-' +
        lastMonthDate.getDate() +
        ' 00:00:00';
      let todayDate = new Date();
      params.endTime =
        todayDate.getFullYear() +
        '-' +
        (todayDate.getMonth() + 1) +
        '-' +
        todayDate.getDate() +
        ' ' +
        todayDate.getHours() +
        ':' +
        todayDate.getMinutes() +
        ':' +
        todayDate.getSeconds();
    }
    console.log('AlarmTypeFilterEnum', alarmStore.alarmTypeSwitch);
    if (alarmStore.alarmTypeSwitch == AlarmTypeFilterEnum.ONLY_SERIOUS) {
      params.isDeal = 3;
    } else if (alarmStore.alarmTypeSwitch == AlarmTypeFilterEnum.EXCLUDE_LOW) {
      params.isDeal = 2;
    } else if (alarmStore.alarmTypeSwitch == AlarmTypeFilterEnum.ALL) {
      params.isDeal = 21;
    }

    console.log('Alarm :', params);
    queryAlarm(params)
      .then(
        function (response: any) {
          if (response.resultCode == 200) {
            state.data = response.extend.data;

            convertAlarmData();
          } else {
            console.log('警告获取失败!');
          }
        }.bind(this),
      )
      .catch(function (error: any) {
        console.log(error);
      });
  };

  const convertAlarmData = () => {
    state.data.forEach(function (alarmItem) {
      let alarmItemDate = new Date(alarmItem.alarmTime);
      let deviceAlarmItem = state.alarmDetails.find(item => item.alarmDate == alarmItemDate);
      let groupID = 0;

      const newAlarmItem = {
        id: alarmItem.id,
        alarmTime: alarmItemDate.getHours() + ':' + alarmItemDate.getMinutes() + ':' + alarmItemDate.getSeconds(),
        siteName: alarmItem.siteName,
        deviceName: alarmItem.deviceName,
        fieldName: alarmItem.fieldName,
        val: alarmItem.val,
        alarmLevel: alarmItem.alarmLevel,
        alarmLevelName: alarmItem.alarmLevelName,
        description: '<' + alarmItem.deviceName + '>' + '当前值为 : ' + alarmItem.val + ';请及时处理',
      };

      if (deviceAlarmItem != null) {
        deviceAlarmItem.alarmItems.push(newAlarmItem);
      } else {
        groupID = groupID + 1;
        const newDeviceAlarm: IDeviceAlarm = {
          alarmGroupID: groupID,
          alarmDate: alarmItemDate,
          alarmItems: [],
        };
        newDeviceAlarm.alarmItems.push(newAlarmItem);
        state.alarmDetails.push(newDeviceAlarm);
      }
    });
  };

  onShow(() => {
    if (authStore.token == null) {
      console.log('notlog');
      router.push('/pages/login/notLog');
    } else {
      initAlarmTimeLine();
    }
  });
</script>
<style lang="scss" scoped>
  .bodyTop {
    margin-top: 80px;
  }

  .show {
    overflow: hidden;
  }
</style>
