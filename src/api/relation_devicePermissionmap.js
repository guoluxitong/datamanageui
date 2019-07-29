import request from '@/utils/request'

export function relation_devicePermissionlistbyconditionandpage(query) {
  return request({
    url: '/webapi/weixinmanage/devicePermission/relation_devicePermissionlistbyconditionandpage',
    method: 'get',
    params: query
  })
}
export function editrelation_devicePermission(data) {
  return request({
    url: '/webapi/weixinmanage/devicePermission/editrelation_devicePermission',
    method: 'post',
    data:data
  })
}
export function deleterelation_devicePermissionbyid(id) {
  return request({
    url: '/webapi/weixinmanage/devicePermission/deleterelation_devicePermissionbyid',
    method: 'post',
    params:{id}
  })
}
