import request from '@/utils/request'
import qs from 'qs'
export function enterprisecustomercodelist(query) {
  return request({
    url: '/webapi/datacenter/enterprise/customer/prefix/list',
    method: 'get',
    params: query
  })
}


export function editenterprisecustomercode(data) {
    return request({
        url: '/webapi/datacenter/enterprise/customer/prefix/create',
        method: 'post',
        data:qs.stringify(data)
    })
}

