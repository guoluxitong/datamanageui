import request from '@/utils/request'

export function enterprisecustomercodelist(query) {
  return request({
    url: '/enterprisecustomercode/enterprisecustomercodelist',
    method: 'get',
    params: query
  })
}


export function editenterprisecustomercode(data) {
    return request({
        url: '/enterprisecustomercode/editenterprisecustomercode',
        method: 'post',
        data:data
    })
}

