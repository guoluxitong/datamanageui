import request from '@/utils/request'

export function getDeviceListByCustomerId(query) {

  return request({
    url: '/device/devicelistbycustomerId',
    method: 'get',
    params: query
  })
}

export function getDeviceListByEnterpriseIdAndPage(query) {
  return request({
    url: '/device/devicelistbyenterpriseId',
    method: 'get',
    params: query
  })
}
export function getDeviceListBySuffix(query) {
  return request({
    url: '/device/get/suffix',
    method: 'get',
    params:{suffix:query}
  })
}
export function insertDevice(deviceList) {
  console.log(deviceList)
  return request({
    url: '/device/create',
    method: 'post',
    data:[deviceList]
  })
}

export function updateManyDeviceNo(data) {
  return request({
    url: '/device/fix/modify',
    method: 'post',
    data:data
  })
}

export function editDevice({ suffix,  prefix,  deviceType,  saleStatus}) {
  return request({
    url: '/device/fix/modify',
    method: 'post',
    params:{suffix:suffix,  prefix:prefix,  deviceType:deviceType,  saleStatus:saleStatus}
  })
}
export function deleteDeviceById(id) {
  return request({
    url: '/device/deletedevicebyid',
    method: 'post',
    params:{id}
  })
}
