import { Boundary, CqkjMap, Grid, Points, TileMap, Wind } from 'cqkj-map'
import { nextTick, onMounted, ref, ShallowRef, shallowRef, watch } from 'vue'
import area from '@/assets/json/area.json'

import towerIcon from '@/assets/img/tower-icon.png'
import markIcon from '@/assets/img/mark-icon.png'
import fanIcon from '@/assets/img/fan-icon.png'
import { Text, Image } from 'zrender'
import { RouteLocationNormalizedLoaded } from 'vue-router'

import {
  BasemapType,
  Checked,
  WindFanType,
  WindTowerType,
  PropsType,
  warnPlan,
} from './type'

export const useMap = (route: RouteLocationNormalizedLoaded) => {
  const pMap = shallowRef<CqkjMap>()
  const baseZoom = {
    center: [112.21294725298151, 41.93261980998229] as [number, number],
    zoom: 10,
  }
  const reflectinfonameToWindFarmId = {
    全部: 0,
    红格尔一: 1,
    红格尔二: 2,
    红格尔三: 3,
    红格尔四: 4,
    幸福一: 5,
    幸福二: 6,
    幸福三: 7,
    大板梁一: 8,
    大板梁二: 9,
    大板梁三: 10,
  }
  const routeWindFarmIdToboundaryShape = {}
  watch(
    () => route.query.windFarmId,
    (newV, oldV) => {
      if (newV === oldV) return
      //根据路由缩放
      const shape =
        routeWindFarmIdToboundaryShape[
        newV as keyof typeof routeWindFarmIdToboundaryShape
        ]
      if (!pMap.value) return
      if (!shape) {
        boundary.root.removeAll()
        Object.values(routeWindFarmIdToboundaryShape).forEach((v) =>
          boundary.root.add(v as any)
        )
        return pMap.value.setView(...baseZoom.center, baseZoom.zoom)
      }
      //裁剪
      boundary.root.removeAll()
      boundary.root.add(shape)
      //跳转到对应风场
      pMap.value.zoomTo(
        routeWindFarmIdToboundaryShape[
        newV as keyof typeof routeWindFarmIdToboundaryShape
        ],
        0.7,
        [15, -10]
      )
    }
  )
  const boundary = new Boundary('风电场').setDataByGeoJSON(
    area as any,
    (shape, info) => {
      shape.attr({
        silent: false,
        style: {
          // fill: "#ffff00",
          // fillOpacity: 0,
          // opacity: 0.7,
          stroke: '#5EC5FF',
          lineWidth: 2,
        },
        textContent: new Text({
          silent: true,
          z: 101,
          style: {
            text: info!.NAME,
          },
        }),
        textConfig: {
          position: 'inside',
          insideStroke: '#eeeeee',
        },
      })
      //构造路由映射shape
      const windFarmId =
        reflectinfonameToWindFarmId[
        info!.NAME as keyof typeof reflectinfonameToWindFarmId
        ]
      Reflect.set(routeWindFarmIdToboundaryShape, windFarmId, shape)
      //点击boundary缩放功能
      // shape.on("click", e => {
      //   pMap.value!.zoomTo(shape, 0.7, [15, -10]);
      // });
    }
  )

  onMounted(() => {
    pMap.value = new CqkjMap(
      document.getElementById('map-container')! as HTMLDivElement,
      baseZoom
    )
    boundary.addTo(pMap.value)
    // ;(window as any).map = pMap.value
  })
  return {
    pMap,
  }
}

export const usePoints = (route: RouteLocationNormalizedLoaded) => {
  const points = new Points('机位、测风塔、标记')
  /**当前站点信息图表 */
  const currentFanMsg = ref<string>('')
  const isShowFanChart = ref(false)
  /**
   * 机位
   */
  async function updateFan() {
    points.delete('计划')
    if (route.query.windFarmId === '0') return
    const fan: WindFanType[] | null = await getSelectMachine()
    if (!fan) return
    fan.forEach((v) => {
      const image = new Image({
        globalScaleRatio: 0,
        style: {
          image: fanIcon,
          width: 33,
          height: 33,
          x: -16,
          y: -16,
        },
        textContent: new Text({
          style: {
            text: v.id,
            fontSize: 12,
          },
          z: 1000,
        }),
        textConfig: {
          position: 'bottom',
        },
        scaleY: -1,
        z: 1000,
      })
      image.on('click', () => {
        //弹出图表
      })
      points.add({
        lon: v.lon,
        lat: v.lat,
        shape: image,
        keys: [v.hasPlan ? '有计划' : '无计划', '计划'],
        static: true,
      })
    })
  }
  /**
   * 测风塔
   */
  getWindTower().then((tower: WindTowerType[]) => {
    points.delete('测风塔')
    tower.forEach((v) => {
      points.add({
        lon: v.lon,
        lat: v.lat,
        shape: new Image({
          globalScaleRatio: 0,
          style: {
            image: towerIcon,
            width: 24.09,
            height: 33,
            x: -12,
            y: -16,
          },
          textContent: new Text({
            style: {
              text: v.id,
              fontSize: 12,
            },
            z: 1000,
          }),
          textConfig: {
            position: 'bottom',
          },
          scaleY: -1,
          z: 1000,
        }),
        keys: ['测风塔'],
        static: true,
      })
    })
  })
  /**
   * 标记
   */
  async function showMark() {
    points.delete('mark')
    const res: any[] = await ApiGetMarkList()
    res &&
      res.forEach((v) => {
        const image = new Image({
          globalScaleRatio: 0,
          style: {
            image: markIcon,
            width: 33,
            height: 33,
            x: -16,
            y: -16,
          },
          textContent: new Text({
            style: {
              text: v.name,
              fontSize: 12,
            },
            z: 1000,
          }),
          textConfig: {
            position: 'bottom',
          },
          scaleY: -1,
          z: 1000,
        })
        points.add({
          lon: v.lon,
          lat: v.lat,
          shape: image,
          keys: ['mark'],
          static: true,
        })
      })
  }

  //init
  points.hidePoints('有计划')
  points.hidePoints('无计划')
  points.hidePoints('测风塔')

  watch(
    () => route.query,
    (newV, oldV) => {
      if (newV?.windFarmId !== oldV?.windFarmId) {
        updateFan()
        showMark()
      }
    },
    { immediate: true }
  )

  return {
    points,
    showMark,
    currentFanMsg,
    isShowFanChart,
  }
}
export const useWind = (pMap: ShallowRef<CqkjMap | undefined>) => {
  const wind = new Wind('风场')
  const isShowWind = ref(false)
  watch(isShowWind, (newV) => {
    if (!newV) return wind.setDataByPng()
    //获取数据
    getWindData.then(() => {
      wind.setDataByPng()
    })
  })
  nextTick(() => {
    wind.addTo(pMap.value!)
  })
  return {
    isShowWind,
  }
}
