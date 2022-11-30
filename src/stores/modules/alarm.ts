import { defineStore } from 'pinia';
import { AlarmPeriodFilterEnum, AlarmTypeFilterEnum } from '@/enums/alarmEnum';

interface AlarmState {
  timePeriodFilter: AlarmPeriodFilterEnum;
  alarmTypeSwitch: AlarmTypeFilterEnum;
}

export const useAlarmStore = defineStore({
  id: 'alarm',
  state: (): AlarmState => ({
    timePeriodFilter: AlarmPeriodFilterEnum.WEEKLY,
    alarmTypeSwitch: AlarmTypeFilterEnum.EXCLUDE_LOW,
  }),
  getters: {
    getPeriodFilter: state => state.timePeriodFilter,
    getTypeSwitch: state => state.alarmTypeSwitch,
  },
  actions: {
    setPeriodFilter(periodFilter: AlarmPeriodFilterEnum) {
      this.timePeriodFilter = periodFilter;
    },
    setTypeSwitch(typeSwitch: AlarmTypeFilterEnum) {
      this.alarmTypeSwitch = typeSwitch;
    },
  },
});
