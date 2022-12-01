export interface IDeviceAlarm {
  alarmGroupID: number;
  alarmDate: Date;
  alarmItems: Array<IAlarmItem>;
}

export interface IAlarmItem {
  id: number;
  alarmTime: string;
  siteName: string;
  deviceName: string; // 设备类型，1：视频监控类 2：水质曲线类 3：设备控制类
  fieldName: string;
  val: string;
  alarmLevel: number;
  alarmLevelName: string;
  description: string;
}
export interface IAlarmData {
  id: number;
  fieldId: number;
  placeId: number;
  deviceId: number;
  deviceName: string;
  fieldName: string;
  siteName: string;
  alarmLevel: number;
  alarmLevelName: string;
  dealName: string;
  dealTimes: number;
  val: string;
  userId: number;
  userName: string;
  isMsg: string;
  isClear: string;
  isDeal: string;
  isWx: string;
  acpTime: string;
  alarmTime: string;
}
