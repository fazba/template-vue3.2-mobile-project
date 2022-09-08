export interface Checked {
  label: string
  checked: boolean
  key: string
}
export interface WindFanType {
  // height: 1479.31
  // hubHeight: 100
  // id: "HGE4-1"
  // lat: 41.791085
  // lon: 112.045825
  // siteId: "HGE4-1"
  // type: "D155/4200"
  // windFarmId: 4
  height: number
  hubHeight: number
  id: string
  lat: number
  lon: number
  siteId: string
  type: string
  windFarmId: number
  hasPlan: boolean
}
export interface WindTowerType {
  // "id": "1293",
  // "height": [
  //   "90A",
  //   "90B",
  //   "70",
  //   "50",
  //   "10"
  // ],
  // "dateRangeStart": "2018-05-21 00:00:00",
  // "dateRangeEnd": "2019-05-31 00:00:00",
  // "lon": 112.187,
  // "lat": 41.891683
  id: string
  height: string[]
  // "dateRangeStart": "2018-05-21 00:00:00",
  // "dateRangeEnd": "2019-05-31 00:00:00",
  lon: number
  lat: number
}
export interface PropsType {
  map: CqkjMap
  getWindTower: () => Promise<any[]>
  getSelectMachine: () => Promise<any[]>
  ApiGetMarkList: () => Promise<any[]>
}
export interface WindFarm {
  value: number | string
  label: number | string
  leaf?: boolean
}
export interface warnPlan {
  fanId: string
  warnStartTime: string
  warnEndTime: string
  warnContent: string
  height: number
  radius: number
  planContent: string
  planStartTime: string
  planEndTime: string
  mark: string
}
