export interface ICheckPoint {
  placeID: number;
  placeAddr: string;
  deviceData: Array<IDeviceItem>;
  siteAbbr: string;
}

export interface IDeviceItem {
  deviceAddr: string;
  deviceType: number; // 设备类型，1：视频监控类 2：水质曲线类 3：设备控制类
  deviceTypeID: number;
  deviceTypeName: string;
  devcieCode: string;
  deviceId: number;
  version: undefined;
  createTime: string;
  marker: undefined;
}
