import request from '@/utils/request'

export function getDeviceTypeList() {
  return request({
    url: '/devicetype/getdevicetypelist',
    method: 'get'
  })
}
export function getDeviceTypeListByConditionAndPage(query) {
  return request({
    url: '/devicetype/devicetypelistbyconditionandpage',
    method: 'get',
    params: query

  })
}
export function editdeviceType(data) {
  return request({
    url: '/devicetype/editdevicetype',
    method: 'post',
    data:data
  })
}
export function deletedeviceTypebyid(id) {
  return request({
    url: '/devicetype/deletedevicetypebyid',
    method: 'post',
    params:{id}
  })
}
