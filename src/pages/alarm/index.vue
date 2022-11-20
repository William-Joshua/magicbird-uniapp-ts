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
      <view class="cu-timeline">
        <view class="cu-time">昨天</view>
        <view class="cu-item cur cuIcon-noticefill">
          <view class="content bg-green shadow-blur"> <text>22:22</text> 【广州市】快件已到达地球 </view>
        </view>
        <view class="cu-item text-red cuIcon-attentionforbidfill">
          <view class="content bg-red shadow-blur"> 这是第一次，我家的铲屎官走了这么久。久到足足有三天！！ </view>
        </view>
        <view class="cu-item text-grey cuIcon-evaluate_fill">
          <view class="content bg-grey shadow-blur"> 这是第一次，我家的铲屎官走了这么久。 </view>
        </view>
        <view class="cu-item text-blue">
          <view class="bg-blue content"> <text>20:00</text> 【月球】快件已到达月球，准备发往地球 </view>
          <view class="bg-cyan content"> <text>10:00</text> 【银河系】快件已到达银河系，准备发往月球 </view>
        </view>
      </view>

      <view class="cu-timeline">
        <view class="cu-time">06-17</view>
        <view class="cu-item">
          <view class="content"> <text>01:30</text> 【喵星】 MX-12138 已揽收，准备发往银河系 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { onShow } from '@dcloudio/uni-app';

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
</script>

<style lang="scss" scoped></style>
