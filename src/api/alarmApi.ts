import { request } from '@/utils/http';
import { IAlarmData } from '@/api/models/quaryAlarm';

const QUERYALARM = '/alarmService/queryAlarmInfo.do';

/**
 * 查询警告信息
 * @param params
 */
export function queryAlarm(data: any) {
  return request.get<ApiResult<IAlarmData>>(QUERYALARM, { params: data });
}
