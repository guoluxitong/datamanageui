import request from '@/utils/request'

export function relation_devicePermissionlistbyconditionandpage(query) {
  return request({
    url: '/weixinmanage/devicePermission/relation_devicePermissionlistbyconditionandpage',
    method: 'get',
    params: query
  })
}
export function editrelation_devicePermission(data) {
  return request({
    url: '/weixinmanage/devicePermission/editrelation_devicePermission',
    method: 'post',
    data:data
  })
}
export function deleterelation_devicePermissionbyid(id) {
  return request({
    url: '/weixinmanage/devicePermission/deleterelation_devicePermissionbyid',
    method: 'post',
    params:{id}
  })
}
