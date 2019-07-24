import request from '@/utils/request'

export function getRelation_DeviceSmsMapMapperListByConditionAndPage(query) {
  return request({
    url: '/weixinmanage/deviceSms/relation_deviceSmslistbyconditionandpage',
    method: 'get',
    params: query
  })
}
export function editRelation_DeviceSmsMap(data) {
  return request({
    url: '/weixinmanage/deviceSms/editrelation_DeviceSmsMap',
    method: 'post',
    data:data
  })
}
export function deleteRelation_DeviceSmsMapById(id) {
  return request({
    url: '/weixinmanage/deviceSms/deleterelation_DeviceSmsMapbyid',
    method: 'post',
    params:{id}
  })
}
