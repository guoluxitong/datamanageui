import request from '@/utils/request'
import qs from 'qs'
export function enterprisecustomercodelist(query) {
  return request({
    url: '/webapi/datacenter/core/enterprise/customer/prefix/list',
    method: 'get',
    params: query
  })
}


export function editenterprisecustomercode(data) {
    return request({
        url: '/webapi/datacenter/core/enterprise/customer/prefix/create',
        method: 'post',
        data:qs.stringify(data)
    })
}

