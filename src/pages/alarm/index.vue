<template>
  <view>
    <view class="fixed">
      <cu-custom :is-back="true" bgColor="bg-gradual-red">
        <template v-slot:backText> 返回 </template>
        <template v-slot:content> 设备警告 </template>
      </cu-custom>
      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action"> <text class="cuIcon-title text-orange"></text> 警告明细 </view>
        <view class="action">
          <button class="cu-btn bg-green shadow" @click="showFilter"> <text class="cuIcon-settingsfill"></text></button>
        </view>
      </view>
      <view class="cu-modal" :class="filterVisable ? 'show' : ''" @tap="hideFilterPage">
        <view class="cu-dialog" @tap.stop>
          <radio-group class="block" @change="singleChooseChange">
            <view class="cu-list menu text-left">
              <view class="cu-item">
                <view class="content">
                  <text class="text-black">上一周</text>
                </view>
                <view class="action">
                  <radio
                    class="round"
                    value="weekly"
                    :class="timeFilter == 'weekly' ? 'checked' : ''"
                    v-model="timeFilter"
                  >
                  </radio>
                </view>
              </view>
              <view class="cu-item">
                <view class="content">
                  <text class="text-black">上一月</text>
                </view>
                <view class="action">
                  <radio
                    class="round"
                    value="monthly"
                    :class="timeFilter == 'monthly' ? 'checked' : ''"
                    v-model="timeFilter"
                  ></radio>
                </view>
              </view>
            </view>
          </radio-group>
          <view class="cu-list menu text-left solid-top">
            <view class="cu-item">
              <view class="content">
                <text class="text-grey">显示一般警告</text>
              </view>
              <view class="action">
                <switch @change="alarmTypeSwitch" :class="showLowAlarm ? 'checked' : ''"></switch>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="cu-timeline" v-for="(alarm, key) in alarmDetails" :key="key">
        <view class="cu-time">{{ alarm.Date }}</view>
        <view v-if="alarm.alarmLevel === 1" class="cu-item text-blue">
          <view class="content bg-green shadow-blur">
            <text>{{ alarm.Time }}</text> {{ alarm.description }}
          </view>
        </view>
        <view v-else-if="alarm.alarmLevel === 2" class="cu-item cur cuIcon-noticefill">
          <view class="content bg-green shadow-blur">
            <text>{{ alarm.Time }}</text> {{ alarm.description }}
          </view>
        </view>
        <view v-else-if="alarm.alarmLevel === 3" class="cu-item text-red cuIcon-attentionforbidfill">
          <view class="content bg-green shadow-blur">
            <text>{{ alarm.Time }}</text> {{ alarm.description }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { onShow } from '@dcloudio/uni-app';
  import { useAuthStore } from '@/stores/modules/auth';
  import { useRouter } from '@/hooks/router';

  const router = useRouter();
  const authStore = useAuthStore();

  const filterVisable = ref(false);
  const timeFilter = ref('weekly');
  const showLowAlarm = ref(false);

  const showFilter = () => {
    filterVisable.value = true;
  };
  const hideFilterPage = () => {
    filterVisable.value = false;
  };

  const singleChooseChange = (selected: any) => {
    timeFilter.value = selected.detail.value;
  };

  const alarmTypeSwitch = (typeSwitch: any) => {
    showLowAlarm.value = typeSwitch.detail.value;
  };

  onShow(() => {
    if (authStore.token == null) {
      console.log('notlog');
      router.push('/pages/login/notLog');
    }
  });
</script>

<style lang="scss" scoped></style>
