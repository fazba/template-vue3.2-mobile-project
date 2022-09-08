import { ref } from 'vue'
import { TileMap } from 'cqkj-map'
import customBasemap from '@/assets/img/default-basemap.png'
import satelliteBasemap from '@/assets/img/satellite-basemap.png'
import terrainBasemap from '@/assets/img/terrain-basemap.png'
import electronicBasemap from '@/assets/img/electronic-basemap.png'
import {
  ELECTRONIC_BASEMAP,
  SATELLITE_BASEMAP,
  TERRAIN_BASEMAP,
  CUSTOM_BASEMAP,
} from './constant'
import { BasemapType } from './type'

export const useTileMap = () => {
  /**赋值地图 */
  const tileMap = new TileMap('瓦片图', {
    url: SATELLITE_BASEMAP,
    subdomains: '1234567',
  })
  /**底图 */
  const baseMap: BasemapType[] = [
    {
      name: '自定义图',
      url: customBasemap,
      map: CUSTOM_BASEMAP,
    },
    {
      name: '卫星图',
      url: satelliteBasemap,
      map: SATELLITE_BASEMAP,
    },
    {
      name: '地形图',
      url: terrainBasemap,
      map: TERRAIN_BASEMAP,
    },
    {
      name: '电子图',
      url: electronicBasemap,
      map: ELECTRONIC_BASEMAP,
    },
  ]
  /**当前选中地图 */
  const currentBasemap = ref(baseMap[1].name)
  /**切换底图 */
  const changeBasemap = (item: BasemapType) => {
    currentBasemap.value = item.name
    tileMap.url = item.map
  }
  /**渲染地图 */
  const mousein = ref(false)
  return {
    tileMap,
    mousein,
    currentBasemap,
    baseMap,
    changeBasemap,
  }
}
