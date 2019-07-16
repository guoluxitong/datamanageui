import request from '@/utils/request'
import qs from 'qs'
export function getDeviceList(query) {
  return request({
    url: '/webapi/datacenter/device/list',
    method: 'get',
    params: query
  })
}

export function getDeviceListByEnterpriseIdAndPage(enterpriseId) {
  console.log(enterpriseId)
  return request({
    url: '/webapi/datacenter/device/list/enterprise',
    method: 'get',
    params: {enterpriseId:enterpriseId }
  })
}
export function getDeviceListBySuffix(query) {
  return request({
    url: '/webapi/datacenter/device/fix/suffix',
    method: 'get',
    params:{suffix:query}
  })
}
export function insertDevice(data) {
  return request({
    url: '/webapi/datacenter/device/create',
    method: 'post',
    data:data
  })
}

export function updateManyDeviceNo(data) {
  return request({
    url: '/webapi/datacenter/device',
    method: 'post',
    data:data
  })
}

export function editDevice(data) {
  return request({
    url: '/webapi/datacenter/device/fix/modify',
    method: 'post',
    data:qs.stringify(data)
  })
}
export function deleteDeviceById(id) {
  return request({
    url: '/webapi/datacenter/device',
    method: 'post',
    params:{id}
  })
}
