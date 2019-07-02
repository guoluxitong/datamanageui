import request from '@/utils/request'
import qs from 'qs'
export function enterprisecustomerlist(query) {
  return request({
    url: '/webapi/datacenter/enterprise/customer/list',
    method: 'get',
    params: query
  })
}
export function editenterprisecustomer(data) {
    return request({
        url: '/webapi/datacenter/enterprise/customer/modify',
        method: 'post',
        data:qs.stringify(data)
    })
}
export function createcustomer(data) {
  return request({
    url: '/webapi/datacenter/enterprise/customer/create',
    method: 'post',
    data:qs.stringify(data)
  })
}
