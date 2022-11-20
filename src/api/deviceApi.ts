import { request } from '@/utils/http';
import { ICheckPoint } from '@/api/models/quaryDevice';

const QUERYDEVICE = '/deviceManger/queryDeviceForWxByName.do';

/**
 * 通过人员账号查询设备
 * @param params
 */
export function queryDevice(params: any) {
  return request.get<ApiResult<ICheckPoint>>(QUERYDEVICE, params);
}
