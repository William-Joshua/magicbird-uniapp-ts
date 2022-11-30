/**
 * @description: 警告类型枚举
 */
export enum AlarmPeriodFilterEnum {
  MONTHLY = 1, // 上一个月
  WEEKLY = 0, // 上一周
}

export enum AlarmTypeFilterEnum {
  ONLY_SERIOUS = 2, // 仅严重警告
  EXCLUDE_LOW = 1, // 除了轻微警告的其他警告
  ALL = 0, // 全部警告
}
