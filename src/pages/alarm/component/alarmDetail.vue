<template>
  <view>
    <view class="fixed">
      <cu-custom :is-back="true" bgColor="bg-gradual-red">
        <template v-slot:backText> 返回 </template>
        <template v-slot:content> 警告详情 </template>
      </cu-custom>
      <view class="cu-list">
        <view class="cu-item">
          <form>
            <view class="content">
              <view>
                <view class="cu-bar solid-bottom text-gray">
                  <view class="action"> <text class="cuIcon-title text-orange"></text> 警告信息 </view>
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">警告编号</view>
                  <input placeholder="警告编号" name="input" v-model="item.deviceId" />
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">设备名</view>
                  <input placeholder="设备名" name="input" class="" v-model="item.deviceName" />
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">设备型号</view>
                  <input placeholder="设备地址" name="input" v-model="item.deviceAddr" />
                  <text class="cuIcon-locationfill text-orange"></text>
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">警告值</view>
                  <input placeholder="警告值" name="input" v-model="item.deviceAddr" />
                  <text class="cuIcon-locationfill text-orange"></text>
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">站点名称</view>
                  <input placeholder="站点名称" name="input" readonly v-model="item.deviceTypeName" />
                  <text class="cuIcon-info text-orange"></text>
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">警告等级</view>
                  <input placeholder="警告等级" name="input" v-model="item.deviceCode" />
                  <text class="cuIcon-barcode text-orange"></text>
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">警告等级</view>
                  <input placeholder="警告等级" name="input" v-model="item.deviceCode" />
                  <text class="cuIcon-barcode text-orange"></text>
                </view>
                <view class="cu-form-group text-black">
                  <view class="title">警告等级</view>
                  <input placeholder="警告等级" name="input" v-model="item.deviceCode" />
                  <text class="cuIcon-barcode text-orange"></text>
                </view>
              </view>
            </view>
          </form>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
