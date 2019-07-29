import request from '@/utils/request'

export function getRelation_DeviceControlMapMapperListByConditionAndPage(query) {
  return request({
    url: '/webapi/weixinmanage/devicecontrol/relation_devicecontrolmaplistbyconditionandpage',
    method: 'get',
    params: query
  })
}
export function editRelation_DeviceControlMap(data) {
  return request({
    url: '/webapi/weixinmanage/devicecontrol/editrelation_devicecontrolmap',
    method: 'post',
    data:data
  })
}
export function deleteRelation_DeviceControlMapById(id) {
  return request({
    url: '/webapi/weixinmanage/devicecontrol/deleterelation_devicecontrolmapbyid',
    method: 'post',
    params:{id}
  })
}
