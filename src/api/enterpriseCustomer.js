import request from '@/utils/request'

export function enterprisecustomerlist(query) {
  return request({
    url: '/enterprisecustomer/enterprisecustomerlist',
    method: 'get',
    params: query
  })
}


export function editenterprisecustomer(data) {
    return request({
        url: '/enterprisecustomer/editenterprisecustomer',
        method: 'post',
        data:data
    })
}

